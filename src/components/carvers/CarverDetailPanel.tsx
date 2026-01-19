
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Calendar, ExternalLink, BookOpen, FileText } from 'lucide-react';
import { useCarverData } from '@/hooks/useCarverData';

interface CarverDetailPanelProps {
  carverId: string;
  onBack: () => void;
  onInscriptionClick?: (inscription: any) => void;
}

export const CarverDetailPanel: React.FC<CarverDetailPanelProps> = ({
  carverId,
  onBack,
  onInscriptionClick
}) => {
  const { carvers, isLoading } = useCarverData();
  
  const carver = carvers.find(c => c.id === carverId);

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="text-white">Laddar...</div>
        </CardContent>
      </Card>
    );
  }

  if (!carver) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="text-white">Runristare hittades inte</div>
          <Button onClick={onBack} className="mt-2">Tillbaka</Button>
        </CardContent>
      </Card>
    );
  }

  const formatPeriod = (start: number | null, end: number | null) => {
    if (!start && !end) return 'Okänd period';
    if (start && end) return `${start}-${end}`;
    if (start) return `från ${start}`;
    if (end) return `till ${end}`;
    return 'Okänd period';
  };

  const getCarverBiography = (carverName: string) => {
    // This would eventually come from the database, but for now we'll have specific biographies
    if (carverName.toLowerCase().includes('öpir') || carverName.toLowerCase().includes('opir')) {
      return {
        title: "Öpir",
        subtitle: "svensk runristare",
        image: null,
        mainText: `Öpir, (nysvensk normalisering Öpe), eller Ofeig Öpir som troligen var hans epitet, var verksam som runristare under 1000-talets senare hälft, vilket är den mest aktiva perioden av stenresning i Mellansverige. Han är en av de runmästare som efterlämnat allra flest verk, omkring åttio stycken varav de flesta är signerade.`,
        sections: [
          {
            title: "Namnet",
            content: `Namnet skrivs, i translittererad form, ubiR, ybiR eller ybir i olika runinskrifter. Namnet är en ija‑stam, och skulle med ljudlagsenlig normalisering återges Öpe på nysvenska med accent 2.`
          },
          {
            title: "Historia",
            content: `Enligt forskare som Franz Herschend och Bo Gräslund spänner de olika Öpirstenarnas datering över åren 1010–1130. Enligt Otto von Friesen genomförde den uppländska kyrkan i detta skede en territoriell organisation med sockenindelning i hela landskapet och Öpirs stenar - alla av röd sandsten, restes som griftvårdar på de allra äldsta kyrkogårdarna. De flesta av hans ristningar finns i östra och södra Uppland men några förekommer även i Östergötland och Södermanland.

Öpir har utelämnat inledande h-ljud på ett par av sina stenar, en dialektal variant som idag förekommer i roslagsdialekten, men fram till 1800-talet var vanligt i dalmålet och under medeltiden förekom i stora delar av Uppland. Hans texter är i regel kortfattade medan större möda lagts på ornamentiken, vars kompositioner visar på en mycket säker och elegant linjeföring. Motiven består i regel av ett rundjur i två eller tre rundlagda slingor som är omslingrade av mindre ormar.`
          },
          {
            title: "Namnets betydelse",
            content: `Hans namn betyder ordagrant roparen (av verbet öpa, skrika), alltså gaphalsen, och skulle kunna vara ett öknamn. En nyare tolkning, av runologen Marit Åhlén, är dock att det snarare handlar om ett mer hedrande namn: roparen ska då förstås som "kungöraren" eller "härolden"; den som förmedlar ett budskap. Öpirs dopnamn var dock Ofeig vilket också står ristat på Marmastenen i Funbo socken.`
          },
          {
            title: "Forskning",
            content: `Enligt Marit Åhlén är Öpir i själva verket flera olika runristare, en teori som senare flera runforskare anslutit sig till. En Ubir skulle höra till 1000-talet, medan en Ybir varit verksam under slutet av 1000-talet och början av 1100-talet. Magnus Källström har räknat med åtminstone två olika Öpir, en uppländsk och en sörmländsk.

Öpirs rika produktion har varit föremål för specialstudier och det har bland annat föreslagits att de stenar som bär hans namn i själva verket är produkter av en kringresande verkstad, ett företag med flera anställda ristare och att mästaren själv bara signerat stenarna och endast i undantagsfall knackat med huggjärn och mejsel.`
          }
        ]
      };
    }
    
    if (carverName.toLowerCase().includes('livsten')) {
      return {
        title: "Livsten",
        subtitle: "uppländsk runristare",
        image: null,
        mainText: `Livsten var en uppländsk runristare, verksam cirka 1030–1050 i västra och sydvästra Uppland samt i Salatrakten. 18 ristningar tillskrivs Livsten, varav fyra är signerade. Livstens ristningar kännetecknas av ett stort fyrfotadjur med utdragna lemmar och en ringlande ornamentik.`,
        sections: [
          {
            title: "Konstnärlig stil",
            content: `Livstens ristningar kännetecknas av ett stort fyrfotadjur med utdragna lemmar och en ringlande ornamentik. Tårna är ofta väl markerade och svansen är ofta delad och riktad framåt och uppåt mellan bakbenen. Denna särpräglade stil gör hans arbeten lätta att identifiera.`
          },
          {
            title: "Verksamhetsområde och tid",
            content: `Livsten var verksam cirka 1030–1050 i västra och sydvästra Uppland samt i Salatrakten. Hans verksamhetsperiod faller inom den intensiva fasen av runstensresning i Mellansverige under 1000-talet.`
          },
          {
            title: "Relationer till andra runristare",
            content: `En lärjunge till Livsten var Balle, som senare blev en framstående runristare i egen rätt. Livsten anses själv ha varit en yngre medhjälpare till Tidkume, vilket visar på en tydlig tradition och lärlingsordning bland runristarna.`
          },
          {
            title: "Produktion och signatur",
            content: `18 ristningar tillskrivs Livsten totalt, varav fyra är signerade. Detta visar på en betydande produktion för en runristare från denna period. Hans signaturer varierar något i form men innehåller vanligen hans namn "lifsten" eller varianter thereof.`
          }
        ]
      };
    }
    
    if (carverName.toLowerCase().includes('balle')) {
      return {
        title: "Balle",
        subtitle: "runristare",
        image: null,
        mainText: `Balle var en runristare som levde under senare hälften av 1000-talet. Ett fyrtiotal av hans ristningar är bevarade, varav ett tjugotal är signerade. De finns i Västmanland, sydvästra Uppland och norra Södermanland. En del av Balles runstenar har text på vers, till exempel Ågerstastenen. Han anses ha varit lärjunge till Livsten och han arbetade i en ornamenterad stil, rikligt försedd med bild- och mönstervariationer. Det är osäkert om Balle och Balle den röde ("Röd-Balle"), som ristat två stenar vid Lilla Kyringe och Hassmyra i Västmanland, är samma person.`,
        sections: [
          {
            title: "Altunastenen",
            content: `Ett berömt verk av Balle är Altunastenen vid Altuna kyrka i Uppland. Den restes till minnet av Holmfast och hans son Arnfast som blev innebrända. Här illustreras guden Tors fiskafänge. Nedtill på stenens vänstra sida syns en man stående i en båt. Det är Tor med hammaren Mjölner, och betet som han håller ner i vattnet är ett oxhuvud från en av Hymers oxar. Den han vill få på kroken är Midgårdsormen. Allt är åskådligt skildrat; även Tors fot som går tvärs genom båten vid den kraftiga ansträngningen finns med.`
          },
          {
            title: "Stil och teknik",
            content: `Balle arbetade i en ornamenterad stil, rikligt försedd med bild- och mönstervariationer. Han anses ha varit lärjunge till Livsten. En del av Balles runstenar har text på vers, vilket visar på hans litterära skicklighet utöver den tekniska och konstnärliga färdigheten.`
          },
          {
            title: "Verksamhetsområde",
            content: `Balles runstenar finns främst i Västmanland, sydvästra Uppland och norra Södermanland. Detta geografiska område visar på hans verksamhetsrayon under den senare hälften av 1000-talet, en av de mest aktiva perioderna för runstensresning i Mellansverige.`
          },
          {
            title: "Identitet och släktskap",
            content: `Det är osäkert om Balle och Balle den röde ("Röd-Balle"), som ristat två stenar vid Lilla Kyringe och Hassmyra i Västmanland, är samma person. Detta visar på komplexiteten i att identifiera enskilda runristare från denna period, där namn kunde vara vanliga eller där flera personer kunde dela samma namn eller epitetet.`
          }
        ]
      };
    }
    
    if (carverName.toLowerCase().includes('åsmund') || carverName.toLowerCase().includes('asmund')) {
      return {
        title: "Åsmund Kåresson",
        subtitle: "runristare",
        image: null,
        mainText: `Åsmund Kåresson, Asmundr Kara sunn, var en runristare i Uppland och hans verksamhet med centrum kring Uppsala varade från 1020-talet till seklets mitt. Hans arbetsområde sträckte sig uppifrån Gävletrakten i norr och ner till Stockholms regioner i söder.`,
        sections: [
          {
            title: "Konstnärlig stil",
            content: `Hans införande av den uppländska runstensstilen var som konstart banbrytande och utfördes med en skicklig elegans, väl anpassad efter stenens form, och med en konstnärlig säkerhet som överträffade de flesta av hans efterföljares. Ett tjugotal ristningar är signerade av Åsmund Kåresson och minst lika många osignerade kan tillskrivas honom.`
          },
          {
            title: "Historisk teori",
            content: `Vissa teorier hävdar att han är samme person som den hos Adam av Bremen omnämnde engelske klerken Osmundus, vilken installerades som biskop av kung Emund den gamle i strid med ärkebiskop Adalbert av Bremen. Teorin anses dock dåligt underbyggd.`
          },
          {
            title: "Bakgrund och utbildning",
            content: `Nyare studier av språket och ristningstekniken i Åsmunds stenar tyder på att han vuxit upp i vad som idag är Medelpad, flyttat till Uppland och därefter gått som lärling i Gästrikland, innan han sedan verkade som självständig mästare.`
          },
          {
            title: "Verksamhetsområde",
            content: `Hans verksamhet med centrum kring Uppsala sträckte sig över ett stort geografiskt område - från Gävletrakten i norr ner till Stockholms regioner i söder. Detta visar på hans betydelse och efterfrågan på hans tjänster som runristare under 1000-talets första hälft.`
          }
        ]
      };
    }
    
    // Default biography template for other carvers
    return {
      title: carverName,
      subtitle: "runristare",
      image: null,
      mainText: `${carverName} var en runristare som var verksam under vikingatiden och medeltiden. Mer detaljerad biografisk information kommer att läggas till när forskningen utvecklas.`,
      sections: [
        {
          title: "Bakgrund",
          content: "Biografisk information om denna runristare samlas in och kommer att uppdateras när mer forskning blir tillgänglig."
        }
      ]
    };
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-white">{carver.name}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              <FileText className="h-4 w-4 mr-2" />
              Översikt
            </TabsTrigger>
            <TabsTrigger value="biography" className="text-white data-[state=active]:bg-white/20">
              <BookOpen className="h-4 w-4 mr-2" />
              Biografi
            </TabsTrigger>
            <TabsTrigger value="inscriptions" className="text-white data-[state=active]:bg-white/20">
              📜 Inskriptioner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Enhanced Carver Info */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="space-y-3">
                {/* Statistics Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-white">📊 {carver.inscriptionCount}</div>
                    <div className="text-xs text-slate-300">Stenar totalt</div>
                  </div>
                  
                  <div className="space-y-2">
                    {carver.signedCount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">✍️ Signerade</span>
                        <span className="text-white font-medium">{carver.signedCount}</span>
                      </div>
                    )}
                    {carver.attributedCount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">📝 Tillskrivna</span>
                        <span className="text-white font-medium">{carver.attributedCount}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certainty Status */}
                <div className="p-3 rounded-lg border-l-4 border-l-green-400 bg-green-400/5">
                  <div className="text-sm">
                    {carver.certainCount === carver.inscriptionCount ? (
                      <span className="text-green-400">✅ Alla tillskrivningar är säkra</span>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-green-400">✅ {carver.certainCount} säkra tillskrivningar</div>
                        {carver.uncertainCount > 0 && (
                          <div className="text-yellow-400">⚠️ {carver.uncertainCount} osäkra tillskrivningar</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Research Notes */}
                {carver.description && (
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <div className="text-sm text-slate-300">
                      <span className="text-blue-400 font-medium">🔍 Forskning:</span>
                      <p className="mt-1 italic">"{carver.description}"</p>
                    </div>
                  </div>
                )}
                
                {/* Period and Location */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {carver.period_active_start && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatPeriod(carver.period_active_start, carver.period_active_end)}
                    </div>
                  )}
                  
                  {carver.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {carver.region}{carver.country && `, ${carver.country}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="biography" className="mt-4">
            {(() => {
              const biography = getCarverBiography(carver.name);
              return (
                <div className="space-y-4">
                  {/* Biography Header */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-1">{biography.title}</h2>
                    <p className="text-slate-300 italic mb-3">{biography.subtitle}</p>
                    <p className="text-slate-200 leading-relaxed">{biography.mainText}</p>
                  </div>

                  {/* Biography Sections */}
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {biography.sections.map((section, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/20 pb-2">
                            {section.title}
                          </h3>
                          <div className="text-slate-200 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              );
            })()}
          </TabsContent>

          <TabsContent value="inscriptions" className="mt-4">
            {/* Enhanced Inscriptions List */}
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                📜 Runinskriptioner ({carver.inscriptionCount})
              </h4>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {carver.carverInscriptions?.map((carverInscription, index) => (
                    <div
                      key={`${carverInscription.carverid}-${carverInscription.inscriptionid}-${index}`}
                      className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                      onClick={() => onInscriptionClick?.(carverInscription.inscription)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="text-white font-medium">{carverInscription.inscription.signum || 'Okänt signum'}</h5>
                            
                            {/* Attribution badges */}
                            <div className="flex gap-1">
                              {carverInscription.attribution === 'signed' ? (
                                <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
                                  ✍️ Signerad
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  📝 Tillskriven
                                </Badge>
                              )}
                              
                              {carverInscription.certainty ? (
                                <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                                  ✅ Säker
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-400">
                                  ⚠️ Osäker
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {carverInscription.inscription.location && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                              <MapPin className="h-3 w-3" />
                              {carverInscription.inscription.location}
                            </div>
                          )}
                          
                          {carverInscription.notes && (
                            <div className="mt-2 text-xs text-slate-300 italic p-2 bg-white/5 rounded border-l-2 border-blue-400/50">
                              💬 {carverInscription.notes}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-2">
                          {carverInscription.inscription.coordinates && (
                            <Badge variant="outline" className="text-xs">
                              🗺️ På karta
                            </Badge>
                          )}
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-slate-400 py-4">
                      <p>Inga inskriptioner att visa</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
