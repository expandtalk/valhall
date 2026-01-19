
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOperations = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  const [currentEditType, setCurrentEditType] = useState<string>('');

  const handleEdit = async (type: string, item: any) => {
    console.log(`Opening edit modal for ${type}:`, item);
    setCurrentEditItem(item);
    setCurrentEditType(type);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    setIsLoading(true);
    try {
      if (currentEditType === 'Runristare') {
        // Save to carvers table
        const carverData = {
          name: updatedData.name,
          description: updatedData.description || null,
          period_active_start: updatedData.period_active_start || null,
          period_active_end: updatedData.period_active_end || null,
          region: updatedData.region || null,
          country: updatedData.country || null,
          language_code: 'sv-se'
        };

        let result;
        if (currentEditItem && Object.keys(currentEditItem).length > 1 && currentEditItem.id) {
          // Update existing carver
          result = await supabase
            .from('carvers')
            .update(carverData)
            .eq('id', currentEditItem.id)
            .select();
        } else {
          // Insert new carver
          result = await supabase
            .from('carvers')
            .insert([carverData])
            .select();
        }

        if (result?.error) {
          throw result.error;
        }

        console.log('Carver saved successfully:', result.data);
      } else if (currentEditType === 'Viking Location') {
        // Save to viking_cities table if it's a new location or update existing
        const locationData = {
          name: updatedData.name,
          description: updatedData.description,
          coordinates: `(${updatedData.lng},${updatedData.lat})`,
          category: updatedData.category,
          country: updatedData.country || 'Sweden',
          period_start: parseInt(updatedData.period_start) || 793,
          period_end: parseInt(updatedData.period_end) || 1066
        };

        let result;
        if (currentEditItem && Object.keys(currentEditItem).length > 1 && currentEditItem.id) {
          // Update existing location
          result = await supabase
            .from('viking_cities')
            .update(locationData)
            .eq('id', currentEditItem.id)
            .select();
        } else {
          // Insert new location
          result = await supabase
            .from('viking_cities')
            .insert([locationData])
            .select();
        }

        if (result?.error) {
          throw result.error;
        }

        console.log('Viking location saved successfully:', result.data);
      }
      
      toast({
        title: "Sparad",
        description: `${currentEditType} har sparats framgångsrikt`,
      });
      
      setEditModalOpen(false);
      setCurrentEditItem(null);
      setCurrentEditType('');
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Fel",
        description: `Kunde inte spara ${currentEditType}: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: string, item: any) => {
    setIsLoading(true);
    try {
      if (type === 'Runristare' && item.id) {
        const { error } = await supabase
          .from('carvers')
          .delete()
          .eq('id', item.id);

        if (error) throw error;
      } else if (type === 'Viking Location' && item.id) {
        const { error } = await supabase
          .from('viking_cities')
          .delete()
          .eq('id', item.id);

        if (error) throw error;
      }
      
      toast({
        title: "Borttaget",
        description: `${type} har tagits bort framgångsrikt`,
      });
    } catch (error) {
      toast({
        title: "Fel",
        description: `Kunde inte ta bort ${type}: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (type: string) => {
    console.log(`Adding new ${type}`);
    
    // Set up empty item for adding with default values
    const emptyItem = type === 'Runristare' ? {
      name: '',
      description: '',
      period_active_start: null,
      period_active_end: null,
      region: '',
      country: 'Sverige'
    } : type === 'Viking Location' ? {
      period_start: 793,
      period_end: 1066,
      country: 'Sweden'
    } : {};
    
    setCurrentEditItem(emptyItem);
    setCurrentEditType(type);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentEditItem(null);
    setCurrentEditType('');
  };

  return {
    handleEdit,
    handleDelete,
    handleAdd,
    handleSaveEdit,
    closeEditModal,
    isLoading,
    editModalOpen,
    currentEditItem,
    currentEditType
  };
};
