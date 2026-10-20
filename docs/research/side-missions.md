# Missioni secondarie e relazioni — verifica editoriale

Data: 20 ottobre 2026. Modulo: `content/side-missions.js`, export `SIDE_MISSIONS`.

## Copertura

82 schede canoniche: **58 secondarie e 24 relazioni** (Sebastian 9, Natty 7, Poppy 8). Le missioni obbligatorie con i compagni appartengono al catalogo principale e non vengono duplicate qui. Sono inclusi tutti i round di Bacchette incrociate, i due allenamenti, le cinque partite del Campo dell’evocatore, le tre prove della scopa e il negozio di Hogsmeade. Il conteggio della guida separa le tappe di dialogo, non riproduce il contatore delle sfide del gioco.

Riferimenti di censimento:
- https://www.powerpyx.com/hogwarts-legacy-all-side-quests-guide/
- https://hogwarts.th.gl/it/db/quests
- Inclusione del negozio nella versione Switch 2: https://www.nintendo.com/sg/games/detail.html?id=70010000108191 (descrizione ufficiale: Haunted Hogsmeade Shop Quest incluso).

Le 16 posizioni delle chiavi di Dedalo sono contenute nella scheda `q-com-19`, non in un segnaposto. Le sei Gobbiglie hanno istruzioni e fotografie. Le tre stanze di Herodiana sono risolte in `q-com-24`; le altre due stanze Depulso sono riferimenti esterni canonici. La missione di Moon è distinta dalla raccolta delle singole lune.

## Metodo e fonti

Ogni record conserva l’URL individuale della localizzazione nel database TH.GL e la guida usata per il percorso. TH.GL riproduce dati localizzati del gioco ma non è il sito dell’editore; non viene presentato come documento ufficiale di Warner Bros. Le istruzioni sono sintesi originali brevi; non sono una traduzione della prosa delle guide. Tutte le fonti riportate sono state consultate online. Nessun percorso è stato provato fisicamente su una Switch 2 in questa sessione.

Confronti mirati aggiuntivi:
- Chiavi di Dedalo: https://multiplayer.it/soluzioni/hogwarts-legacy-dove-trovare-tutte-chiavi-dedalo.html e https://www.tomshw.it/videogioco/hogwarts-legacy-chiavi-di-dedalo
- Astrolabio e compenso: https://www.gamerguides.com/hogwarts-legacy/guide/side-quests/world/keep-or-return-the-astrolabe-the-lost-astrolabe e https://www.gosunoob.com/hogwarts-legacy/lost-astrolabe-grace-choice-give-keep-or-ask-money/
- Crucio: https://gamewith.net/hogwarts-legacy/article/show/38002
- Decisione su Sebastian: https://progameguides.com/hogwarts-legacy/should-you-turn-in-sebastian-in-hogwarts-legacy/
- Melodia delle campane: https://www.pcgamer.com/hogwarts-legacy-solved-by-the-bell-musical-map/
- Negozio, lanterne e conseguenze: https://www.gamespot.com/gallery/hogwarts-legacy-how-to-complete-minding-your-own-business-hogsmeade-quest/2900-5456/ e https://progameguides.com/hogwarts-legacy/hogwarts-legacy-minding-your-own-business-walkthrough/
- Tre esiti del ritratto: https://www.gosunoob.com/hogwarts-legacy/portrait-pickle-ferdinand-choice/
- Cimelio sopra la tana: https://progameguides.com/hogwarts-legacy/how-to-follow-the-trail-of-coins-in-hogwarts-legacy-a-thief-in-the-night/
- Localizzazione Bolcini: https://www.aranzulla.it/come-accedere-alle-rovine-hogwarts-legacy-1652702.html (solo denominazione e soluzione del meccanismo; non ripresa l’indicazione geografica imprecisa della guida).

## Localizzazione e divergenze risolte

Usati i titoli del database italiano, evitando traduzioni letterali diffuse nelle liste anglofone: **All’ombra del lignaggio**, **All’ombra del fato**, **L’infante perduto**, **Operazione segreta**, **Lutti e vendette**, **La ricerca della concentrazione**, **C’è chi segue l’istinto**, **Drammi da drago**, **La squama nell’uovo**, **Bracconieri a domicilio**, **Riunione a sorpresa**, **Scritto nelle stelle**, **Una ricerca volatile**, **Le conquiste di Poppy**. Il database riporta **Una taglia su Selwyn** e **Gobbiglie à gogo**; alcune guide più vecchie usano «Disfarsi di Selwyn» e «Gobbiglie à gogò». Non si presume che tutte le edizioni storiche abbiano gli stessi testi.

La missione introduttiva di Moon (catalogo principale) si chiama **Il custode dalla luna storta** (`quest_GDW_01`); la secondaria è **L’uomo dietro le lune** (`quest_DMS_01`). I volatili di Poppy sono **Bolcini**, non i Boccini d’oro del Quidditch.

Correzioni rispetto a errori o omissioni nelle fonti:
- PowerPyx omette l’ottava nota nell’elenco testuale di Al suono delle campane: qui la sequenza ha otto colpi, ultimo sulla campana destra seconda dall’alto.
- All’ombra dello studio: entrambe le risposte che accettano l’insegnamento sbloccano Crucio, indipendentemente da chi lo subisce.
- Denunciare Sebastian impedisce gli insegnamenti mancanti; non cancella gli incantesimi già appresi.
- Ritratto nei guai include il terzo esito, bruciare la cornice, con la stessa ricompensa.
- La guida di Moon non ripete l’erroneo «ultime dieci lune»: 30 mondiali meno 22 consegnate lasciano 8; le tre introduttive sono separate.
- In Vendetta avvelenata il committente è Ackley Barnes, non Alfred Lawley citato per errore nell’introduzione di una fonte.
- Biblioteca del negozio: le fonti differiscono sull’ordine delle tre porte. Le istruzioni indicano di esaurire i passaggi ancora disponibili, che scompaiono quando conclusi, senza imporre una porta unica come soluzione universale. Le lanterne dell’atrio includono entrambi i trasferimenti prima delle due porte e quello dopo la scacchiera.

## Spoiler e scelte

Titolo editoriale neutro e `officialTitle` separato per la fenice e il confronto finale di Natty. Le rivelazioni su Tobbs, Bardolph, i Bolcini, i combattimenti narrativi e le conseguenze importanti di Sebastian restano in pannelli locali `spoiler:true`. Le scelte minori hanno un pannello esplicito che distingue ricompensa, dialogo e possesso di oggetti. Non è attribuita all’astrolabio un’utilità futura non documentata. Le istruzioni dei percorsi rimangono leggibili senza aprire gli spoiler.

## Immagini e verifica

29 schermate contestuali, tutte originali delle guide PowerPyx e collegate alla pagina di provenienza. Nessuna immagine generata, nessun ritaglio o rimozione del marchio. URL ricavati dalle pagine, risposta HTTP riuscita, file decodificati e controllo visivo effettuato. Risoluzioni: almeno 1280×720; una immagine 1920×1080. Le schermate provengono da altre piattaforme e possono mostrare interfaccia inglese e comandi PlayStation: servono a riconoscere l’ambiente, mentre le istruzioni del sito non impongono quei tasti. Le immagini dipendono dall’host esterno; i percorsi testuali restano autonomi. Non tutte le missioni di solo dialogo hanno fotografie decorative.

Verifiche del modulo: sintassi JavaScript, 82 ID unici, 58/24 categorie, campi obbligatori, collegamenti HTTPS, fonti per ogni voce, immagini decodificabili. La verifica mobile e la pubblicazione sono eseguite dal coordinatore del progetto.

## Censimento canonico

| ID stabile | Titolo nel gioco | Tipo |
|---|---|---|
| `q-ttr01-01` | La maledizione della rapa | secondarie |
| `q-com-07` | Dolce Dissendium | secondarie |
| `q-com-15` | Profondità maridesi | secondarie |
| `q-com-20` | Tutto è bene ciò che finisce in gloria | secondarie |
| `q-com-03` | Il tesoro del castello | secondarie |
| `q-zfc-01` | Bacchette incrociate: round 1 | secondarie |
| `q-zfc-02` | Bacchette incrociate: round 2 | secondarie |
| `q-zfc-03` | Bacchette incrociate: round 3 | secondarie |
| `q-com-04` | Al volo! | secondarie |
| `q-sns-03` | Puledro della morte | secondarie |
| `q-com-05` | Gobbiglie à gogo | secondarie |
| `q-zzi-01` | Lezione di Storia della Magia | secondarie |
| `q-sns-01` | Decorazione d’interni | secondarie |
| `q-com-02` | Come falene verso la luce | secondarie |
| `q-snc-05` | La rinascita della fenice | secondarie |
| `q-pip01-01` | Ritratto nei guai | secondarie |
| `q-zfp-01` | Allenamento con le combinazioni d’incantesimi 1 | secondarie |
| `q-zfp-02` | Allenamento con le combinazioni d’incantesimi 2 | secondarie |
| `q-zab-01` | Campo dell’evocatore: partita 1 | secondarie |
| `q-zab-02` | Campo dell’evocatore: partita 2 | secondarie |
| `q-zab-03` | Campo dell’evocatore: partita 3 | secondarie |
| `q-zab-04` | Campo dell’evocatore: partita 4 | secondarie |
| `q-zab-05` | Campo dell’evocatore: partita 5 | secondarie |
| `q-com-19` | Le chiavi di Dedalo | secondarie |
| `q-com-24` | La Sala di Herodiana | secondarie |
| `q-dms-01` | L’uomo dietro le lune | secondarie |
| `q-snc-03b` | Le peripezie dell’elfo domestico | secondarie |
| `q-tr01-01` | La storia di Rowland Oakes | secondarie |
| `q-com-01` | Coraggio venefico | secondarie |
| `q-com-11` | Segui le farfalle | secondarie |
| `q-com-37` | Una consegna complicata | secondarie |
| `q-com-32` | Collaudo | secondarie |
| `q-com-33` | Spazzando via la competizione | secondarie |
| `q-com-34` | L’unico limite è il cielo | secondarie |
| `q-com-22` | Vendetta avvelenata | secondarie |
| `q-com-08` | Un’amica in difficoltà | secondarie |
| `q-com-23` | Il mio biscottino | secondarie |
| `q-com-31` | Punto e a capo | secondarie |
| `q-acs-01` | Tele aggrovigliate | secondarie |
| `q-com-40` | Un unicorno davvero unico | secondarie |
| `q-sny-01` | Gli affari degli altri | secondarie |
| `q-com-09` | Levar le tende | secondarie |
| `q-com-10` | Il fratello perduto | secondarie |
| `q-tv-02` | Il fantasma del nostro amore | secondarie |
| `q-com-30` | Incontro con il Fuggiasco | secondarie |
| `q-com-14` | I carretti rubati | secondarie |
| `q-com-12` | L’astrolabio perduto | secondarie |
| `q-tv-01` | Vorrei, ma non pozzo | secondarie |
| `q-com-17` | Cavoli rapiti | secondarie |
| `q-com-16` | Controllo del troll | secondarie |
| `q-com-18` | Manovre e-vasi-ve | secondarie |
| `q-com-36` | Un ladro nella notte | secondarie |
| `q-com-28` | L’Ippogrifo segna il punto | secondarie |
| `q-com-25` | Piume preziose | secondarie |
| `q-tv-03` | Il tesoro della tomba maledetta | secondarie |
| `q-com-27` | Il salvataggio di Rococò | secondarie |
| `q-com-29` | Una taglia su Selwyn | secondarie |
| `q-com-38` | Al suono delle campane | secondarie |
| `q-evl-conv-02` | All’ombra del lignaggio | relazioni |
| `q-evl-01` | All’ombra dello studio | relazioni |
| `q-evl-conv-04` | All’ombra della scoperta | relazioni |
| `q-evl-02` | All’ombra del tempo | relazioni |
| `q-evl-conv-05` | All’ombra della distanza | relazioni |
| `q-evl-conv-06` | All’ombra della speranza | relazioni |
| `q-evl-03` | All’ombra della reliquia | relazioni |
| `q-evl-conv-07` | All’ombra del fato | relazioni |
| `q-evl-conv-08a` | All’ombra dell’amicizia | relazioni |
| `q-her-01` | L’infante perduto | relazioni |
| `q-her-conv-04` | Operazione segreta | relazioni |
| `q-her-02` | Lezioni di ricatto | relazioni |
| `q-her-conv-05` | Lutti e vendette | relazioni |
| `q-her-conv-06` | La ricerca della concentrazione | relazioni |
| `q-her-03` | L’ultimo tentativo di Harlow | relazioni |
| `q-her-conv-07` | C’è chi segue l’istinto | relazioni |
| `q-ntr-conv-02` | Drammi da drago | relazioni |
| `q-ntr-01` | La squama nell’uovo | relazioni |
| `q-ntr-conv-03` | Bracconieri a domicilio | relazioni |
| `q-ntr-conv-04` | Riunione a sorpresa | relazioni |
| `q-ntr-02` | Il centauro e la pietra | relazioni |
| `q-ntr-conv-06` | Scritto nelle stelle | relazioni |
| `q-ntr-03` | Una ricerca volatile | relazioni |
| `q-ntr-conv-07` | Le conquiste di Poppy | relazioni |
