# Manutenzione Demiguise

## Obiettivo e vincoli

- Nome del sito: `Guida Completa Hogwarts Legacy`.

- Mantenere un unico URL HTTPS su GitHub Pages, condivisibile su WhatsApp.
- Non rinominare account, repository o cartella pubblicata dopo il rilascio.
- Mantenere la grafica esistente salvo esplicita richiesta.
- Per il futuro aggiornamento della guida, lo stile approvato da Thomas il
  20/10/2026 è descritto nella sezione «Stile approvato» di `PIANO.md`.
  L'approvazione del progetto grafico è distinta dalla sua applicazione al sito.
- Il sito deve funzionare da smartphone e senza account per Ele.
- Niente compilazione o dipendenze runtime senza necessità concreta.
- Non commettere credenziali, progressi personali o dati del browser.
- Budget aggiuntivo obbligatorio per il sito: 0 €. L'unico costo accettato da
  Thomas è il normale uso della propria offerta ChatGPT Work/Codex durante
  la realizzazione. Non acquistare domini, hosting, crediti o API per il sito.
- Sincronizzazione e riconoscimento delle foto devono rispettare lo stesso
  vincolo. Verificare quote gratuite e comportamento al loro esaurimento
  prima di adottare un servizio; non attivare fatturazione o addebiti automatici.

## Compatibilità dei progressi

- Chiave immutabile: `ele-demiguise-hogsmeade-v1`.
- Schema attuale: array JSON di stringhe, ciascuna un identificativo raccolto.
- ID immutabili: `h1`..`h7`, `u1`, `b1`. Non riusarli per altre lune.
- Aggiungere nuove voci con ID nuovi, senza filtrare dal salvataggio gli ID
  sconosciuti o temporaneamente assenti dal contenuto.
- Non scrivere nel salvataggio all'apertura. Non usare `localStorage.clear()`.
- Non sovrascrivere dati malformati o uno schema sconosciuto automaticamente.
- Prima di modificare un dato, rileggere il valore corrente, così una scheda
  già aperta non sostituisce l'intero salvataggio con la propria copia vecchia.
- Solo il pulsante di azzeramento, dopo conferma esplicita, cancella le spunte.
- Un eventuale futuro cambio di schema richiede una migrazione compatibile e
  testata, conservando i dati originali finché non è stata verificata.

## Aggiungere contenuti

Prima di aggiungere o correggere nomi di luoghi, negozi, personaggi e voci
della mappa, verificarli sempre online per la versione italiana di Hogwarts
Legacy, come richiesto da Thomas il 20 ottobre 2026. Non tradurre liberamente
i nomi inglesi e non sostituire la localizzazione del gioco con quella dei libri.
Preferire schermate del gioco e guide italiane attendibili; se le fonti divergono,
confrontarne almeno due e registrare fonte e data nella sezione Localizzazione
del README. Anche le etichette accessibili e i messaggi generati da app.js devono
usare gli stessi nomi. Cambiare un nome visibile non deve cambiare il suo data-id.

La struttura e il catalogo sono in `guide-data.js`: tre sezioni stabili
`missioni`, `sblocchi`, `pratiche`. Aggiungere soltanto guide effettivamente
disponibili in `GUIDES`; le categorie ancora vuote restano in preparazione.
Per le lune, modificare `index.html` e aggiornare in `app.js` gli elenchi
`zoneIds`, `mainIds`, conteggi e testi. La luna bonus resta indipendente.
Non duplicare i nomi delle lune nell'indice di ricerca: derivano dal DOM.
Indicizzare soltanto titoli, riassunti e alias sicuri; mai corpi narrativi,
titoli spoiler o contenuti di pannelli chiusi. Verificare i nuovi nomi online.
Non modificare nome, URL, rotte stabili o ID per pubblicare una nuova versione.

## Ingresso e navigazione

- Scelta B: ogni nuova apertura mostra «Continua come…» per l'ultimo profilo
  oppure «Cambia profilo»; la guida resta nascosta fino al tocco esplicito.
- Dopo l'ingresso compare solo il profilo attivo, nel menu personale.
- Ricerca globale in home e contestuale in ogni sezione, estendibile a tutta
  la guida. Consultazione e ricerca non modificano i progressi.
- Riprendi mostra attività marcate manualmente; `activity:demiguise:in-progress`
  è indipendente da raccolte e missioni completate, e può essere rimosso.
- Il reset della checklist deve modificare SOLO i relativi ID, catturando il
  profilo prima di attendere la rete. Non chiamare il reset globale del client
  per azzerare una sezione: distruggerebbe attività e progressi futuri.

## Scelta di modello e ragionamento

Thomas richiede una raccomandazione proporzionata al compito, per qualità ed
efficienza nell'uso della quota. Segnalare prima del lavoro un cambio di modello
o livello di ragionamento soltanto quando offre un beneficio concreto, con
una breve motivazione. Se l'impostazione corrente è adatta, proseguire senza
avvisi ripetitivi. Non affermare di aver modificato il selettore dell'utente.

Per la fase di progettazione della guida, la raccomandazione del 20/10/2026
è GPT-6.1 Sol / High. Riconsiderarla per implementazione, sincronizzazione,
migrazioni e revisioni impegnative, verificando le fonti ufficiali aggiornate.
Max e Ultra non sono equivalenti: Max concede più ragionamento al modello;
Ultra suddivide parti indipendenti fra più agenti. Non raccomandare Ultra
per modifiche semplici o per il solo fatto che sia disponibile.

## Prima di ogni pubblicazione

### Profili sincronizzati

- Frontend buildless; `profile-sync.js` usa l'API Sites del progetto
  `appgprj_6ad762d4349881919a160ba1dedc1b36`, senza token amministrativi.
- Dataset permanente `guide-v1`; profili fissi `ele` e `thom`. Non cambiare
  progetto/dataset/prefisso `demiguise-profile-sync-v1:guide-v1:` agli aggiornamenti.
- La chiave originale è sola lettura per la migrazione e rimane recuperabile.
- Operazioni con UUID immutabile: ritentare lo stesso UUID dopo risposta persa;
  non trasformare un errore in una nuova modifica. Cache e risposte hanno revisioni.
- Non sostituire copie più recenti con GET precedenti; mantenere coda e profilo
  catturato anche durante cambi di profilo o assenza di rete.
- Il server conserva ricevute idempotenti e tombstone false/reset; una vecchia
  importazione non ripristina elementi tolti o un profilo azzerato.
- Le due identità sono intenzionalmente condivise, senza password. Non esporre
  credenziali di Sites/GitHub. CORS non è autenticazione privata.
- Backend gestito dal workflow Sites: aggiungere migrazioni, mai modificare SQL
  già applicato. L'endpoint diagnostico `/api/probe` è rimosso dal rilascio.
- Usare `?verifica=<UUID>` e `verify-live.mjs` per le prove; non azzerare mai
  i dati personali per verificare un aggiornamento.

### Verifiche

1. Eseguire `npm run check` (Node >=22, nessuna installazione necessaria).
2. Verificare il layout a 360, 390 e 430 px senza scorrimento orizzontale.
3. Provare spunta, filtro, dettagli, contatori e azzeramento annullato/confermato.
4. Sullo stesso profilo browser, segnare una luna, chiudere e riaprire il link.
5. Pubblicare un aggiornamento innocuo e verificare che la spunta rimanga.
6. Controllare l'URL HTTPS reale e il caricamento di CSS e JavaScript.
7. Distinguere i test automatici dalle prove effettivamente fatte in browser.

Non dichiarare il sito pubblicato o verificato se manca la prova sull'URL reale.
