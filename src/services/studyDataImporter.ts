
import { studyData } from '@/components/genetic/data/studyData';
import { DatabaseSite, DatabaseIndividual, DatabaseMarker, DatabasePeriod } from '@/hooks/useGeneticData';

export const convertStudyDataForDatabase = () => {
  // Convert sites
  const sites: Omit<DatabaseSite, 'id' | 'created_at' | 'updated_at'>[] = studyData.sites.map(site => ({
    name: site.name,
    location: site.location,
    parish: site.parish,
    county: site.county,
    country: site.country,
    coordinates: site.coordinates ? { x: site.coordinates.lng, y: site.coordinates.lat } : undefined,
    period: site.period,
    dating: site.dating,
    description: site.description,
    burial_type: site.burialType
  }));

  // Convert individuals
  const individuals: Omit<DatabaseIndividual, 'id' | 'created_at' | 'updated_at'>[] = studyData.individuals.map(individual => ({
    site_id: individual.siteId, // This will be mapped to actual site ID later
    sample_id: individual.sampleId,
    genetic_sex: individual.geneticSex,
    archaeological_sex: individual.archaeologicalSex,
    age: individual.age,
    grave_number: individual.graveNumber,
    grave_goods: individual.graveGoods,
    radiocarbon: individual.radiocarbon,
    y_haplogroup: individual.yHaplogroup,
    mt_haplogroup: individual.mtHaplogroup,
    ancestry: individual.ancestry,
    isotopes: individual.isotopes,
    burial_context: individual.burialContext,
    museums_inventory: individual.museumsInventory
  }));

  // Convert markers
  const markers: Omit<DatabaseMarker, 'id' | 'created_at' | 'updated_at'>[] = studyData.markers.map(marker => ({
    marker_type: marker.type as 'mtDNA' | 'Y-DNA' | 'Autosomal',
    haplogroup: marker.haplogroup,
    gene: marker.gene,
    frequency: marker.frequency,
    origin: marker.origin,
    description: marker.description,
    modern_distribution: marker.modernDistribution,
    significance: marker.significance,
    study_evidence: marker.studyEvidence,
    geographic_spread: marker.geographicSpread,
    time_introduction: marker.timeIntroduction
  }));

  // Convert periods
  const periods: Omit<DatabasePeriod, 'id' | 'created_at' | 'updated_at'>[] = studyData.periods.map(period => ({
    name: period.name,
    name_en: period.name_en,
    time_range: period.timeRange,
    description: period.description,
    genetic_characteristics: period.geneticCharacteristics
  }));

  return {
    sites,
    individuals,
    markers,
    periods
  };
};

export const importStudyDataToDatabase = async (importFunction: (data: any) => Promise<any>) => {
  console.log('Converting study data for database import...');
  const convertedData = convertStudyDataForDatabase();
  
  console.log('Converted data:', {
    sitesCount: convertedData.sites.length,
    individualsCount: convertedData.individuals.length,
    markersCount: convertedData.markers.length,
    periodsCount: convertedData.periods.length
  });
  
  return await importFunction(convertedData);
};
