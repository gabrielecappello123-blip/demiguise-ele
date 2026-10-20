# Guida Completa Hogwarts Legacy

Guida in espansione per smartphone: checklist di 8 lune Demiguise di Hogsmeade
e dintorni, più una bonus. Grafica e contenuti derivano dall'HTML di Thomas.

**Sito pubblico:** https://gabrielecappello123-blip.github.io/demiguise-ele/

Condividere questo indirizzo su WhatsApp. Gli aggiornamenti si pubblicano
sullo stesso link, senza installazioni o nuovi file per Ele.

## Struttura

- `index.html`: contenuti, etichette e struttura.
- `styles.css`: grafica della checklist e controlli dei profili.
- `app.js`: contatori, filtri, scelta del profilo e stato del salvataggio.
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
