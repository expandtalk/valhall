
import { supabase } from "@/integrations/supabase/client";
import { getEnhancedCoordinates } from '../../utils/coordinateMappingEnhanced';
import { parseCoordinates } from './coordinateUtils';
import type { UseRunicDataProps } from './types';

export const loadEnhancedRunicDataWithBetterCoordinates = async (filters: UseRunicDataProps) => {
  console.log('🔄 Loading enhanced runic data with improved coordinate system...');
  console.log('🔍 FULL FILTER DEBUG:', JSON.stringify(filters, null, 2));

  try {
    // DEBUGGING: Let's see what's happening with the limit
    console.log('🔧 DEBUG: About to query runic_with_coordinates view');
    
    // Use the runic_with_coordinates view that contains all coordinate data
    let query = supabase
      .from('runic_with_coordinates')
      .select('*');

    // Also fetch standalone coordinates from additional_coordinates table
    // for inscriptions that don't exist in the main table (like Icelandic ones)
    console.log('🔍 ICELAND DEBUG: Fetching standalone coordinates from additional_coordinates...');
    const { data: standaloneCoords, error: standaloneError } = await supabase
      .from('additional_coordinates')
      .select('*')
      .is('inscription_id', null);
    
    if (standaloneError) {
      console.error('❌ Error fetching standalone coordinates:', standaloneError);
    } else {
      console.log(`📍 Found ${standaloneCoords?.length || 0} standalone coordinate entries`);
      // Debug: Log any Icelandic entries
      const icelandicEntries = standaloneCoords?.filter(coord => coord.signum.startsWith('IS ')) || [];
      console.log(`🇮🇸 ICELAND DEBUG: Found ${icelandicEntries.length} Icelandic entries:`, icelandicEntries.map(e => e.signum));
    }

    // VIKTIGT: Hantera problematiska söktermer som orsakar SQL-fel
    console.log('🔍 Checking for searchQuery filter:', filters.searchQuery);
    console.log('🔍 Checking for godNameSearch filter:', filters.godNameSearch);
    
    // KRITISKT: Endast applicera filter om de verkligen har värden
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.trim();
      console.log('🔍 Search query detected:', searchTerm);
      
      // Check if searching for countries/regions that might have standalone coordinates
      const searchTermLower = searchTerm.toLowerCase();
      const searchesIsland = searchTermLower.includes('island') || searchTermLower.includes('iceland');
      const searchesVärmland = searchTermLower.includes('värmland');
      
      if (searchesIsland || searchesVärmland) {
        console.log(`🌍 Search includes regions with standalone coordinates: Island=${searchesIsland}, Värmland=${searchesVärmland}`);
      }
      
      // Lista över problematiska termer som orsakar SQL-parsningsfel
      const problematicTerms = ['rök', 'rö', 'å', 'ö'];
      const isProblematic = problematicTerms.some(term => 
        searchTerm.toLowerCase().includes(term.toLowerCase())
      );
      
      if (isProblematic) {
        console.log('⚠️ Using safe search for problematic term:', searchTerm);
        // Använd enkel ILIKE-sökning för problematiska termer - inkludera landskap, kommun och socken
        query = query.or(`signum.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,landscape.ilike.%${searchTerm}%,municipality.ilike.%${searchTerm}%,parish.ilike.%${searchTerm}%,transliteration.ilike.%${searchTerm}%,translation_en.ilike.%${searchTerm}%,translation_sv.ilike.%${searchTerm}%`);
      } else {
        // FIXAD: Hantera exakta signum-sökningar först (t.ex. "G 1", "U 370")
        // Kolla om det är en exakt signum-sökning (kort term som kan vara ett signum)
        const isLikelySignum = searchTerm.length <= 10 && /^[A-Za-z]+\s*\d+/.test(searchTerm);
        
        if (isLikelySignum) {
          console.log(`🎯 Likely signum search detected: "${searchTerm}" - checking for exact match first`);
          
          // Försök exakt match först
          const exactQuery = supabase
            .from('runic_with_coordinates')
            .select('*')
            .eq('signum', searchTerm);
            
          const { data: exactData, error: exactError } = await exactQuery;
          
          if (!exactError && exactData && exactData.length > 0) {
            console.log(`✅ Found exact signum match: ${searchTerm}`);
            query = query.eq('signum', searchTerm);
          } else {
            // Ingen exakt match, använd RPC för fuzzy search
            console.log(`🔍 No exact match for "${searchTerm}", using RPC search`);
            
            try {
              const { data: rpcData, error } = await supabase.rpc('search_inscriptions_flexible', { 
                p_search_term: searchTerm 
              });
              
              if (error) {
                console.error('❌ RPC search failed, falling back to simple search:', error);
                query = query.or(`signum.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,landscape.ilike.%${searchTerm}%,municipality.ilike.%${searchTerm}%,parish.ilike.%${searchTerm}%,transliteration.ilike.%${searchTerm}%,translation_en.ilike.%${searchTerm}%,translation_sv.ilike.%${searchTerm}%`);
              } else if (rpcData && rpcData.length > 0) {
                console.log(`✅ RPC search returned ${rpcData.length} results`);
                
                // Få signum från RPC-resultaten och använd dem för att filtrera huvudfrågan
                const signumList = rpcData.map((item: any) => item.signum);
                console.log(`🔍 Filtering main query by signums:`, signumList);
                
                // Applicera signum-filter på huvudfrågan istället för att returnera direkt
                query = query.in('signum', signumList);
              } else {
                // Inga resultat från RPC, använd omöjlig condition för att returnera tom lista
                console.log(`🔍 RPC search returned no results`);
                query = query.eq('signum', 'IMPOSSIBLE_SIGNUM_THAT_WONT_EXIST');
              }
            } catch (error) {
              console.error('❌ RPC search error, using fallback:', error);
              query = query.or(`signum.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,transliteration.ilike.%${searchTerm}%,translation_en.ilike.%${searchTerm}%,translation_sv.ilike.%${searchTerm}%`);
            }
          }
        } else {
          // Inte ett signum, använd RPC-funktionen för icke-problematiska söktermer
          try {
            const { data: rpcData, error } = await supabase.rpc('search_inscriptions_flexible', { 
              p_search_term: searchTerm 
            });
            
            if (error) {
              console.error('❌ RPC search failed, falling back to simple search:', error);
              query = query.or(`signum.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,landscape.ilike.%${searchTerm}%,municipality.ilike.%${searchTerm}%,parish.ilike.%${searchTerm}%,transliteration.ilike.%${searchTerm}%,translation_en.ilike.%${searchTerm}%,translation_sv.ilike.%${searchTerm}%`);
            } else if (rpcData && rpcData.length > 0) {
              console.log(`✅ RPC search returned ${rpcData.length} results`);
              
              // Få signum från RPC-resultaten och använd dem för att filtrera huvudfrågan
              const signumList = rpcData.map((item: any) => item.signum);
              console.log(`🔍 Filtering main query by signums:`, signumList);
              
              // Applicera signum-filter på huvudfrågan istället för att returnera direkt
              query = query.in('signum', signumList);
            } else {
              // Inga resultat från RPC, använd omöjlig condition för att returnera tom lista
              console.log(`🔍 RPC search returned no results`);
              query = query.eq('signum', 'IMPOSSIBLE_SIGNUM_THAT_WONT_EXIST');
            }
          } catch (error) {
            console.error('❌ RPC search error, using fallback:', error);
            query = query.or(`signum.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,transliteration.ilike.%${searchTerm}%,translation_en.ilike.%${searchTerm}%,translation_sv.ilike.%${searchTerm}%`);
          }
        }
      }
    }

    // KRITISKT: Hantera godNameSearch - applicera endast om det verkligen finns ett värde
    if (filters.godNameSearch && filters.godNameSearch.trim()) {
      const godSearchTerm = filters.godNameSearch.trim();
      console.log('🔍 God name search detected:', godSearchTerm);
      query = query.or(`transliteration.ilike.%${godSearchTerm}%,translation_en.ilike.%${godSearchTerm}%,translation_sv.ilike.%${godSearchTerm}%,historical_context.ilike.%${godSearchTerm}%`);
    }

    // Övriga filter
    if (filters.selectedLandscape !== 'all') {
      query = query.ilike('landscape', `%${filters.selectedLandscape}%`);
    }
    
    if (filters.selectedCountry !== 'all') {
      query = query.ilike('country', `%${filters.selectedCountry}%`);
    }

    // ✅ Användning av den förbättrade sorteringen via signum
    console.log('✅ Fetching inscriptions with improved sorting and landscape filtering');
    const { data, error } = await query
      .limit(50000) // Öka gränsen för att säkerställa att vi får alla inskrifter
      .order('signum', { ascending: true }); // ✅ Sortera på signum från runic_with_coordinates view

    if (error) {
      console.error('❌ Error loading runic data:', error);
      throw error;
    }

    console.log(`📊 SUCCESS: Loaded ${data?.length || 0} inscriptions from database (limit: 50000)`);
    if (data && data.length >= 50000) {
      console.warn(`⚠️ WARNING: Hit the 50000 limit! There might be more data. Total loaded: ${data.length}`);
    }
    
    // ✅ Special debug for Iceland and Denmark
    const icelandicCount = data?.filter(d => d.signum?.startsWith('IS ') || d.country?.toLowerCase()?.includes('island')).length || 0;
    const danishCount = data?.filter(d => d.signum?.startsWith('DR ') || d.country?.toLowerCase()?.includes('danmark')).length || 0;
    console.log(`🇮🇸 ICELAND: Found ${icelandicCount} Icelandic inscriptions in main data`);
    console.log(`🇩🇰 DENMARK: Found ${danishCount} Danish inscriptions in main data`);
    
    // Process data with enhanced coordinate system  
    const enhancedData = (data || []).map((inscription: any) => {
      let finalCoordinates = null;
      
      // DEBUG: Log Öland inscriptions specifically
      if (inscription.signum && inscription.signum.startsWith('Öl ')) {
        console.log(`🔍 ÖLAND DEBUG - Processing ${inscription.signum}:`, {
          original_coordinates: inscription.original_coordinates,
          additional_latitude: inscription.additional_latitude,
          additional_longitude: inscription.additional_longitude,
          coordinate_source: inscription.coordinate_source,
          confidence: inscription.confidence,
          location: inscription.location,
          parish: inscription.parish
        });
      }
      
      // PRIORITY 1: Try original_coordinates from runic_inscriptions table (main source)
      if (inscription.original_coordinates) {
        finalCoordinates = parseCoordinates(inscription.original_coordinates);
        if (finalCoordinates) {
          console.log(`🎯 Using original_coordinates for ${inscription.signum}: [${finalCoordinates.lat}, ${finalCoordinates.lng}]`);
        }
      }
      // PRIORITY 2: Try coordinates from coordinates table (where object_id matches inscription id)
      else if (inscription.coordinates_latitude && inscription.coordinates_longitude) {
        finalCoordinates = {
          lat: inscription.coordinates_latitude,
          lng: inscription.coordinates_longitude
        };
        console.log(`📍 Using coordinates table for ${inscription.signum}: [${finalCoordinates.lat}, ${finalCoordinates.lng}]`);
      }
      // PRIORITY 3: Try additional coordinates from additional_coordinates table
      else if (inscription.additional_latitude && inscription.additional_longitude) {
        finalCoordinates = {
          lat: inscription.additional_latitude,
          lng: inscription.additional_longitude
        };
        console.log(`📍 Using additional coordinates for ${inscription.signum}: [${finalCoordinates.lat}, ${finalCoordinates.lng}]`);
      }
      // PRIORITY 4: Try coordinates field as fallback (for legacy compatibility)
      else if (inscription.coordinates) {
        finalCoordinates = parseCoordinates(inscription.coordinates);
        if (finalCoordinates) {
          console.log(`📍 Using coordinates field for ${inscription.signum}: [${finalCoordinates.lat}, ${finalCoordinates.lng}]`);
        }
      }
      // Fallback: Try enhanced mapping
      else {
        const enhanced = getEnhancedCoordinates(inscription, false);
        if (enhanced) {
          finalCoordinates = { lat: enhanced.lat, lng: enhanced.lng };
          console.log(`🔧 Using enhanced mapping for ${inscription.signum}: [${finalCoordinates.lat}, ${finalCoordinates.lng}]`);
        }
      }
      
      // DEBUG: Log final result for Öland inscriptions
      if (inscription.signum && inscription.signum.startsWith('Öl ')) {
        console.log(`🎯 ÖLAND FINAL RESULT - ${inscription.signum}: coordinates =`, finalCoordinates);
      }
      
      return {
        ...inscription,
        coordinates: finalCoordinates,
        coordinate_source: inscription.coordinate_source || 'original',
        coordinate_confidence: inscription.confidence || 'unknown'
      };
    });

    // Add standalone coordinates as virtual inscriptions
    if (standaloneCoords && standaloneCoords.length > 0) {
      console.log(`🌍 Adding ${standaloneCoords.length} standalone coordinates as virtual inscriptions`);
      
      const virtualInscriptions = standaloneCoords.map((coord: any) => {
        // Extract basic info from the notes field
        const location = coord.notes ? coord.notes.split(',')[0] : coord.signum;
        const description = coord.notes || '';
        
        // Debug for Icelandic entries
        if (coord.signum.startsWith('IS ')) {
          console.log(`🇮🇸 ICELAND VIRTUAL: Creating virtual inscription for ${coord.signum} at [${coord.latitude}, ${coord.longitude}]`);
        }
        
        return {
          id: `virtual-${coord.id}`,
          signum: coord.signum,
          location: location,
          country: coord.signum.startsWith('IS ') ? 'Island' : 
                   coord.signum.startsWith('Vr ') ? 'Sverige' : 'Unknown',
          coordinates: {
            lat: coord.latitude,
            lng: coord.longitude
          },
          translation_en: description.includes('gravsten') ? 'Gravestone inscription' : 
                         description.includes('kyrkdörr') ? 'Church door inscription' : 
                         'Runic inscription',
          object_type: description.includes('runsten') ? 'runsten' : 
                      description.includes('kyrkdörr') ? 'kyrkdörr' : 
                      description.includes('sländtrissa') ? 'sländtrissa' : 'okänd',
          dating_text: coord.notes ? coord.notes.match(/\d{4}/) ? coord.notes.match(/\d{4}/)[0] + '-talet' : 'medeltid' : 'okänd',
          period_start: 1200,
          period_end: 1500,
          coordinate_source: coord.source,
          coordinate_confidence: coord.confidence,
          province: coord.signum.startsWith('IS ') ? 'Island' : 
                   coord.signum.startsWith('Vr ') ? 'Värmland' : 'Unknown',
          landscape: coord.signum.startsWith('IS ') ? 'Island' : 
                    coord.signum.startsWith('Vr ') ? 'Värmland' : 'Unknown',
          virtual_inscription: true
        };
      });
      
      enhancedData.push(...virtualInscriptions);
      console.log(`✅ Total inscriptions after adding virtual ones: ${enhancedData.length}`);
    }

    console.log(`✅ Enhanced ${enhancedData.length} inscriptions with coordinates (including ${standaloneCoords?.length || 0} virtual)`);
    return enhancedData;

  } catch (error) {
    console.error('❌ Error in loadEnhancedRunicDataWithBetterCoordinates:', error);
    throw error;
  }
};
