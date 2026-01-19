
import React, { useEffect } from 'react';
import { ExplorerLayout } from './ExplorerLayout';
import { ErrorDisplay } from './ErrorDisplay';
import { useLayoutManager } from '@/hooks/useLayoutManager';
import { useExplorerState } from './hooks/useExplorerState';
import { useExplorerData } from './hooks/useExplorerData';
import { getEnhancedCoordinates } from '@/utils/coordinateMappingEnhanced';
import { CoordinatesWithZoom } from '@/types/common';
import { COUNTRY_CENTERS, CITY_LOCATIONS, REGIONAL_CENTERS, REGION_NAME_TO_CODE } from '@/utils/locationConstants';
import { InscriptionModal } from './InscriptionModal';

export const ExplorerMain: React.FC = () => {
  const { shouldShowControls, shouldShowMap, shouldShowFilters, shouldShowTimeline } = useLayoutManager();
  
  const {
    expandedCards,
    mapNavigate,
    godNameSearch,
    currentPage,
    itemsPerPage,
    currentFocus,
    modalInscription,
    setMapNavigate,
    setCurrentPage,
    toggleExpanded,
    handleMarkerClick,
    handleResultClick,
    handleGodNameSearch,
    handleCloseModal,
    toast
  } = useExplorerState();

  const {
    searchQuery,
    selectedLandscape,
    selectedCountry,
    selectedPeriod,
    selectedStatus,
    selectedObjectType,
    setSearchQuery,
    setSelectedLandscape,
    setSelectedCountry,
    setSelectedPeriod,
    setSelectedStatus,
    setSelectedObjectType,
    activeFiltersCount,
    hasActiveSearch,
    handleClearFilters,
    handleSearch,
    inscriptions,
    currentInscriptions,
    isLoading,
    connectionError,
    dbStats,
    loadData,
    enabledLegendItems,
    legendItems,
    mapInscriptions,
    handleLegendToggle,
    selectedTimePeriod,
    totalPages,
    handleInscriptionUpdate
  } = useExplorerData({
    godNameSearch,
    currentPage,
    itemsPerPage,
    setCurrentPage
  });

  // Show focus-specific toast when focus changes
  useEffect(() => {
    if (currentFocus) {
      const focusMessages: { [key: string]: string } = {
        carvers: "Fokus på runristare - ser du nu carver-relaterade data",
        rivers: "Fokus på flodsystem - ser du nu handelsleder och vattenvägar", 
        gods: "Fokus på gudanamn - ser du nu kultplatser och religiösa platser",
        hundreds: "Fokus på Härader - du kan nu söka per härad.",
        parishes: "Fokus på Församlingar - du kan nu söka per församling."
      };
      
      const message = focusMessages[currentFocus] || `Fokusläge aktiverat: ${currentFocus}`;

      toast({
        title: `Fokusläge aktiverat`,
        description: message,
      });
    }
  }, [currentFocus, toast]);

  // IMPROVED: Enhanced Swedish location search with better city mappings
  useEffect(() => {
    if (hasActiveSearch && mapNavigate) {
      const query = (searchQuery || godNameSearch).toLowerCase().trim();
      console.log(`🗺️ [ExplorerMain] Searching for "${query}". Enhanced location detection active.`);

      if (query) {
        // EXPANDED: Comprehensive Swedish city mappings for better search
        const swedishCityMappings: { [key: string]: { lat: number; lng: number; zoom: number } } = {
          'kalmar': { lat: 56.6634, lng: 16.3567, zoom: 12 },
          'stockholm': { lat: 59.3293, lng: 18.0686, zoom: 11 },
          'gotland': { lat: 57.4684, lng: 18.4867, zoom: 10 }, // 🔧 FIX: Lägg till Gotland-mappning
          'island': { lat: 64.9631, lng: -19.0208, zoom: 7 },  // 🔧 FIX: Lägg till Island-mappning
          'göteborg': { lat: 57.7089, lng: 11.9746, zoom: 11 },
          'malmö': { lat: 55.6050, lng: 13.0038, zoom: 11 },
          'uppsala': { lat: 59.8586, lng: 17.6389, zoom: 12 },
          'linköping': { lat: 58.4108, lng: 15.6214, zoom: 12 },
          'örebro': { lat: 59.2741, lng: 15.2066, zoom: 12 },
          'västerås': { lat: 59.6099, lng: 16.5448, zoom: 12 },
          'norrköping': { lat: 58.5877, lng: 16.1924, zoom: 12 },
          'helsingborg': { lat: 56.0465, lng: 12.6945, zoom: 12 },
          'jönköping': { lat: 57.7826, lng: 14.1618, zoom: 12 },
          'lund': { lat: 55.7047, lng: 13.1910, zoom: 12 },
          'umeå': { lat: 63.8258, lng: 20.2630, zoom: 12 },
          'gävle': { lat: 60.6749, lng: 17.1413, zoom: 12 },
          'borås': { lat: 57.7210, lng: 12.9401, zoom: 12 },
          'eskilstuna': { lat: 59.3717, lng: 16.5077, zoom: 12 },
          'halmstad': { lat: 56.6745, lng: 12.8583, zoom: 12 },
          'växjö': { lat: 56.8777, lng: 14.8091, zoom: 12 },
          'karlstad': { lat: 59.3793, lng: 13.5036, zoom: 12 },
          'sundsvall': { lat: 62.3908, lng: 17.3069, zoom: 12 },
          // Add more Swedish locations
          'visby': { lat: 57.6348, lng: 18.2948, zoom: 12 },
          'kiruna': { lat: 67.8558, lng: 20.2253, zoom: 12 },
          'falun': { lat: 60.6077, lng: 15.6281, zoom: 12 },
          'trollhättan': { lat: 58.2837, lng: 12.2886, zoom: 12 }
        };

        // Priority 1: Check Swedish cities first
        if (swedishCityMappings[query]) {
          const coords = swedishCityMappings[query];
          console.log(`   -> Navigating to Swedish city: ${query}`);
          toast({ 
            title: `Visar ${query}`, 
            description: `Centrerar kartan på staden och söker efter runstenar.` 
          });
          mapNavigate(coords.lat, coords.lng, coords.zoom);
          return;
        }

        // Priority 2: Check original city locations
        if (CITY_LOCATIONS[query]) {
          const coords = CITY_LOCATIONS[query];
          console.log(`   -> Navigating to city: ${query}`);
          toast({ title: `Visar ${query}`, description: `Centrerar kartan på staden.` });
          mapNavigate(coords.lat, coords.lng, coords.zoom);
          return;
        }

        // Priority 3: Check countries
        if (COUNTRY_CENTERS[query]) {
          const coords = COUNTRY_CENTERS[query];
          console.log(`   -> Navigating to country: ${query}`);
          toast({ title: `Visar ${query}`, description: `Centrerar kartan på landet.` });
          mapNavigate(coords.lat, coords.lng, coords.zoom);
          return;
        }

        // Priority 4: Check regions
        const regionCode = REGION_NAME_TO_CODE[query];
        if (regionCode && REGIONAL_CENTERS[regionCode]) {
            const coords = REGIONAL_CENTERS[regionCode];
            console.log(`   -> Navigating to region: ${query} (${regionCode})`);
            toast({ title: `Visar ${query}`, description: `Centrerar kartan på landskapet.` });
            mapNavigate(coords.lat, coords.lng, coords.zoom);
            return;
        }

        // Also check for region abbreviation directly
        const upperQuery = query.toUpperCase();
        if (REGIONAL_CENTERS[upperQuery]) {
            const coords = REGIONAL_CENTERS[upperQuery];
            console.log(`   -> Navigating to region: ${upperQuery}`);
            toast({ title: `Visar landskapet ${upperQuery}`, description: `Centrerar kartan på landskapet.` });
            mapNavigate(coords.lat, coords.lng, coords.zoom);
            return;
        }
      }

      // Fallback to first inscription with coordinates if no direct location match
      if (inscriptions.length > 0) {
        let firstResultToNavigate: any | null = null;
        let coordsWithZoom: CoordinatesWithZoom | null = null;

        for (const inscription of inscriptions) {
          const enhancedCoords = getEnhancedCoordinates(inscription, false);
          if (enhancedCoords) {
            firstResultToNavigate = inscription;
            coordsWithZoom = enhancedCoords;
            break;
          }
        }

        if (firstResultToNavigate && coordsWithZoom) {
          console.log('   -> No direct location match, navigating to first result:', firstResultToNavigate.signum);
          toast({
            title: `Visar resultat för "${searchQuery || godNameSearch}"`,
            description: `Hittade ${inscriptions.length} inskrifter. Centrerar kartan.`,
          });
          mapNavigate(coordsWithZoom.lat, coordsWithZoom.lng, coordsWithZoom.zoom);
        } else {
          console.log('   -> No results with coordinates found for auto-navigation.');
          toast({
            title: 'Kunde inte hitta plats på kartan',
            description: 'Inga av sökresultaten har koordinater som kan visas.',
            variant: 'destructive',
          });
        }
      } else if (query) {
         toast({
            title: 'Inga resultat',
            description: `Kunde inte hitta några inskrifter för "${query}".`,
          });
      }
    }
  }, [inscriptions, hasActiveSearch, mapNavigate, searchQuery, godNameSearch, toast]);

  if (connectionError) {
    return <ErrorDisplay onRetry={loadData} />;
  }

  return (
    <>
      <ExplorerLayout
        shouldShowControls={shouldShowControls}
        shouldShowMap={shouldShowMap}
        shouldShowFilters={shouldShowFilters}
        shouldShowTimeline={shouldShowTimeline}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        totalInscriptions={dbStats.totalInscriptions}
        inscriptionsCount={inscriptions.length}
        activeFiltersCount={activeFiltersCount}
        handleClearFilters={handleClearFilters}
        selectedLandscape={selectedLandscape}
        selectedCountry={selectedCountry}
        selectedPeriod={selectedPeriod}
        mapInscriptions={mapInscriptions}
        currentInscriptions={currentInscriptions}
        allInscriptions={inscriptions}
        enabledLegendItems={enabledLegendItems}
        legendItems={legendItems}
        expandedCards={expandedCards}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        hasActiveSearch={hasActiveSearch}
        onMarkerClick={handleMarkerClick}
        onMapNavigate={setMapNavigate}
        onLegendToggle={handleLegendToggle}
        onToggleExpanded={toggleExpanded}
        onResultClick={handleResultClick}
        onPageChange={setCurrentPage}
        selectedStatus={selectedStatus}
        selectedObjectType={selectedObjectType}
        onLandscapeChange={setSelectedLandscape}
        onCountryChange={setSelectedCountry}
        onPeriodChange={setSelectedPeriod}
        onStatusChange={setSelectedStatus}
        onObjectTypeChange={setSelectedObjectType}
        mapNavigate={mapNavigate}
        onGodNameSearch={handleGodNameSearch}
        selectedTimePeriod={selectedTimePeriod}
        onInscriptionUpdate={handleInscriptionUpdate}
      />
      {modalInscription && (
        <InscriptionModal
          inscription={modalInscription}
          isOpen={!!modalInscription}
          onClose={handleCloseModal}
          onUpdate={handleInscriptionUpdate}
        />
      )}
    </>
  );
};
