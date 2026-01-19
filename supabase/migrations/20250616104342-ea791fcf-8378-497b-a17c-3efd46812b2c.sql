
-- Identifiera dubbletter först
WITH duplicates AS (
  SELECT 
    id,
    name,
    region,
    ROW_NUMBER() OVER (
      PARTITION BY name, region 
      ORDER BY created_at ASC
    ) as row_num
  FROM historical_kings
),
duplicate_ids AS (
  SELECT id 
  FROM duplicates 
  WHERE row_num > 1
)
-- Ta bort referenser till dubbletter från king_source_mentions
DELETE FROM king_source_mentions 
WHERE king_id IN (SELECT id FROM duplicate_ids);

-- Ta bort referenser till dubbletter från king_inscription_links  
WITH duplicates AS (
  SELECT 
    id,
    name,
    region,
    ROW_NUMBER() OVER (
      PARTITION BY name, region 
      ORDER BY created_at ASC
    ) as row_num
  FROM historical_kings
),
duplicate_ids AS (
  SELECT id 
  FROM duplicates 
  WHERE row_num > 1
)
DELETE FROM king_inscription_links 
WHERE king_id IN (SELECT id FROM duplicate_ids);

-- Nu kan vi säkert ta bort dubbletter från historical_kings
WITH duplicates AS (
  SELECT 
    id,
    name,
    region,
    ROW_NUMBER() OVER (
      PARTITION BY name, region 
      ORDER BY created_at ASC
    ) as row_num
  FROM historical_kings
),
duplicate_ids AS (
  SELECT id 
  FROM duplicates 
  WHERE row_num > 1
)
DELETE FROM historical_kings 
WHERE id IN (SELECT id FROM duplicate_ids);
