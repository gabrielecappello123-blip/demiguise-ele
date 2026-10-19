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
- [ ] Creazione repository GitHub, caricamento e pubblicazione.
- [ ] Prove browser/mobile e persistenza dopo aggiornamento sul sito reale.
- [ ] Restituzione URL definitivo, verificato.

Decisione: esecuzione autonoma entro il mandato esplicito dell'utente, senza
conferme di progetto aggiuntive. GitHub Pages resta la destinazione richiesta.
Browser cloud autorizzato dall'utente e utilizzato per la configurazione.
Il caricamento dei file usa la pagina GitHub autorizzata; hosting invariato.
Struttura a file nella radice, adatta a questo sito statico di piccole dimensioni.
