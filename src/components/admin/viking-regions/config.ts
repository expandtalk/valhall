
export const categories = [
  { id: 'all', name: 'Alla kategorier' },
  { id: 'nordic', name: 'Nordiska' },
  { id: 'germanic', name: 'Germanska' },
  { id: 'slavic', name: 'Slaviska' },
  { id: 'celtic', name: 'Keltiska' },
  { id: 'baltic', name: 'Baltiska' },
  { id: 'christian', name: 'Kristna' },
  { id: 'discoveries', name: 'Upptäckter' },
  { id: 'other', name: 'Övriga' }
];

export const periods = [
  { id: 'all', name: 'Alla perioder' },
  { id: 'early_viking', name: 'Tidig vikingatid (790-900)' },
  { id: 'middle_viking', name: 'Medelvikingatid (900-1000)' },
  { id: 'late_viking', name: 'Sen vikingatid (1000-1100)' },
  { id: 'all_viking', name: 'Hela vikingatiden' }
];

export const categoryColors: Record<string, string> = {
  'nordic': 'bg-blue-100 text-blue-800',
  'germanic': 'bg-green-100 text-green-800',
  'slavic': 'bg-orange-100 text-orange-800',
  'celtic': 'bg-emerald-100 text-emerald-800',
  'baltic': 'bg-cyan-100 text-cyan-800',
  'christian': 'bg-purple-100 text-purple-800',
  'discoveries': 'bg-amber-100 text-amber-800',
  'other': 'bg-gray-100 text-gray-800'
};

export const vikingRegionFields = [
  { key: 'vikingName', label: 'Vikingnamn', type: 'text' as const, required: true },
  { key: 'modernName', label: 'Modernt namn', type: 'text' as const, required: true },
  { key: 'description', label: 'Beskrivning', type: 'textarea' as const, required: true },
  { key: 'lat', label: 'Latitud', type: 'number' as const, required: true },
  { key: 'lng', label: 'Longitud', type: 'number' as const, required: true },
  { 
    key: 'category', 
    label: 'Kategori', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'nordic', label: 'Nordiska' },
      { value: 'germanic', label: 'Germanska' },
      { value: 'slavic', label: 'Slaviska' },
      { value: 'celtic', label: 'Keltiska' },
      { value: 'baltic', label: 'Baltiska' },
      { value: 'christian', label: 'Kristna' },
      { value: 'discoveries', label: 'Upptäckter' },
      { value: 'other', label: 'Övriga' }
    ]
  },
  { 
    key: 'timeperiod', 
    label: 'Tidsperiod', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'early_viking', label: 'Tidig vikingatid (790-900)' },
      { value: 'middle_viking', label: 'Medelvikingatid (900-1000)' },
      { value: 'late_viking', label: 'Sen vikingatid (1000-1100)' },
      { value: 'all_viking', label: 'Hela vikingatiden' }
    ]
  },
  { key: 'type', label: 'Typ', type: 'text' as const }
];
