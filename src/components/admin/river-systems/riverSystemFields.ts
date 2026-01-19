
export const riverSystemFields = [
  { key: 'name', label: 'Namn (svenska)', type: 'text' as const, required: true },
  { key: 'nameEn', label: 'Namn (engelska)', type: 'text' as const, required: true },
  { key: 'description', label: 'Beskrivning', type: 'textarea' as const, required: true },
  { key: 'historicalSignificance', label: 'Historisk betydelse', type: 'textarea' as const },
  { 
    key: 'importance', 
    label: 'Viktighet', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'primary', label: 'Primär' },
      { value: 'secondary', label: 'Sekundär' },
      { value: 'local', label: 'Lokal' }
    ].filter(option => option.value && option.value.trim() !== '' && option.label && option.label.trim() !== '')
  },
  { 
    key: 'type', 
    label: 'Typ', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'main_artery', label: 'Huvudartär' },
      { value: 'tributary', label: 'Biflöde' },
      { value: 'coastal_route', label: 'Kustväg' }
    ].filter(option => option.value && option.value.trim() !== '' && option.label && option.label.trim() !== '')
  }
];
