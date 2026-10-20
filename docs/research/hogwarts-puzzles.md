# Enigmi di Hogwarts — verifica 20 ottobre 2026

## Ambito e integrazione

`content/hogwarts-puzzles.js` esporta:

- `HOGWARTS_PUZZLES`: 17 attività manuali, cioè 12 porte di Aritmanzia, 3 segreti di Hogwarts e 2 stanze Depulso.
- `HOGWARTS_METHODS`: una scheda non tracciata, `aritmanzia-metodo`. Aggiungerla all’elenco dei metodi usato dal renderer; le dodici porte la richiamano con `methodId`.

Ogni attività ha un ID stabile, indicazioni locali, requisiti, fonti e immagini reali. Nessuna apertura della scheda deve scrivere progressi. Le stanze Depulso hanno pannelli separati per i percorsi: accesso e istruzioni di orientamento restano visibili; i passaggi di ciascun forziere sono espandibili e contengono una foto della configurazione.

Nessuna duplicazione della Sala di Herodiana (`q-com-24`) o della missione delle campane (`q-com-20`), gestite in `side-missions.js`. Merlino appartiene a `puzzles.js`. Forzieri con occhio, falene, pagine e meccaniche di esplorazione appartengono alle guide pratiche. Le stanze Depulso collegano la missione di Herodiana tramite `related`, senza condividere il suo progresso.

## Localizzazione

La [banca dati italiana TH.GL](https://hogwarts.th.gl/it/db/dungeons) riporta esattamente:

- [Stanza dell’enigma di Depulso 1](https://hogwarts.th.gl/it/db/dungeons/dungeon_DADA_Forgotten_2_Dungeon)
- [Stanza dell’enigma di Depulso 2](https://hogwarts.th.gl/it/db/dungeons/dungeon_DADA_Forgotten_3_Dungeon)
- [Sala di Herodiana](https://hogwarts.th.gl/it/db/dungeons/dungeon_DADA_Forgotten_Dungeon)

La pagina è stata letta anche direttamente via HTTPS perché l’estrattore web restituiva occasionalmente un errore. Titoli presenti nel JSON-LD e nel contenuto HTML, non traduzioni editoriali.

Nomi di aule e torri confrontati con [Everyeye](https://www.everyeye.it/notizie/hogwarts-legacy-soluzione-come-aprire-porte-simboli-numeri-634754.html) e le guide italiane [Uagna](https://www.uagna.it/videogiochi/guida-hogwarts-legacy-come-aprire-le-porte-nella-torre-dellorologio-segreti-di-hogwarts-174427). Per “Long Gallery” e “North Hall”, dove la traduzione esatta non è stata confermata, sono stati usati titoli editoriali descrittivi: “galleria sotto l’Aula di Pozioni” e “piani alti oltre l’Aula di Trasfigurazione”. Non sono presentati come nomi ufficiali.

Controllo finale mirato: il gruppo della mappa è **Biblioteca**, senza “Ala della”; il punto di Metropolvere è **Torre del Corpo Docente**, non “Torre dei Docenti”. Confermati dalla [guida italiana delle porte di Player.it](https://www.player.it/guide/505584-hogwarts-legacy-come-aprire-le-porte-con-i-simboli.html), che cita esplicitamente i nomi della sezione e della Metropolvere, e dalla [guida Demiguise di Multiplayer.it](https://multiplayer.it/soluzioni/hogwarts-legacy-dove-trovare-statuette-demiguise-potenziare-alohomora.html). Uniformati gruppi, titoli, requisiti, istruzioni e attribuzione della scheda; ID invariati. TH.GL non espone queste due etichette nell’HTML della pagina generale della mappa, quindi non viene citato come prova specifica per esse.

Non si riportano i nomi incerti delle creature sull’arco: le fonti italiane e inglesi divergono per diversi simboli. I valori 0–9, partendo dal basso a sinistra, sono invece stabili e verificabili direttamente sul portale. Nessun comando PlayStation/Xbox è inserito nelle istruzioni per Switch 2.

## Dodici porte: controllo combinazioni

Confronto fra [Guides4Gamers](https://guides4gamers.com/hogwarts-legacy/pois/arithmancy-doors/), [Gamepur](https://www.gamepur.com/guides/all-arithmancy-door-puzzle-locations-and-solutions-in-hogwarts-legacy) ed Everyeye. Le cifre indicano il valore del simbolo, NON il numero di interazioni sulla rotella.

| ID | Totali superiore / inferiore | ? / ?? |
|---|---|---|
| aritmanzia-incantesimi | 5 / 12 | 2 / 7 |
| aritmanzia-sala-centrale | 21 / 17 | 8 / 3 |
| aritmanzia-divinazione | 9 / 4 | 4 / 3 |
| aritmanzia-aula-sinistra | 15 / 18 | 4 / 5 |
| aritmanzia-aula-destra | 17 / 8 | 6 / 1 |
| aritmanzia-galleria | — | 2 / 1 |
| aritmanzia-corvonero | 13 / 21 | 4 / 5 |
| aritmanzia-scalinata | 6 / 11 | 0 / 5 |
| aritmanzia-torre-scalinata | 23 / 19 | 6 / 7 |
| aritmanzia-sala-grande | 24 / 14 | 8 / 3 |
| aritmanzia-docenti | 13 / 14 | 0 / 9 |
| aritmanzia-sala-nord | 10 / 7 | 6 / 3 |

Percorsi integrati con [Pocket Tactics](https://www.pockettactics.com/hogwarts-legacy/door-puzzle), la [porta nella Torre del Corpo Docente](https://www.gamepur.com/guides/how-to-solve-the-faculty-tower-door-puzzle-in-hogwarts-legacy), la [porta ai piani alti](https://www.gamepur.com/guides/how-to-solve-the-north-hall-door-puzzle-in-the-astronomy-wing-in-hogwarts-legacy) e le [teche dei troll nella galleria](https://progameguides.com/hogwarts-legacy/all-library-annex-revelio-field-guide-pages-in-hogwarts-legacy/).

Divergenze risolte:

- Pocket Tactics dà 0/8 alla porta sinistra dell’Aula di Aritmanzia: non usato; Everyeye, Gamepur e Guides4Gamers convergono su 4/5.
- Everyeye chiama “Aula di Pozioni” la porta 21/17: il luogo più preciso è Sala Centrale, sul percorso per il Cortile di Trasfigurazione. Non è la distinta porta 2/1 della galleria sotto l’aula.
- La porta vicino alla Torre di Corvonero è accessibile a tutte le casate: non applicare `house`.
- La rotella ?? della Scalinata Principale è un piano sotto la porta, vicino alla Metropolvere: indicazione esplicita nella scheda.
- Nessun nome fisso di bottino: l’oggetto casuale ricevuto dall’autore di una guida non viene promesso al lettore.

## Segreti

Fonti italiane per [ponte](https://www.uagna.it/videogiochi/guida-hogwarts-legacy-come-risolvere-lenigma-del-ponte-segreti-di-hogwarts-174368), [orologio](https://www.uagna.it/videogiochi/guida-hogwarts-legacy-come-aprire-le-porte-nella-torre-dellorologio-segreti-di-hogwarts-174427) e [nomi degli oggetti](https://www.player.it/guide/504224-hogwarts-legacy-guida-ai-segreti-di-hogwarts.html), confrontate con [Gameranx](https://gameranx.com/features/id/438243/article/hogwarts-legacy-how-to-solve-all-3-secrets-of-hogwarts-solutions-guide/) e [Gamepur sulla chiave](https://www.gamepur.com/guides/how-to-get-and-use-the-key-of-admittance-in-hogwarts-legacy).

Ponte: abbinamenti simboli/numeri confrontati anche sulla foto della piastra. Orologio: entrare in tutte e quattro le stanze, non soltanto fermare il pendolo. Chiave: percorso interno normale e alternativa dal balcone separati; l’accesso narrativo non è presentato come requisito per il volo. Alohomora III serve per lo studio, mentre la porta speciale richiede la chiave. Nessun nome di missione avanzata o evento di trama è necessario alla soluzione.

## Stanze Depulso

Fonti incrociate per i percorsi:

- [GameClubz stanza 1](https://www.gameclubz.com/hogwarts-legacy-depulso-puzzle-room-1-solution/) e [stanza 2](https://www.gameclubz.com/hogwarts-legacy-depulso-puzzle-room-2-solution/): sequenze e fotografie.
- [PowerPyx stanza 1](https://www.powerpyx.com/hogwarts-legacy-depulso-puzzle-room-1-solution-location/) e [stanza 2](https://www.powerpyx.com/hogwarts-legacy-depulso-puzzle-room-2-solution-location/): controllo configurazioni, ripristino e uscita.
- [Gamerpillar stanza 1](https://gamerpillar.com/depulso-puzzle-room-1-hogwarts-legacy/) e [stanza 2](https://gamerpillar.com/depulso-puzzle-room-2-walkthrough-hogwarts-legacy/): sequenze di schermate, anche con itinerari alternativi.
- [Destructoid stanza 1](https://www.destructoid.com/how-to-solve-depulso-puzzle-room-1-in-hogwarts-legacy/) e [Pro Game Guides stanza 2](https://progameguides.com/hogwarts-legacy/how-to-complete-depuslo-puzzle-room-two-in-hogwarts-legacy/): controllo indipendente degli accessi e dei percorsi.

La riscrittura usa un orientamento unico: ingresso alle spalle. Alcune guide cambiano “destra/sinistra” quando il personaggio gira; GameClubz mescola anche punti cardinali nella seconda sala. Sono stati mantenuti i bersagli fisici (parete destra, angolo liberato, pilastro nero), evitando di copiare quegli orientamenti incoerenti.

Stanza 1: tre forzieri della sala e premio della collezione nel corridoio iniziale. Ripristino dei blocchi tra i tre percorsi, mantenendo il bottino già aperto. Stanza 2: primo forziere, cambio automatico della prima sala, percorso verso la seconda sala, forziere destro, sinistro e infine premio presso l’uscita. Nella seconda sala non viene richiesto un ripristino intermedio che annullerebbe la configurazione costruita.

Il salto finale della stanza 2 è segnalato come problematico nei commenti di PowerPyx: più lettori concordano che spostare la U da un suo braccio con Accio la avvicina al blocco nero. La stessa possibilità di spostare la piattaforma stando sopra è compatibile con le sequenze di Pro Game Guides. È una facilitazione esplicita; nessun requisito di talento o comando di un’altra piattaforma.

## Immagini e verifiche tecniche

27 fotografie collegate: 12 porte Gamepur (1024 px), ponte/piastra/pendolo Uagna (600 px, inquadrature integrali), studio/porta speciale Gamepur (1024 px), 2 accessi e 8 configurazioni Depulso GameClubz (1024 px). Tutti gli URL sono stati scaricati tramite HTTPS e le immagini esaminate visivamente in fogli di confronto. Le foto delle porte mostrano le porte già aperte: indicato nell’alt. La foto dell’orologio scelta mostra il pendolo e l’ambiente; escluso il collage ravvicinato dei simboli.

Immagini esterne, non incorporate nel caricamento iniziale; il renderer le carica aprendo “Mostra immagine” e conserva il collegamento alla fonte. Attribuzione nel campo `credit`: solo nome della fonte, perché il renderer aggiunge “Foto di riferimento:”. Nessuna immagine generata e nessuna promessa che siano screenshot della versione Switch 2.

Controllo Node: import ES module riuscito, ID unici, 17 attività/1 metodo/12 riferimenti al metodo, tutte le schede con passi, fonti e data. La verifica dei percorsi è documentale; non è stata eseguita una partita su Nintendo Switch 2. Test layout, integrazione e sito pubblicato spettano al coordinatore. Nessun file fuori dai due assegnati modificato per questo sottocompito; nessuna pubblicazione eseguita.
