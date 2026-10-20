# Revisione indipendente dell’integrazione UI

Data: 20 ottobre 2026. Ambito: `app.js`, `guide-model.js`, `index.html`,
`styles.css`, contratto `docs/EXPANSION.md` e interfacce con catalogo/salvataggi.
Revisione statica più riproduzioni mirate delle funzioni pure con i dati reali.
Nessuna modifica al controller, nessuna esecuzione della suite completa mentre
il relativo harness era in aggiornamento. Questa revisione non sostituisce la
prova visiva in browser a 360/390/430 px.

## Problemi da correggere

Aggiornamento del coordinatore durante la revisione: corretti il limite nel
filtro del catalogo, l’indicizzazione dei luoghi e l’ordine delle principali.
Le sezioni relative conservano la riproduzione originale come registro; la
verifica finale delle correzioni confluisce nei test del coordinatore.

### P2 — Il limite dei suggerimenti tronca anche il filtro del catalogo

Stato: correzione comunicata dal coordinatore; filtro applicato per voce.

- Riferimento: `app.js:251`, `search.js:5` e il limite applicato da `searchGuide`.
- Riproduzione: aprire Guide pratiche → Enigmi e attività e cercare `Merlino`.
  Le schede corrispondenti sono più di 30, ma `applyFilters` riceve soltanto i
  primi 30 ID e nasconde tutte le altre schede. Combinando poi il filtro luogo
  con un’area presente soltanto fra i risultati successivi si può ottenere
  erroneamente zero schede.
- Evidenza con i moduli già disponibili: `searchGuide(entries,'Merlino')`
  restituisce 30 risultati; applicando la stessa ricerca a ciascuna voce
  singolarmente risultano 98 corrispondenze.
- Correzione proposta: separare l’insieme completo delle corrispondenze, usato
  dal filtro, dalla presentazione limitata dei suggerimenti. Passare semplicemente
  `limit: Infinity` non basta: l’attuale funzione impone comunque massimo 30.

### P2 — Ricerca e filtro delle lune usano alias differenti

- Riferimento: `app.js:130` rispetto a `app.js:262`.
- Riproduzione: aprire Demiguise e digitare `alohomora` (oppure `demigais` o
  `dimigais`). In alto compaiono risultati di lune, mentre il catalogo sottostante
  nasconde tutte le lune e mostra «Nessuna luna corrisponde ai filtri».
- Evidenza con le 30 lune reali: per ciascuna delle tre query, le voci create
  da `searchEntries` restituiscono 30 corrispondenze; quelle costruite da
  `applyFilters` ne restituiscono zero.
- Correzione proposta: derivare entrambi gli usi dalla stessa funzione che
  costruisce i campi sicuri e gli alias della luna.

### P2 — La ricerca per luogo non comprende il campo luogo delle guide

Stato: correzione comunicata dal coordinatore; luogo/gruppo aggiunti agli alias.

- Riferimento: `guide-model.js:25–28`.
- Riproduzione: in Missioni principali cercare `Hogwarts`. La missione
  «Il segreto del medaglione», il cui `location` è esattamente `Hogwarts`, non
  viene trovata. Titolo, riassunto e alias non contengono quel nome.
- Evidenza: `searchGuide(makeGuideEntries([missione]),'Hogwarts')` restituisce
  `[]` per `main-fig-01-conv`.
- Effetto: il campo promette una ricerca per luogo, ma funziona solo quando
  l’autore ha ripetuto casualmente il luogo nel titolo, riassunto o alias.
- Correzione proposta: includere `location` e il gruppo geografico approvato
  fra i campi sicuri indicizzati, mantenendo esclusi passi e pannelli spoiler.

### P2 — Il raggruppamento geografico spezza la progressione principale

Stato: correzione comunicata dal coordinatore; principali in un unico gruppo.

- Riferimento: `app.js:185` e `app.js:195–200`.
- Riproduzione: aprire Missioni principali senza filtri. L’array è prima
  ordinato tramite `order`, ma viene successivamente ricomposto in gruppi per
  `location`: il blocco Hogwarts contiene già «Il confronto conclusivo»
  (`order:43`) prima che venga mostrata «Arrivo a Hogsmeade» (`order:6`) nel
  successivo blocco Hogsmeade.
- Effetto: l’ordine narrativo disponibile nei dati non è più l’ordine presentato;
  il percorso iniziale sembra saltare subito alle missioni avanzate.
- Correzione proposta: per le principali conservare l’ordine narrativo globale;
  il luogo può restare un filtro. Il raggruppamento per luogo rimane adatto alle
  secondarie e alle attività geografiche.

### P3 — Prefisso della didascalia ripetuto

- Riferimento: `app.js:75`, `content/main-missions.js` e `content/demiguise.js`.
- Riproduzione: aprire una foto di Cornacchia, Urtkot o una luna. Il campo
  `credit` contiene già «Foto di riferimento: …» e il renderer aggiunge lo stesso
  prefisso; compare «Foto di riferimento: Foto di riferimento: PowerPyx…».
- Correzione proposta: definire un unico proprietario del prefisso, oppure
  normalizzare il testo completo senza duplicarlo.

## Controlli senza problemi individuati

- L’ingresso richiede un tocco esplicito anche con profilo ricordato. Contenuti
  e controlli sono sotto `guideApp[hidden]` prima dell’ingresso; il menu mostra
  soltanto il profilo attivo. La variante di casata è filtrata in catalogo e
  ricerca; la visualizzazione delle altre varianti richiede la scelta esplicita.
- Consultazione, hash di navigazione e ricerca non chiamano `set` o `setValue`.
  Gli stati `todo/doing/done` vengono salvati soltanto dal controllo esplicito;
  `guideStatus` conserva la compatibilità con l’attività Demiguise precedente.
- Le spunte delle lune, lo stato della guida, il livello di Alohomora e le
  consegne usano campi distinti. Il reset opera sugli ID delle lune, non sul
  reset globale. Le chiamate `sync.set` accodano sincronicamente le operazioni
  del profilo selezionato prima del primo `await` del reset.
- I titoli nascosti e il testo dei pannelli non entrano nell’indice generale.
  L’eccezione intenzionale del titolo ufficiale intero passa da
  `knownTitleResults` e restituisce comunque il titolo editoriale neutro.
- Astrolabio viene collegato alla scheda oggetto; il dialogo usa testo e nodi
  DOM, senza interpretare HTML proveniente dal catalogo. «Apri scheda completa»
  chiude il dialogo prima della navigazione. Nessuna scrittura di progresso.
- I filtri delle lune compongono livello, raccolte e ricerca senza alterare
  il totale; un collegamento diretto a una luna ripristina filtri che la rendono
  visibile. Le tre lune introduttive restano separate dalle 30 del mondo.
- Le immagini si caricano all’apertura del pannello e occupano tutta la larghezza
  disponibile; è presente il collegamento alla dimensione originale e un messaggio
  di errore. Il CSS impone `[hidden] { display:none!important }`.

## Limiti

Non sono stati provati qui il rendering reale, il focus nativo del dialogo, i
controlli touch o l’accesso di rete. Il catalogo aggregato era ancora in corso
di completamento, quindi le riproduzioni pure hanno importato direttamente
i moduli contenuto disponibili. Non è stato segnalato come regressione il file
temporaneamente mancante nell’import aggregato.

## Esito correzioni prima del rilascio

Tutti i cinque rilievi risolti: filtro senza limite30, alias lune allineati,
luoghi indicizzati, ordine narrativo conservato, prefisso credito normalizzato.
Regressioni coperte da app.test.js e guide-model.test.js; 87 test frontend
superati. Le prove visive seguono sul sito effettivo.
