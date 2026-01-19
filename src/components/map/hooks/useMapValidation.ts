
import { useEffect } from 'react';
import { validateAllGroupsChronology } from "@/utils/germanicTimeline/timelineData";

interface UseMapValidationProps {
  selectedTimePeriod: string;
}

export const useMapValidation = ({ selectedTimePeriod }: UseMapValidationProps) => {
  // Admin validation - log chronology issues
  useEffect(() => {
    const chronologyIssues = validateAllGroupsChronology();
    if (chronologyIssues.length > 0) {
      console.warn('Chronological validation issues found:');
      chronologyIssues.forEach(issue => console.warn('- ' + issue));
    }
  }, [selectedTimePeriod]);
};
