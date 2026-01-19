-- Update the Bjarmians entry to use the correct name variants
UPDATE folk_groups 
SET 
  name = 'Bjarmer',
  name_en = 'Bjarmians',
  description = 'Bjarmer (även kallade Björmar eller Bjarmerna) var ett finsk-ugriskt folk som bodde i området kring Vita havet och floden Norra Dvina, i vad som idag är nordvästra Ryssland (främst Archangelsk oblast). De var skickliga pälsjägare och handelsmän som handlade med värdefulla pälsverk (sobel, hermelin, bäver). De dyrkade en gud som i nordiska källor kallas Jomali (jämför med finska Jumala) och beskrivs som relativt välbärgade. Talade ett finsk-ugriskt språk, möjligen närbesläktat med karelska eller komi.',
  description_en = 'The Bjarmians (also called Björmar or Bjarmerna) were a Finno-Ugric people who lived in the area around the White Sea and the Northern Dvina River, in what is now northwestern Russia (mainly Archangelsk Oblast). They were skilled fur hunters and traders who dealt in valuable furs (sable, ermine, beaver). They worshipped a god called Jomali in Nordic sources (compare with Finnish Jumala) and are described as relatively wealthy. They spoke a Finno-Ugric language, possibly related to Karelian or Komi.'
WHERE name = 'Bjarmerna';