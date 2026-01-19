
import { GermanicTimelinePeriod } from './types';
import { PREHISTORIC_PERIODS } from './prehistoricPeriods';
import { METAL_AGE_PERIODS } from './metalAgePeriods';
import { LATER_PERIODS } from './laterPeriods';

export type { GermanicTimelinePeriod } from './types';

export const GERMANIC_TIME_PERIODS: GermanicTimelinePeriod[] = [
  ...PREHISTORIC_PERIODS,
  ...METAL_AGE_PERIODS,
  ...LATER_PERIODS
];
