
import React, { useState } from 'react';
import { getAllVikingLocations } from '@/utils/vikingEraLocations';
import { useAdminOperations } from '@/hooks/useAdminOperations';
import { EditModal } from './EditModal';
import { categories, categoryColors, vikingLocationFields } from './viking-locations/config';
import { VikingLocationsHeader } from './viking-locations/VikingLocationsHeader';
import { VikingLocationsGrid } from './viking-locations/VikingLocationsGrid';
import { VikingLocation } from "./viking-locations/types";

export const AdminVikingLocations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
  
  const allLocations = getAllVikingLocations();
  const filteredLocations = allLocations.filter((location: VikingLocation) => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <VikingLocationsHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        filteredCount={filteredLocations.length}
        totalCount={allLocations.length}
        onAdd={() => handleAdd('Viking Location')}
        isLoading={isLoading}
      />

      <VikingLocationsGrid
        locations={filteredLocations}
        categoryColors={categoryColors}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveEdit}
        item={currentEditItem}
        title={currentEditType}
        isLoading={isLoading}
        fields={vikingLocationFields}
      />
    </div>
  );
};
