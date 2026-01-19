
import { HairColor, HairColorRegion, HairColorGenetics } from '../types';

export const hairColorData: HairColor[] = [
  {
    id: '1',
    color_name: 'Blont hår',
    color_name_en: 'Blonde hair',
    global_frequency_percent: 2,
    scandinavian_frequency_percent: 45,
    rarity_rank: 1,
    genetic_complexity: 'very_complex',
    main_genes: ['HERC2', 'OCA2', 'KITLG', 'SLC45A2', 'IRF4', 'TPCN2', 'SLC24A4', 'MC1R'],
    key_markers: ['rs12913832', 'rs12821256', 'rs16891982', 'rs1393350'],
    evolutionary_advantage: 'Anpassning till låg UV-strålning, vitamin D-optimering i nordliga breddgrader',
    historical_origin: 'Skandinaviska jägare-samlare (SHG), 8000-4000 f.Kr.',
    population_distribution: 'Högst frekvens i Skandinavien, Baltikum, norra Tyskland',
    pigmentation_level: 'very_low',
    uv_adaptation: 'high_latitude',
    research_confidence: 'very_high'
  },
  {
    id: '2',
    color_name: 'Ljusbrunt hår',
    color_name_en: 'Light brown hair',
    global_frequency_percent: 15,
    scandinavian_frequency_percent: 35,
    rarity_rank: 2,
    genetic_complexity: 'complex',
    main_genes: ['HERC2', 'OCA2', 'TYR', 'TYRP1', 'SLC45A2'],
    key_markers: ['rs12913832', 'rs1800407', 'rs1042602'],
    evolutionary_advantage: 'Balans mellan UV-skydd och vitamin D-produktion',
    historical_origin: 'Blandning mellan SHG och WHG populationer',
    population_distribution: 'Vanligt i norra och centrala Europa',
    pigmentation_level: 'low_medium',
    uv_adaptation: 'moderate_latitude',
    research_confidence: 'high'
  },
  {
    id: '3',
    color_name: 'Mörkt hår',
    color_name_en: 'Dark hair',
    global_frequency_percent: 75,
    scandinavian_frequency_percent: 15,
    rarity_rank: 4,
    genetic_complexity: 'moderate',
    main_genes: ['TYR', 'TYRP1', 'ASIP', 'MC1R'],
    key_markers: ['rs1042602', 'rs1126809', 'rs885479'],
    evolutionary_advantage: 'UV-skydd, melanin-produktion',
    historical_origin: 'Ursprunglig mänsklig fenotyp, bibehållen i de flesta populationer',
    population_distribution: 'Dominant globalt, mindre vanligt i Skandinavien',
    pigmentation_level: 'high',
    uv_adaptation: 'low_latitude',
    research_confidence: 'very_high'
  },
  {
    id: '4',
    color_name: 'Rött hår',
    color_name_en: 'Red hair',
    global_frequency_percent: 1,
    scandinavian_frequency_percent: 2,
    rarity_rank: 0,
    genetic_complexity: 'simple',
    main_genes: ['MC1R'],
    key_markers: ['rs1805007', 'rs1805008', 'rs11547464', 'rs885479'],
    evolutionary_advantage: 'Möjlig anpassning till låg ljusmiljö, vitamin D-syntes',
    historical_origin: 'Mutation i MC1R-genen, spridd i västra Europa',
    population_distribution: 'Högst i Irland, Skottland, Wales, låg i Skandinavien',
    pigmentation_level: 'unique',
    uv_adaptation: 'very_high_latitude',
    research_confidence: 'very_high'
  }
];

export const hairColorRegions: HairColorRegion[] = [
  {
    id: '1',
    hair_color_id: '1',
    region_name: 'Skandinavien',
    country: 'Sverige, Norge, Danmark',
    frequency_percent: 45,
    genetic_significance: 'Ursprungsregion för blont hår-mutationer',
    population_notes: 'Högsta globala frekvensen, arv från SHG',
    historical_period: 'Mesolitikum-nutid'
  },
  {
    id: '2',
    hair_color_id: '1',
    region_name: 'Baltikum',
    country: 'Litauen, Lettland, Estland',
    frequency_percent: 35,
    genetic_significance: 'Stark koppling till skandinavisk genetik',
    population_notes: 'Hög frekvens genom migration och genflöde',
    historical_period: 'Bronsålder-nutid'
  },
  {
    id: '3',
    hair_color_id: '1',
    region_name: 'Norra Tyskland',
    country: 'Tyskland',
    frequency_percent: 25,
    genetic_significance: 'Södra gräns för hög blond frekvens',
    population_notes: 'Gradvis minskning söderut',
    historical_period: 'Järnålder-nutid'
  },
  {
    id: '4',
    hair_color_id: '4',
    region_name: 'Skottska högländerna',
    country: 'Skottland',
    frequency_percent: 13,
    genetic_significance: 'Högsta globala frekvensen av rött hår',
    population_notes: 'Isolerad population med stark genetisk drift',
    historical_period: 'Keltisk period-nutid'
  }
];

export const hairColorGenetics: HairColorGenetics[] = [
  {
    id: '1',
    hair_color_id: '1',
    gene_name: 'HERC2',
    marker_id: 'rs12913832',
    chromosome: '15',
    effect_size: 0.85,
    population_frequency: 0.78,
    discovery_study: 'GWAS UK Biobank 2018',
    functional_impact: 'Reglerar OCA2-expression, stark effekt på pigmentering',
    interaction_genes: ['OCA2']
  },
  {
    id: '2',
    hair_color_id: '1',
    gene_name: 'KITLG',
    marker_id: 'rs12821256',
    chromosome: '12',
    effect_size: 0.42,
    population_frequency: 0.65,
    discovery_study: 'Nature Communications 2018',
    functional_impact: 'Melanocyt-utveckling och migration',
    interaction_genes: ['KIT']
  },
  {
    id: '3',
    hair_color_id: '1',
    gene_name: 'SLC45A2',
    marker_id: 'rs16891982',
    chromosome: '5',
    effect_size: 0.38,
    population_frequency: 0.45,
    discovery_study: 'European pigmentation studies',
    functional_impact: 'Melanin-transport i melanosomer',
    interaction_genes: ['TYR', 'TYRP1']
  },
  {
    id: '4',
    hair_color_id: '4',
    gene_name: 'MC1R',
    marker_id: 'rs1805007',
    chromosome: '16',
    effect_size: 0.95,
    population_frequency: 0.02,
    discovery_study: 'Multiple population studies',
    functional_impact: 'Huvudgen för rött hår, loss-of-function mutation',
    interaction_genes: []
  }
];
