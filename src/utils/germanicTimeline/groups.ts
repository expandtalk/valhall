
export interface GermanicGroup {
  id: string;
  name: string;
  nameEn: string;
  period: string;
  languageBranch: string;
  lat: number;
  lng: number;
  startYear: number;
  endYear: number;
  description: string;
  descriptionEn: string;
  significance: string;
}

// Import groups from organized files
import { PREHISTORIC_GROUPS } from './groups/prehistoricGroups';
import { BRONZE_AGE_GROUPS } from './groups/bronzeAgeGroups';
import { IRON_AGE_GROUPS } from './groups/ironAgeGroups';
import { MIGRATION_PERIOD_GROUPS } from './groups/migrationPeriodGroups';
import { VENDEL_PERIOD_GROUPS } from './groups/vendelPeriodGroups';
import { VIKING_AGE_GROUPS } from './groups/vikingAgeGroups';
import { ADDITIONAL_GROUPS } from './groups/additionalGroups';
import { PREHISTORIC_MIGRATIONS } from './groups/prehistoricMigrations';

// Combine all groups into one array
export const GERMANIC_GROUPS: GermanicGroup[] = [
  ...PREHISTORIC_GROUPS,
  ...PREHISTORIC_MIGRATIONS,
  ...BRONZE_AGE_GROUPS,
  ...IRON_AGE_GROUPS,
  ...MIGRATION_PERIOD_GROUPS,
  ...VENDEL_PERIOD_GROUPS,
  ...VIKING_AGE_GROUPS,
  ...ADDITIONAL_GROUPS
];
