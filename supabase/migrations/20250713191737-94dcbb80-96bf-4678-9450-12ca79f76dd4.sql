-- Add detailed Bornholm runestones (DK Bh series)
INSERT INTO runic_inscriptions (
  signum, name, name_en, transliteration, normalization, translation_sv, translation_en,
  location, parish, province, country, coordinates, period_start, period_end,
  dating_text, object_type, material, current_location, data_source,
  scholarly_notes, historical_context, created_at
) VALUES

-- DK Bh 1: Klemensker-sten 1
('DK Bh 1', 'Klemensker-sten 1', 'Klemensker stone 1', 
'(kun)iltr : l(e)t : r(e)isa : st(e)n : þ(e)n(sa) : ef tir : auþbiarn : bonta : sin : kristr : hialbi : siolu : auþbiarnar : i lus : auk : bratis kristr : hialbi : siolu : (auþ) biarnar : auk : ku(niltar) : auk : santa mikel : i lius : auk : baratis',
'Gunild lēt reisa stēn þenna eftir Auðbjǫrn bōnda sinn. Kristr hjalpi sālu Auðbjarnar ī ljōsi ok paradīsi. Kristr ok sankti Mikāēl hjalpi Auðbjarnar ok Gunilaðar sālu ī ljōsi ok paradīsi.',
'Gunhild lät resa denna sten efter Ödbjörn, sin man. Kristus hjälpe Ödbjörns själ i ljus och paradis. Kristus och Sankt Mikael hjälpe Ödbjörns och Gunhilds själ i ljus och paradis.',
'Gunhild had this stone raised in memory of Ödbjörn, her husband. May Christ help Ödbjörn''s soul in light and paradise. May Christ and Saint Michael help Ödbjörn''s and Gunhild''s souls in light and paradise.',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Klemensker område', 'Danske runeindskrifter',
'Kristen runsten med bön till Kristus och Sankt Mikael', 'Visar övergången till kristendom på Bornholm', now()),

-- DK Bh 2: Klemensker-sten 2  
('DK Bh 2', 'Klemensker-sten 2', 'Klemensker stone 2',
': brune : auk : þeiR : bruþr : let... eftiR : þurlak : foþur : sin : auk : eskiR : bruþur : sin :',
'Brūni ok þeir brǣðr lētu ... eftir Þōrlāk fǫður sinn ok Esgei brōður sinn.',
'Brune och hans bror / bröder lät ... efter Torlak, sin fader, och Esgir, sin broder',
'Brune and his brother(s) had ... (raised) in memory of Thorlak, their father, and Esgir, their brother',
'Allinge', 'Allinge', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Allinge kyrkogård', 'Danske runeindskrifter',
'Fragmentarisk inskrift', 'Familje-minnesmärke', now()),

-- DK Bh 3: Klemensker-sten 3
('DK Bh 3', 'Klemensker-sten 3', 'Klemensker stone 3',
': suenk|i|R : lit : raisa : stein : þena : eftiR : tosta : faþur : sin : auk : eftiR : alflak : broþur : sin : auk : eftiR : moþ|u|r : sina : | : auk : eftiR : sy|s|tur | sina :',
'Sveingeirr lēt reisa stein þenna eftir Tōsta fǫður sinn ok eftir Alflāk brōður sinn ok eftir mōður sīna ok eftir systur sīna.',
'Svengeir lät resa denna sten efter Toste, sin fader, och efter Alflak, sin broder, och efter sin moder och efter sin syster',
'Svengeir had this stone raised in memory of Toste, his father, and in memory of Alflak, his brother, and in memory of his mother and in memory of his sister',
'Hasle', 'Hasle', 'Bornholm', 'Danmark', point(14.733010, 55.177208), 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Korsningen Svalhøjvej och Simblegårdsvej', 'Danske runeindskrifter',
'Familje-minnesmärke för flera släktingar', 'Commemoration of multiple family members', now()),

-- DK Bh 4: Klemensker-sten 4
('DK Bh 4', 'Klemensker-sten 4', 'Klemensker stone 4',
': aulakR : let : reisa : stein : þana : eftiR : sasur : foþur sin : bonta : kuþan : kuþ : hialbi : siol : hans : auk : sata : mihel',
'Ǣlākr lēt reisa stein þenna eftir Sassur fǫður sinn bōnda gōðan. Guð hjalpi sālu hans ok sankti Mikāēl.',
'Ölak lät resa denna sten efter Sassur, sin fader, en god bonde. Gud och sakt Mikael hjälpe hans själ',
'Ölak had this stone raised in memory of Sassur, his father, a good farmer. May God and Saint Michael help his soul',
'Hasle', 'Hasle', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Hasle kyrkogård', 'Danske runeindskrifter',
'Kristen runsten med bön till Gud och Sankt Mikael', 'Commemorates a farmer, shows Christian influence', now()),

-- DK Bh 5: Klemensker-sten 5
('DK Bh 5', 'Klemensker-sten 5', 'Klemensker stone 5',
'suin : auk : ketil : reistu : sten : eftiR : (i)u(l)k|iR : faþur : sin',
'Sveinn ok Ketill reistu stein eftir Ynglgeir fǫður sinn.',
'Sven och Ketil reste stenen efter Igulger, sin fader',
'Sven and Ketil raised the stone in memory of Igulger, their father',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1075, 1125,
'övergången mellan vikingatid och medeltid, omkring år 1075 - 1125', 'runsten', 'sten', 'Klemensker kyrka', 'Danske runeindskrifter',
'Daterad till övergångsperioden vikingatid-medeltid', 'Transition period between Viking Age and Medieval', now()),

-- DK Bh 6: Klemensker-sten 6
('DK Bh 6', 'Klemensker-sten 6', 'Klemensker stone 6',
'... (r)ais(t)- : stin : þ-nsi : aiftiR : suin : bruþur : sin : ku... ...(b)i : si(l)... | auk : kus : muþiR : ...(k)il : rist (:) runaR : þisi : auk : sueni :',
'... reist[u] stein þenna eftir Svein brōður sinn. Guð ok Guðs mōðir hjalpi sālu hans. ...kell rist rūnar þessar ok Svenni.',
'... reste denna sten efter Sven, sin bror. Gud och Guds moder hjälpe hans själ. ... kil ristade dessa runor, och Svenne.',
'... raised this stone in memory of Sven, his brother. May God and God''s mother help his soul. ...kil carved these runes, and Svenne.',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1025, 1076,
'omkring 1025 - 1076', 'runsten', 'sten', 'Klemensker kyrka', 'Danske runeindskrifter',
'Fragment med runristare Svenne', 'Fragment with rune carver Svenne mentioned', now()),

-- DK Bh 7: Klemensker-sten 8 (fragment)
('DK Bh 7', 'Klemensker-sten 8', 'Klemensker stone 8',
': asur : auk : þai(R) ...in : | : ...',
'Assurr ok þeir ...',
'Assur och ...',
'Assur and ...',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten fragment', 'sten', 'Klemensker kyrka', 'Danske runeindskrifter',
'Fragment inmurat på kyrkogårdsmuren', 'Fragment built into churchyard wall', now()),

-- DK Bh 8: Klemensker-sten 9 (fragment)
('DK Bh 8', 'Klemensker-sten 9', 'Klemensker stone 9',
'...str : auk : ...',
'... ok ...',
'... och ...',
'... and ...',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten fragment', 'sten', 'Klemensker kyrka', 'Danske runeindskrifter',
'Fragment med ristning på två sidor', 'Fragment with carving on two sides', now()),

-- DK Bh 9: Klemensker-sten 7 (ärkebiskopsstenen)
('DK Bh 9', 'Klemensker-sten 7', 'Klemensker stone 7',
'... : ærkibiskubs : m(a)-ræ : hi- : ...-r : hæ...',
'... ærkibiskups ...',
'... ärkebiskops ...',
'... archbishop''s ...',
'Klemensker', 'Klemensker', 'Bornholm', 'Danmark', NULL, 1100, 1200,
'medeltid', 'runsten fragment', 'sten', 'Klemensker kyrka', 'Danske runeindskrifter',
'Så kallad ärkebiskopssten', 'So-called archbishop stone', now()),

-- DK Bh 10: Rutsker-sten
('DK Bh 10', 'Rutsker-sten', 'Rutsker stone',
'...r : let ...t : su... | ...uþ : halb... auk : ku...',
'... lēt ... sun ... Guð hjalpi ... ok Guðs mōðir.',
'... lät ... sin son ... Gud hjälpe ... och Guds moder',
'... had ... his son ... May God help ... and God''s mother',
'Rutsker', 'Rutsker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Rutsker kyrka', 'Danske runeindskrifter',
'Rest år 2000, tidigare inmurad i kyrktornet', 'Erected in 2000, previously built into church tower', now()),

-- DK Bh 12: Rø-sten
('DK Bh 12', 'Rø-sten', 'Rø stone',
'... (f)þu : sin : uk : muþ : sinn',
'... fǫður sinn ok mōður sīna.',
'... sin far och sin mor',
'... his father and his mother',
'Rø', 'Rø', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Rø kyrka vapenhus', 'Danske runeindskrifter',
'I vapenhuset i Rø kyrka', 'In the porch of Rø church', now()),

-- DK Bh 13: Bodilsker-sten 1 (fragment)
('DK Bh 13', 'Bodilsker-sten 1', 'Bodilsker stone 1',
'...(i)R r...',
'... ...',
'-',
'-',
'Bodilsker', 'Bodilsker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten fragment', 'röd sandsten', 'Bodilsker kyrka', 'Danske runeindskrifter',
'Fragment av röd sandsten', 'Fragment of red sandstone', now()),

-- DK Bh 15: Bodilsker-sten 3
('DK Bh 15', 'Bodilsker-sten 3', 'Bodilsker stone 3',
'... þurkil : auk : alfkil : r(e)(s)... ...(e)n : þina : eftiR : eykil : faþur : ...',
'... Þorkell ok Alfkell res[tu st]ein þenna eftir Eykell fǫður ...',
'Torkil och Alvkil reste denna sten efter Ökil, deras fader ...',
'Torkil and Alvkil raised this stone in memory of Ökil, their father ...',
'Bodilsker', 'Bodilsker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Bodilsker kyrka vapenhus', 'Danske runeindskrifter',
'Tidigare inmurad i kyrktornet', 'Previously built into church tower', now()),

-- DK Bh 16: Bodilsker-sten 4
('DK Bh 16', 'Bodilsker-sten 4', 'Bodilsker stone 4',
'...-a-- (:) (l)itu : h-(-)- : s(t)ain : eftiR : þurfast : bruþur | sin | auk : kuþki',
'... lētu h[ogg]va stein eftir Þorfast brōður sinn ok Guðkā.',
'... lät hugga stenen efter Torfast, deras broder, och Gudke',
'... had the stone carved in memory of Torfast, their brother, and Gudke',
'Bodilsker', 'Bodilsker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Bodilsker kyrka torn', 'Danske runeindskrifter',
'Inmurad i Bodilskers torn', 'Built into Bodilsker tower', now()),

-- DK Bh 17: Bodilsker-sten 5
('DK Bh 17', 'Bodilsker-sten 5', 'Bodilsker stone 5',
'asbiarn : lit : rita stain iftiR : butirþu : konu : sina : kuþ : litin : ant : i',
'Asbjǫrn lēt reisa stein eftir Bōtfrīði konu sīna. Guð lætti and hennar ī ævi.',
'Asbjörn lät resa stenen efter Botfrid, sin hustru. Gud lätte hennes ande för evigt.',
'Asbjörn had the stone raised in memory of Botfrid, his wife. May God ease her spirit forever.',
'Bodilsker', 'Bodilsker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Bodilsker kyrka vapenhus', 'Danske runeindskrifter',
'Kristen runsten för hustru', 'Christian runestone for wife', now()),

-- DK Bh 27: Åker-sten 1
('DK Bh 27', 'Åker-sten 1', 'Åker stone 1',
'þurfastr : auk : þurils : auk : bufi : þiR : satu : kuml : þusi : aftiR : -... ...f : auk : buruþR : kuþ : habi : ąta : þisa : auk : kus : muþR : sartr : rist : ret',
'Þorfast ok Þōrōlf ok Bōfi þeir sǣttu kuml þessi eftir ... ok brōður. Guð hafi ǫnd þessa ok Guðs mōðir. Svartr rist rētt.',
'Torfast och Troels och Bove satte dessa minnesmärken efter ... och broder. Gud och Guds moder hjälpe deras andar. Svart ristade rätt.',
'Torfast and Troels and Bove set these monuments in memory of ... and brother. May God and God''s mother help their spirits. Svart carved correctly.',
'Åkirkeby', 'Åkirkeby', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Åkirkeby kyrka vapenhus', 'Danske runeindskrifter',
'Ristare: Svart. Känd av Ole Worm på 1600-talet', 'Carver: Svart. Known by Ole Worm in the 17th century', now()),

-- DK Bh 28: Åker-sten 2
('DK Bh 28', 'Åker-sten 2', 'Åker stone 2',
'kuþmund : auk : f(ry)biorn : resdu : stein : eiftR : isbiorn : faþur : sin : | kuþ : hialbi : siolu : hans :',
'Guðmund ok Freybjǫrn reistu stein eftir Esbjǫrn fǫður sinn. Guð hjalpi sālu hans.',
'Gudmund och Fröbjörn reste stenen efter deras fader Esbjörn. Gud hjälpe hans själ.',
'Gudmund and Fröbjörn raised the stone in memory of their father Esbjörn. May God help his soul.',
'Åkirkeby', 'Åkirkeby', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Åkirkeby kyrka vapenhus', 'Danske runeindskrifter',
'Kristen runsten, dokumenterad på 1600-talet', 'Christian runestone, documented in 17th century', now()),

-- DK Bh 29: Åker-sten 3
('DK Bh 29', 'Åker-sten 3', 'Åker stone 3',
'þurst(e)[in : let : hka | efetR : su--]- (:) koþr : | þign (:)',
'Þorsteinn lēt h[ogg]va eftir Sv[ein] gōðan þegn.',
'Torsten lät hugga efter Sven, en god tegn.',
'Torsten had (this) carved in memory of Sven, a good thane.',
'Åkirkeby', 'Åkirkeby', 'Bornholm', 'Danmark', point(14.929600, 55.062717), 1000, 1100,
'vikingatid', 'runsten', 'sten', 'Korsningen Nybyvej – Bjælkestensvejen', 'Danske runeindskrifter',
'Rest vid korsning i Åkirkeby', 'Erected at crossroads in Åkirkeby', now()),

-- DK Bh 30: Åker-font (dopfunt)
('DK Bh 30', 'Åker-font', 'Åker font',
'þita : iR : saNti gabrel : ok : sehþi : saNta mari(a) : at han sku|Ldi : barn : (f)yþa : þita : iR : elicabeþ : ok : maria : ok : hailsas | : hiar : huilis : maria sum | : han : barn : fydi : skapera : himic : ok : iorþaR : sum os : le|ysti | þita : iRu : þaiR : þriR : kunuGaR : (s)um : (f)y(r)sti : giarþu : ofr : u|arum : drotNi : hiar : tok : (h)aN (uiþ)r : (kunuG)a : o(f)ri : uar drotiN | hiar : riþu : þaiR : burt : þriR : kunuGaR : | siþan þaiR : ofra(t) : ---a : (o)rum : drotNi | þaiR : þet : hi(a)- : fram : s--(u) : (io)þaR : toku | uarn : drotin : ok --Nd- : --N : uiþ- -re : ok : (g)etu | siþan : ladu : (þa)iR : haN : burt : þiaþa(n) : buNdiN | ok : (n)ehldu : hiar : ioþaR : iesus : a krus : si : fram : a þita | sihraf(R) : (m)e--e-(i) :',
'Þetta er sankti Gabrīel ok sagði sankta Marīu at hon skyldi barn fǣða. Þetta er Elisabet ok Marīa ok heilsask. Hēr hvīlir Marīa þā hon barn fæddi, skapara himins ok jarðar er oss leysti. Þetta eru þeir þrīr konungar er fyrst gerðu offer vārum drottni. Hēr tōk hann við konunga offri, vār drottinn. Hēr rīðu þeir burt, þrīr konungar, síðan þeir offruðu vārum drottni. Þeir ... jūðar tōku vārn drottin ok bundu hann við trē ok gǣttu. Síðan leiddu þeir hann burt þaðan bundinn ok negldu. Hēr jūðar Jēsus ā kross. Sjāið fram ā þetta. Sigurðr meistari.',
'Detta är sankt Gabriel, som sade till sankta Maria, att hon skulle föda ett barn. Detta är Elisabet och Maria, som hälsar på varandra. Här vilar Maria när hon fött barnet, himlens och jordens skapare, som förlöste oss. Detta är de tre kungar som först offrade till vår Herre. Här tog han emot kungarnas offer, vår Herre. Här red de bort, de tre kungarna, sedan de offrat till vår Herre. De det här fram ... judarna tog vår Herre och band honom vid trädet och vaktade honom. Sedan ledde de honom bort därifrån bunden. Och här spikade judarna Jesus på korset. Se detta framför er. Mäster Sighref.',
'This is Saint Gabriel, who told Saint Mary that she should bear a child. This is Elisabeth and Mary, greeting each other. Here rests Mary when she bore the child, creator of heaven and earth, who redeemed us. These are the three kings who first made offerings to our Lord. Here he received the kings'' offerings, our Lord. Here they rode away, the three kings, after they had made offerings to our Lord. They ... the Jews took our Lord and bound him to the tree and watched him. Then they led him away from there bound. And here the Jews nailed Jesus to the cross. See this before you. Master Sighref.',
'Åkirkeby', 'Åkirkeby', 'Bornholm', 'Danmark', NULL, 1200, 1200,
'omkring år 1200', 'dopfunt', 'gotländsk sandsten', 'Åkirke kyrka', 'Danske runeindskrifter',
'Dopfunt med gotländska runor av Mäster Sighref', 'Baptismal font with Gotlandic runes by Master Sighref', now()),

-- DK Bh 31: Nyker-sten
('DK Bh 31', 'Nyker-sten', 'Nyker stone',
'lo.../(t)o... [l](e)t : resa : sten (:) þensa : eftir : suen : sun : sin : trenkr al(g)oþar ...una(u)i | ok | hans (:) (b)r(o)(þ)(u)r : krist : h|elgi | hal(b)(i) : siolu : þera | :: bryþra : be(g)ia :',
'Lo... lēt resa stein þenna eftir Svein sun sinn, dreng allgōðan ..., ok hans brōður. Kristr helgi hjalpi sālu þeira brǣðra beggja.',
'Lo ... lät resa denna sten efter sin son Sven, en mycket god man, och efter hans broder. Helige Krist hjälpe de bägge brödernas själar.',
'Lo... had this stone raised in memory of his son Sven, a very good man, and in memory of his brother. May holy Christ help both brothers'' souls.',
'Nyker', 'Nyker', 'Bornholm', 'Danmark', NULL, 1000, 1100,
'vikingatid/kristen tid', 'runsten', 'sten', 'Nykers kyrka vapenhus', 'Danske runeindskrifter',
'Ristare: Svart. Fragment från kyrkogården', 'Carver: Svart. Fragments from churchyard', now());