
import React, { useState } from 'react';
import { EditModal } from './EditModal';
import { FolkGroupsHeader } from './folk-groups/FolkGroupsHeader';
import { FolkGroupCard } from './folk-groups/FolkGroupCard';
import { useFolkGroups } from './folk-groups/useFolkGroups';
import { folkGroupFields } from './folk-groups/folkGroupFields';

interface FolkGroup {
  id: string;
  name: string;
  name_en: string;
  main_category: string;
  sub_category: string;
  dna_profile: any;
  language_family: string;
  language_subfamily: string;
  active_period_start: number;
  active_period_end: number;
  description: string;
  description_en: string;
  coordinates: any;
  historical_significance: string;
}

export const AdminFolkGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);

  const {
    folkGroups,
    loading,
    isLoading,
    saveFolkGroup,
    deleteFolkGroup,
    fetchFolkGroups
  } = useFolkGroups();

  const filteredGroups = folkGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.sub_category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.main_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (group: FolkGroup) => {
    // Convert coordinates point to lat/lng for editing
    let lat = '';
    let lng = '';
    if (group.coordinates) {
      const coords = group.coordinates.match(/\(([^,]+),([^)]+)\)/);
      if (coords) {
        lng = coords[1].trim();
        lat = coords[2].trim();
      }
    }

    const editItem = {
      ...group,
      lat: lat,
      lng: lng,
      dna_profile_text: JSON.stringify(group.dna_profile, null, 2)
    };
    
    setCurrentEditItem(editItem);
    setEditModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentEditItem({
      name: '',
      name_en: '',
      main_category: 'germanic',
      sub_category: '',
      language_family: '',
      language_subfamily: '',
      active_period_start: 800,
      active_period_end: 1100,
      description: '',
      description_en: '',
      historical_significance: '',
      lat: '',
      lng: '',
      dna_profile_text: '{"Y_DNA": {}}'
    });
    setEditModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    const success = await saveFolkGroup(formData, currentEditItem);
    if (success) {
      setEditModalOpen(false);
      setCurrentEditItem(null);
    }
  };

  if (loading) {
    return <div className="text-white">Laddar folkgrupper...</div>;
  }

  return (
    <div className="space-y-6">
      <FolkGroupsHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredCount={filteredGroups.length}
        totalCount={folkGroups.length}
        onAdd={handleAdd}
        isLoading={isLoading}
        onRefresh={fetchFolkGroups}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <FolkGroupCard
            key={group.id}
            group={group}
            onEdit={handleEdit}
            onDelete={deleteFolkGroup}
            isLoading={isLoading}
          />
        ))}
      </div>

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        item={currentEditItem}
        title="Folkgrupp"
        isLoading={isLoading}
        fields={folkGroupFields.map(field => ({
          ...field,
          key: field.name
        }))}
      />
    </div>
  );
};
