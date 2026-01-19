
export interface StagingInscription {
  id: string;
  original_signum: string;
  source_database: string;
  transliteration?: string;
  translation_en?: string;
  location?: string;
  coordinates?: string;
  dating_text?: string;
  object_type?: string;
  conflict_reasons: string[];
  raw_data: any;
  status: 'pending' | 'approved' | 'rejected';
  expert_notes?: string;
  created_at: string;
}

export interface StagingStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}
