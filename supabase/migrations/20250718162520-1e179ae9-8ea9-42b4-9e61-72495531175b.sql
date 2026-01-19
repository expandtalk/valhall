-- Create viking roads system tables
CREATE TABLE public.viking_roads (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    name_en text,
    road_type text NOT NULL CHECK (road_type IN ('rullstensas', 'halvag', 'vintervag', 'bro', 'vadstalle', 'knutpunkt')),
    description text,
    description_en text,
    period_start integer,
    period_end integer,
    start_coordinates point,
    end_coordinates point,
    importance_level text DEFAULT 'medium' CHECK (importance_level IN ('low', 'medium', 'high', 'critical')),
    total_length_km numeric,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create waypoints table for road segments
CREATE TABLE public.road_waypoints (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    road_id uuid NOT NULL,
    coordinates point NOT NULL,
    waypoint_order integer NOT NULL,
    waypoint_type text DEFAULT 'path' CHECK (waypoint_type IN ('path', 'bridge', 'ford', 'landmark', 'junction')),
    name text,
    description text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create road landmarks table
CREATE TABLE public.road_landmarks (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    road_id uuid,
    name text NOT NULL,
    name_en text,
    landmark_type text NOT NULL CHECK (landmark_type IN ('bridge', 'ford', 'trading_post', 'resting_place', 'junction', 'runestone', 'boundary')),
    coordinates point NOT NULL,
    description text,
    description_en text,
    historical_significance text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.viking_roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.road_waypoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.road_landmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Viking roads are publicly viewable" 
ON public.viking_roads FOR SELECT USING (true);

CREATE POLICY "Road waypoints are publicly viewable" 
ON public.road_waypoints FOR SELECT USING (true);

CREATE POLICY "Road landmarks are publicly viewable" 
ON public.road_landmarks FOR SELECT USING (true);

-- Create policies for admin management
CREATE POLICY "Admins can manage viking roads" 
ON public.viking_roads FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage road waypoints" 
ON public.road_waypoints FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage road landmarks" 
ON public.road_landmarks FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Add foreign key constraints
ALTER TABLE public.road_waypoints 
ADD CONSTRAINT fk_road_waypoints_road_id 
FOREIGN KEY (road_id) REFERENCES public.viking_roads(id) ON DELETE CASCADE;

ALTER TABLE public.road_landmarks 
ADD CONSTRAINT fk_road_landmarks_road_id 
FOREIGN KEY (road_id) REFERENCES public.viking_roads(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX idx_viking_roads_type ON public.viking_roads(road_type);
CREATE INDEX idx_viking_roads_period ON public.viking_roads(period_start, period_end);
CREATE INDEX idx_road_waypoints_road_id ON public.road_waypoints(road_id);
CREATE INDEX idx_road_waypoints_order ON public.road_waypoints(road_id, waypoint_order);
CREATE INDEX idx_road_landmarks_type ON public.road_landmarks(landmark_type);
CREATE INDEX idx_road_landmarks_coordinates ON public.road_landmarks USING GIST (coordinates);

-- Insert initial viking roads data
INSERT INTO public.viking_roads (name, name_en, road_type, description, description_en, period_start, period_end, start_coordinates, end_coordinates, importance_level, total_length_km) VALUES 

-- Uppsalaåsen (Norrstigen) - huvudväg
('Uppsalaåsen (Norrstigen)', 'Uppsala Ridge (North Route)', 'rullstensas', 
 'Huvudvägen genom Uppland längs rullstensåsen från Arlanda till Skutskär', 
 'Main road through Uppland along the esker from Arlanda to Skutskär', 
 700, 1100, POINT(17.9186, 59.6519), POINT(17.4167, 60.6333), 'critical', 120),

-- Enköpingsåsen
('Enköpingsåsen', 'Enköping Ridge', 'rullstensas', 
 'Viktig väg från Enköping norrut till Heby och Tärnsjö', 
 'Important road from Enköping north to Heby and Tärnsjö', 
 700, 1100, POINT(17.0775, 59.6356), POINT(16.9167, 60.1333), 'high', 85),

-- Badelundaåsen
('Badelundaåsen', 'Badelunda Ridge', 'rullstensas', 
 'Stor väg från Siljan genom Västerås till Nyköping', 
 'Major road from Siljan through Västerås to Nyköping', 
 700, 1100, POINT(14.8000, 60.8000), POINT(17.0087, 58.7530), 'critical', 280),

-- Gävleåsen/Hedesundaåsen
('Gävleåsen', 'Gävle Ridge', 'rullstensas', 
 'Nordlig väg genom Gävletrakten', 
 'Northern road through the Gävle region', 
 700, 1100, POINT(16.9833, 60.5000), POINT(17.1413, 60.6749), 'high', 65),

-- Stockholmsåsen
('Stockholmsåsen', 'Stockholm Ridge', 'rullstensas', 
 'Väg genom Stockholm och söderut', 
 'Road through Stockholm and southward', 
 700, 1100, POINT(18.0686, 59.3293), POINT(18.1344, 59.1439), 'critical', 45);

-- Insert road waypoints for Uppsalaåsen
INSERT INTO public.road_waypoints (road_id, coordinates, waypoint_order, waypoint_type, name) VALUES 
((SELECT id FROM viking_roads WHERE name = 'Uppsalaåsen (Norrstigen)'), POINT(17.9186, 59.6519), 1, 'landmark', 'Arlanda'),
((SELECT id FROM viking_roads WHERE name = 'Uppsalaåsen (Norrstigen)'), POINT(17.6389, 59.8586), 2, 'landmark', 'Uppsala'),
((SELECT id FROM viking_roads WHERE name = 'Uppsalaåsen (Norrstigen)'), POINT(17.4167, 60.6333), 3, 'landmark', 'Skutskär');

-- Insert important bridges and fords
INSERT INTO public.road_landmarks (name, name_en, landmark_type, coordinates, description, description_en, historical_significance) VALUES 

('Jarlabankes bro', 'Jarlabanke''s Bridge', 'bridge', POINT(18.0703, 59.4439), 
 'Berömd bro byggd av Jarlabanke, nämnd på flera runstenar', 
 'Famous bridge built by Jarlabanke, mentioned on several runestones',
 'Central för förståelsen av vikingatida infrastruktur och makt'),

('Ramsundet', 'Ramsund', 'ford', POINT(16.6000, 59.2833), 
 'Vadställe vid Ramsundet med Sigurdsristningen', 
 'Ford at Ramsund with the Sigurd carving',
 'Platsen för den berömda Sigurdsristningen'),

('Anundshög', 'Anundshög', 'junction', POINT(16.3517, 59.6003), 
 'Viktigt vägkors och ceremonielt centrum', 
 'Important crossroads and ceremonial center',
 'Sveriges största fornminnesområde från vikingatiden'),

('Gamla Uppsala', 'Old Uppsala', 'junction', POINT(17.6339, 59.8978), 
 'Centralt knutpunkt för vägar i Uppland', 
 'Central junction for roads in Uppland',
 'Politiskt och religiöst centrum under vikingatiden'),

('Timmele vadställe', 'Timmele Ford', 'ford', POINT(13.3667, 57.6833), 
 'Vadställe genom Ätran med hålvägar', 
 'Ford across Ätran river with hollow ways',
 'Välbevarade spår av vikingatida vägbyggnad');

-- Insert winter/ice roads
INSERT INTO public.viking_roads (name, name_en, road_type, description, description_en, period_start, period_end, start_coordinates, end_coordinates, importance_level) VALUES 

('Mälaren-isväg', 'Lake Mälaren Ice Road', 'vintervag', 
 'Vinterväg över Mälaren mellan öarna', 
 'Winter road across Lake Mälaren between islands', 
 700, 1100, POINT(17.5444, 59.3347), POINT(17.7234, 59.6191), 'medium'),

('Gotland-fastland isväg', 'Gotland-Mainland Ice Road', 'vintervag', 
 'Vinterförbindelse mellan Gotland och fastlandet', 
 'Winter connection between Gotland and mainland', 
 700, 1100, POINT(18.2948, 57.6348), POINT(16.9000, 57.8000), 'high');

-- Insert hollow ways (hålvägar)
INSERT INTO public.viking_roads (name, name_en, road_type, description, description_en, period_start, period_end, start_coordinates, end_coordinates, importance_level) VALUES 

('Timmele hålvägar', 'Timmele Hollow Ways', 'halvag', 
 'Välbevarade hålvägar vid Timmele', 
 'Well-preserved hollow ways at Timmele', 
 700, 1100, POINT(13.3200, 57.7950), POINT(13.3800, 57.7850), 'high'),

('Kalmarsund hålvägar', 'Kalmar Sound Hollow Ways', 'halvag', 
 'Hålvägar vid Kalmarsund', 
 'Hollow ways at Kalmar Sound', 
 700, 1100, POINT(16.3668, 56.6634), POINT(16.3800, 56.6700), 'medium');