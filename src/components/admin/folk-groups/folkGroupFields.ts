import { z } from 'zod';

export const folkGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Namnet måste vara minst 2 tecken." }),
  name_en: z.string().min(2, { message: "Engelska namnet måste vara minst 2 tecken." }),
  main_category: z.enum(['germanic', 'celtic', 'slavic', 'finno_ugric', 'italic', 'thracian', 'illyrian'], {
    required_error: "Du måste välja en huvudkategori.",
  }),
  sub_category: z.string().min(2, { message: "Subkategorin måste vara minst 2 tecken." }),
  language_family: z.string().optional(),
  language_subfamily: z.string().optional(),
  active_period_start: z.number().min(-5000, { message: "Startdatum måste vara ett giltigt årtal." }).max(2024, { message: "Startdatum kan inte vara i framtiden." }),
  active_period_end: z.number().min(-5000, { message: "Slutdatum måste vara ett giltigt årtal." }).max(2024, { message: "Slutdatum kan inte vara i framtiden." }),
  description: z.string().min(10, { message: "Beskrivningen måste vara minst 10 tecken." }),
  description_en: z.string().min(10, { message: "Engelska beskrivningen måste vara minst 10 tecken." }),
  historical_significance: z.string().optional(),
  lat: z.string().refine(value => {
    if (!value) return true; // Allow empty values
    const num = Number(value);
    return !isNaN(num) && num >= -90 && num <= 90;
  }, {
    message: "Latitud måste vara ett nummer mellan -90 och 90.",
  }).optional(),
  lng: z.string().refine(value => {
    if (!value) return true; // Allow empty values
    const num = Number(value);
    return !isNaN(num) && num >= -180 && num <= 180;
  }, {
    message: "Longitud måste vara ett nummer mellan -180 och 180.",
  }).optional(),
  dna_profile_text: z.string().optional(),
});

export const folkGroupFields = [
  { name: 'name', label: 'Namn (Svenska)', type: 'text' },
  { name: 'name_en', label: 'Namn (Engelska)', type: 'text' },
  {
    name: 'main_category', label: 'Huvudkategori', type: 'select', options: [
      { value: 'germanic', label: 'Germansk' },
      { value: 'celtic', label: 'Keltisk' },
      { value: 'slavic', label: 'Slavisk' },
      { value: 'finno_ugric', label: 'Finsk-Ugrisk' },
      { value: 'italic', label: 'Italisk' },
      { value: 'thracian', label: 'Thrakisk' },
      { value: 'illyrian', label: 'Illyrisk' },
    ]
  },
  { name: 'sub_category', label: 'Underkategori', type: 'text' },
  { name: 'language_family', label: 'Språkfamilj', type: 'text' },
  { name: 'language_subfamily', label: 'Språk Underfamilj', type: 'text' },
  { name: 'active_period_start', label: 'Aktiv Period Start', type: 'number' },
  { name: 'active_period_end', label: 'Aktiv Period Slut', type: 'number' },
  { name: 'description', label: 'Beskrivning (Svenska)', type: 'textarea' },
  { name: 'description_en', label: 'Beskrivning (Engelska)', type: 'textarea' },
  { name: 'historical_significance', label: 'Historisk Betydelse', type: 'textarea' },
  { name: 'lat', label: 'Latitud', type: 'text' },
  { name: 'lng', label: 'Longitud', type: 'text' },
  { name: 'dna_profile_text', label: 'DNA Profil (JSON)', type: 'textarea' },
];

export const categories = [
  { id: 'germanic', name: 'Germanska' },
  { id: 'celtic', name: 'Keltiska' },
  { id: 'slavic', name: 'Slaviska' },
  { id: 'finno_ugric', name: 'Finno-ugriska' },
  { id: 'italic', name: 'Italiska' },
  { id: 'thracian', name: 'Thrakiska' },
  { id: 'illyrian', name: 'Illyriska' }
];

export const categoryColors = {
  germanic: 'bg-blue-100 text-blue-800',
  celtic: 'bg-green-100 text-green-800',
  slavic: 'bg-purple-100 text-purple-800',
  finno_ugric: 'bg-orange-100 text-orange-800',
  italic: 'bg-red-100 text-red-800',
  thracian: 'bg-yellow-100 text-yellow-800',
  illyrian: 'bg-pink-100 text-pink-800'
};
