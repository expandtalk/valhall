-- Remove the fake coordinates I added for Öland runestones
-- Let the system use parish names for coordinate detection instead

DELETE FROM additional_coordinates 
WHERE signum IN ('Öl 2', 'Öl 3', 'Öl 4', 'Öl 5', 'Öl 6', 'Öl 7', 'Öl 8', 'Öl 9', 'Öl 10', 'Öl 11', 'Öl 12', 'Öl 13', 'Öl 14', 'Öl 15', 'Öl 16', 'Öl 17', 'Öl 18', 'Öl 19', 'Öl 20', 'Öl 39', 'Köping 1', 'Köping 2', 'Köping 3');