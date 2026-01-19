export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      additional_coordinates: {
        Row: {
          confidence: string | null
          created_at: string | null
          id: number
          inscription_id: string | null
          latitude: number
          longitude: number
          notes: string | null
          signum: string
          source: string | null
        }
        Insert: {
          confidence?: string | null
          created_at?: string | null
          id?: number
          inscription_id?: string | null
          latitude: number
          longitude: number
          notes?: string | null
          signum: string
          source?: string | null
        }
        Update: {
          confidence?: string | null
          created_at?: string | null
          id?: number
          inscription_id?: string | null
          latitude?: number
          longitude?: number
          notes?: string | null
          signum?: string
          source?: string | null
        }
        Relationships: []
      }
      admixture_analysis: {
        Row: {
          analysis_date: string | null
          analysis_type: string | null
          ceu_ancestry: number | null
          chb_ancestry: number | null
          created_at: string | null
          depth_coverage: number | null
          id: string
          individual_id: string | null
          itu_ancestry: number | null
          notes: string | null
          pel_ancestry: number | null
          variants_used: number | null
          yri_ancestry: number | null
        }
        Insert: {
          analysis_date?: string | null
          analysis_type?: string | null
          ceu_ancestry?: number | null
          chb_ancestry?: number | null
          created_at?: string | null
          depth_coverage?: number | null
          id?: string
          individual_id?: string | null
          itu_ancestry?: number | null
          notes?: string | null
          pel_ancestry?: number | null
          variants_used?: number | null
          yri_ancestry?: number | null
        }
        Update: {
          analysis_date?: string | null
          analysis_type?: string | null
          ceu_ancestry?: number | null
          chb_ancestry?: number | null
          created_at?: string | null
          depth_coverage?: number | null
          id?: string
          individual_id?: string | null
          itu_ancestry?: number | null
          notes?: string | null
          pel_ancestry?: number | null
          variants_used?: number | null
          yri_ancestry?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admixture_analysis_individual_id_fkey"
            columns: ["individual_id"]
            isOneToOne: false
            referencedRelation: "genetic_individuals"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_analyses: {
        Row: {
          analysis_type: string
          confidence: number
          created_at: string | null
          explanation: string | null
          id: string
          inscription_id: string | null
          linguistic_features: Json | null
          model_name: string
          model_version: string | null
          prediction: Json
          processing_time_ms: number | null
        }
        Insert: {
          analysis_type: string
          confidence: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          inscription_id?: string | null
          linguistic_features?: Json | null
          model_name: string
          model_version?: string | null
          prediction: Json
          processing_time_ms?: number | null
        }
        Update: {
          analysis_type?: string
          confidence?: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          inscription_id?: string | null
          linguistic_features?: Json | null
          model_name?: string
          model_version?: string | null
          prediction?: Json
          processing_time_ms?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_analyses_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_analyses_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
        ]
      }
      aliases_canonical: {
        Row: {
          alias_signum1: string
          alias_signum2: string
          alias_signumid: string
          created_at: string | null
          id: string
          signum1: string
          signum2: string
          signumid: string
          updated_at: string | null
        }
        Insert: {
          alias_signum1: string
          alias_signum2: string
          alias_signumid: string
          created_at?: string | null
          id?: string
          signum1: string
          signum2: string
          signumid: string
          updated_at?: string | null
        }
        Update: {
          alias_signum1?: string
          alias_signum2?: string
          alias_signumid?: string
          created_at?: string | null
          id?: string
          signum1?: string
          signum2?: string
          signumid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      alts_canonical: {
        Row: {
          alt_signum1: string
          alt_signum2: string
          alt_signumid: string
          created_at: string | null
          id: string
          signum1: string
          signum2: string
          signumid: string
          updated_at: string | null
        }
        Insert: {
          alt_signum1: string
          alt_signum2: string
          alt_signumid: string
          created_at?: string | null
          id?: string
          signum1: string
          signum2: string
          signumid: string
          updated_at?: string | null
        }
        Update: {
          alt_signum1?: string
          alt_signum2?: string
          alt_signumid?: string
          created_at?: string | null
          id?: string
          signum1?: string
          signum2?: string
          signumid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      archaeological_sites: {
        Row: {
          burial_type: string | null
          coordinates: unknown | null
          country: string
          county: string | null
          created_at: string | null
          dating: string | null
          description: string | null
          id: string
          location: string
          name: string
          parish: string | null
          period: string
          updated_at: string | null
        }
        Insert: {
          burial_type?: string | null
          coordinates?: unknown | null
          country: string
          county?: string | null
          created_at?: string | null
          dating?: string | null
          description?: string | null
          id?: string
          location: string
          name: string
          parish?: string | null
          period: string
          updated_at?: string | null
        }
        Update: {
          burial_type?: string | null
          coordinates?: unknown | null
          country?: string
          county?: string | null
          created_at?: string | null
          dating?: string | null
          description?: string | null
          id?: string
          location?: string
          name?: string
          parish?: string | null
          period?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      artefacts: {
        Row: {
          artefact: string
          artefactid: string
          created_at: string | null
          lang: string
          updated_at: string | null
        }
        Insert: {
          artefact: string
          artefactid: string
          created_at?: string | null
          lang?: string
          updated_at?: string | null
        }
        Update: {
          artefact?: string
          artefactid?: string
          created_at?: string | null
          lang?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audio_files: {
        Row: {
          avatar_image_id: string | null
          bit_rate: number | null
          channels: number | null
          content_id: string | null
          content_type: string
          content_type_category: string
          created_at: string
          created_by: string | null
          description: string | null
          description_en: string | null
          duration_seconds: number | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          language_code: string | null
          narrator: string | null
          original_filename: string
          production_date: string | null
          sample_rate: number | null
          status: string | null
          thumbnail_image_id: string | null
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          avatar_image_id?: string | null
          bit_rate?: number | null
          channels?: number | null
          content_id?: string | null
          content_type: string
          content_type_category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          description_en?: string | null
          duration_seconds?: number | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          language_code?: string | null
          narrator?: string | null
          original_filename: string
          production_date?: string | null
          sample_rate?: number | null
          status?: string | null
          thumbnail_image_id?: string | null
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          avatar_image_id?: string | null
          bit_rate?: number | null
          channels?: number | null
          content_id?: string | null
          content_type?: string
          content_type_category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          description_en?: string | null
          duration_seconds?: number | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          language_code?: string | null
          narrator?: string | null
          original_filename?: string
          production_date?: string | null
          sample_rate?: number | null
          status?: string | null
          thumbnail_image_id?: string | null
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audio_files_avatar_image_id_fkey"
            columns: ["avatar_image_id"]
            isOneToOne: false
            referencedRelation: "media_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audio_files_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "media_images"
            referencedColumns: ["id"]
          },
        ]
      }
      bracteatetypes: {
        Row: {
          bracteatetype: string
          bracteatetypeid: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          bracteatetype: string
          bracteatetypeid: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          bracteatetype?: string
          bracteatetypeid?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      carver_inscription: {
        Row: {
          attribution: Database["public"]["Enums"]["attribution_type"]
          carverid: string
          carverinscriptionid: string
          certainty: boolean
          created_at: string | null
          inscriptionid: string
          lang: string
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          attribution?: Database["public"]["Enums"]["attribution_type"]
          carverid: string
          carverinscriptionid: string
          certainty?: boolean
          created_at?: string | null
          inscriptionid: string
          lang?: string
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          attribution?: Database["public"]["Enums"]["attribution_type"]
          carverid?: string
          carverinscriptionid?: string
          certainty?: boolean
          created_at?: string | null
          inscriptionid?: string
          lang?: string
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      carver_source: {
        Row: {
          carverinscriptionid: string
          created_at: string
          sourceid: string
          updated_at: string
        }
        Insert: {
          carverinscriptionid: string
          created_at?: string
          sourceid: string
          updated_at?: string
        }
        Update: {
          carverinscriptionid?: string
          created_at?: string
          sourceid?: string
          updated_at?: string
        }
        Relationships: []
      }
      carvers: {
        Row: {
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          language_code: string
          name: string
          period_active_end: number | null
          period_active_start: number | null
          region: string | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language_code?: string
          name: string
          period_active_end?: number | null
          period_active_start?: number | null
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language_code?: string
          name?: string
          period_active_end?: number | null
          period_active_start?: number | null
          region?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      christian_sites: {
        Row: {
          coordinates: unknown
          county: string | null
          created_at: string | null
          current_condition: string | null
          description: string | null
          description_en: string | null
          dissolved_year: number | null
          founded_year: number | null
          historical_notes: string | null
          id: string
          name: string
          name_en: string | null
          period: string
          province: string | null
          region: string | null
          religious_order: string | null
          significance_level: string | null
          site_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          coordinates: unknown
          county?: string | null
          created_at?: string | null
          current_condition?: string | null
          description?: string | null
          description_en?: string | null
          dissolved_year?: number | null
          founded_year?: number | null
          historical_notes?: string | null
          id?: string
          name: string
          name_en?: string | null
          period: string
          province?: string | null
          region?: string | null
          religious_order?: string | null
          significance_level?: string | null
          site_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          coordinates?: unknown
          county?: string | null
          created_at?: string | null
          current_condition?: string | null
          description?: string | null
          description_en?: string | null
          dissolved_year?: number | null
          founded_year?: number | null
          historical_notes?: string | null
          id?: string
          name?: string
          name_en?: string | null
          period?: string
          province?: string | null
          region?: string | null
          religious_order?: string | null
          significance_level?: string | null
          site_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      coordinates: {
        Row: {
          coordinate_id: string
          created_at: string
          current_flag: number
          id: string
          latitude: number
          longitude: number
          object_id: string
          point_coordinates: unknown | null
          updated_at: string
        }
        Insert: {
          coordinate_id: string
          created_at?: string
          current_flag?: number
          id?: string
          latitude: number
          longitude: number
          object_id: string
          point_coordinates?: unknown | null
          updated_at?: string
        }
        Update: {
          coordinate_id?: string
          created_at?: string
          current_flag?: number
          id?: string
          latitude?: number
          longitude?: number
          object_id?: string
          point_coordinates?: unknown | null
          updated_at?: string
        }
        Relationships: []
      }
      counties: {
        Row: {
          countryid: string
          county: string
          countyid: string
          created_at: string
          id: string
          letter: string | null
          number: string | null
          updated_at: string
        }
        Insert: {
          countryid: string
          county: string
          countyid: string
          created_at?: string
          id?: string
          letter?: string | null
          number?: string | null
          updated_at?: string
        }
        Update: {
          countryid?: string
          county?: string
          countyid?: string
          created_at?: string
          id?: string
          letter?: string | null
          number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "county_country"
            columns: ["countryid"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["countryid"]
          },
        ]
      }
      countries: {
        Row: {
          country: string
          countryid: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          country: string
          countryid: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          country?: string
          countryid?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      cross_crossform: {
        Row: {
          certainty: boolean
          created_at: string
          crosscrossformid: string
          crossformid: string
          crossid: string
          updated_at: string
        }
        Insert: {
          certainty?: boolean
          created_at?: string
          crosscrossformid?: string
          crossformid: string
          crossid: string
          updated_at?: string
        }
        Update: {
          certainty?: boolean
          created_at?: string
          crosscrossformid?: string
          crossformid?: string
          crossid?: string
          updated_at?: string
        }
        Relationships: []
      }
      crossdescs: {
        Row: {
          created_at: string
          crossdesc: string
          id: string
          lang: string
          objectid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          crossdesc: string
          id?: string
          lang?: string
          objectid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          crossdesc?: string
          id?: string
          lang?: string
          objectid?: string
          updated_at?: string
        }
        Relationships: []
      }
      crosses: {
        Row: {
          created_at: string
          cross_number: number
          crossid: string
          objectid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cross_number: number
          crossid?: string
          objectid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cross_number?: number
          crossid?: string
          objectid?: string
          updated_at?: string
        }
        Relationships: []
      }
      crossforms: {
        Row: {
          aspect: string
          created_at: string
          crossformid: string
          form: number
          updated_at: string
        }
        Insert: {
          aspect: string
          created_at?: string
          crossformid?: string
          form: number
          updated_at?: string
        }
        Update: {
          aspect?: string
          created_at?: string
          crossformid?: string
          form?: number
          updated_at?: string
        }
        Relationships: []
      }
      danish_parishes: {
        Row: {
          created_at: string
          external_id: string
          fofm_parish: string | null
          id: string
          locality: number | null
          parish_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: string
          fofm_parish?: string | null
          id?: string
          locality?: number | null
          parish_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string
          fofm_parish?: string | null
          id?: string
          locality?: number | null
          parish_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      dating: {
        Row: {
          created_at: string
          dating: string
          datingid: string
          lang: string
          objectid: string
          parsed_period: string | null
          parsing_confidence: number | null
          parsing_notes: string | null
          period_end: number | null
          period_start: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dating: string
          datingid?: string
          lang?: string
          objectid: string
          parsed_period?: string | null
          parsing_confidence?: number | null
          parsing_notes?: string | null
          period_end?: number | null
          period_start?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dating?: string
          datingid?: string
          lang?: string
          objectid?: string
          parsed_period?: string | null
          parsing_confidence?: number | null
          parsing_notes?: string | null
          period_end?: number | null
          period_start?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      dating_source: {
        Row: {
          created_at: string
          dating_id: string
          id: string
          source_id: string
        }
        Insert: {
          created_at?: string
          dating_id: string
          id?: string
          source_id: string
        }
        Update: {
          created_at?: string
          dating_id?: string
          id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dating_source_dating_id_fkey"
            columns: ["dating_id"]
            isOneToOne: false
            referencedRelation: "dating"
            referencedColumns: ["datingid"]
          },
        ]
      }
      eye_color_genetics: {
        Row: {
          allele_variants: string[] | null
          created_at: string
          discovery_date: string | null
          eye_color_id: string | null
          gene_function: string | null
          gene_name: string
          id: string
          mutation_type: string | null
          research_notes: string | null
        }
        Insert: {
          allele_variants?: string[] | null
          created_at?: string
          discovery_date?: string | null
          eye_color_id?: string | null
          gene_function?: string | null
          gene_name: string
          id?: string
          mutation_type?: string | null
          research_notes?: string | null
        }
        Update: {
          allele_variants?: string[] | null
          created_at?: string
          discovery_date?: string | null
          eye_color_id?: string | null
          gene_function?: string | null
          gene_name?: string
          id?: string
          mutation_type?: string | null
          research_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eye_color_genetics_eye_color_id_fkey"
            columns: ["eye_color_id"]
            isOneToOne: false
            referencedRelation: "eye_colors"
            referencedColumns: ["id"]
          },
        ]
      }
      eye_color_regions: {
        Row: {
          country: string | null
          created_at: string
          eye_color_id: string | null
          frequency_percent: number
          genetic_significance: string | null
          id: string
          population_notes: string | null
          region_name: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          eye_color_id?: string | null
          frequency_percent: number
          genetic_significance?: string | null
          id?: string
          population_notes?: string | null
          region_name: string
        }
        Update: {
          country?: string | null
          created_at?: string
          eye_color_id?: string | null
          frequency_percent?: number
          genetic_significance?: string | null
          id?: string
          population_notes?: string | null
          region_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "eye_color_regions_eye_color_id_fkey"
            columns: ["eye_color_id"]
            isOneToOne: false
            referencedRelation: "eye_colors"
            referencedColumns: ["id"]
          },
        ]
      }
      eye_colors: {
        Row: {
          color_name: string
          color_name_en: string
          created_at: string
          cultural_associations: string | null
          evolutionary_advantage: string | null
          genetic_complexity: string
          global_frequency_percent: number
          health_protection_level: string | null
          historical_origin: string | null
          id: string
          light_sensitivity_level: string | null
          main_genes: string[] | null
          rarity_rank: number
          updated_at: string
        }
        Insert: {
          color_name: string
          color_name_en: string
          created_at?: string
          cultural_associations?: string | null
          evolutionary_advantage?: string | null
          genetic_complexity: string
          global_frequency_percent: number
          health_protection_level?: string | null
          historical_origin?: string | null
          id?: string
          light_sensitivity_level?: string | null
          main_genes?: string[] | null
          rarity_rank: number
          updated_at?: string
        }
        Update: {
          color_name?: string
          color_name_en?: string
          created_at?: string
          cultural_associations?: string | null
          evolutionary_advantage?: string | null
          genetic_complexity?: string
          global_frequency_percent?: number
          health_protection_level?: string | null
          historical_origin?: string | null
          id?: string
          light_sensitivity_level?: string | null
          main_genes?: string[] | null
          rarity_rank?: number
          updated_at?: string
        }
        Relationships: []
      }
      findnumbers: {
        Row: {
          created_at: string
          findnumber: string
          objectid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          findnumber: string
          objectid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          findnumber?: string
          objectid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_object"
            columns: ["objectid"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["objectid"]
          },
        ]
      }
      folk_group_cities: {
        Row: {
          city_id: string | null
          created_at: string | null
          folk_group_id: string | null
          id: string
          notes: string | null
          period_end: number | null
          period_start: number | null
          relationship_type: string | null
          significance_level: string | null
        }
        Insert: {
          city_id?: string | null
          created_at?: string | null
          folk_group_id?: string | null
          id?: string
          notes?: string | null
          period_end?: number | null
          period_start?: number | null
          relationship_type?: string | null
          significance_level?: string | null
        }
        Update: {
          city_id?: string | null
          created_at?: string | null
          folk_group_id?: string | null
          id?: string
          notes?: string | null
          period_end?: number | null
          period_start?: number | null
          relationship_type?: string | null
          significance_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folk_group_cities_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "viking_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folk_group_cities_folk_group_id_fkey"
            columns: ["folk_group_id"]
            isOneToOne: false
            referencedRelation: "folk_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      folk_groups: {
        Row: {
          active_period_end: number | null
          active_period_start: number | null
          coordinates: unknown | null
          created_at: string | null
          description: string | null
          description_en: string | null
          dna_profile: Json | null
          historical_significance: string | null
          id: string
          language_family: string | null
          language_subfamily: string | null
          main_category: Database["public"]["Enums"]["folk_group_category"]
          name: string
          name_en: string
          sub_category: string
          updated_at: string | null
        }
        Insert: {
          active_period_end?: number | null
          active_period_start?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          dna_profile?: Json | null
          historical_significance?: string | null
          id?: string
          language_family?: string | null
          language_subfamily?: string | null
          main_category: Database["public"]["Enums"]["folk_group_category"]
          name: string
          name_en: string
          sub_category: string
          updated_at?: string | null
        }
        Update: {
          active_period_end?: number | null
          active_period_start?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          dna_profile?: Json | null
          historical_significance?: string | null
          id?: string
          language_family?: string | null
          language_subfamily?: string | null
          main_category?: Database["public"]["Enums"]["folk_group_category"]
          name?: string
          name_en?: string
          sub_category?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fragments: {
        Row: {
          belongsto: string
          created_at: string
          objectid: string
          updated_at: string
        }
        Insert: {
          belongsto: string
          created_at?: string
          objectid: string
          updated_at?: string
        }
        Update: {
          belongsto?: string
          created_at?: string
          objectid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "belongs_object"
            columns: ["belongsto"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["objectid"]
          },
          {
            foreignKeyName: "fragment_object"
            columns: ["objectid"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["objectid"]
          },
        ]
      }
      genetic_individuals: {
        Row: {
          age: string | null
          ancestry: Json | null
          archaeological_sex: string | null
          burial_context: string | null
          created_at: string | null
          genetic_sex: string | null
          grave_goods: string[] | null
          grave_number: string | null
          id: string
          isotopes: Json | null
          mt_haplogroup: string | null
          museums_inventory: string | null
          radiocarbon: string | null
          sample_id: string
          site_id: string | null
          updated_at: string | null
          y_haplogroup: string | null
        }
        Insert: {
          age?: string | null
          ancestry?: Json | null
          archaeological_sex?: string | null
          burial_context?: string | null
          created_at?: string | null
          genetic_sex?: string | null
          grave_goods?: string[] | null
          grave_number?: string | null
          id?: string
          isotopes?: Json | null
          mt_haplogroup?: string | null
          museums_inventory?: string | null
          radiocarbon?: string | null
          sample_id: string
          site_id?: string | null
          updated_at?: string | null
          y_haplogroup?: string | null
        }
        Update: {
          age?: string | null
          ancestry?: Json | null
          archaeological_sex?: string | null
          burial_context?: string | null
          created_at?: string | null
          genetic_sex?: string | null
          grave_goods?: string[] | null
          grave_number?: string | null
          id?: string
          isotopes?: Json | null
          mt_haplogroup?: string | null
          museums_inventory?: string | null
          radiocarbon?: string | null
          sample_id?: string
          site_id?: string | null
          updated_at?: string | null
          y_haplogroup?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "genetic_individuals_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "archaeological_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      genetic_markers: {
        Row: {
          created_at: string | null
          description: string | null
          frequency: number | null
          gene: string | null
          geographic_spread: string | null
          haplogroup: string | null
          id: string
          marker_type: string
          modern_distribution: string | null
          origin: string
          significance: string | null
          study_evidence: string | null
          time_introduction: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          frequency?: number | null
          gene?: string | null
          geographic_spread?: string | null
          haplogroup?: string | null
          id?: string
          marker_type: string
          modern_distribution?: string | null
          origin: string
          significance?: string | null
          study_evidence?: string | null
          time_introduction?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          frequency?: number | null
          gene?: string | null
          geographic_spread?: string | null
          haplogroup?: string | null
          id?: string
          marker_type?: string
          modern_distribution?: string | null
          origin?: string
          significance?: string | null
          study_evidence?: string | null
          time_introduction?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      groups: {
        Row: {
          created_at: string
          groupid: string
          lang: string
          notes: string | null
          type: Database["public"]["Enums"]["group_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          groupid: string
          lang?: string
          notes?: string | null
          type?: Database["public"]["Enums"]["group_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          groupid?: string
          lang?: string
          notes?: string | null
          type?: Database["public"]["Enums"]["group_type"]
          updated_at?: string
        }
        Relationships: []
      }
      her_dk_notes: {
        Row: {
          created_at: string
          external_id: string
          her_dk_id: string
          id: string
          lang: string
          notes: string
          object_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: string
          her_dk_id: string
          id?: string
          lang?: string
          notes: string
          object_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string
          her_dk_id?: string
          id?: string
          lang?: string
          notes?: string
          object_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_her_dk_notes_lang"
            columns: ["lang"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_code"]
          },
          {
            foreignKeyName: "fk_her_dk_notes_parish"
            columns: ["her_dk_id"]
            isOneToOne: false
            referencedRelation: "danish_parishes"
            referencedColumns: ["external_id"]
          },
        ]
      }
      her_SE: {
        Row: {
          fmisid: number | null
          her_SEid: string
          her_SEparishid: string
          kmrid: string | null
          raänr: string | null
        }
        Insert: {
          fmisid?: number | null
          her_SEid: string
          her_SEparishid: string
          kmrid?: string | null
          raänr?: string | null
        }
        Update: {
          fmisid?: number | null
          her_SEid?: string
          her_SEparishid?: string
          kmrid?: string | null
          raänr?: string | null
        }
        Relationships: []
      }
      historical_events: {
        Row: {
          created_at: string | null
          description: string | null
          description_en: string | null
          event_name: string
          event_name_en: string
          event_type: string
          id: string
          region_affected: string[] | null
          significance_level: string
          sources: string[] | null
          updated_at: string | null
          year_end: number | null
          year_start: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          event_name: string
          event_name_en: string
          event_type?: string
          id?: string
          region_affected?: string[] | null
          significance_level?: string
          sources?: string[] | null
          updated_at?: string | null
          year_end?: number | null
          year_start: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          event_name?: string
          event_name_en?: string
          event_type?: string
          id?: string
          region_affected?: string[] | null
          significance_level?: string
          sources?: string[] | null
          updated_at?: string | null
          year_end?: number | null
          year_start?: number
        }
        Relationships: []
      }
      historical_kings: {
        Row: {
          archaeological_evidence: boolean | null
          birth_year: number | null
          created_at: string
          death_year: number | null
          description: string | null
          dynasty_id: string | null
          gender: string
          id: string
          name: string
          name_variations: string[] | null
          region: string
          reign_end: number | null
          reign_start: number | null
          runestone_mentions: boolean | null
          status: Database["public"]["Enums"]["king_status"]
          updated_at: string
        }
        Insert: {
          archaeological_evidence?: boolean | null
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          dynasty_id?: string | null
          gender?: string
          id?: string
          name: string
          name_variations?: string[] | null
          region: string
          reign_end?: number | null
          reign_start?: number | null
          runestone_mentions?: boolean | null
          status?: Database["public"]["Enums"]["king_status"]
          updated_at?: string
        }
        Update: {
          archaeological_evidence?: boolean | null
          birth_year?: number | null
          created_at?: string
          death_year?: number | null
          description?: string | null
          dynasty_id?: string | null
          gender?: string
          id?: string
          name?: string
          name_variations?: string[] | null
          region?: string
          reign_end?: number | null
          reign_start?: number | null
          runestone_mentions?: boolean | null
          status?: Database["public"]["Enums"]["king_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "historical_kings_dynasty_id_fkey"
            columns: ["dynasty_id"]
            isOneToOne: false
            referencedRelation: "royal_dynasties"
            referencedColumns: ["id"]
          },
        ]
      }
      historical_periods: {
        Row: {
          created_at: string | null
          description: string | null
          genetic_characteristics: string | null
          id: string
          name: string
          name_en: string
          time_range: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          genetic_characteristics?: string | null
          id?: string
          name: string
          name_en: string
          time_range: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          genetic_characteristics?: string | null
          id?: string
          name?: string
          name_en?: string
          time_range?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      historical_sources: {
        Row: {
          author: string
          bias_types: Database["public"]["Enums"]["bias_type"][] | null
          covers_period_end: number | null
          covers_period_start: number | null
          created_at: string
          description: string | null
          id: string
          language: string
          reliability: Database["public"]["Enums"]["source_reliability"]
          title: string
          title_en: string
          updated_at: string
          written_year: number | null
        }
        Insert: {
          author: string
          bias_types?: Database["public"]["Enums"]["bias_type"][] | null
          covers_period_end?: number | null
          covers_period_start?: number | null
          created_at?: string
          description?: string | null
          id?: string
          language: string
          reliability: Database["public"]["Enums"]["source_reliability"]
          title: string
          title_en: string
          updated_at?: string
          written_year?: number | null
        }
        Update: {
          author?: string
          bias_types?: Database["public"]["Enums"]["bias_type"][] | null
          covers_period_end?: number | null
          covers_period_start?: number | null
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          reliability?: Database["public"]["Enums"]["source_reliability"]
          title?: string
          title_en?: string
          updated_at?: string
          written_year?: number | null
        }
        Relationships: []
      }
      hundreds: {
        Row: {
          created_at: string
          division_external_id: string | null
          external_id: string
          id: string
          name: string
          province_external_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          division_external_id?: string | null
          external_id: string
          id?: string
          name: string
          province_external_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          division_external_id?: string | null
          external_id?: string
          id?: string
          name?: string
          province_external_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      imagelinks: {
        Row: {
          created_at: string
          imagelink: string
          imagelinkid: string
          objectid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          imagelink: string
          imagelinkid: string
          objectid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          imagelink?: string
          imagelinkid?: string
          objectid?: string
          updated_at?: string
        }
        Relationships: []
      }
      inscription_comparisons: {
        Row: {
          comparison_type: string | null
          created_at: string | null
          findings: Json | null
          id: string
          inscription_a_id: string | null
          inscription_b_id: string | null
          notes: string | null
          similarity_score: number | null
          user_id: string | null
        }
        Insert: {
          comparison_type?: string | null
          created_at?: string | null
          findings?: Json | null
          id?: string
          inscription_a_id?: string | null
          inscription_b_id?: string | null
          notes?: string | null
          similarity_score?: number | null
          user_id?: string | null
        }
        Update: {
          comparison_type?: string | null
          created_at?: string | null
          findings?: Json | null
          id?: string
          inscription_a_id?: string | null
          inscription_b_id?: string | null
          notes?: string | null
          similarity_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inscription_comparisons_inscription_a_id_fkey"
            columns: ["inscription_a_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscription_comparisons_inscription_a_id_fkey"
            columns: ["inscription_a_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscription_comparisons_inscription_b_id_fkey"
            columns: ["inscription_b_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscription_comparisons_inscription_b_id_fkey"
            columns: ["inscription_b_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
        ]
      }
      inscription_group: {
        Row: {
          created_at: string
          groupid: string
          inscriptionid: string
        }
        Insert: {
          created_at?: string
          groupid: string
          inscriptionid: string
        }
        Update: {
          created_at?: string
          groupid?: string
          inscriptionid?: string
        }
        Relationships: []
      }
      inscription_media: {
        Row: {
          copyright_info: string | null
          created_at: string | null
          description: string | null
          file_format: string | null
          id: string
          inscription_id: string | null
          media_type: string
          media_url: string
          photo_date: string | null
          photographer: string | null
          resolution: string | null
          source_institution: string | null
        }
        Insert: {
          copyright_info?: string | null
          created_at?: string | null
          description?: string | null
          file_format?: string | null
          id?: string
          inscription_id?: string | null
          media_type: string
          media_url: string
          photo_date?: string | null
          photographer?: string | null
          resolution?: string | null
          source_institution?: string | null
        }
        Update: {
          copyright_info?: string | null
          created_at?: string | null
          description?: string | null
          file_format?: string | null
          id?: string
          inscription_id?: string | null
          media_type?: string
          media_url?: string
          photo_date?: string | null
          photographer?: string | null
          resolution?: string | null
          source_institution?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inscription_media_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscription_media_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
        ]
      }
      king_inscription_links: {
        Row: {
          analysis_notes: string | null
          connection_type: string
          created_at: string
          evidence_strength: string
          id: string
          inscription_id: string
          king_id: string
        }
        Insert: {
          analysis_notes?: string | null
          connection_type: string
          created_at?: string
          evidence_strength?: string
          id?: string
          inscription_id: string
          king_id: string
        }
        Update: {
          analysis_notes?: string | null
          connection_type?: string
          created_at?: string
          evidence_strength?: string
          id?: string
          inscription_id?: string
          king_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "king_inscription_links_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "king_inscription_links_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "king_inscription_links_king_id_fkey"
            columns: ["king_id"]
            isOneToOne: false
            referencedRelation: "historical_kings"
            referencedColumns: ["id"]
          },
        ]
      }
      king_source_mentions: {
        Row: {
          context: string | null
          created_at: string
          id: string
          king_id: string
          mentioned_name: string
          page_reference: string | null
          quote_original: string | null
          quote_translation: string | null
          reliability_note: string | null
          source_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          king_id: string
          mentioned_name: string
          page_reference?: string | null
          quote_original?: string | null
          quote_translation?: string | null
          reliability_note?: string | null
          source_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          king_id?: string
          mentioned_name?: string
          page_reference?: string | null
          quote_original?: string | null
          quote_translation?: string | null
          reliability_note?: string | null
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "king_source_mentions_king_id_fkey"
            columns: ["king_id"]
            isOneToOne: false
            referencedRelation: "historical_kings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "king_source_mentions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "historical_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          created_at: string
          id: string
          language_code: string
          name_en: string
          name_sv: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          language_code: string
          name_en: string
          name_sv: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          language_code?: string
          name_en?: string
          name_sv?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          id: string
          language_code: string
          location: string
          object_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          language_code?: string
          location: string
          object_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          language_code?: string
          location?: string
          object_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_locations_language"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      material_materialsubtype: {
        Row: {
          created_at: string
          materialid: string
          subtypeid: string
        }
        Insert: {
          created_at?: string
          materialid: string
          subtypeid: string
        }
        Update: {
          created_at?: string
          materialid?: string
          subtypeid?: string
        }
        Relationships: []
      }
      materialtypes: {
        Row: {
          created_at: string
          lang: string
          materialtype: string
          materialtypeid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          lang?: string
          materialtype: string
          materialtypeid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          lang?: string
          materialtype?: string
          materialtypeid?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          content_type: string
          created_at: string
          created_by: string | null
          file_path: string
          file_size: number | null
          filename: string
          height: number | null
          id: string
          image_type: string
          original_filename: string
          status: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          content_type: string
          created_at?: string
          created_by?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          image_type: string
          original_filename: string
          status?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          content_type?: string
          created_at?: string
          created_by?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          image_type?: string
          original_filename?: string
          status?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: []
      }
      municipalities: {
        Row: {
          countyid: string
          created_at: string
          municipality: string
          municipalityid: string
          number: string | null
          updated_at: string
        }
        Insert: {
          countyid: string
          created_at?: string
          municipality: string
          municipalityid: string
          number?: string | null
          updated_at?: string
        }
        Update: {
          countyid?: string
          created_at?: string
          municipality?: string
          municipalityid?: string
          number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      norwegian_localities: {
        Row: {
          created_at: string
          external_id: string
          id: string
          locality: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: string
          id?: string
          locality?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string
          id?: string
          locality?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          created_at: string | null
          id: string
          lang: string
          noteid: string
          notes: string
          objectid: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lang?: string
          noteid: string
          notes: string
          objectid: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lang?: string
          noteid?: string
          notes?: string
          objectid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      object_artefact: {
        Row: {
          artefactid: string
          created_at: string | null
          objectid: string
          updated_at: string | null
        }
        Insert: {
          artefactid: string
          created_at?: string | null
          objectid: string
          updated_at?: string | null
        }
        Update: {
          artefactid?: string
          created_at?: string | null
          objectid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      object_source: {
        Row: {
          created_at: string
          objectid: string
          sourceid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          objectid: string
          sourceid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          objectid?: string
          sourceid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_object"
            columns: ["objectid"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["objectid"]
          },
          {
            foreignKeyName: "fk_source"
            columns: ["sourceid"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["sourceid"]
          },
        ]
      }
      objects: {
        Row: {
          artefact: string | null
          created_at: string
          extant: boolean
          material: string | null
          objectid: string
          originallocation: boolean | null
          placeid: string | null
          updated_at: string
        }
        Insert: {
          artefact?: string | null
          created_at?: string
          extant?: boolean
          material?: string | null
          objectid: string
          originallocation?: boolean | null
          placeid?: string | null
          updated_at?: string
        }
        Update: {
          artefact?: string | null
          created_at?: string
          extant?: boolean
          material?: string | null
          objectid?: string
          originallocation?: boolean | null
          placeid?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_place"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["placeid"]
          },
        ]
      }
      parishes: {
        Row: {
          code: string | null
          created_at: string
          external_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          external_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          external_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      place_parish_links: {
        Row: {
          created_at: string
          id: string
          is_current: boolean
          parish_external_id: string
          place_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_current?: boolean
          parish_external_id: string
          place_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_current?: boolean
          parish_external_id?: string
          place_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_place"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["placeid"]
          },
        ]
      }
      places: {
        Row: {
          created_at: string | null
          place: string
          placeid: string
          toraid: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          place: string
          placeid?: string
          toraid?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          place?: string
          placeid?: string
          toraid?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      qpadm_analysis: {
        Row: {
          analysis_date: string | null
          analysis_type: string | null
          ancestry_proportions: Json | null
          block_jackknife_size: string | null
          created_at: string | null
          id: string
          individual_id: string | null
          notes: string | null
          p_value: number | null
          plausible: boolean | null
          sources: Json | null
        }
        Insert: {
          analysis_date?: string | null
          analysis_type?: string | null
          ancestry_proportions?: Json | null
          block_jackknife_size?: string | null
          created_at?: string | null
          id?: string
          individual_id?: string | null
          notes?: string | null
          p_value?: number | null
          plausible?: boolean | null
          sources?: Json | null
        }
        Update: {
          analysis_date?: string | null
          analysis_type?: string | null
          ancestry_proportions?: Json | null
          block_jackknife_size?: string | null
          created_at?: string | null
          id?: string
          individual_id?: string | null
          notes?: string | null
          p_value?: number | null
          plausible?: boolean | null
          sources?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "qpadm_analysis_individual_id_fkey"
            columns: ["individual_id"]
            isOneToOne: false
            referencedRelation: "genetic_individuals"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_source: {
        Row: {
          created_at: string
          id: string
          reading_id: string
          sourceid: string
        }
        Insert: {
          created_at?: string
          id?: string
          reading_id: string
          sourceid: string
        }
        Update: {
          created_at?: string
          id?: string
          reading_id?: string
          sourceid?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_source_reading_id_fkey"
            columns: ["reading_id"]
            isOneToOne: false
            referencedRelation: "readings"
            referencedColumns: ["id"]
          },
        ]
      }
      readings: {
        Row: {
          created_at: string
          id: string
          inscription_id: string
          reading_type: string
          rundata_readingid: string | null
          tei_text: string | null
          text: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inscription_id: string
          reading_type?: string
          rundata_readingid?: string | null
          tei_text?: string | null
          text?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inscription_id?: string
          reading_type?: string
          rundata_readingid?: string | null
          tei_text?: string | null
          text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_readings_inscription"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_readings_inscription"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
        ]
      }
      reference_populations: {
        Row: {
          ancestry_group: string | null
          created_at: string | null
          data_source: string | null
          description: string | null
          id: string
          population_name: string
          region: string | null
          sample_size: number | null
        }
        Insert: {
          ancestry_group?: string | null
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          id?: string
          population_name: string
          region?: string | null
          sample_size?: number | null
        }
        Update: {
          ancestry_group?: string | null
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          id?: string
          population_name?: string
          region?: string | null
          sample_size?: number | null
        }
        Relationships: []
      }
      reference_uri: {
        Row: {
          created_at: string
          reference_id: string
          uri_id: string
        }
        Insert: {
          created_at?: string
          reference_id: string
          uri_id: string
        }
        Update: {
          created_at?: string
          reference_id?: string
          uri_id?: string
        }
        Relationships: []
      }
      research_notes: {
        Row: {
          academic_references: Json | null
          content: string
          created_at: string | null
          id: string
          inscription_id: string | null
          is_public: boolean | null
          is_verified: boolean | null
          methodology: string | null
          note_type: string
          peer_reviewed: boolean | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          academic_references?: Json | null
          content: string
          created_at?: string | null
          id?: string
          inscription_id?: string | null
          is_public?: boolean | null
          is_verified?: boolean | null
          methodology?: string | null
          note_type: string
          peer_reviewed?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          academic_references?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          inscription_id?: string | null
          is_public?: boolean | null
          is_verified?: boolean | null
          methodology?: string | null
          note_type?: string
          peer_reviewed?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_notes_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_inscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "research_notes_inscription_id_fkey"
            columns: ["inscription_id"]
            isOneToOne: false
            referencedRelation: "runic_with_coordinates"
            referencedColumns: ["id"]
          },
        ]
      }
      researcher_profiles: {
        Row: {
          bio: string | null
          can_verify_notes: boolean | null
          created_at: string | null
          credentials: string | null
          display_name: string
          field_of_expertise: string | null
          id: string
          institution: string | null
          orcid_id: string | null
          updated_at: string | null
          user_id: string | null
          verification_level: string | null
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          can_verify_notes?: boolean | null
          created_at?: string | null
          credentials?: string | null
          display_name: string
          field_of_expertise?: string | null
          id?: string
          institution?: string | null
          orcid_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          can_verify_notes?: boolean | null
          created_at?: string | null
          credentials?: string | null
          display_name?: string
          field_of_expertise?: string | null
          id?: string
          institution?: string | null
          orcid_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      river_coordinates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_portage: boolean
          is_trading_post: boolean
          latitude: number
          longitude: number
          name: string | null
          name_en: string | null
          river_system_id: string
          sequence_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_portage?: boolean
          is_trading_post?: boolean
          latitude: number
          longitude: number
          name?: string | null
          name_en?: string | null
          river_system_id: string
          sequence_order: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_portage?: boolean
          is_trading_post?: boolean
          latitude?: number
          longitude?: number
          name?: string | null
          name_en?: string | null
          river_system_id?: string
          sequence_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "river_coordinates_river_system_id_fkey"
            columns: ["river_system_id"]
            isOneToOne: false
            referencedRelation: "river_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      river_systems: {
        Row: {
          color: string
          created_at: string
          description: string | null
          historical_significance: string | null
          id: string
          importance: string | null
          name: string
          name_en: string
          period: string
          significance: string | null
          total_length_km: number | null
          type: string | null
          updated_at: string
          width: number
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          historical_significance?: string | null
          id?: string
          importance?: string | null
          name: string
          name_en: string
          period?: string
          significance?: string | null
          total_length_km?: number | null
          type?: string | null
          updated_at?: string
          width?: number
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          historical_significance?: string | null
          id?: string
          importance?: string | null
          name?: string
          name_en?: string
          period?: string
          significance?: string | null
          total_length_km?: number | null
          type?: string | null
          updated_at?: string
          width?: number
        }
        Relationships: []
      }
      road_landmarks: {
        Row: {
          coordinates: unknown
          created_at: string | null
          description: string | null
          description_en: string | null
          historical_significance: string | null
          id: string
          landmark_type: string
          name: string
          name_en: string | null
          road_id: string | null
          updated_at: string | null
        }
        Insert: {
          coordinates: unknown
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          historical_significance?: string | null
          id?: string
          landmark_type: string
          name: string
          name_en?: string | null
          road_id?: string | null
          updated_at?: string | null
        }
        Update: {
          coordinates?: unknown
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          historical_significance?: string | null
          id?: string
          landmark_type?: string
          name?: string
          name_en?: string | null
          road_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_road_landmarks_road_id"
            columns: ["road_id"]
            isOneToOne: false
            referencedRelation: "viking_roads"
            referencedColumns: ["id"]
          },
        ]
      }
      road_waypoints: {
        Row: {
          coordinates: unknown
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          road_id: string
          waypoint_order: number
          waypoint_type: string | null
        }
        Insert: {
          coordinates: unknown
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          road_id: string
          waypoint_order: number
          waypoint_type?: string | null
        }
        Update: {
          coordinates?: unknown
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          road_id?: string
          waypoint_order?: number
          waypoint_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_road_waypoints_road_id"
            columns: ["road_id"]
            isOneToOne: false
            referencedRelation: "viking_roads"
            referencedColumns: ["id"]
          },
        ]
      }
      royal_dynasties: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          name_en: string
          period_end: number | null
          period_start: number | null
          region: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          name_en: string
          period_end?: number | null
          period_start?: number | null
          region: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          name_en?: string
          period_end?: number | null
          period_start?: number | null
          region?: string
          updated_at?: string
        }
        Relationships: []
      }
      rundata_artefacts: {
        Row: {
          artefact_name: string
          artefactid: string
          category_mapping: string | null
          created_at: string | null
          id: string
          language: string
        }
        Insert: {
          artefact_name: string
          artefactid?: string
          category_mapping?: string | null
          created_at?: string | null
          id?: string
          language?: string
        }
        Update: {
          artefact_name?: string
          artefactid?: string
          category_mapping?: string | null
          created_at?: string | null
          id?: string
          language?: string
        }
        Relationships: []
      }
      runic_inscriptions: {
        Row: {
          also_known_as: string[] | null
          alternative_signum: string[] | null
          bibliography: Json | null
          complexity_level: string | null
          condition_notes: string | null
          coordinates: unknown | null
          country: string | null
          county: string | null
          created_at: string | null
          cultural_classification: string | null
          current_location: string | null
          data_source: string | null
          dating_confidence: number | null
          dating_text: string | null
          dimensions: string | null
          embedding: string | null
          historical_context: string | null
          id: string
          inscription_group: string | null
          is_primary_signum_verified: boolean | null
          k_samsok_uri: string | null
          lamningsnumber: string | null
          landscape: string | null
          location: string | null
          material: string | null
          municipality: string | null
          name: string | null
          name_en: string | null
          normalization: string | null
          object_type: string | null
          paleographic_notes: string | null
          parish: string | null
          period_end: number | null
          period_start: number | null
          primary_signum: string | null
          province: string | null
          raa_number: string | null
          rundata_signum: string | null
          rune_type: string | null
          rune_variant: string | null
          scholarly_notes: string | null
          signum: string
          style_group: string | null
          text_segments: Json | null
          translation_en: string | null
          translation_sv: string | null
          transliteration: string | null
          uncertainty_level: string | null
          updated_at: string | null
        }
        Insert: {
          also_known_as?: string[] | null
          alternative_signum?: string[] | null
          bibliography?: Json | null
          complexity_level?: string | null
          condition_notes?: string | null
          coordinates?: unknown | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          cultural_classification?: string | null
          current_location?: string | null
          data_source?: string | null
          dating_confidence?: number | null
          dating_text?: string | null
          dimensions?: string | null
          embedding?: string | null
          historical_context?: string | null
          id?: string
          inscription_group?: string | null
          is_primary_signum_verified?: boolean | null
          k_samsok_uri?: string | null
          lamningsnumber?: string | null
          landscape?: string | null
          location?: string | null
          material?: string | null
          municipality?: string | null
          name?: string | null
          name_en?: string | null
          normalization?: string | null
          object_type?: string | null
          paleographic_notes?: string | null
          parish?: string | null
          period_end?: number | null
          period_start?: number | null
          primary_signum?: string | null
          province?: string | null
          raa_number?: string | null
          rundata_signum?: string | null
          rune_type?: string | null
          rune_variant?: string | null
          scholarly_notes?: string | null
          signum: string
          style_group?: string | null
          text_segments?: Json | null
          translation_en?: string | null
          translation_sv?: string | null
          transliteration?: string | null
          uncertainty_level?: string | null
          updated_at?: string | null
        }
        Update: {
          also_known_as?: string[] | null
          alternative_signum?: string[] | null
          bibliography?: Json | null
          complexity_level?: string | null
          condition_notes?: string | null
          coordinates?: unknown | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          cultural_classification?: string | null
          current_location?: string | null
          data_source?: string | null
          dating_confidence?: number | null
          dating_text?: string | null
          dimensions?: string | null
          embedding?: string | null
          historical_context?: string | null
          id?: string
          inscription_group?: string | null
          is_primary_signum_verified?: boolean | null
          k_samsok_uri?: string | null
          lamningsnumber?: string | null
          landscape?: string | null
          location?: string | null
          material?: string | null
          municipality?: string | null
          name?: string | null
          name_en?: string | null
          normalization?: string | null
          object_type?: string | null
          paleographic_notes?: string | null
          parish?: string | null
          period_end?: number | null
          period_start?: number | null
          primary_signum?: string | null
          province?: string | null
          raa_number?: string | null
          rundata_signum?: string | null
          rune_type?: string | null
          rune_variant?: string | null
          scholarly_notes?: string | null
          signum?: string
          style_group?: string | null
          text_segments?: Json | null
          translation_en?: string | null
          translation_sv?: string | null
          transliteration?: string | null
          uncertainty_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          new_role: Database["public"]["Enums"]["app_role"] | null
          old_role: Database["public"]["Enums"]["app_role"] | null
          success: boolean
          target_user_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          new_role?: Database["public"]["Enums"]["app_role"] | null
          old_role?: Database["public"]["Enums"]["app_role"] | null
          success?: boolean
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          new_role?: Database["public"]["Enums"]["app_role"] | null
          old_role?: Database["public"]["Enums"]["app_role"] | null
          success?: boolean
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      signum_inscription_links: {
        Row: {
          canonical: boolean
          created_at: string
          inscription_external_id: string
          signum_external_id: string
          updated_at: string
        }
        Insert: {
          canonical: boolean
          created_at?: string
          inscription_external_id: string
          signum_external_id: string
          updated_at?: string
        }
        Update: {
          canonical?: boolean
          created_at?: string
          inscription_external_id?: string
          signum_external_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          author: string | null
          created_at: string
          isbn: string | null
          notes: string | null
          publication_year: number | null
          publisher: string | null
          source_type: string | null
          sourceid: string
          title: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          isbn?: string | null
          notes?: string | null
          publication_year?: number | null
          publisher?: string | null
          source_type?: string | null
          sourceid: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          isbn?: string | null
          notes?: string | null
          publication_year?: number | null
          publisher?: string | null
          source_type?: string | null
          sourceid?: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      staging_inscriptions: {
        Row: {
          conflict_reasons: string[]
          coordinates: string | null
          created_at: string
          dating_text: string | null
          expert_notes: string | null
          id: string
          location: string | null
          object_type: string | null
          original_signum: string
          raw_data: Json
          reviewed_at: string | null
          reviewed_by: string | null
          source_database: string
          status: string
          translation_en: string | null
          transliteration: string | null
          updated_at: string
        }
        Insert: {
          conflict_reasons?: string[]
          coordinates?: string | null
          created_at?: string
          dating_text?: string | null
          expert_notes?: string | null
          id?: string
          location?: string | null
          object_type?: string | null
          original_signum: string
          raw_data?: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_database: string
          status?: string
          translation_en?: string | null
          transliteration?: string | null
          updated_at?: string
        }
        Update: {
          conflict_reasons?: string[]
          coordinates?: string | null
          created_at?: string
          dating_text?: string | null
          expert_notes?: string | null
          id?: string
          location?: string | null
          object_type?: string | null
          original_signum?: string
          raw_data?: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_database?: string
          status?: string
          translation_en?: string | null
          transliteration?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      swedish_hillforts: {
        Row: {
          coordinates: unknown | null
          country: string | null
          county: string | null
          created_at: string | null
          cultural_significance: string | null
          description: string | null
          fortress_type: string | null
          id: string
          landscape: string
          municipality: string | null
          name: string | null
          parish: string | null
          period: string | null
          raa_number: string | null
          source_reference: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          coordinates?: unknown | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          cultural_significance?: string | null
          description?: string | null
          fortress_type?: string | null
          id?: string
          landscape: string
          municipality?: string | null
          name?: string | null
          parish?: string | null
          period?: string | null
          raa_number?: string | null
          source_reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          coordinates?: unknown | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          cultural_significance?: string | null
          description?: string | null
          fortress_type?: string | null
          id?: string
          landscape?: string
          municipality?: string | null
          name?: string | null
          parish?: string | null
          period?: string | null
          raa_number?: string | null
          source_reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      swedish_localities: {
        Row: {
          created_at: string
          external_id: string
          fmis_id: number | null
          id: string
          kmr_id: string | null
          parish_external_id: string
          raa_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: string
          fmis_id?: number | null
          id?: string
          kmr_id?: string | null
          parish_external_id: string
          raa_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string
          fmis_id?: number | null
          id?: string
          kmr_id?: string | null
          parish_external_id?: string
          raa_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_swedish_localities_parish"
            columns: ["parish_external_id"]
            isOneToOne: false
            referencedRelation: "parishes"
            referencedColumns: ["external_id"]
          },
        ]
      }
      translations: {
        Row: {
          created_at: string
          inscriptionid: string
          language: string
          teitext: string | null
          text: string
          translation: string
          translationid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          inscriptionid: string
          language?: string
          teitext?: string | null
          text: string
          translation?: string
          translationid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          inscriptionid?: string
          language?: string
          teitext?: string | null
          text?: string
          translation?: string
          translationid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "translations_language_code_fkey"
            columns: ["language"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      uris: {
        Row: {
          created_at: string
          updated_at: string
          uri: string
          uriid: string
        }
        Insert: {
          created_at?: string
          updated_at?: string
          uri: string
          uriid: string
        }
        Update: {
          created_at?: string
          updated_at?: string
          uri?: string
          uriid?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      viking_cities: {
        Row: {
          category: string
          coordinates: unknown
          country: string
          created_at: string
          description: string
          historical_significance: string | null
          id: string
          name: string
          period_end: number
          period_start: number
          population_estimate: number | null
          region: string | null
          replaces: string | null
          status: string | null
          unesco_site: boolean | null
          updated_at: string
        }
        Insert: {
          category: string
          coordinates: unknown
          country: string
          created_at?: string
          description: string
          historical_significance?: string | null
          id?: string
          name: string
          period_end: number
          period_start: number
          population_estimate?: number | null
          region?: string | null
          replaces?: string | null
          status?: string | null
          unesco_site?: boolean | null
          updated_at?: string
        }
        Update: {
          category?: string
          coordinates?: unknown
          country?: string
          created_at?: string
          description?: string
          historical_significance?: string | null
          id?: string
          name?: string
          period_end?: number
          period_start?: number
          population_estimate?: number | null
          region?: string | null
          replaces?: string | null
          status?: string | null
          unesco_site?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      viking_fortresses: {
        Row: {
          archaeological_notes: string | null
          area_hectares: number | null
          construction_end: number | null
          construction_period: string | null
          construction_start: number | null
          coordinates: unknown
          country: string
          created_at: string
          description: string | null
          diameter_meters: number | null
          excavated: boolean | null
          fortress_type: string
          historical_significance: string | null
          id: string
          name: string
          raa_number: string | null
          region: string | null
          status: string | null
          unesco_site: boolean | null
          updated_at: string
        }
        Insert: {
          archaeological_notes?: string | null
          area_hectares?: number | null
          construction_end?: number | null
          construction_period?: string | null
          construction_start?: number | null
          coordinates: unknown
          country: string
          created_at?: string
          description?: string | null
          diameter_meters?: number | null
          excavated?: boolean | null
          fortress_type: string
          historical_significance?: string | null
          id?: string
          name: string
          raa_number?: string | null
          region?: string | null
          status?: string | null
          unesco_site?: boolean | null
          updated_at?: string
        }
        Update: {
          archaeological_notes?: string | null
          area_hectares?: number | null
          construction_end?: number | null
          construction_period?: string | null
          construction_start?: number | null
          coordinates?: unknown
          country?: string
          created_at?: string
          description?: string | null
          diameter_meters?: number | null
          excavated?: boolean | null
          fortress_type?: string
          historical_significance?: string | null
          id?: string
          name?: string
          raa_number?: string | null
          region?: string | null
          status?: string | null
          unesco_site?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      viking_names: {
        Row: {
          created_at: string
          etymology: string | null
          frequency: number | null
          gender: string
          historical_info: string | null
          id: string
          meaning: string
          name: string
          regions: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          etymology?: string | null
          frequency?: number | null
          gender: string
          historical_info?: string | null
          id?: string
          meaning: string
          name: string
          regions?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          etymology?: string | null
          frequency?: number | null
          gender?: string
          historical_info?: string | null
          id?: string
          meaning?: string
          name?: string
          regions?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      viking_roads: {
        Row: {
          created_at: string | null
          description: string | null
          description_en: string | null
          end_coordinates: unknown | null
          id: string
          importance_level: string | null
          name: string
          name_en: string | null
          period_end: number | null
          period_start: number | null
          road_type: string
          start_coordinates: unknown | null
          total_length_km: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          end_coordinates?: unknown | null
          id?: string
          importance_level?: string | null
          name: string
          name_en?: string | null
          period_end?: number | null
          period_start?: number | null
          road_type: string
          start_coordinates?: unknown | null
          total_length_km?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          end_coordinates?: unknown | null
          id?: string
          importance_level?: string | null
          name?: string
          name_en?: string | null
          period_end?: number | null
          period_start?: number | null
          road_type?: string
          start_coordinates?: unknown | null
          total_length_km?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      runic_with_coordinates: {
        Row: {
          additional_latitude: number | null
          additional_longitude: number | null
          confidence: string | null
          coordinate_source: string | null
          coordinate_status: string | null
          coordinates_latitude: number | null
          coordinates_longitude: number | null
          country: string | null
          county: string | null
          created_at: string | null
          dating_text: string | null
          geocoding_priority: string | null
          id: string | null
          landscape: string | null
          location: string | null
          municipality: string | null
          object_type: string | null
          original_coordinates: unknown | null
          parish: string | null
          period_end: number | null
          period_start: number | null
          province: string | null
          signum: string | null
          translation_en: string | null
          translation_sv: string | null
          transliteration: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      extract_primary_signum: {
        Args: { signum_text: string }
        Returns: string
      }
      get_carver_inscriptions: {
        Args: Record<PropertyKey, never>
        Returns: {
          attribution: Database["public"]["Enums"]["attribution_type"]
          carverid: string
          certainty: boolean
          inscription: Json
          inscriptionid: string
          notes: string
        }[]
      }
      get_carver_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          attributed_count: number
          carver_name: string
          certain_count: number
          signed_count: number
          total_inscriptions: number
          uncertain_count: number
        }[]
      }
      get_security_alerts: {
        Args: { hours_back?: number }
        Returns: {
          alert_type: string
          last_occurrence: string
          user_count: number
        }[]
      }
      get_viking_names_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          female_names: number
          male_names: number
          total_frequency: number
          total_names: number
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: Record<PropertyKey, never> | { p_user_id: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      log_security_event: {
        Args: {
          p_error_message?: string
          p_event_type: string
          p_new_role?: Database["public"]["Enums"]["app_role"]
          p_old_role?: Database["public"]["Enums"]["app_role"]
          p_success?: boolean
          p_target_user_id?: string
        }
        Returns: undefined
      }
      map_b_signum_to_modern: {
        Args: { old_signum: string; parish_name: string; province_name: string }
        Returns: string
      }
      parse_swedish_dating: {
        Args: { dating_text: string }
        Returns: {
          confidence: number
          notes: string
          parsed_period: string
          period_end: number
          period_start: number
        }[]
      }
      search_inscriptions_by_similarity: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          id: string
          signum: string
          similarity: number
          translation_en: string
          transliteration: string
        }[]
      }
      search_inscriptions_flexible: {
        Args: { p_search_term: string }
        Returns: {
          also_known_as: string[]
          alternative_signum: string[]
          bibliography: Json
          complexity_level: string
          condition_notes: string
          coordinates: unknown
          country: string
          county: string
          created_at: string
          cultural_classification: string
          current_location: string
          data_source: string
          dating_confidence: number
          dating_text: string
          dimensions: string
          embedding: string
          historical_context: string
          id: string
          inscription_group: string
          k_samsok_uri: string
          lamningsnumber: string
          landscape: string
          location: string
          material: string
          municipality: string
          name: string
          name_en: string
          normalization: string
          object_type: string
          paleographic_notes: string
          parish: string
          period_end: number
          period_start: number
          primary_signum: string
          province: string
          raa_number: string
          rundata_signum: string
          rune_type: string
          rune_variant: string
          scholarly_notes: string
          signum: string
          style_group: string
          text_segments: Json
          translation_en: string
          translation_sv: string
          transliteration: string
          uncertainty_level: string
          updated_at: string
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_dating_periods: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "user"
      attribution_type:
        | "attributed"
        | "signed"
        | "similar"
        | "signed on pair stone"
      bias_type:
        | "christian_anti_pagan"
        | "nationalist_danish"
        | "nationalist_swedish"
        | "temporal_distance"
        | "political_legitimacy"
        | "none"
      folk_group_category:
        | "germanic"
        | "slavic"
        | "finno_ugric"
        | "baltic"
        | "celtic"
        | "other"
      group_type: "die" | "monument" | "carver"
      king_status: "historical" | "semi_legendary" | "legendary" | "disputed"
      source_reliability: "primary" | "secondary" | "tertiary" | "legendary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      attribution_type: [
        "attributed",
        "signed",
        "similar",
        "signed on pair stone",
      ],
      bias_type: [
        "christian_anti_pagan",
        "nationalist_danish",
        "nationalist_swedish",
        "temporal_distance",
        "political_legitimacy",
        "none",
      ],
      folk_group_category: [
        "germanic",
        "slavic",
        "finno_ugric",
        "baltic",
        "celtic",
        "other",
      ],
      group_type: ["die", "monument", "carver"],
      king_status: ["historical", "semi_legendary", "legendary", "disputed"],
      source_reliability: ["primary", "secondary", "tertiary", "legendary"],
    },
  },
} as const
