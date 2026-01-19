
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Edit, Trash2, Plus, Search } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { useAdminOperations } from '@/hooks/useAdminOperations';
import { EditModal } from './EditModal';

interface Location {
  id: string;
  object_id: string;
  location: string;
  language_code: string;
  created_at: string;
  updated_at: string;
}

export const AdminLocations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { 
    handleEdit, 
    handleDelete, 
    handleAdd, 
    handleSaveEdit,
    closeEditModal,
    isLoading,
    editModalOpen,
    currentEditItem,
    currentEditType
  } = useAdminOperations();

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta locations-data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleLocationEdit = async (location: Location) => {
    handleEdit('Location', {
      ...location,
      // Format for editing
      object_id: location.object_id,
      location: location.location,
      language_code: location.language_code
    });
  };

  const handleLocationDelete = async (location: Location) => {
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', location.id);

      if (error) throw error;

      toast({
        title: "Borttaget",
        description: "Location har tagits bort framgångsrikt",
      });
      
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: "Fel",
        description: "Kunde inte ta bort location",
        variant: "destructive"
      });
    }
  };

  const handleLocationSave = async (updatedData: any) => {
    try {
      const locationData = {
        object_id: updatedData.object_id,
        location: updatedData.location,
        language_code: updatedData.language_code || 'sv-se'
      };

      let result;
      if (currentEditItem && currentEditItem.id) {
        // Update existing location
        result = await supabase
          .from('locations')
          .update(locationData)
          .eq('id', currentEditItem.id)
          .select();
      } else {
        // Insert new location
        result = await supabase
          .from('locations')
          .insert([locationData])
          .select();
      }

      if (result?.error) {
        throw result.error;
      }

      toast({
        title: "Sparad",
        description: "Location har sparats framgångsrikt",
      });
      
      closeEditModal();
      fetchLocations();
    } catch (error) {
      console.error('Error saving location:', error);
      toast({
        title: "Fel",
        description: `Kunde inte spara location: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
    }
  };

  const handleLocationAdd = () => {
    handleAdd('Location');
  };

  const filteredLocations = locations.filter(location => 
    location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.object_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locationFields = [
    { key: 'object_id', label: 'Object ID', type: 'text' as const, required: true },
    { key: 'location', label: 'Plats/Beskrivning', type: 'textarea' as const, required: true },
    { 
      key: 'language_code', 
      label: 'Språkkod', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'sv-se', label: 'Svenska (sv-se)' },
        { value: 'en-us', label: 'Engelska (en-us)' },
        { value: 'da-dk', label: 'Danska (da-dk)' },
        { value: 'no-no', label: 'Norska (no-no)' }
      ]
    }
  ];

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8 text-center">
          <p className="text-white">Laddar locations...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Locations Administration
          </CardTitle>
          <CardDescription className="text-slate-300">
            Hantera platsinformation och förvaringsplatser för artefakter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Sök efter platser eller object ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-white/20 text-white pl-10"
              />
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleLocationAdd}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till location
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-300">
              Visar {filteredLocations.length} av {locations.length} locations
            </p>
            <Badge variant="secondary" className="bg-slate-700 text-white">
              Totalt: {locations.length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">Object ID</TableHead>
                  <TableHead className="text-white">Plats/Beskrivning</TableHead>
                  <TableHead className="text-white">Språk</TableHead>
                  <TableHead className="text-white">Skapad</TableHead>
                  <TableHead className="text-white">Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-slate-300 font-mono text-sm">
                      {location.object_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="text-white max-w-md">
                      <div className="truncate" title={location.location}>
                        {location.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <Badge variant="outline" className="border-white/20 text-white">
                        {location.language_code}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {new Date(location.created_at).toLocaleDateString('sv-SE')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-slate-300 hover:text-white"
                          onClick={() => handleLocationEdit(location)}
                          disabled={isLoading}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleLocationDelete(location)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredLocations.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-slate-400">Inga locations hittades</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={handleLocationSave}
        item={currentEditItem}
        title="Location"
        isLoading={isLoading}
        fields={locationFields}
      />
    </div>
  );
};
