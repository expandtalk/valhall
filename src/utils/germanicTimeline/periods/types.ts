
export interface GermanicTimelinePeriod {
  id: string;
  name: string;
  nameEn: string;
  startYear: number;
  endYear: number;
  description: string;
  descriptionEn: string;
  color: string;
  keyFeatures: string[];
  basicInfo?: {
    climate: string;
    environment: string;
    people: string;
    lifestyle: string;
    technology?: string;
    society?: string;
    religion?: string;
  };
  basicInfoEn?: {
    climate: string;
    environment: string;
    people: string;
    lifestyle: string;
    technology?: string;
    society?: string;
    religion?: string;
  };
  extendedInfo?: {
    cultures: string[];
    settlements: string[];
    tools: string[];
    burials?: string[];
    trade?: string[];
    dna?: string;
    animals?: string[];
    megafauna?: string[];
    disasters?: string[];
    contemporary?: string[];
    agriculture?: string[];
    art?: string[];
    wars?: string[];
    migration?: string[];
    runestones?: string[];
    expeditions?: string[];
    kingdoms?: string[];
    metalwork?: string[];
    religion?: string[];
    climate?: string[];
  };
  extendedInfoEn?: {
    cultures: string[];
    settlements: string[];
    tools: string[];
    burials?: string[];
    trade?: string[];
    dna?: string;
    animals?: string[];
    megafauna?: string[];
    disasters?: string[];
    contemporary?: string[];
    agriculture?: string[];
    art?: string[];
    wars?: string[];
    migration?: string[];
    runestones?: string[];
    expeditions?: string[];
    kingdoms?: string[];
    metalwork?: string[];
    religion?: string[];
    climate?: string[];
  };
  interestingFinds?: {
    title: string;
    titleEn: string;
    categories: {
      name: string;
      nameEn: string;
      items: string[];
      itemsEn: string[];
    }[];
  };
  coordinates?: {
    northernLimit: number;
    culturalCenters: Array<{
      name: string;
      lat: number;
      lng: number;
      significance: string;
    }>;
  };
}
