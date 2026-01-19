
import React, { useState } from 'react';
import { getVikingRegions } from '@/utils/vikingEraRegions';
import { useAdminOperations } from '@/hooks/useAdminOperations';
import { EditModal } from './EditModal';
import { categories, periods, categoryColors, vikingRegionFields } from './viking-regions/config';
import { VikingRegionsHeader } from './viking-regions/VikingRegionsHeader';
import { VikingRegionsGrid } from './viking-regions/VikingRegionsGrid';

export const AdminVikingRegions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
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
  
  const allRegions = getVikingRegions();
  const filteredRegions = allRegions.filter(region => {
    const matchesSearch = region.vikingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.modernName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || region.category === selectedCategory;
    const matchesPeriod = selectedPeriod === 'all' || region.timeperiod === selectedPeriod;
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      <VikingRegionsHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        periods={periods}
        filteredCount={filteredRegions.length}
        totalCount={allRegions.length}
        onAdd={() => handleAdd('Viking Region')}
        isLoading={isLoading}
      />

      <VikingRegionsGrid
        regions={filteredRegions}
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
        fields={vikingRegionFields}
      />
    </div>
  );
};
