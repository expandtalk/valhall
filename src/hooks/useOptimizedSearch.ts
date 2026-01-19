import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { supabase } from '@/integrations/supabase/client';

interface UseOptimizedSearchProps {
  initialQuery?: string;
  debounceMs?: number;
  cacheSize?: number;
}

interface SearchCache {
  [key: string]: {
    results: any[];
    timestamp: number;
  };
}

export const useOptimizedSearch = ({
  initialQuery = '',
  debounceMs = 300,
  cacheSize = 50
}: UseOptimizedSearchProps = {}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<SearchCache>({});
  
  const debouncedQuery = useDebounce(query, debounceMs);
  
  // Cache management
  const getCachedResult = useCallback((searchQuery: string) => {
    const cached = cache[searchQuery];
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes cache
      return cached.results;
    }
    return null;
  }, [cache]);
  
  const setCachedResult = useCallback((searchQuery: string, results: any[]) => {
    setCache(prev => {
      const newCache = { ...prev };
      
      // Limit cache size
      const keys = Object.keys(newCache);
      if (keys.length >= cacheSize) {
        const oldestKey = keys.reduce((oldest, key) => 
          newCache[key].timestamp < newCache[oldest].timestamp ? key : oldest
        );
        delete newCache[oldestKey];
      }
      
      newCache[searchQuery] = {
        results,
        timestamp: Date.now()
      };
      
      return newCache;
    });
  }, [cacheSize]);
  
  // Optimized search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    // Check cache first
    const cachedResults = getCachedResult(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.rpc('search_inscriptions_flexible', {
        p_search_term: searchQuery
      });
      
      if (error) throw error;
      
      const searchResults = data || [];
      setResults(searchResults);
      setCachedResult(searchQuery, searchResults);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [getCachedResult, setCachedResult]);
  
  // Effect for debounced search
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);
  
  // Clear cache function
  const clearCache = useCallback(() => {
    setCache({});
  }, []);
  
  // Manual search trigger
  const search = useCallback((searchQuery?: string) => {
    const queryToSearch = searchQuery ?? query;
    performSearch(queryToSearch);
  }, [query, performSearch]);
  
  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    search,
    clearCache,
    cacheSize: Object.keys(cache).length
  };
};