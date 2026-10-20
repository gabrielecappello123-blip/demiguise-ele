# Revisione editoriale indipendente — 20 ottobre 2026

## Perimetro

Letto `docs/EXPANSION.md`; esaminati `content/main-missions.js`, `content/side-missions.js`, `content/demiguise.js` e `content/puzzles.js`. Campione mirato di 15 schede, scelto per enigmi che possono bloccare la progressione, conseguenze permanenti e orientamento nelle stanze. Non sono state riviste le 99 schede pratiche/sblocchi dell’autore di questo controllo. Nessun file di contenuto è stato modificato durante la revisione.

Questa è una verifica documentale e di azionabilità delle istruzioni, non una prova in gioco su Nintendo Switch 2. Il controllo del filtro casata, della ricerca e dei progressi nel browser appartiene al collaudo principale.

## Difetti materiali da correggere

### R1 — Nome errato dell’incantesimo negli enigmi

**Priorità: media; correzione globale prima del rilascio.** `content/puzzles.js` usa **Repulso** in 15 record, mentre la stringa italiana del gioco è **Depulso**, già corretta nei moduli missioni e sblocchi. L’incoerenza interessa anche i requisiti e rende meno affidabile la ricerca di ciò che serve. Anche `docs/research/puzzles.md`, paragrafo Localizzazione, dichiara erroneamente Repulso come nome verificato.

Record interessati: `merlin-sfera`, `merlin-ford-04`, `merlin-hogsmeade-02`, `merlin-south-03`, `merlin-south-07`, `merlin-south-12`, `merlin-south-15`, `merlin-valley-02`, `merlin-valley-10`, `merlin-valley-15`, `merlin-feldcroft-11`, `merlin-poidsear-07`, `merlin-poidsear-08`, `merlin-marunweem-02`, `merlin-clagmar-01`.

Riscontro: [scheda italiana Depulso](https://hogwarts.th.gl/it/db/spells/spell_Depulso) e [guida italiana degli incantesimi](https://multiplayer.it/soluzioni/hogwarts-legacy-come-ottenere-tutti-incantesimi-quali-sono-piu-forti.html).

### R2 — Rookwood: mancano azioni sulla runa del ponte

**Priorità: media; rischio concreto di rimanere bloccati.** `content/main-missions.js`, `main-prc-01`, sesto elemento di `steps` (“Quarto…”): il testo passa dai guardiani alla cassa senza dire di attraversare dal lato blu e colpire la runa per ruotare il ponte. Dopo essere saliti manca anche il nuovo colpo sulla runa che orienta il ponte verso il seguito del percorso. Il pannello tratta sfere e nemici invisibili, non queste azioni; la sola fotografia è del primo enigma.

Correzione circoscritta: inserire le due attivazioni della runa e specificare il lato blu prima della prima. Nel terzo enigma chiarire anche la rotazione iniziale dell’arco: “gira di nuovo” presuppone un’azione non esplicitata per quella stanza.

Riscontro: [PowerPyx, Charles Rookwood’s Trial](https://www.powerpyx.com/hogwarts-legacy-charles-rookwoods-trial-walkthrough/), sezione della piattaforma rotante e passaggi della cassa dopo i due guardiani.

### R3 — Negozio infestato: due sequenze delle lanterne troppo compresse

**Priorità: media; completare il pannello esistente.** `content/side-missions.js`, `q-sny-01`, pannello “Atrio: lanterne e scacchiera”: “passa fra le due porte” non identifica quale usare per prima, la seconda barricata e il ricollocamento della lanterna. Dopo la scacchiera manca il ritorno nella stessa stanza e il nuovo spostamento della lanterna, necessario a trovare quella da portare al portone. La scheda non contiene fotografie che permettano di recuperare queste informazioni.

Correzione circoscritta: nel ramo sinistro distinguere prima porta → barricata → lanterna → ritorno → seconda porta; nel destro aggiungere il ricollocamento dopo la scacchiera. I percorsi sono già nei pannelli corretti: non occorre aggiungere sezioni o anticipare il finale.

Riscontro: [PowerPyx, Minding Your Own Business](https://www.powerpyx.com/hogwarts-legacy-minding-your-own-business-walkthrough/), sezione “Explore the atrium”; [GameSpot](https://www.gamespot.com/gallery/hogwarts-legacy-how-to-complete-minding-your-own-business-hogsmeade-quest/2900-5456/) conferma la struttura a due rami. La vecchia esclusività PlayStation nell’introduzione PowerPyx è obsoleta e non è stata ripresa nel sito.

### R4 — Sette Demiguise senza immagine della stanza

**Priorità: media rispetto alla richiesta fotografica; le posizioni testuali restano utilizzabili.** La richiesta specifica è poter riconoscere la stanza e il punto dove si trova la statuetta. Nei dati, sette lune hanno soltanto `kind: entrance`: `dm-hm-tomes-house`, `dm-hm-pippin-house`, `h4`, `h6`, `dm-world-marunweem`, `dm-world-bainburgh`, `dm-world-cragcroft`. Per esempio `h6` apre la foto dell’edificio, non il tavolino sotto il quadro indicato nel testo.

Aggiungere una fotografia interna verificata, mantenendo l’esterno come riferimento se utile. Non presentare un’immagine esterna come foto della stanza. Le altre 23 lune del mondo hanno già un riferimento interno secondo i metadati.

## Campione verificato

| Scheda | Verifica | Esito |
|---|---|---|
| `main-fgt-01` | Portale blu/rosso, ultima coppia di piattaforme, colore delle sfere | Sintesi utilizzabile; passaggi coerenti con PowerPyx. |
| `main-prc-01` | Casse/pilastri e ponte rotante | R2: azioni sulla runa mancanti. |
| `main-gt01-01` | Porte a falene, piattaforma finale, falena sul pilastro secondario | Coerente con PowerPyx; non confonde la falena del meccanismo con le tre della porta. |
| `main-fgs-01` | Scudi del boss e conseguenze della scelta finale | EIP conferma conseguenza narrativa senza nuovo potenziamento. Titolo neutro e pannello spoiler appropriati. |
| `q-com-24` | Tre stanze di Herodiana e ripristino nella terza | Sequenza coerente, con quattro foto contestuali. |
| `q-com-38` | Ordine delle otto campane | Corrisponde a 2–5–7–6–5–9–8–6 numerando dal basso; PC Gamer conferma. |
| `q-sny-01` | Biblioteca, atrio, lanterne, finale | R3: due passaggi dell’atrio omessi. Finale correttamente separato. |
| `q-evl-01` | Entrambe le risposte che insegnano Crucio | Confermate da GameWith; corretto non imporre di lanciarlo sul compagno. |
| `q-evl-conv-07` | Denuncia e insegnamenti mancanti | Conseguenza persistente corretta; avviso prima della scelta, rivelazione nel pannello. |
| `q-com-12` | Cinque punti di immersione e ricompensa | PowerPyx conferma l’ultimo punto; conseguenze e oggetto collegato distinti. |
| `dm-hw-north` | Uscita Nord, porta sotto la scala, cassa | Coerente con PC Gamer e Multiplayer.it. |
| `h5` | Negozio/locale comunicante, luna sul bancone | Coerente con riferimento italiano; percorso breve e specifico. |
| `h6` | Casa dietro Mielandia, serratura I, punto interno | Indicazioni testuali coerenti; R4 sulla foto solo esterna. |
| `merlin-forest-01` | Tre bracieri e direzioni locali | GameClubz conferma est della Tomba di Cornacchia e tre direzioni. Metodo comune esplicita l’ordine di altezza. |
| `merlin-clagmar-01` | Sciami e montacarichi | Emmie Jacob conferma meccanismo e passaggio Lumos/Depulso; R1 sul nome italiano. |

Fonti di confronto ulteriori: [Percival Rackham](https://www.powerpyx.com/hogwarts-legacy-percival-rackhams-trial-walkthrough/), [Urtkot](https://www.powerpyx.com/hogwarts-legacy-the-helm-of-urtkot-walkthrough/), [Herodiana](https://www.powerpyx.com/hogwarts-legacy-the-hall-of-herodiana-walkthrough/), [campane](https://www.pcgamer.com/hogwarts-legacy-solved-by-the-bell-musical-map/), [Crucio](https://gamewith.net/hogwarts-legacy/article/show/38002), [Sebastian](https://progameguides.com/hogwarts-legacy/should-you-turn-in-sebastian-in-hogwarts-legacy/), [scelta conclusiva](https://eip.gg/hogwarts-legacy/guides/the-final-repository/), [Astrolabio](https://www.powerpyx.com/hogwarts-legacy-the-lost-astrolabe-walkthrough/), [Demiguise PC Gamer](https://www.pcgamer.com/hogwarts-legacy-demiguise-statues-moons-locations/), [Demiguise Multiplayer.it](https://multiplayer.it/soluzioni/hogwarts-legacy-dove-trovare-statuette-demiguise-potenziare-alohomora.html), [Foresta Proibita](https://www.gameclubz.com/hogwarts-legacy-forbidden-forest-merlin-trials/), [varianti Merlino](https://emmiejacob.com/hogwarts-legacy-all-95-merlin-trials-map-table-list/).

## Copertura, spoiler e profili

- Nello snapshot esaminato: 46 principali, 82 secondarie/relazioni, 30 lune del mondo + 3 introduttive + scheda Demiguise, 95 Prove di Merlino + introduzione + 9 metodi. Quindi 267 record complessivi nei quattro moduli. Il numero 96 nell’export `PUZZLES` include l’introduzione, non una prova duplicata.
- Nessun record privo di istruzioni o fonti. Le prove ripetitive hanno posizione e metodo comune collegato: non sono semplici segnaposto “risolvi l’enigma”. I problemi di azionabilità individuati sono i passaggi circoscritti R2 e R3.
- Le quattro varianti iniziali hanno il valore `house` appropriato. I dati distinguono correttamente Grifondoro e Serpeverde; questo non certifica da solo il comportamento del selettore nel browser.
- I titoli neutri esaminati separano `officialTitle` e titolo di elenco; scelta finale e destino di Sebastian sono nei pannelli `spoiler: true`. Non emersa una fuga narrativa materiale nei titoli/riassunti del campione.
- Le lune introduttive sono separate dalle 30 e dalle consegne 9 + 13. Nessuna luna ha requisito III. Gli ID legacy sono ancora presenti.
- La revisione non trasforma i conteggi in una promessa di censimento generale al 100%: quel percorso resta rinviato dal mandato.

## Fonti, prosa e immagini

Nel medesimo snapshot: **305 URL di fonte distinti, 663 riferimenti**, nessuna scheda senza fonte; **251 riferimenti a immagini, 169 URL/percorso immagine distinti**. I riusi fotografici sono in gran parte mappe regionali, non 251 screenshot diversi.

Nei 15 casi letti, le istruzioni sono riassunti operativi italiani, non paragrafi copiati dagli articoli inglesi. Un confronto testuale normalizzato fra tutte le istruzioni Demiguise e l’articolo Multiplayer.it non ha trovato sequenze identiche di almeno nove parole; questo è un controllo limitato, non una certificazione dell’intero corpus. I nomi propri e le meccaniche comuni non sono stati considerati indizi di copia.

I crediti fotografici e i collegamenti di provenienza sono presenti nei campioni. La verifica qui eseguita riguarda pertinenza e riconoscibilità dei riferimenti, non l’attribuzione di licenze che non risultano documentate. Non sono stati aggiunti screenshot generati, citazioni estese o nuovo materiale copiato.

## Chiusura dei rilievi prima della pubblicazione

- R1: tutti i testi e il registro Merlino uniformati a Depulso.
- R2: Rookwood, terzo enigma esplicitato e pannello quarto enigma con entrambe
  le attivazioni della runa, cassa e ponte; doppia fonte verificata.
- R3: biblioteca/atrio completati in 7/8 passaggi, con quattro foto contestuali.
- R4: aggiunte sette foto interne PowerPyx controllate; 30/30 lune del mondo
  hanno ora un'immagine della stanza. Corretto Bainburgh sulla seduta della poltrona.

Controlli automatici aggiornati: 87/87 frontend, 20/20 backend. La revisione
resta documentale e distinta dalle prove effettive del sito e dalla console fisica.
