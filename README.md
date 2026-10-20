# Guida Completa Hogwarts Legacy · versione 2.0.0

Sito: https://gabrielecappello123-blip.github.io/demiguise-ele/

Guida italiana per Nintendo Switch 2, con profili Ele/Grifondoro e
Thom/Serpeverde. Stesso URL e stessi progressi delle versioni precedenti.

## Contenuti e manutenzione attuali

- 140 voci missione: 46 principali incluse le quattro varianti di casata,
  58 secondarie, 24 dei compagni e 12 incarichi. Le varianti diverse dalla
  casata scelta sono nascoste fino alla richiesta esplicita.
- Demiguise completo: 30 lune del mondo e 3 introduttive, con gli ID storici
  conservati e foto interne per tutte le 30 posizioni del mondo.
- 95 prove di Merlino con istruzioni locali, immagini/mappe e 9 metodi comuni;
  12 porte di Aritmanzia, 3 segreti e 2 stanze Depulso.
- 99 schede pratiche e di sblocco: incantesimi, talenti, caratteristiche,
  equipaggiamento, pozioni, piante, ingredienti, animali e Stanza delle Necessità.
- 353 schede canoniche complessive, più le lune e i metodi condivisi.
  Il percorso generale al 100% e il riconoscimento fotografico sono rimandati.

`guide-data.js` compone i moduli di `content/`; `guide-model.js` contiene regole
pure di rotte, casate, ricerca protetta e progressi. `app.js` renderizza la guida
senza compilazione né dipendenze runtime. `styles.css` conserva lo stile
approvato. Foto caricate solo all'apertura del relativo pannello.

Stati manuali reversibili `todo/doing/done` sotto `status:<guide-id>`.
Le lune restano booleani; consegne e livello Alohomora sono scalari indipendenti.
API, dataset `guide-v1`, identità e chiave legacy non cambiano. Backend Sites
con migrazione SQL additiva 0002, compatibile con il client precedente.

Verifica locale: Node >=22, `npm run check` (nessuna installazione necessaria).
Prove browser sempre con `?verifica=<UUID>`; mai alterare progressi personali.

### Localizzazione, fonti e limiti

Nomi confrontati con i dati localizzati italiani TH.GL e guide di gioco.
I registri `docs/research/` documentano copertura, fonti, immagini e disaccordi.
Non tradurre liberamente. Istruzioni originali e brevi; crediti fotografici
separati. Le immagini di altre piattaforme non certificano i comandi Switch 2.
Il percorso e i salvataggi sono verificati tramite test e browser; non è una
partita completa su una console fisica. Il disaccordo Bainburgh I/II è
registrato nella ricerca e gestito prudentemente col requisito II.

---

## Registro delle versioni precedenti

# Guida Completa Hogwarts Legacy

Guida in espansione per smartphone, con home a tre sezioni, ricerca locale
e profili Ele/Thom. Il primo contenuto disponibile è la checklist di 8 lune
Demiguise di Hogsmeade e dintorni, più una bonus; le altre categorie sono
organizzate e segnalate in preparazione, non guide già complete.

**Sito pubblico:** https://gabrielecappello123-blip.github.io/demiguise-ele/

Condividere questo indirizzo su WhatsApp. Gli aggiornamenti si pubblicano
sullo stesso link, senza installazioni o nuovi file per Ele.

## Struttura

- `index.html`: contenuti, etichette e struttura.
- `styles.css`: temi delle casate, ingresso, navigazione e checklist.
- `app.js`: ingresso, navigazione a hash, ricerca, contatori e salvataggio.
- `guide-data.js`: sezioni, sottosezioni e catalogo canonico delle guide disponibili.
- `search.js`: ricerca locale con accenti, sinonimi sicuri e refusi limitati.
- `assets/houses/`: i due emblemi approvati, serviti dallo stesso sito.
- `profile-sync.js`: coda locale, cache e API Ele/Thom.
- `profile-sync.test.js`: regressioni di sincronizzazione e migrazione.
- `progress.js`: contratto originale, conservato per compatibilità.
- `progress.test.js`: compatibilità dei vecchi dati.
- `app.test.js`: interfaccia con adattatore DOM; non sostituisce il browser.
- `verify-live.mjs`: prova facoltativa dell'API pubblicata con dati isolati.
- `AGENTS.md`: istruzioni per ChatGPT/Codex; `PUBBLICAZIONE.md`: rilascio e verifiche.

Il frontend non richiede compilazione, dipendenze o account per Ele. L'archivio
online usa Sites/D1 già disponibile in ChatGPT. Nessun servizio a pagamento è
stato attivato; Sites è incluso nei piani compatibili durante la beta, entro
le quote applicabili. Non acquistare crediti o attivare addebiti automatici.

## Salvataggio delle spunte

Da 1.1.0 scegliere Ele o Thom: progressi separati, condivisi tra i dispositivi.
La chiave originale `ele-demiguise-hogsmeade-v1`, array JSON di stringhe, resta
intatta. Gli ID `h1`–`h7`, `u1`, `b1` non si rinominano né riutilizzano.

La prima importazione copia le vecchie spunte in entrambi, inserendo solo ID
assenti senza annullare valori espliciti o azzeramenti successivi. Anche gli
ID validi di contenuti futuri sono conservati. Dati malformati rimangono
intatti: non azzerarli automaticamente per far sparire un errore.

Prefisso locale stabile: `demiguise-profile-sync-v1:guide-v1:`. Contiene profilo
scelto, marcatore di migrazione, operazioni immutabili e ultime copie del server.
Le operazioni vengono rimosse dopo una conferma online salvata localmente.
Senza rete compare «da sincronizzare»: non cancellare i dati del browser prima
di «Salvato online». Nessun progresso personale è nel repository.

Dataset permanente `guide-v1`, ID e identità del progetto Sites non cambiano
agli aggiornamenti. Due profili senza password significano che chi ha il link
può leggere e modificare entrambi; non sono account privati. Nessun token
amministrativo di Sites/GitHub è esposto al browser.

Da 1.2.0 ogni apertura richiede «Continua come…» o una scelta esplicita.
Il profilo ricordato non mostra la guida prima della conferma. Cambia profilo
è nel menu personale. `activity:demiguise:in-progress` è un segnalibro manuale
per Riprendi, indipendente dalle lune. Cercare o aprire non lo modifica.
«Azzera queste lune» tocca soltanto i nove ID attuali tramite operazioni
individuali; non azzera l'intero profilo, le attività o i futuri contenuti.

## Struttura e ricerca

Rotte: `#/`, `#/missioni`, `#/sblocchi`, `#/pratiche`; categoria
`#/<sezione>/<categoria>`, Demiguise `#/sblocchi/demiguise`, singola luna
`#/sblocchi/demiguise/h2`. La query `?verifica=<UUID>` rimane prima dell'hash.
Le rotte non richiedono configurazioni del server GitHub Pages.

Aggiungere una guida reale una sola volta in `GUIDES`, collegandola alla
categoria; la struttura in `SECTIONS` non prova che il contenuto esista.
La ricerca globale è in home; nelle sezioni è limitata al contesto, con
«Cerca in tutta la guida». Indicizza solo `title`, `summary`, `aliases`
redatti senza spoiler, mai automaticamente il corpo di una missione o
testi nascosti. I risultati simili sono etichettati; nessuna AI o API a pagamento.
Le lune ereditano titoli e descrizioni dal DOM, evitando copie divergenti.
I nomi dettati Demigais/Dimigais/Alomora sono solo sinonimi di ricerca.

## Modifiche e test

Con Node.js 22 o successivo, senza `npm install`:

```sh
npm run check
```

Per i moduli usare un server HTTP; non aprire la pagina come `file://`.
Aggiornare il repository dedicato
https://github.com/gabrielecappello123-blip/demiguise-ele,
ramo `main`, cartella `/(root)`.

`node verify-live.mjs` prova l'API HTTPS e due memorie client indipendenti:
scrive soltanto in un nuovo dataset `verify-<UUID>`, mai nei progressi reali.
Nel browser usare `?verifica=<UUID>` sul link della guida: memoria locale separata,
nessuna importazione originale e avviso visibile.

`mobile-check.html` mostra la pagina in iframe con viewport 360/390/430 px,
sempre su un archivio di prova separato. Verifica il layout responsive nel
browser; non è una prova su hardware Android/iOS.

## Localizzazione italiana

Controllo online del 20 ottobre 2026, su guide italiane di Player.it,
Multiplayer.it e NRSGamers. Verificare online anche i futuri nomi prima di
pubblicarli. Queste sono correzioni dei testi: gli ID delle lune restano invariati.

| Riferimento inglese o precedente | Nome usato nella checklist italiana | Verifica |
| --- | --- | --- |
| Tomes and Scrolls | Tomi e Pergamene | Player.it, Multiplayer.it |
| Hog's Head | Testa di Porco | Player.it, Multiplayer.it |
| The Three Broomsticks | Tre Manici di Scopa | Player.it, Multiplayer.it |
| Gladrags Wizardwear / reparto Dervish and Banges | Abbigliamento per maghi Stratchy & Sons | Multiplayer.it, NRSGamers |
| Honeydukes | Mielandia | Player.it, NRSGamers |
| Brood & Peck | Fiera delle Fiere | Player.it, Multiplayer.it, NRSGamers |
| Hogsfield Superiore | Upper Hogsfield | Player.it, Multiplayer.it, Tom's Hardware |
| Divination Classroom / The Library Annex | Aula di Divinazione, sezione Biblioteca della mappa | Player.it, Multiplayer.it |

Per la luna `h5`, il nome principale è il negozio rintracciabile sulla mappa,
Stratchy & Sons. L'indicazione conduce al bancone nella parte comunicante sulla
destra: non è stata aggiunta né sostituita una luna. Upper Hogsfield resta un
nome proprio: le guide italiane consultate lo riportano senza tradurlo.

Fonti consultate:

- https://www.player.it/guide/504605-hogwarts-legacy-guida-alle-statuette-di-demiguise.html
- https://multiplayer.it/soluzioni/hogwarts-legacy-dove-trovare-statuette-demiguise-potenziare-alohomora.html
- https://www.nrsgamers.it/hogwarts-legacy-demiguise-hogsmeade/
- https://www.tomshw.it/videogioco/hogwarts-legacy-statuette-di-demiguise
