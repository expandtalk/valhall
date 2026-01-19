import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useOptimizedSearch } from '@/hooks/useOptimizedSearch';

interface SearchWithSuggestionsProps {
  placeholder?: string;
  onSearchResult: (results: any[]) => void;
  onQueryChange?: (query: string) => void;
  className?: string;
}

export const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  placeholder = 'Search inscriptions...',
  onSearchResult,
  onQueryChange,
  className = ''
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const {
    query,
    setQuery,
    results,
    isLoading,
    search
  } = useOptimizedSearch({
    debounceMs: 200
  });
  
  // Handle query changes
  const handleQueryChange = (value: string) => {
    setQuery(value);
    onQueryChange?.(value);
    setShowSuggestions(value.length > 0);
  };
  
  // Handle search execution
  const handleSearch = () => {
    search();
    onSearchResult(results);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.signum || suggestion.location || '');
    onSearchResult([suggestion]);
    setShowSuggestions(false);
  };
  
  // Handle clear
  const handleClear = () => {
    setQuery('');
    onSearchResult([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };
  
  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(query.length > 0)}
            placeholder={placeholder}
            className="pr-8"
          />
          
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="shrink-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && results.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto bg-popover border border-border rounded-md shadow-lg"
        >
          {results.slice(0, 5).map((suggestion, index) => (
            <button
              key={suggestion.id || index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border last:border-b-0"
            >
              <div className="font-medium">
                {suggestion.signum || 'Unknown'}
              </div>
              {suggestion.location && (
                <div className="text-sm text-muted-foreground">
                  📍 {suggestion.location}
                </div>
              )}
              {suggestion.transliteration && (
                <div className="text-xs font-mono text-muted-foreground truncate">
                  {suggestion.transliteration}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};