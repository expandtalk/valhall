
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditModalField } from './types';

interface FormFieldRendererProps {
  field: EditModalField;
  value: any;
  onChange: (key: string, value: any) => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  onChange
}) => {
  if (field.type === 'textarea') {
    return (
      <div className="space-y-2">
        <Label htmlFor={field.key} className="text-white">
          {field.label}
        </Label>
        <Textarea
          id={field.key}
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          rows={3}
          required={field.required}
        />
      </div>
    );
  }

  if (field.options) {
    // Ultra-strict validation function
    const isValidValue = (val: any): boolean => {
      if (val === null || val === undefined) return false;
      const stringVal = String(val).trim();
      return stringVal.length > 0 && stringVal !== 'undefined' && stringVal !== 'null' && stringVal !== '';
    };

    // Process and validate options with extreme care
    const validOptions = Array.isArray(field.options) 
      ? field.options
          .map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option?.value;
            const optionLabel = typeof option === 'string' ? option : option?.label;
            
            return {
              value: optionValue,
              label: optionLabel,
              originalIndex: index
            };
          })
          .filter((processedOption) => isValidValue(processedOption.value))
          .map((processedOption) => ({
            ...processedOption,
            value: String(processedOption.value).trim(), // Ensure string and trimmed
            label: processedOption.label || String(processedOption.value).trim()
          }))
          .filter((processedOption) => processedOption.value.length > 0) // Final safety check
      : [];

    console.log(`FormFieldRenderer: Field ${field.key} has ${validOptions.length} valid options after ultra-strict filtering`, validOptions);

    // If no valid options after filtering, don't render the select
    if (validOptions.length === 0) {
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key} className="text-white">
            {field.label}
          </Label>
          <div className="text-yellow-400 text-sm">
            Inga giltiga alternativ tillgängliga för {field.label}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Label htmlFor={field.key} className="text-white">
          {field.label}
        </Label>
        <Select
          value={value || ''}
          onValueChange={(newValue) => onChange(field.key, newValue)}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder={`Välj ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-white/20">
            {validOptions.map((processedOption) => {
              // Absolutely final validation before rendering - this is the critical fix
              const finalValue = processedOption.value;
              
              // Triple check that the value is valid before rendering
              if (!finalValue || 
                  typeof finalValue !== 'string' || 
                  finalValue.trim() === '' || 
                  finalValue.length === 0) {
                console.error(`Critical: Blocked invalid value at SelectItem render:`, processedOption);
                return null; // Don't render this item at all
              }
              
              return (
                <SelectItem 
                  key={`${finalValue}-${processedOption.originalIndex}`} 
                  value={finalValue} 
                  className="text-white hover:bg-white/10"
                >
                  {processedOption.label}
                </SelectItem>
              );
            }).filter(Boolean)} {/* Remove any null items */}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.key} className="text-white">
        {field.label}
      </Label>
      <Input
        id={field.key}
        type={field.type}
        step={field.type === 'number' ? 'any' : undefined}
        value={value || ''}
        onChange={(e) => onChange(field.key, field.type === 'number' && e.target.value ? 
          (field.key.includes('lat') || field.key.includes('lng') ? parseFloat(e.target.value) : parseInt(e.target.value)) : 
          e.target.value 
        )}
        className="bg-white/10 border-white/20 text-white"
        required={field.required}
      />
    </div>
  );
};
