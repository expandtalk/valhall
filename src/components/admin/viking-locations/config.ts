
export const categories = [
  { id: 'all', name: 'Alla kategorier' },
  { id: 'trading_post', name: 'Handelsplatser' },
  { id: 'settlement', name: 'Bosättningar' },
  { id: 'fortress', name: 'Fästningar' },
  { id: 'religious_center', name: 'Religiösa platser' },
  { id: 'political_center', name: 'Politiska centra' },
  { id: 'exploration', name: 'Utforskning' }
];

export const categoryColors: Record<string, string> = {
  'trading_post': 'bg-amber-100 text-amber-800',
  'settlement': 'bg-green-100 text-green-800',
  'fortress': 'bg-red-100 text-red-800',
  'religious_center': 'bg-purple-100 text-purple-800',
  'political_center': 'bg-blue-100 text-blue-800',
  'exploration': 'bg-cyan-100 text-cyan-800'
};

export const vikingLocationFields = [
  { key: 'name', label: 'Namn', type: 'text' as const, required: true },
  { key: 'description', label: 'Beskrivning', type: 'textarea' as const, required: true },
  { key: 'lat', label: 'Latitud', type: 'number' as const, required: true },
  { key: 'lng', label: 'Longitud', type: 'number' as const, required: true },
  { 
    key: 'category', 
    label: 'Kategori', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'trading_post', label: 'Handelsplats' },
      { value: 'settlement', label: 'Bosättning' },
      { value: 'fortress', label: 'Fästning' },
      { value: 'religious_center', label: 'Religiös plats' },
      { value: 'political_center', label: 'Politiskt centrum' },
      { value: 'exploration', label: 'Utforskning' },
      { value: 'archaeological_site', label: 'Arkeologisk plats' }
    ]
  },
  { 
    key: 'country', 
    label: 'Land', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'Sweden', label: 'Sverige' },
      { value: 'Denmark', label: 'Danmark' },
      { value: 'Norway', label: 'Norge' },
      { value: 'Finland', label: 'Finland' },
      { value: 'Iceland', label: 'Island' }
    ]
  },
  { key: 'period_start', label: 'Period start (år)', type: 'number' as const, required: true },
  { key: 'period_end', label: 'Period slut (år)', type: 'number' as const, required: true }
];
