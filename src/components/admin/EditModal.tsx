
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { EditModalProps } from './edit-modal/types';
import { FormFieldRenderer } from './edit-modal/FormFieldRenderer';
import { LegacyFormRenderer } from './edit-modal/LegacyFormRenderer';

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  item,
  isLoading,
  fields
}) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    } else {
      // Initialize empty form for new items
      if (title === 'Runristare') {
        setFormData({
          name: '',
          description: '',
          period_active_start: '',
          period_active_end: '',
          region: '',
          country: 'Sverige'
        });
      } else if (title === 'Viking Location') {
        setFormData({
          name: '',
          description: '',
          category: '',
          country: 'Sweden',
          period_start: 793,
          period_end: 1066,
          lat: '',
          lng: ''
        });
      } else if (fields) {
        // Initialize based on fields configuration
        const initialData: any = {};
        fields.forEach(field => {
          initialData[field.key] = '';
        });
        setFormData(initialData);
      }
    }
  }, [item, title, fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderFormFields = () => {
    if (fields) {
      return fields.map((field) => (
        <FormFieldRenderer
          key={field.key}
          field={field}
          value={formData[field.key]}
          onChange={handleFieldChange}
        />
      ));
    }

    return (
      <LegacyFormRenderer
        title={title}
        formData={formData}
        setFormData={setFormData}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {item && Object.keys(item).length > 1 ? `Redigera ${title}` : `Lägg till ${title}`}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/5"
            >
              Avbryt
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sparar...
                </>
              ) : (
                'Spara'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
