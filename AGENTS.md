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

Modificare `index.html` e aggiornare in `app.js` gli elenchi `zoneIds` e
`mainIds`, i conteggi e i testi pertinenti. La luna bonus resta indipendente.
Aggiornare le verifiche del contenuto quando si aggiungono voci. Non modificare
il nome o l'URL del progetto per pubblicare una nuova versione.

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

1. Eseguire `npm run check` (Node >=22, nessuna installazione necessaria).
2. Verificare il layout a 360, 390 e 430 px senza scorrimento orizzontale.
3. Provare spunta, filtro, dettagli, contatori e azzeramento annullato/confermato.
4. Sullo stesso profilo browser, segnare una luna, chiudere e riaprire il link.
5. Pubblicare un aggiornamento innocuo e verificare che la spunta rimanga.
6. Controllare l'URL HTTPS reale e il caricamento di CSS e JavaScript.
7. Distinguere i test automatici dalle prove effettivamente fatte in browser.

Non dichiarare il sito pubblicato o verificato se manca la prova sull'URL reale.
