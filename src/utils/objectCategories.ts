
export interface ObjectCategory {
  id: string;
  name: string;
  items: string[];
}

export const OBJECT_CATEGORIES: ObjectCategory[] = [
  {
    id: 'memorial-stones',
    name: 'Memorial Stones',
    items: [
      'runsten', 'runestone', 'gravsten', 'gravestone', 'grave stone',
      'bildsten', 'picture stone', 'standing stone', 'memorial marker',
      'minnessten', 'bautasten'
    ]
  },
  {
    id: 'religious-ritual',
    name: 'Religious & Ritual Items',
    items: [
      'altare', 'altar', 'dopfunt', 'baptismal font', 'brakteat', 'bracteate',
      'amulett', 'amulet', 'church artifact', 'kyrkoföremål', 'ritual object'
    ]
  },
  {
    id: 'weapons-tools',
    name: 'Weapons & Tools',
    items: [
      'svärd', 'sword', 'kniv', 'knife', 'yxa', 'axe', 'spjutspets', 'spear point',
      'pilspets', 'arrow head', 'verktyg', 'tool', 'vapen', 'weapon'
    ]
  },
  {
    id: 'jewelry-personal',
    name: 'Jewelry & Personal Items',
    items: [
      'fingerring', 'finger ring', 'armring', 'arm ring', 'halsring', 'neck ring',
      'fibula', 'brooch', 'spänne', 'clasp', 'hänge', 'pendant', 'pärla', 'bead',
      'smycke', 'jewelry'
    ]
  },
  {
    id: 'currency-trade',
    name: 'Currency & Trade Objects',
    items: [
      'solidus', 'denar', 'denarii', 'penning', 'penny', 'mynt', 'coin',
      'vikt', 'weight', 'handelsobjekt', 'trade object', 'importerat', 'imported'
    ]
  },
  {
    id: 'household',
    name: 'Household Items',
    items: [
      'kruka', 'pot', 'kärl', 'vessel', 'kokkärl', 'cooking pot', 'skål', 'bowl',
      'behållare', 'container', 'hushållsföremål'
    ]
  },
  {
    id: 'structural',
    name: 'Structural Elements',
    items: [
      'dörrpost', 'door post', 'portal', 'arkitektoniskt element', 'architectural element',
      'byggnadselement', 'building stone', 'byggnadssten'
    ]
  },
  {
    id: 'other',
    name: 'Other',
    items: [
      'annat', 'other', 'oklassificerat', 'unclassified', 'fragmentariskt', 'fragmentary',
      'ovanligt', 'rare', 'övrigt'
    ]
  }
];

export const getCategoryForObjectType = (objectType: string): ObjectCategory | null => {
  if (!objectType) return null;
  
  const lowerObjectType = objectType.toLowerCase();
  
  for (const category of OBJECT_CATEGORIES) {
    if (category.items.some(item => 
      lowerObjectType.includes(item.toLowerCase()) || 
      item.toLowerCase().includes(lowerObjectType)
    )) {
      return category;
    }
  }
  
  return OBJECT_CATEGORIES.find(cat => cat.id === 'other') || null;
};

export const getObjectCategoryOptions = () => {
  return [
    { value: 'all', label: 'All Object Types' },
    ...OBJECT_CATEGORIES.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];
};
