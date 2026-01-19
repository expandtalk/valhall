
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

type SelectOption = {
  value: string;
  label: React.ReactNode;
};

type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

type OptionsType = SelectOption[] | SelectOptionGroup[];

interface SelectFilterProps {
  id?: string;
  label: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  options: OptionsType;
  placeholder: string;
  showAllOption?: { value: string; label: string; };
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  allItemClassName?: string;
  groupLabelClassName?: string;
}

const isGroupedOptions = (options: OptionsType): options is SelectOptionGroup[] => {
  if (!Array.isArray(options) || options.length === 0) return false;
  const firstOption = options[0];
  return typeof firstOption === 'object' && firstOption !== null && 'options' in firstOption && Array.isArray(firstOption.options) && 'label' in firstOption;
};

const filterValidOption = (opt: SelectOption): boolean => {
  return opt && opt.value && typeof opt.value === 'string' && opt.value.trim() !== '' && opt.label != null;
};

export const SelectFilter: React.FC<SelectFilterProps> = ({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder,
  showAllOption,
  triggerClassName,
  contentClassName,
  itemClassName,
  allItemClassName,
  groupLabelClassName
}) => {
  
  const renderOptions = () => {
    if (isGroupedOptions(options)) {
        return options.map((group) => {
            const validGroupOptions = group.options.filter(filterValidOption);
            if (validGroupOptions.length === 0) return null;

            return (
                <SelectGroup key={group.label}>
                    <SelectLabel className={groupLabelClassName}>
                        {group.label}
                    </SelectLabel>
                    {validGroupOptions.map(option => (
                        <SelectItem key={option.value} value={option.value} className={itemClassName}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            )
        }).filter(Boolean);
    }
    
    const validOptions = (options as SelectOption[]).filter(filterValidOption);
    return validOptions.map(option => (
      <SelectItem key={option.value} value={option.value} className={itemClassName}>
        {option.label}
      </SelectItem>
    ));
  };
  
  return (
    <div className="space-y-2">
      {label}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {showAllOption && showAllOption.value && showAllOption.value.trim() !== '' && (
            <SelectItem value={showAllOption.value} className={allItemClassName || itemClassName}>
              {showAllOption.label}
            </SelectItem>
          )}
          {renderOptions()}
        </SelectContent>
      </Select>
    </div>
  );
};
