
import React from 'react';
import { FileText, Waves } from 'lucide-react';
import { STATUS_MARKERS } from '@/constants/runicConstants';
import { SelectFilter } from './SelectFilter';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange
}) => {
  const options = Object.entries(STATUS_MARKERS).map(([code, name]) => ({
    value: code,
    label: (
      <div className="flex items-center gap-2">
        {code === 'underwater' && <Waves className="h-3 w-3 text-blue-400" />}
        {`${code === 'preserved' ? 'No marker' : code} - ${name as string}`}
      </div>
    )
  }));

  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <FileText className="h-4 w-4" />
          Status
        </div>
      }
      value={selectedStatus}
      onValueChange={onStatusChange}
      options={options}
      placeholder="Select status"
      showAllOption={{ value: "all", label: "All statuses" }}
      triggerClassName="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-blue-500"
      contentClassName="bg-slate-800 border-slate-600 max-h-64 z-50"
      itemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
      allItemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
    />
  );
};
