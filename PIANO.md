# Preparazione e rilascio · 20 ottobre 2026

Obiettivo autorizzato: pubblicare l'allegato su GitHub Pages e fornire un solo
link HTTPS stabile, conservando grafica e progressi ai successivi aggiornamenti.

- [x] Confronto ZIP/HTML: stesso contenuto, 9 identificativi complessivi.
- [x] Riproduzione perdita ID sconosciuti: l'originale riscriveva il dato
  all'apertura dopo averlo filtrato; test di riproduzione fallito come previsto.
- [x] Separazione conservativa di contenuti, CSS, interazioni e persistenza.
- [x] Lettura senza scrittura, conservazione ID futuri, modifiche puntuali,
  segnalazione errori e compatibilità fra schede aperte.
- [x] Test automatici: lettura, riapertura logica, aggiornamento, dati non
  riconosciuti, storage bloccato/quota, bonus e azzeramento esplicito.
- [x] Documentazione di manutenzione, URL stabile e modalità di pubblicazione.
- [x] Revisione indipendente: corretti recupero errori e azzeramento dati non
  riconosciuti; regressioni riprodotte e controllate con 4 test aggiuntivi.
- [x] Controllo finale: 16 test passati, CSS identico e markup visivo conservato.
  Le simulazioni DOM/Storage non sostituiscono un browser reale.
- [x] Accesso GitHub completato nel browser, repository dedicato creato.
- [x] Creazione repository GitHub, caricamento e pubblicazione: commit
  `806e09f0b9563f8ef0c15746d287971e99a744c5`, deployment Pages `39342179312`
  concluso con successo. HTML, CSS e moduli JS verificati via HTTPS (HTTP 200).
- [x] URL definitivo restituito: https://gabrielecappello123-blip.github.io/demiguise-ele/.
- [x] Thomas conferma il 20/10/2026 che la spunta rimane dopo chiusura e
  riapertura della pagina sul suo telefono. Non è una prova sui dispositivi di Ele.
- [ ] Prove browser/mobile complete e persistenza dopo aggiornamento sul sito reale.
- [x] Controllo online dei nomi italiani richiesto da Thomas e correzioni 1.0.2
  preparate: Mielandia, Fiera delle Fiere, Stratchy & Sons, Upper Hogsfield,
  sezione Biblioteca. Fonti e regola futura nel README e in AGENTS.md.
- [ ] Pubblicare le correzioni 1.0.2 e verificare i testi all'URL reale.

Accesso ripristinato il 20/10/2026: installazione GitHub `173314754`
nell'account `gabrielecappello123-blip`, con il solo progetto selezionato.
Il repository è ora visibile al collegamento; si procede al rilascio delle
correzioni 1.0.2. Le prove automatiche sono distinte dalle prove nel browser
remoto, che al precedente tentativo risultava indisponibile.

Decisione: esecuzione autonoma entro il mandato esplicito dell'utente, senza
conferme di progetto aggiuntive. GitHub Pages resta la destinazione richiesta.
Browser cloud autorizzato dall'utente e utilizzato per la configurazione.
La prima pubblicazione ha usato il browser; gli aggiornamenti usano il
collegamento GitHub autorizzato. Hosting invariato.
Struttura a file nella radice, adatta a questo sito statico di piccole dimensioni.
