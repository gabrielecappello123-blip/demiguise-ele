# Demiguise: ricerca, copertura e provenienza

Verifica editoriale online: 20 ottobre 2026. Implementazione: `content/demiguise.js`.

## Copertura e modello dei progressi

- 30 posizioni del mondo: 10 Hogwarts, 9 Hogsmeade, 11 villaggi.
- 3 posizioni introduttive separate, collegate a «Il custode della Luna storta».
- Il contatore delle 30 non incorpora le tre del tutorial. Nessuna partenza precompilata per Ele.
- Consegne: 9 lune nuove per Alohomora II, altre 13 per III; 22 complessive del mondo, 8 ulteriori facoltative.
- Raccolta, consegna, livello appreso e completamento missione sono stati differenti. Nessuno va desunto dalla consultazione della guida.
- `lock` è il livello minimo della serratura del percorso: 0, 1, 2. Il filtro di accesso è cumulativo (`lock <= livello`); III non aggiunge lune.
- I numeri attuali nel catalogo sono 10 senza serratura, 13 con I, 7 con II. Le discrepanze residue sono documentate sotto.
- Non sono stati letti né modificati salvataggi reali del gioco. Le fonti sono soprattutto PC/PlayStation, non una prova su hardware Nintendo Switch 2; i comandi nella guida evitano glifi specifici di altre piattaforme.

## Compatibilità

Non rinominare gli ID: il loro significato è parte del contratto dei progressi.

| ID conservato | Posizione |
| --- | --- |
| h1 | Tomi e Pergamene |
| h2 | Testa di Porco |
| h3 | Tre Manici di Scopa |
| h4 | Casa a est dei Tre Manici di Scopa |
| h5 | Locale comunicante con Stratchy & Sons |
| h6 | Casa dietro Mielandia |
| h7 | Casa di fronte a Fiera delle Fiere |
| u1 | Casa a Upper Hogsfield, a ovest del pozzo |
| b1 | Aula di Divinazione; posizione normale di Hogwarts, non «bonus» |

## Localizzazione italiana

Nomi confrontati con Multiplayer.it, Player.it e, per la missione introduttiva, Aranzulla. Utilizzati «Aula di Divinazione», «Aula di Babbanologia», «Torre del Corpo Docente», «Uscita Nord di Hogwarts», «Cortile degli Animali», «Abbigliamento per maghi Stratchy & Sons», «Fiera delle Fiere» e «Mielandia». Il refuso «Melandia» incontrato in una fonte non viene riprodotto. I nomi dei villaggi rimangono quelli presenti anche nelle guide italiane; nessuna traduzione inventata di Upper/Lower Hogsfield, Pitt-Upon-Ford, ecc.

## Disaccordi fra fonti e decisioni

Le guide non sono tutte coerenti. Non si tratta di una conferma sperimentale di varianti casuali o specifiche Switch 2.

| Posizione | Dato adottato | Evidenza e limite |
| --- | --- | --- |
| Bainburgh | II | Multiplayer, GameWith, corpo e didascalia GamerGuides, GameSpot e XboxAchievements indicano II. PowerPyx e PGG indicano I. II è la scelta prudente per il percorso; manca ancora una cattura Switch 2 leggibile della serratura. Non classificare questa discrepanza come definitivamente risolta. |
| Brocburrow | I | Guides4Gamers, GameWith, Pandallax e Fandom indicano I; altri omettono la serratura, alcune testimonianze dicono II. Non si consiglia un passaggio attraverso il muro. |
| Marunweem | I | PGG, Guides4Gamers, GameWith e Pandallax indicano I. L'omissione in altre guide non è stata interpretata come prova di porta aperta. |
| Lower Hogsfield | 0 | PC Gamer, Multiplayer, Player, Push Square e descrizioni/video concordano su ingresso senza requisito; alcune liste secondarie indicano I. |
| Pitt-Upon-Ford | 0 | Descrizioni e video prevalenti mostrano casa aperta; evitata la generalizzazione «tutte le case richiedono Alohomora». |
| Cragcroft | 0 | PowerPyx descrive esplicitamente ingresso aperto; le altre descrizioni del percorso non richiedono un incantesimo. PGG riporta I. |

Everyeye include indicazioni III per alcune lune e dettagli non coerenti con le altre guide. Usata soltanto per riferimenti di stanze corroborati, non per il livello delle serrature. La guida GamesRadar elenca anche posizioni/nomi duplicati o ambigui: non usata per la lista canonica. Il titolo di Tom's Hardware parla di 31, mentre la lista e le altre fonti riportano 30: quel totale non è stato ripreso.

## Catalogo

Le istruzioni sono brevi, riscritte in italiano e confrontate fra fonti. Le fonti specifiche sono salvate in ogni scheda. I nomi dei file seguono la numerazione Multiplayer, non l'ordine dell'interfaccia.

| ID | Luogo | Serratura | Immagine |
| --- | --- | --- | --- |
| `dm-hw-fig` | Hogwarts · Studio del professor Fig | 0 | `assets/demiguise/01.jpg` |
| `dm-hw-muggle` | Hogwarts · Aula di Babbanologia | 1 | `assets/demiguise/02.jpg` |
| `dm-hw-dada` | Hogwarts · Stanza dei gargoyle | 2 | `assets/demiguise/03.jpg` |
| `b1` | Hogwarts · Aula di Divinazione | 0 | `assets/demiguise/07.jpg` |
| `dm-hw-library` | Hogwarts · Reparto Proibito | 0 | `assets/demiguise/08.jpg` |
| `dm-hw-potions` | Hogwarts · Ripostiglio sotto l’Aula di Pozioni | 2 | `assets/demiguise/09.jpg` |
| `dm-hw-north` | Hogwarts · Stanza sotto le mura | 1 | `assets/demiguise/04.jpg` |
| `dm-hw-howin` | Hogwarts · Ufficio della professoressa Howin | 2 | `assets/demiguise/05.jpg` |
| `dm-hw-hall` | Hogwarts · Salottino della Sala Grande | 1 | `assets/demiguise/06.jpg` |
| `dm-hw-bathroom` | Hogwarts · Bagno fuori servizio | 1 | `assets/demiguise/10.jpg` |
| `h1` | Hogsmeade · Tomi e Pergamene | 0 | `assets/demiguise/11.jpg` |
| `dm-hm-tomes-house` | Hogsmeade · Casa vicino a Tomi e Pergamene | 2 | `assets/demiguise/12.jpg` |
| `h2` | Hogsmeade · Testa di Porco | 0 | `assets/demiguise/13.jpg` |
| `dm-hm-pippin-house` | Hogsmeade · Casa accanto a Pozioni di J. Pippin | 2 | `assets/demiguise/14.jpg` |
| `h3` | Hogsmeade · Tre Manici di Scopa | 1 | `assets/demiguise/15.jpg` |
| `h4` | Hogsmeade · Casa a est dei Tre Manici di Scopa | 1 | `assets/demiguise/16.jpg` |
| `h5` | Hogsmeade · Stratchy & Sons · locale comunicante | 0 | `assets/demiguise/17.jpg` |
| `h7` | Hogsmeade · Casa di fronte a Fiera delle Fiere | 1 | `assets/demiguise/18-room.jpg` |
| `h6` | Hogsmeade · Casa dietro Mielandia | 1 | `assets/demiguise/19.jpg` |
| `dm-world-pitt` | Pitt-Upon-Ford · Pitt-Upon-Ford · casa con carrozza | 0 | `assets/demiguise/20-room.jpg` |
| `u1` | Upper Hogsfield · Upper Hogsfield · casa vicino al pozzo | 1 | `assets/demiguise/21-room.jpg` |
| `dm-world-aranshire` | Aranshire · Aranshire · casa accanto alla Metropolvere | 1 | `assets/demiguise/22-room.jpg` |
| `dm-world-lower` | Lower Hogsfield · Lower Hogsfield · casa all’ingresso | 0 | `assets/demiguise/23-room.jpg` |
| `dm-world-brocburrow` | Brocburrow · Brocburrow · casa vicino al pozzo | 1 | `assets/demiguise/24-room.jpg` |
| `dm-world-keenbridge` | Keenbridge · Keenbridge · casa con le zucche | 1 | `assets/demiguise/25-room.jpg` |
| `dm-world-irondale` | Irondale · Irondale · casa di Althea Twiddle | 0 | `assets/demiguise/27-room.jpg` |
| `dm-world-feldcroft` | Feldcroft · Feldcroft · casa a est del pozzo | 2 | `assets/demiguise/26-room.jpg` |
| `dm-world-marunweem` | Marunweem · Marunweem · casa vicino alla bacheca | 1 | `assets/demiguise/28.jpg` |
| `dm-world-bainburgh` | Bainburgh · Bainburgh · casa a nord del villaggio | 2 | `assets/demiguise/29.jpg` |
| `dm-world-cragcroft` | Cragcroft · Cragcroft · casa del mercante | 0 | `assets/demiguise/30.jpg` |

## Immagini

Tutte le immagini sono schermate di gioco pubblicate dalle fonti indicate, non ricostruzioni generate. Multiplayer: 800 px di larghezza. PC Gamer: ridimensionamento proporzionale a 1200×675, JPEG qualità 84; nessun taglio dello scenario, nessun dettaglio di gioco inventato. Credito e link alla pagina di origine sono nel dato `photos`.

Controllo visivo effettuato sui 30 originali Multiplayer e sui 9 interni PC Gamer. Le immagini PC Gamer selezionate mostrano effettivamente la statuetta, il mobile e il contesto della stanza. Per 7 schede restano fotografie dell'edificio o edificio + mappa: case vicino Tomi, Pippin, est Tre Manici, dietro Mielandia; Marunweem, Bainburgh, Cragcroft. Il campo `photos[].kind` e il testo alternativo distinguono queste foto esterne. Non presentarle come «foto della stanza». Le istruzioni raggiungono comunque l'oggetto. Fonti alternative di interni sono state trovate ma hanno restituito 403 al download: non sono stati aggirati blocchi né inserite immagini remote non verificabili.

Le 9 foto Multiplayer sostituite nell'interfaccia restano disponibili come riferimenti dell'edificio/mappa per futuri miglioramenti. Le tre lune introduttive hanno istruzioni senza foto: non sono state inventate schermate per riempire il pannello.

Il credito non rappresenta una dichiarazione di licenza esclusiva o di proprietà delle schermate. Mantenere l'attribuzione e preferire eventuali catture originali degli utenti in una futura sostituzione.

### File e URL originali

| File | Fonte | Byte | URL immagine |
| --- | --- | ---: | --- |
| `assets/demiguise/01.jpg` | Multiplayer.it | 56226 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_1_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/02.jpg` | Multiplayer.it | 51632 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_2_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/03.jpg` | Multiplayer.it | 51363 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_3_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/04.jpg` | Multiplayer.it | 41149 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_4_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/05.jpg` | Multiplayer.it | 44527 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_5_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/06.jpg` | Multiplayer.it | 46695 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_6_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/07.jpg` | Multiplayer.it | 50991 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_7_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/08.jpg` | Multiplayer.it | 40074 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_8_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/09.jpg` | Multiplayer.it | 61231 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_9_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/10.jpg` | Multiplayer.it | 40539 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_10_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/11.jpg` | Multiplayer.it | 46209 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_11_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/12.jpg` | Multiplayer.it | 40072 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_12b_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/13.jpg` | Multiplayer.it | 68785 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_13_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/14.jpg` | Multiplayer.it | 49781 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_14b_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/15.jpg` | Multiplayer.it | 50575 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_15_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/16.jpg` | Multiplayer.it | 50970 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_16b_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/17.jpg` | Multiplayer.it | 63942 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_17_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/18.jpg` | Multiplayer.it | 48649 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_18_2_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/19.jpg` | Multiplayer.it | 51525 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_19_1_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/20.jpg` | Multiplayer.it | 58477 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_20_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/21.jpg` | Multiplayer.it | 62214 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_21_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/22.jpg` | Multiplayer.it | 48738 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_22_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/23.jpg` | Multiplayer.it | 59551 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_23_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/24.jpg` | Multiplayer.it | 66723 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_24_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/25.jpg` | Multiplayer.it | 55956 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_25_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/26.jpg` | Multiplayer.it | 61055 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_26_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/27.jpg` | Multiplayer.it | 59842 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_27_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/28.jpg` | Multiplayer.it | 46451 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_28_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/29.jpg` | Multiplayer.it | 53406 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_29_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/30.jpg` | Multiplayer.it | 58658 | https://multiplayer.net-cdn.it/thumbs/images/2023/02/19/demiguise_30_jpg_800x0_crop_upscale_q85.jpg |
| `assets/demiguise/18-room.jpg` | PC Gamer / Portkey Games | 113269 | https://cdn.mos.cms.futurecdn.net/FxJRXe3skzq34j8CuYqkha.jpeg |
| `assets/demiguise/20-room.jpg` | PC Gamer / Portkey Games | 123958 | https://cdn.mos.cms.futurecdn.net/YGxkktEXy8eEc8jC6DPbb5.jpg |
| `assets/demiguise/21-room.jpg` | PC Gamer / Portkey Games | 136605 | https://cdn.mos.cms.futurecdn.net/VnjZLn4hdANY33pfp8spk5.jpg |
| `assets/demiguise/22-room.jpg` | PC Gamer / Portkey Games | 164075 | https://cdn.mos.cms.futurecdn.net/H3c4TdpGBjJHBJ6Si7BjF4.jpg |
| `assets/demiguise/23-room.jpg` | PC Gamer / Portkey Games | 139646 | https://cdn.mos.cms.futurecdn.net/mNDUSMJQABpmxNXGtPZDS5.jpg |
| `assets/demiguise/24-room.jpg` | PC Gamer / Portkey Games | 118831 | https://cdn.mos.cms.futurecdn.net/UGJ3qDvCdbRCnHXw2ggsY4.jpg |
| `assets/demiguise/25-room.jpg` | PC Gamer / Portkey Games | 134541 | https://cdn.mos.cms.futurecdn.net/tLnUhQT7rJR6pJvteJftB5.jpg |
| `assets/demiguise/26-room.jpg` | PC Gamer / Portkey Games | 134405 | https://cdn.mos.cms.futurecdn.net/GShGVKcRskhEYn8vZsyco4.jpeg |
| `assets/demiguise/27-room.jpg` | PC Gamer / Portkey Games | 132134 | https://cdn.mos.cms.futurecdn.net/9njdgSkVnzwtdAWr4QKny4.jpeg |

## Fonti consultate

Ogni scheda include le fonti pertinenti; questa lista serve alla manutenzione e al confronto degli errori.

- [Player.it · Demiguise](https://www.player.it/guide/504605-hogwarts-legacy-guida-alle-statuette-di-demiguise.html)
- [PC Gamer · posizioni e immagini](https://www.pcgamer.com/hogwarts-legacy-demiguise-statues-moons-locations/)
- [Pandallax · itinerari Demiguise](https://www.pandallax.com/guides/hogwarts-legacy-all-demiguise-locations)
- [Multiplayer.it · Demiguise](https://multiplayer.it/soluzioni/hogwarts-legacy-dove-trovare-statuette-demiguise-potenziare-alohomora.html)
- [Push Square · posizioni](https://www.pushsquare.com/guides/hogwarts-legacy-all-demiguise-statues-locations)
- [Windows Central · mappa e posizioni](https://www.windowscentral.com/gaming/all-30-hogwarts-legacy-demiguise-statue-locations-list)
- [PowerPyx · 33 statuette](https://www.powerpyx.com/hogwarts-legacy-all-demiguise-statue-locations/)
- [Pro Game Guides · Hogsmeade](https://progameguides.com/hogwarts-legacy/all-9-demiguise-statues-locations-in-hogsmeade-in-hogwarts-legacy/)
- [Gamer Guides · Highlands](https://www.gamerguides.com/hogwarts-legacy/guide/demiguise-statues/the-highlands/all-demiguise-statues-in-the-highlands-in-hogwarts-legacy/)
- [Pro Game Guides · villaggi](https://progameguides.com/hogwarts-legacy/all-11-demiguise-statue-locations-on-the-world-map-in-hogwarts-legacy/)
- [Guides4Gamers · mappa dei villaggi](https://guides4gamers.com/hogwarts-legacy/pois/demiguise-moons-world/)
- [Everyeye · itinerari](https://www.everyeye.it/notizie/hogwarts-legacy-guida-come-trovare-statue-demiguise-638924.html)
- [GameWith · mappa Demiguise](https://gamewith.net/hogwarts-legacy/article/show/37998)
- [PowerPyx · missione introduttiva](https://www.powerpyx.com/hogwarts-legacy-the-caretakers-lunar-lament-walkthrough/)
- [Aranzulla · Alohomora e missione italiana](https://www.aranzulla.it/come-aprire-le-serrature-hogwarts-legacy-1509509.html)
- [GameSpot · conferma Bainburgh II](https://www.gamespot.com/articles/hogwarts-legacy-demiguise-statue-moons-alohomora-upgrades-guide/1100-6511362/)
- [XboxAchievements · Bainburgh II](https://www.xboxachievements.com/game/hogwarts-legacy/guide/all-demiguise-statues-locations-guide)
- [100% Guides · video percorso completo](https://www.youtube.com/watch?v=4Q0GnlsIwxg)

## Verifiche ripetibili

- Import ES module valido e `node --check content/demiguise.js` superato.
- 30 lune del mondo + 3 introduttive; 33 ID unici.
- Distribuzione 10/9/11 corretta; 9 ID legacy presenti con lo stesso luogo.
- Ogni luna del mondo ha istruzioni e almeno due fonti, oltre a una fotografia locale esistente.
- Tutti i valori `lock` sono 0/1/2, nessun III inventato.
- Le fotografie sono apribili localmente; nessun caricamento a pagamento o chiamata AI.
- Test del renderer, filtri e persistenza appartengono all'integrazione dell'app, non a questo file dati.

## Integrazione finale delle immagini

Il limite delle 7 sole immagini esterne è stato risolto prima del rilascio:
7 fotografie interne PowerPyx da 1200×675 sono state scaricate e confrontate
visivamente. Tutte le 30 lune del mondo hanno ora una foto interna con la
statuetta. Le 7 immagini esterne restano come secondo riferimento.
Provenienza in `assets/demiguise/room-photo-sources.json`.
46 immagini, 3.575.104 byte complessivi. Corretto Bainburgh: statuetta sulla
seduta della poltrona, come mostra la foto. Il disaccordo sulla serratura I/II
rimane registrato; filtro prudente II, nessuna luna richiede III.
