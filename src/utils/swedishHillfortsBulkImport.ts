import { supabase } from '@/integrations/supabase/client';

interface HillfortData {
  name?: string;
  coordinates: { lat: number; lng: number };
  raa_number: string;
  landscape: string;
  parish?: string;
  municipality?: string;
  description?: string;
  status?: string;
}

export const bulkImportSwedishHillforts = async () => {
  console.log('Starting bulk import of Swedish hillforts...');

  // Helper function to convert DMS coordinates to decimal
  const dmsToDecimal = (dmsString: string): { lat: number; lng: number } => {
    // Parse coordinates like "59°22′10.50″N 16°27′54.66″Ö"
    const regex = /(\d+)°(\d+)′([\d.]+)″([NS])\s+(\d+)°(\d+)′([\d.]+)″([ÖEW])/;
    const match = dmsString.match(regex);
    
    if (!match) {
      console.error('Could not parse coordinates:', dmsString);
      return { lat: 0, lng: 0 };
    }
    
    const [, latDeg, latMin, latSec, latDir, lngDeg, lngMin, lngSec, lngDir] = match;
    
    let lat = parseInt(latDeg) + parseInt(latMin) / 60 + parseFloat(latSec) / 3600;
    let lng = parseInt(lngDeg) + parseInt(lngMin) / 60 + parseFloat(lngSec) / 3600;
    
    if (latDir === 'S') lat = -lat;
    if (lngDir === 'W') lng = -lng;
    
    return { lat, lng };
  };

  // Comprehensive list of Swedish hillforts
  const hillfortsData: HillfortData[] = [
    // Södermanland fornborgar från Wikipedia-listan
    { name: 'Stenby skans', coordinates: dmsToDecimal('59°23′53.87″N 17°0′54.24″Ö'), raa_number: 'Aspö 140:1', landscape: 'Södermanland', parish: 'Aspö', municipality: 'Strängnäs' },
    { name: 'Vinnsberg', coordinates: dmsToDecimal('59°22′22.87″N 16°45′48.99″Ö'), raa_number: 'Barva 79:1', landscape: 'Södermanland', parish: 'Barva', municipality: 'Eskilstuna', description: 'Belägen strax väster om Barva kyrka.' },
    { name: 'Visberget', coordinates: dmsToDecimal('58°54′46.87″N 16°42′55.37″Ö'), raa_number: 'Bettna 26:1', landscape: 'Södermanland', parish: 'Bettna', municipality: 'Flen' },
    { name: 'Borgarberget', coordinates: dmsToDecimal('58°49′12.35″N 16°28′11.41″Ö'), raa_number: 'Björkvik 96:1', landscape: 'Södermanland', parish: 'Björkvik', municipality: 'Katrineholm' },
    { name: 'Skansberget i Björnlunda', coordinates: dmsToDecimal('59°3′46.29″N 17°8′8.67″Ö'), raa_number: 'Björnlunda 69:1', landscape: 'Södermanland', parish: 'Björnlunda', municipality: 'Gnesta' },
    { name: 'Hovby skans', coordinates: dmsToDecimal('58°57′6.41″N 16°36′43.81″Ö'), raa_number: 'Blacksta 15:1', landscape: 'Södermanland', parish: 'Blacksta', municipality: 'Flen' },
    { name: 'Skansberget vid Ökna', coordinates: dmsToDecimal('58°52′58.15″N 17°9′12.92″Ö'), raa_number: 'Bogsta 24:1', landscape: 'Södermanland', parish: 'Bogsta', municipality: 'Nyköping', description: 'Belägen nära Ökna, Bogsta' },
    { name: 'Borgs skans', coordinates: dmsToDecimal('58°52′8.24″N 17°10′34.71″Ö'), raa_number: 'Bogsta 36:1', landscape: 'Södermanland', parish: 'Bogsta', municipality: 'Nyköping' },
    { name: 'Vigse berg', coordinates: dmsToDecimal('59°9′29.48″N 16°48′7.25″Ö'), raa_number: 'Dunker 108:1', landscape: 'Södermanland', parish: 'Dunker', municipality: 'Flen' },
    { name: 'Stenby fornborg', coordinates: dmsToDecimal('59°22′10.50″N 16°27′54.66″Ö'), raa_number: 'Eskilstuna 117:1', landscape: 'Södermanland', parish: 'Eskilstuna', municipality: 'Eskilstuna', description: 'Belägen i Kronskogen strax sydväst om Tuna Park.' },
    { name: 'Intagsberget', coordinates: dmsToDecimal('59°22′6.98″N 16°32′5.90″Ö'), raa_number: 'Eskilstuna 249:1', landscape: 'Södermanland', parish: 'Eskilstuna', municipality: 'Eskilstuna', description: 'Belägen strax väster om Sörmlandsgården.' },
    { name: 'Uvberget', coordinates: dmsToDecimal('59°20′7.09″N 16°29′18.04″Ö'), raa_number: 'Eskilstuna 535:1', landscape: 'Södermanland', parish: 'Eskilstuna', municipality: 'Eskilstuna', description: 'Belägen norr om Skogstorp' },
    { name: 'Stenhammar skans', coordinates: dmsToDecimal('59°2′21.24″N 16°32′12.27″Ö'), raa_number: 'Flen 10:1', landscape: 'Södermanland', parish: 'Flen', municipality: 'Flen' },
    { name: 'Jättunaskansen', coordinates: dmsToDecimal('59°3′44.20″N 16°37′0.32″Ö'), raa_number: 'Flen 21:1', landscape: 'Södermanland', parish: 'Flen', municipality: 'Flen' },
    { name: 'Stenbyborg', coordinates: dmsToDecimal('59°25′56.84″N 16°54′5.13″Ö'), raa_number: 'Fogdö 56:1', landscape: 'Södermanland', parish: 'Fogdö', municipality: 'Strängnäs' },
    { name: 'Karlebyborg', coordinates: dmsToDecimal('59°26′42.85″N 16°54′58.67″Ö'), raa_number: 'Fogdö 70:1', landscape: 'Södermanland', parish: 'Fogdö', municipality: 'Strängnäs' },
    { name: 'Hässelängs skans', coordinates: dmsToDecimal('59°0′0.68″N 16°42′35.52″Ö'), raa_number: 'Forssa 5:1', landscape: 'Södermanland', parish: 'Forssa', municipality: 'Flen' },
    { name: 'Sofielunds skans', coordinates: dmsToDecimal('58°59′39.61″N 16°42′22.43″Ö'), raa_number: 'Forssa 6:1', landscape: 'Södermanland', parish: 'Forssa', municipality: 'Flen' },
    { name: 'Borg vid Sillen', coordinates: dmsToDecimal('59°1′50.34″N 17°20′14.12″Ö'), raa_number: 'Frustuna 56:1', landscape: 'Södermanland', parish: 'Frustuna', municipality: 'Gnesta' },
    { name: 'Lundby skans', coordinates: dmsToDecimal('58°59′30.51″N 17°11′44.98″Ö'), raa_number: 'Frustuna 220:1', landscape: 'Södermanland', parish: 'Frustuna', municipality: 'Gnesta' },
    { name: 'Jättehällen', coordinates: dmsToDecimal('59°20′16.12″N 16°22′57.62″Ö'), raa_number: 'Gillberga 22:1', landscape: 'Södermanland', parish: 'Gillberga', municipality: 'Eskilstuna' },
    { name: 'Malsnarborgen', coordinates: dmsToDecimal('59°5′33.26″N 17°0′49.63″Ö'), raa_number: 'Gryt 89:1', landscape: 'Södermanland', parish: 'Gryt', municipality: 'Gnesta' },
    { name: 'Jättekyrkan', coordinates: dmsToDecimal('59°6′32.19″N 16°59′20.64″Ö'), raa_number: 'Gryt 142:1', landscape: 'Södermanland', parish: 'Gryt', municipality: 'Gnesta' },
    { name: 'Ringmuren', coordinates: dmsToDecimal('59°11′37.02″N 17°8′35.51″Ö'), raa_number: 'Gåsinge-Dillnäs 1:1', landscape: 'Södermanland', parish: 'Gåsinge-Dillnäs', municipality: 'Gnesta' },
    { name: 'Slottsberget', coordinates: dmsToDecimal('59°9′11.26″N 17°14′1.68″Ö'), raa_number: 'Gåsinge-Dillnäs 182:1', landscape: 'Södermanland', parish: 'Gåsinge-Dillnäs', municipality: 'Gnesta' },
    { name: 'Baldersborg', coordinates: dmsToDecimal('58°52′28.84″N 16°37′51.16″Ö'), raa_number: 'Halla 4:1', landscape: 'Södermanland', parish: 'Halla', municipality: 'Nyköping' },
    { name: 'Glasberget', coordinates: dmsToDecimal('58°50′59.31″N 16°38′4.50″Ö'), raa_number: 'Halla 42:1', landscape: 'Södermanland', parish: 'Halla', municipality: 'Nyköping' },
    { name: 'Rällingeborg', coordinates: dmsToDecimal('59°27′29.35″N 16°48′55.87″Ö'), raa_number: 'Helgarö 32:1', landscape: 'Södermanland', parish: 'Helgarö', municipality: 'Strängnäs' },
    { name: 'Helgaröborg', coordinates: dmsToDecimal('59°26′23.73″N 16°48′15.39″Ö'), raa_number: 'Helgarö 42:1', landscape: 'Södermanland', parish: 'Helgarö', municipality: 'Strängnäs' },
    { name: 'Skållinge skans', coordinates: dmsToDecimal('59°1′55.10″N 16°52′48.97″Ö'), raa_number: 'Helgesta 36:1', landscape: 'Södermanland', parish: 'Helgesta', municipality: 'Flen' },
    { name: 'Fyrsten', coordinates: dmsToDecimal('59°0′9.38″N 16°53′26.96″Ö'), raa_number: 'Helgesta 120:1', landscape: 'Södermanland', parish: 'Helgesta', municipality: 'Flen' },
    { name: 'Hultbergets fornborg', coordinates: dmsToDecimal('59°16′32.35″N 16°25′22.39″Ö'), raa_number: 'Husby-Rekarne 72:1', landscape: 'Södermanland', parish: 'Husby-Rekarne', municipality: 'Eskilstuna' },
    { name: 'Skansberget i Hyltinge', coordinates: dmsToDecimal('59°7′36.14″N 16°47′42.74″Ö'), raa_number: 'Hyltinge 2:1', landscape: 'Södermanland', parish: 'Hyltinge', municipality: 'Flen' },
    { name: 'Lilla Skansberget', coordinates: dmsToDecimal('59°8′2.83″N 16°46′30.89″Ö'), raa_number: 'Hyltinge 3:1', landscape: 'Södermanland', parish: 'Hyltinge', municipality: 'Flen' },
    { name: 'Oljebergets fornborg', coordinates: dmsToDecimal('59°5′50.35″N 16°50′2.91″Ö'), raa_number: 'Hyltinge 117:1', landscape: 'Södermanland', parish: 'Hyltinge', municipality: 'Flen' },
    { name: 'Jättekyrkan', coordinates: dmsToDecimal('59°21′54.87″N 16°54′11.28″Ö'), raa_number: 'Härad 52:1', landscape: 'Södermanland', parish: 'Härad', municipality: 'Strängnäs', description: 'Belägen på Sandbacksberget i Härad.' },
    { name: 'Fornborgen Viksberg', coordinates: dmsToDecimal('59°9′19.41″N 16°6′40.83″Ö'), raa_number: 'Julita 12:1', landscape: 'Södermanland', parish: 'Julita', municipality: 'Katrineholm' },
    { name: 'Mälby borg', coordinates: dmsToDecimal('59°27′27.80″N 16°39′38.90″Ö'), raa_number: 'Jäder 37:1', landscape: 'Södermanland', parish: 'Jäder', municipality: 'Eskilstuna' },
    { name: 'Fässlinge skans', coordinates: dmsToDecimal('59°24′51.62″N 16°41′55.52″Ö'), raa_number: 'Jäder 85:1', landscape: 'Södermanland', parish: 'Jäder', municipality: 'Eskilstuna' },
    { name: 'Bälgstenaberget', coordinates: dmsToDecimal('59°18′59.04″N 16°41′11.07″Ö'), raa_number: 'Kjula 51:1', landscape: 'Södermanland', parish: 'Kjula', municipality: 'Eskilstuna' },
    { name: 'Jätteberget', coordinates: dmsToDecimal('59°15′40.60″N 17°9′40.66″Ö'), raa_number: 'Kärnbo 55:1', landscape: 'Södermanland', parish: 'Kärnbo', municipality: 'Strängnäs' },
    { name: 'Stora Skansen', coordinates: dmsToDecimal('59°16′29.45″N 17°17′18.10″Ö'), raa_number: 'Kärnbo 124:1', landscape: 'Södermanland', parish: 'Kärnbo', municipality: 'Strängnäs' },
    { name: 'Kesebroberget', coordinates: dmsToDecimal('58°59′49.55″N 16°27′34.73″Ö'), raa_number: 'Lerbo 28:1', landscape: 'Södermanland', parish: 'Lerbo', municipality: 'Katrineholm' },
    { name: 'Ängstugeberget', coordinates: dmsToDecimal('59°8′19.15″N 16°44′38.43″Ö'), raa_number: 'Lilla Malma 14:1', landscape: 'Södermanland', parish: 'Lilla Malma', municipality: 'Flen' },
    { name: 'Fnöskeborg', coordinates: dmsToDecimal('58°58′47.61″N 17°6′48.18″Ö'), raa_number: 'Ludgo 3:1', landscape: 'Södermanland', parish: 'Ludgo', municipality: 'Nyköping' },
    { name: 'Penningby skans', coordinates: dmsToDecimal('58°58′5.33″N 17°8′7.08″Ö'), raa_number: 'Ludgo 6:1', landscape: 'Södermanland', parish: 'Ludgo', municipality: 'Nyköping' },
    { name: 'Korpberget', coordinates: dmsToDecimal('58°56′41.87″N 17°9′54.42″Ö'), raa_number: 'Ludgo 28:1', landscape: 'Södermanland', parish: 'Ludgo', municipality: 'Nyköping' },
    { name: 'Hannsjöberget', coordinates: dmsToDecimal('58°44′21.15″N 16°41′25.00″Ö'), raa_number: 'Lunda 34:1', landscape: 'Södermanland', parish: 'Lunda', municipality: 'Nyköping' },
    { name: 'Lännaborgen', coordinates: dmsToDecimal('59°17′42.51″N 16°59′28.15″Ö'), raa_number: 'Länna 17:1', landscape: 'Södermanland', parish: 'Länna', municipality: 'Strängnäs', description: 'Beläget strax öster om Öråsen, cirka 2 km norr om Länna kyrka.' },
    { name: 'Lisjöborg', coordinates: dmsToDecimal('59°14′7.74″N 16°52′32.93″Ö'), raa_number: 'Länna 33:1', landscape: 'Södermanland', parish: 'Länna', municipality: 'Strängnäs' },
    { name: 'Kramnäs skans', coordinates: dmsToDecimal('59°5′51.04″N 16°40′10.00″Ö'), raa_number: 'Mellösa 16:1', landscape: 'Södermanland', parish: 'Mellösa', municipality: 'Flen' },
    { name: 'Ulvsunda skans', coordinates: dmsToDecimal('59°5′39.29″N 16°35′38.16″Ö'), raa_number: 'Mellösa 17:1', landscape: 'Södermanland', parish: 'Mellösa', municipality: 'Flen' },
    { name: 'Herrgöls skans', coordinates: dmsToDecimal('59°6′19.10″N 16°35′3.96″Ö'), raa_number: 'Mellösa 28:1', landscape: 'Södermanland', parish: 'Mellösa', municipality: 'Flen' },
    { name: 'Fagernäsborgen', coordinates: dmsToDecimal('59°12′35.83″N 16°19′45.38″Ö'), raa_number: 'Näshulta 25:1', landscape: 'Södermanland', parish: 'Näshulta', municipality: 'Eskilstuna' },
    { name: 'Galgbacken', coordinates: dmsToDecimal('58°45′52.76″N 17°2′17.79″Ö'), raa_number: 'Nyköping 96:1', landscape: 'Södermanland', parish: 'Nyköping', municipality: 'Nyköping' },
    { name: 'Jettmarberget', coordinates: dmsToDecimal('58°59′36.04″N 17°1′31.65″Ö'), raa_number: 'Ripsa 43:1', landscape: 'Södermanland', parish: 'Ripsa', municipality: 'Nyköping' },
    { name: 'Uggelberget', coordinates: dmsToDecimal('58°51′9.91″N 17°2′38.14″Ö'), raa_number: 'Runtuna 15:1', landscape: 'Södermanland', parish: 'Runtuna', municipality: 'Nyköping' },
    { name: 'Per Knäppares borg', coordinates: dmsToDecimal('58°51′44.32″N 17°6′12.98″Ö'), raa_number: 'Runtuna 143:1', landscape: 'Södermanland', parish: 'Runtuna', municipality: 'Nyköping' },
    { name: 'Hägersberget', coordinates: dmsToDecimal('59°22′7.10″N 16°17′13.91″Ö'), raa_number: 'Råby-Rekarne 42:1', landscape: 'Södermanland', parish: 'Råby-Rekarne', municipality: 'Eskilstuna', description: 'Belägen 1 kilometer sydväst om Råby-Rekarne kyrka.' },
    { name: 'Tjugesta skans', coordinates: dmsToDecimal('59°1′20.74″N 16°33′0.77″Ö'), raa_number: 'Sköldinge 49:1', landscape: 'Södermanland', parish: 'Sköldinge', municipality: 'Katrineholm' },
    { name: 'Lindsmo skans', coordinates: dmsToDecimal('59°3′11.69″N 16°25′53.66″Ö'), raa_number: 'Sköldinge 53:1', landscape: 'Södermanland', parish: 'Sköldinge', municipality: 'Katrineholm' },
    { name: 'Grysta skans', coordinates: dmsToDecimal('59°4′10.25″N 16°26′22.32″Ö'), raa_number: 'Sköldinge 56:1', landscape: 'Södermanland', parish: 'Sköldinge', municipality: 'Katrineholm' },
    { name: 'Ramunderborg', coordinates: dmsToDecimal('59°3′38.97″N 16°27′20.81″Ö'), raa_number: 'Sköldinge 57:1', landscape: 'Södermanland', parish: 'Sköldinge', municipality: 'Katrineholm' },
    { name: 'Bosberget', coordinates: dmsToDecimal('59°19′20.97″N 16°33′28.24″Ö'), raa_number: 'Stenkvista 13:1', landscape: 'Södermanland', parish: 'Stenkvista', municipality: 'Eskilstuna' },
    { name: 'Ranstenaborgen', coordinates: dmsToDecimal('59°25′47.27″N 16°34′44.64″Ö'), raa_number: 'Sundby 7:1', landscape: 'Södermanland', parish: 'Sundby', municipality: 'Eskilstuna', description: 'Belägen väster om Ostra.' },
    { name: 'Hamnstadberget', coordinates: dmsToDecimal('58°52′27.89″N 17°13′35.03″Ö'), raa_number: 'Sättersta 21:1', landscape: 'Södermanland', parish: 'Sättersta', municipality: 'Nyköping' },
    { name: 'Saxborg', coordinates: dmsToDecimal('59°18′44.07″N 17°19′35.27″Ö'), raa_number: 'Toresund 76:1', landscape: 'Södermanland', parish: 'Toresund', municipality: 'Strängnäs' },
    { name: 'Jätteberget', coordinates: dmsToDecimal('59°21′43.10″N 17°6′22.21″Ö'), raa_number: 'Toresund 101:1', landscape: 'Södermanland', parish: 'Toresund', municipality: 'Strängnäs' },
    { name: 'Stenbyskans', coordinates: dmsToDecimal('59°20′45.82″N 17°11′38.33″Ö'), raa_number: 'Toresund 136:1', landscape: 'Södermanland', parish: 'Toresund', municipality: 'Strängnäs' },
    { name: 'Åby skans', coordinates: dmsToDecimal('59°18′51.48″N 17°11′12.38″Ö'), raa_number: 'Toresund 192:1', landscape: 'Södermanland', parish: 'Toresund', municipality: 'Strängnäs' },
    { name: 'Nyby fornborg', coordinates: dmsToDecimal('59°25′21.21″N 16°27′42.91″Ö'), raa_number: 'Torshälla 11:1', landscape: 'Södermanland', parish: 'Torshälla', municipality: 'Eskilstuna', description: 'Belägen i västra Torshälla, öster om Nybyån.' },
    { name: 'Ekberget', coordinates: dmsToDecimal('58°55′2.09″N 17°29′31.91″Ö'), raa_number: 'Trosa-Vagnhärad 224:1', landscape: 'Södermanland', parish: 'Trosa-Vagnhärad', municipality: 'Trosa' },
    { name: 'Skansberget', coordinates: dmsToDecimal('59°24′49.00″N 16°22′31.57″Ö'), raa_number: 'Tumbo 34:1', landscape: 'Södermanland', parish: 'Tumbo', municipality: 'Eskilstuna', description: 'Belägen söder om Gröndals motorstadion.' },
    { name: 'Bogsten', coordinates: dmsToDecimal('59°25′0.21″N 16°19′18.25″Ö'), raa_number: 'Tumbo 37:1', landscape: 'Södermanland', parish: 'Tumbo', municipality: 'Eskilstuna', description: 'Belägen sydväst om Tumbo.' },
    { name: 'Spetalsudden', coordinates: dmsToDecimal('58°44′40.71″N 17°16′47.00″Ö'), raa_number: 'Tystberga 297:1', landscape: 'Södermanland', parish: 'Tystberga', municipality: 'Nyköping' },
    { name: 'Lagmansö skans', coordinates: dmsToDecimal('58°57′44.28″N 16°32′1.00″Ö'), raa_number: 'Vadsbro 126:1', landscape: 'Södermanland', parish: 'Vadsbro', municipality: 'Flen' },
    { name: 'Vestaberget', coordinates: dmsToDecimal('59°25′38.74″N 16°32′19.60″Ö'), raa_number: 'Vallby 10:1', landscape: 'Södermanland', parish: 'Vallby', municipality: 'Eskilstuna', description: 'Belägen 1 kilometer väster om Vallby kyrka.' },
    { name: 'Tärbyborg', coordinates: dmsToDecimal('59°27′0.60″N 16°34′33.43″Ö'), raa_number: 'Vallby 41:1', landscape: 'Södermanland', parish: 'Vallby', municipality: 'Eskilstuna', description: 'Belägen nordväst om Ostraknall.' },
    { name: 'Vittseberget', coordinates: dmsToDecimal('58°50′15.61″N 17°25′15.97″Ö'), raa_number: 'Västerljung 99:1', landscape: 'Södermanland', parish: 'Västerljung', municipality: 'Trosa' },
    { name: 'Vårdkasberget', coordinates: dmsToDecimal('58°53′14.38″N 17°28′26.35″Ö'), raa_number: 'Västerljung 202:1', landscape: 'Södermanland', parish: 'Västerljung', municipality: 'Trosa' },
    { name: 'Rävberget', coordinates: dmsToDecimal('59°20′0.78″N 16°5′30.59″Ö'), raa_number: 'Västermo 15:1', landscape: 'Södermanland', parish: 'Västermo', municipality: 'Eskilstuna' },
    { name: 'Uvberget', coordinates: dmsToDecimal('59°3′13.64″N 15°59′55.66″Ö'), raa_number: 'Västra Vingåker 127:1', landscape: 'Södermanland', parish: 'Västra Vingåker', municipality: 'Vingåker' },
    { name: 'Hundberget', coordinates: dmsToDecimal('59°3′30.11″N 16°0′35.74″Ö'), raa_number: 'Västra Vingåker 128:1', landscape: 'Södermanland', parish: 'Västra Vingåker', municipality: 'Vingåker' },
    { name: 'Bålberget', coordinates: dmsToDecimal('59°25′57.34″N 17°16′32.98″Ö'), raa_number: 'Ytterselö 113:1', landscape: 'Södermanland', parish: 'Ytterselö', municipality: 'Strängnäs' },
    { name: 'Lötagsberget', coordinates: dmsToDecimal('59°23′51.48″N 17°14′54.08″Ö'), raa_number: 'Ytterselö 182:1', landscape: 'Södermanland', parish: 'Ytterselö', municipality: 'Strängnäs' },
    { name: 'Mörtsjö ringmur', coordinates: dmsToDecimal('59°14′18.90″N 17°4′22.52″Ö'), raa_number: 'Åker 39:1', landscape: 'Södermanland', parish: 'Åker', municipality: 'Strängnäs' },
    { name: 'Karlslunds ringmur', coordinates: dmsToDecimal('59°15′32.18″N 17°4′14.06″Ö'), raa_number: 'Åker 42:1', landscape: 'Södermanland', parish: 'Åker', municipality: 'Strängnäs' },
    { name: 'Bålberget', coordinates: dmsToDecimal('59°18′37.29″N 17°1′30.41″Ö'), raa_number: 'Åker 233:1', landscape: 'Södermanland', parish: 'Åker', municipality: 'Strängnäs' },
    { name: 'Fagerklev', coordinates: dmsToDecimal('59°14′31.17″N 16°34′14.17″Ö'), raa_number: 'Ärla 21:1', landscape: 'Södermanland', parish: 'Ärla', municipality: 'Eskilstuna' },
    { name: 'Ogaklev', coordinates: dmsToDecimal('59°14′30.24″N 16°37′14.72″Ö'), raa_number: 'Ärla 34:1', landscape: 'Södermanland', parish: 'Ärla', municipality: 'Eskilstuna' },
    { name: 'Visberget', coordinates: dmsToDecimal('59°16′32.17″N 16°3′43.38″Ö'), raa_number: 'Öja 38:1', landscape: 'Södermanland', parish: 'Öja', municipality: 'Eskilstuna' },
    { name: 'Skansberget', coordinates: dmsToDecimal('59°26′46.99″N 17°7′46.16″Ö'), raa_number: 'Överselö 34:1', landscape: 'Södermanland', parish: 'Överselö', municipality: 'Strängnäs' },
    { name: 'Silkesberget', coordinates: dmsToDecimal('59°24′13.98″N 17°7′42.18″Ö'), raa_number: 'Överselö 155:1', landscape: 'Södermanland', parish: 'Överselö', municipality: 'Strängnäs' },
    
    // Södermanlands del i Stockholms län
    { name: 'Slottsberget', coordinates: dmsToDecimal('59°10′41.99″N 17°17′7.83″Ö'), raa_number: 'Taxinge 22:1', landscape: 'Södermanland', parish: 'Taxinge', municipality: 'Nykvarn' },
    { name: 'Kämstaborg', coordinates: dmsToDecimal('59°12′20.90″N 17°29′21.16″Ö'), raa_number: 'Turinge 23:1', landscape: 'Södermanland', parish: 'Turinge', municipality: 'Nykvarn' },
    { name: 'Kvarnmora borg', coordinates: dmsToDecimal('59°11′45.40″N 17°24′11.50″Ö'), raa_number: 'Turinge 42:1', landscape: 'Södermanland', parish: 'Turinge', municipality: 'Nykvarn' },
    { name: 'Männö borg', coordinates: dmsToDecimal('59°14′11.10″N 17°45′36.17″Ö'), raa_number: 'Salem 299:1', landscape: 'Södermanland', parish: 'Salem', municipality: 'Salem' },
    { name: 'Solgårds fornborg', coordinates: dmsToDecimal('59°13′31.46″N 17°58′24.83″Ö'), raa_number: 'Huddinge 97:1', landscape: 'Södermanland', parish: 'Huddinge', municipality: 'Huddinge', description: 'Vattentornet, Solgård, Huddinge' },
    
    // Södermanlands del i Västmanlands län
    { name: 'Lockmoraskans', coordinates: dmsToDecimal('59°23′41.83″N 16°8′16.59″Ö'), raa_number: 'Kung Karl 30:1', landscape: 'Södermanland', parish: 'Kung Karl', municipality: 'Kungsör' },
    { name: 'Ekeby skans', coordinates: dmsToDecimal('59°24′37.01″N 16°7′32.07″Ö'), raa_number: 'Kung Karl 38:1', landscape: 'Södermanland', parish: 'Kung Karl', municipality: 'Kungsör' },
    { name: 'Torpsten', coordinates: dmsToDecimal('59°24′5.72″N 16°12′46.98″Ö'), raa_number: 'Torpa 68:1', landscape: 'Södermanland', parish: 'Torpa', municipality: 'Kungsör' },
    { name: 'Hagsberget', coordinates: dmsToDecimal('59°23′53.66″N 16°15′12.46″Ö'), raa_number: 'Torpa 96:1', landscape: 'Södermanland', parish: 'Torpa', municipality: 'Kungsör' },
    { name: 'Uvberget', coordinates: dmsToDecimal('59°23′47.94″N 16°14′48.40″Ö'), raa_number: 'Torpa 152:1', landscape: 'Södermanland', parish: 'Torpa', municipality: 'Kungsör' },
    
    // Tidigare öländska fornborgar
    { name: 'Gråborg', coordinates: { lat: 56.66642, lng: 16.60399 }, raa_number: 'Algutsrum 16:1', landscape: 'Öland', parish: 'Algutsrum', municipality: 'Borgholm', description: 'Den till ytan största fornborgen på Öland.' },
    { name: 'Eketorps borg', coordinates: { lat: 56.29555, lng: 16.48617 }, raa_number: 'Gräsgård 45:1', landscape: 'Öland', parish: 'Gräsgård', municipality: 'Mörbylånga', description: 'En folkvandingstida tillflyktsborg som delvis återuppbyggts som museum.' },
    { name: 'Triberga borg', coordinates: { lat: 56.47153, lng: 16.56212 }, raa_number: 'Hulterstad 20:1', landscape: 'Öland', parish: 'Hulterstad', municipality: 'Mörbylånga', description: 'Fornborg på Öland.' },
    { name: 'Ismantorps borg', coordinates: { lat: 56.74544, lng: 16.64268 }, raa_number: 'Långlöt 30:1', landscape: 'Öland', parish: 'Långlöt', municipality: 'Borgholm', description: 'Fornborg på Öland.' },
    { name: 'Sandby borg', coordinates: { lat: 56.55253, lng: 16.63926 }, raa_number: 'Sandby 45:1', landscape: 'Öland', parish: 'Sandby', municipality: 'Borgholm', description: 'Fornborg på Öland.' },
    { name: 'Bårby borg', coordinates: { lat: 56.50231, lng: 16.42551 }, raa_number: 'Mörbylånga 17:1', landscape: 'Öland', parish: 'Mörbylånga', municipality: 'Mörbylånga', description: 'Fornborg på Öland.' },
    { name: 'Lenstad borg', coordinates: { lat: 56.6236, lng: 16.55704 }, raa_number: 'Torslunda 9:1', landscape: 'Öland', parish: 'Torslunda', municipality: 'Borgholm', description: 'Fornborg på Öland.' },
    { name: 'Träbyborg', coordinates: { lat: 56.35528, lng: 16.50622 }, raa_number: 'Segerstad 22:1', landscape: 'Öland', parish: 'Segerstad', municipality: 'Mörbylånga', description: 'Fornborg på Öland.' },
    { name: 'Mossberga borg', coordinates: { lat: 56.78218, lng: 16.60013 }, raa_number: 'Högsrum 84:1', landscape: 'Öland', parish: 'Högsrum', municipality: 'Borgholm', description: 'Fornborg på Öland.' },
    { name: 'Vedby borg', coordinates: { lat: 57.21088, lng: 16.99015 }, raa_number: 'Högby 23:1', landscape: 'Öland', parish: 'Högby', municipality: 'Borgholm', description: 'Fornborg på Öland.' }
  ];

  const batchSize = 50;
  let totalImported = 0;
  let totalErrors = 0;

  for (let i = 0; i < hillfortsData.length; i += batchSize) {
    const batch = hillfortsData.slice(i, i + batchSize);
    
    // Prepare data for insertion
    const insertData = batch.map(hillfort => ({
      name: hillfort.name || 'Namnlös fornborg',
      coordinates: `(${hillfort.coordinates.lng},${hillfort.coordinates.lat})`,
      raa_number: hillfort.raa_number,
      landscape: hillfort.landscape,
      parish: hillfort.parish,
      municipality: hillfort.municipality,
      description: hillfort.description,
      status: hillfort.status || 'confirmed',
      country: 'Sweden',
      fortress_type: 'hillfort'
    }));

    try {
      const { data, error } = await supabase
        .from('swedish_hillforts')
        .upsert(insertData, { 
          onConflict: 'raa_number',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.error(`Error importing batch ${Math.floor(i/batchSize) + 1}:`, error);
        totalErrors += batch.length;
      } else {
        totalImported += data?.length || batch.length;
        console.log(`Successfully imported batch ${Math.floor(i/batchSize) + 1}: ${data?.length || batch.length} hillforts`);
      }
    } catch (error) {
      console.error(`Error importing batch ${Math.floor(i/batchSize) + 1}:`, error);
      totalErrors += batch.length;
    }

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`Bulk import completed: ${totalImported} imported, ${totalErrors} errors`);
  return { imported: totalImported, errors: totalErrors };
};