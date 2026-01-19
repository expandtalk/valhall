
import { GERMANIC_TIME_PERIODS } from './periods';
import { GERMANIC_GROUPS, GermanicGroup } from './groups';

export const getGroupsByPeriod = (periodId: string): GermanicGroup[] => {
  const period = GERMANIC_TIME_PERIODS.find(p => p.id === periodId);
  if (!period) {
    console.warn(`Period ${periodId} not found`);
    return [];
  }

  const groupsInPeriod = GERMANIC_GROUPS.filter(group => {
    return group.startYear <= period.endYear && group.endYear >= period.startYear;
  });

  console.log(`Found ${groupsInPeriod.length} groups for period ${periodId} (${period.startYear}-${period.endYear})`);
  return groupsInPeriod;
};

export const getLanguageBranchColor = (branch: string): string => {
  const colors: { [key: string]: string } = {
    'North Germanic': '#e11d48',
    'West Germanic': '#059669', 
    'East Germanic': '#7c3aed',
    'Proto-Germanic': '#f59e0b',
    'Pre-Germanic': '#6b7280',
    'Celtic': '#10b981',
    'Italic': '#8b5cf6',
    'Finno-Ugric': '#0891b2',
    'West Slavic': '#dc2626',
    'Baltic': '#16a34a',
    'Thracian': '#ca8a04'
  };
  return colors[branch] || '#6b7280';
};

export const getTypeIcon = (languageBranch: string): string => {
  const icons: { [key: string]: string } = {
    'North Germanic': '⚔️',
    'West Germanic': '🛡️', 
    'East Germanic': '🏰',
    'Proto-Germanic': '🗿',
    'Pre-Germanic': '🏹',
    'Celtic': '🍀',
    'Italic': '🏛️',
    'Finno-Ugric': '🐻',
    'West Slavic': '⚜️',
    'Baltic': '🌲',
    'Thracian': '🐎'
  };
  return icons[languageBranch] || '👥';
};

export const validateAllGroupsChronology = (): string[] => {
  const issues: string[] = [];
  
  GERMANIC_GROUPS.forEach(group => {
    if (group.startYear > group.endYear) {
      issues.push(`Group ${group.name}: start year (${group.startYear}) is after end year (${group.endYear})`);
    }
    
    if (group.startYear < -50000 || group.endYear > 2000) {
      issues.push(`Group ${group.name}: dates seem unrealistic (${group.startYear}-${group.endYear})`);
    }
  });
  
  return issues;
};
