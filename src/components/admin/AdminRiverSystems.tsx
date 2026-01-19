import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, MapPin, Navigation, RefreshCw } from "lucide-react";
import { useRiverSystems } from './river-systems/useRiverSystems';
import { RiverSystemModal } from './river-systems/RiverSystemModal';
import { AddCoordinateModal } from './river-systems/AddCoordinateModal';
import { useToast } from "@/hooks/use-toast";

export const AdminRiverSystems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCoordinateModalOpen, setIsAddCoordinateModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<any>(null);
  const [selectedSystemForCoordinate, setSelectedSystemForCoordinate] = useState<any>(null);
  const { toast } = useToast();
  
  const { 
    riverSystems, 
    isLoading,
    createRiverSystem,
    updateRiverSystem,
    addCoordinate,
    deleteRiverSystem 
  } = useRiverSystems();

  const filteredSystems = riverSystems?.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAdd = () => {
    setSelectedSystem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (system: any) => {
    setSelectedSystem(system);
    setIsModalOpen(true);
  };

  const handleDelete = async (system: any) => {
    if (window.confirm(`Är du säker på att du vill ta bort ${system.name}?`)) {
      await deleteRiverSystem.mutateAsync(system.id);
    }
  };

  const handleSave = async (systemData: any) => {
    if (selectedSystem) {
      await updateRiverSystem.mutateAsync({
        id: selectedSystem.id,
        data: systemData
      });
    } else {
      await createRiverSystem.mutateAsync(systemData);
    }
    setIsModalOpen(false);
    setSelectedSystem(null);
  };

  const handleAddCoordinate = (system: any) => {
    setSelectedSystemForCoordinate(system);
    setIsAddCoordinateModalOpen(true);
  };

  const handleSaveCoordinate = async (coordinate: any) => {
    if (selectedSystemForCoordinate) {
      await addCoordinate.mutateAsync({
        riverSystemId: selectedSystemForCoordinate.id,
        coordinate
      });
      setIsAddCoordinateModalOpen(false);
      setSelectedSystemForCoordinate(null);
    }
  };

  const handleRefreshMap = () => {
    toast({
      title: "Tips för kartuppdatering",
      description: "Gå till utforskningssidan och ladda om sidan för att se de uppdaterade floderna på kartan.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Vattenvägar och Handelsrutter
              </CardTitle>
              <CardDescription>
                Hantera floder, åar och handelsrutter från vikingatiden
              </CardDescription>
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Lägg till vattenväg
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Sök vattenvägar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleRefreshMap}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Uppdatera karta
            </Button>
            <Badge variant="outline">
              {filteredSystems.length} av {riverSystems?.length || 0}
            </Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSystems.map((system) => (
                <Card key={system.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{system.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {system.name_en}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddCoordinate(system)}
                          title="Lägg till koordinat"
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(system)}
                          title="Redigera"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(system)}
                          title="Ta bort"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {system.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant={system.importance === 'primary' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {system.importance === 'primary' ? 'Primär' : 'Sekundär'}
                        </Badge>
                        {system.total_length_km && (
                          <Badge variant="outline" className="text-xs">
                            {system.total_length_km} km
                          </Badge>
                        )}　
                        <Badge variant="outline" className="text-xs">
                          {system.period}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{system.coordinates?.length || 0} platser</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredSystems.length === 0 && !isLoading && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'Inga vattenvägar hittades' : 'Inga vattenvägar finns ännu'}
            </div>
          )}
        </CardContent>
      </Card>

      <RiverSystemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSystem(null);
        }}
        onSave={handleSave}
        system={selectedSystem}
        isLoading={createRiverSystem.isPending || updateRiverSystem.isPending}
      />

      <AddCoordinateModal
        isOpen={isAddCoordinateModalOpen}
        onClose={() => {
          setIsAddCoordinateModalOpen(false);
          setSelectedSystemForCoordinate(null);
        }}
        onSave={handleSaveCoordinate}
        riverSystemName={selectedSystemForCoordinate?.name || ''}
        nextSequenceOrder={(selectedSystemForCoordinate?.coordinates?.length || 0) + 1}
        isLoading={addCoordinate.isPending}
      />
    </div>
  );
};