# Progressi scalari — implementazione e verifica

Preparato il 20 ottobre 2026, non pubblicato da questo task.

## Interfaccia frontend

`createProfileSync()` espone `setValue(id, value)` e ogni snapshot espone
`values: Map<string, 'todo'|'doing'|'done'|number|null>`. Ogni Map restituita è una
copia indipendente. Sono ammessi interi 0..1.000.000; l'interfaccia applica i
limiti specifici (lune consegnate 0..30, livello Alohomora 0..3).

- `status:<guide-id>`: stato unico e atomico, senza coppie di booleani incoerenti.
- `demiguise:handed-in`: numero inserito esplicitamente, indipendente da raccolte.
- `demiguise:alohomora-level`: livello inserito esplicitamente.
- Valore assente: mai impostato. `null` e `todo` sono invece valori espliciti.
  Il renderer può leggere `values.has(id)` prima di applicare il fallback
  legacy `activity:demiguise:in-progress`.
- `set(id, checked)`, vecchie chiavi, ID lune, profili e dataset non cambiano.
- Creazione/consultazione non scrivono. Modifica ottimistica soltanto dopo
  accodamento locale durevole. Cambi di profilo catturano l'identità al clic.

## Backend

Checkout: `/workspace/sites/demiguise-profili`.
Project: `appgprj_6ad762d4349881919a160ba1dedc1b36`.

Aggiunta operazione `type: 'set-value', id, value`, con la stessa transazione,
revisione monotona e ricevuta UUID delle spunte. Stessa risposta `version:1`,
con campo aggiuntivo `values:[{id,value,revision}]`. Le risposte vengono lette in
un'unica query per evitare snapshot misti. Le operazioni legacy continuano a
funzionare e non modificano i valori scalari. Il reset globale esplicito annulla
anche questi valori con tombstone null; i reset di sezione NON devono usarlo.

Migrazione generata: `drizzle/0002_silent_archangel.sql` e relativo snapshot/journal.
Solo nuova tabella `progress_values`, nessuna modifica alle migrazioni già
applicate e nessun backfill dei dati personali.

## Verifiche eseguite

- Backend test prima implementazione: nuovi casi fallivano per operazione non
  supportata/values assente. Dopo implementazione: `npm test`, **20/20**.
- Backend TypeScript: `node node_modules/typescript/bin/tsc --noEmit`, successo.
- Client test prima implementazione: nuovi casi fallivano per setValue/values
  mancanti. Dopo implementazione: `node --test profile-sync.test.js`, **38/38**.
- Build Sites `build-site.mjs`: successo (warning ordinario sul proxy e sulla
  classificazione statica della route, nessun errore).
- Test integrazione temporaneo `/tmp/sync-status-compat.mjs`: PASS. Ha eseguito
  client reale 1.2.0 estratto dal commit 042039e e client nuovo contro gli handler
  di produzione con SQLite reale. Verificati: migrazione vecchie spunte, nuovo
  stato, modifica booleana dal vecchio client senza perdere lo stato, lettura
  da un secondo storage indipendente, coda offline, retry, separazione profili.
  Una vecchia scheda che incontra una nuova operazione ancora in coda rifiuta
  prudentemente ulteriori scritture (storage-error) invece di danneggiarla.

Copertura nuova: transizioni doing/done/todo, zero scalare, riapertura, operazioni
obsolete ritentate con stesso UUID, conflitto UUID, input/scalari corrotti,
seed/reset, migrazione SQL additiva, risposte vecchie e cambio profilo in volo.

## Rilascio a cura del controller

1. Conservare pubblico il progetto Sites esistente e usare il workflow ufficiale
   per sincronizzare sorgente e pubblicare backend compatibile.
2. Verificare operazione scalare su dataset `verify-<UUID>` (mai dati reali).
3. Aggiornare il cache-buster dell'import frontend `profile-sync.js` e pubblicare
   il frontend soltanto insieme alla guida finale verificata.
4. Verificare sito pubblicato e riapertura/cambio profilo con il dataset di prova.

Nessun deploy, account, acquisto, modifica a dati reali o nuova credenziale
eseguiti da questo task. Fonte legacy `progress.js` non modificata.
