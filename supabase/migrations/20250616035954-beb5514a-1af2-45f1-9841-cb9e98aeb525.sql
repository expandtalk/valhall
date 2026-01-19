
-- Create table for archaeological sites
CREATE TABLE archaeological_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  parish TEXT,
  county TEXT,
  country TEXT NOT NULL,
  coordinates POINT,
  period TEXT NOT NULL,
  dating TEXT,
  description TEXT,
  burial_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for individuals with genetic data
CREATE TABLE genetic_individuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES archaeological_sites(id),
  sample_id TEXT NOT NULL,
  genetic_sex TEXT CHECK (genetic_sex IN ('XY', 'XX')),
  archaeological_sex TEXT CHECK (archaeological_sex IN ('male', 'female')),
  age TEXT,
  grave_number TEXT,
  grave_goods TEXT[],
  radiocarbon TEXT,
  y_haplogroup TEXT,
  mt_haplogroup TEXT,
  ancestry JSONB,
  isotopes JSONB,
  burial_context TEXT,
  museums_inventory TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for genetic markers
CREATE TABLE genetic_markers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marker_type TEXT NOT NULL CHECK (marker_type IN ('mtDNA', 'Y-DNA', 'Autosomal')),
  haplogroup TEXT,
  gene TEXT,
  frequency DECIMAL,
  origin TEXT NOT NULL,
  description TEXT,
  modern_distribution TEXT,
  significance TEXT,
  study_evidence TEXT,
  geographic_spread TEXT,
  time_introduction TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for historical periods
CREATE TABLE historical_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  time_range TEXT NOT NULL,
  description TEXT,
  genetic_characteristics TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for ADMIXTURE analysis results
CREATE TABLE admixture_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  individual_id UUID REFERENCES genetic_individuals(id),
  analysis_type TEXT DEFAULT 'ADMIXTURE',
  ceu_ancestry DECIMAL,
  itu_ancestry DECIMAL,
  chb_ancestry DECIMAL,
  pel_ancestry DECIMAL,
  yri_ancestry DECIMAL,
  depth_coverage DECIMAL,
  variants_used INTEGER,
  analysis_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for qpAdm analysis results
CREATE TABLE qpadm_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  individual_id UUID REFERENCES genetic_individuals(id),
  analysis_type TEXT DEFAULT 'qpAdm',
  sources JSONB, -- Store source populations and proportions
  p_value DECIMAL,
  plausible BOOLEAN DEFAULT false,
  ancestry_proportions JSONB,
  block_jackknife_size TEXT DEFAULT '1 Mb',
  analysis_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for reference populations
CREATE TABLE reference_populations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  population_name TEXT NOT NULL,
  region TEXT,
  ancestry_group TEXT,
  sample_size INTEGER,
  data_source TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_genetic_individuals_site_id ON genetic_individuals(site_id);
CREATE INDEX idx_genetic_individuals_sample_id ON genetic_individuals(sample_id);
CREATE INDEX idx_admixture_individual_id ON admixture_analysis(individual_id);
CREATE INDEX idx_qpadm_individual_id ON qpadm_analysis(individual_id);
CREATE INDEX idx_archaeological_sites_period ON archaeological_sites(period);
CREATE INDEX idx_genetic_markers_type ON genetic_markers(marker_type);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_archaeological_sites_updated_at
  BEFORE UPDATE ON archaeological_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_genetic_individuals_updated_at
  BEFORE UPDATE ON genetic_individuals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_genetic_markers_updated_at
  BEFORE UPDATE ON genetic_markers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historical_periods_updated_at
  BEFORE UPDATE ON historical_periods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample reference populations based on the study
INSERT INTO reference_populations (population_name, region, ancestry_group, description) VALUES
('CEU', 'Northern/Western Europe', 'European', 'Utah residents with Northern and Western European ancestry'),
('ITU', 'South Asia', 'South Asian', 'Indian Telugu in the U.K.'),
('CHB', 'East Asia', 'East Asian', 'Han Chinese in Beijing, China'),
('PEL', 'South America', 'Native American', 'Peruvian in Lima, Peru'),
('YRI', 'Africa', 'African', 'Yoruba in Ibadan, Nigeria'),
('Danish', 'Scandinavia', 'Scandinavian', 'Danish reference population'),
('Swedish', 'Scandinavia', 'Scandinavian', 'Swedish reference population'),
('Finnish', 'Northern Europe', 'Baltic/Uralic', 'Finnish reference population'),
('Lithuanian', 'Baltic', 'Baltic', 'Lithuanian reference population'),
('Polish', 'Central Europe', 'Central European', 'Polish reference population'),
('Irish', 'British Isles', 'Irish-British', 'Irish reference population'),
('English_Oxfordshire', 'British Isles', 'Irish-British', 'English Oxfordshire reference population'),
('French', 'Western Europe', 'South-West Europe', 'French reference population'),
('Spanish', 'Western Europe', 'South-West Europe', 'Spanish reference population'),
('Basque', 'Western Europe', 'Basque', 'Basque reference population (France and Spain)'),
('German', 'Central Europe', 'Others', 'German reference population'),
('Italian_Tuscany', 'Southern Europe', 'Southern European', 'Italian Tuscany reference population');
