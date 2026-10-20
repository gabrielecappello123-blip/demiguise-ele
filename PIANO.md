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
- [x] Correzioni 1.0.2 pubblicate: commit
  `d9fae2a4d21f5440d88b10db9af45715bb43cb2d`, deployment Pages
  `39393040877` concluso con successo il 20/10/2026. HTML, CSS, app.js e
  progress.js restituiscono HTTP 200 sullo stesso URL HTTPS e coincidono
  byte per byte con i file verificati. I nomi corretti e i nove ID sono presenti.
- [x] Controllo prima del rilascio: 16 test superati; CSS e progress.js identici
  alla prima versione; app.js differisce soltanto nel nome Upper Hogsfield.
- [ ] Conferma sul telefono dell'utente che la spunta precedente rimane
  dopo aver ricaricato la versione 1.0.2. La conferma di riapertura precedente
  non costituisce da sola una prova dopo questo aggiornamento.

Accesso ripristinato il 20/10/2026: installazione GitHub `173314754`
nell'account `gabrielecappello123-blip`, con il solo progetto selezionato.
Il repository è ora visibile al collegamento e la scrittura è riuscita.
Le prove automatiche e HTTPS sono distinte dalle prove nel browser remoto,
che al precedente tentativo risultava indisponibile.

Decisione: esecuzione autonoma entro il mandato esplicito dell'utente, senza
conferme di progetto aggiuntive. GitHub Pages resta la destinazione richiesta.
Browser cloud autorizzato dall'utente e utilizzato per la configurazione.
La prima pubblicazione ha usato il browser; gli aggiornamenti usano il
collegamento GitHub autorizzato. Hosting invariato.
Struttura a file nella radice, adatta a questo sito statico di piccole dimensioni.

## Stile approvato

- [x] Stile della futura guida approvato esplicitamente da Thomas il 20/10/2026.
- [ ] Applicare lo stile al sito nella successiva fase di implementazione e
  verificarlo sul sito pubblicato. Le anteprime di progettazione non sono un rilascio.

Riferimento finale: variante **A — Oro o argento**, con i riquadri antracite.
Lo stile si adatta al profilo: Ele / Grifondoro e Thom / Serpeverde.
Il tema grafico non modifica i salvataggi. La selezione dei profili e le
varianti delle guide per casata restano funzionalità distinte.

### Colori

| Elemento | Ele / Grifondoro | Thom / Serpeverde |
| --- | --- | --- |
| Sfumatura della pagina, 105°, tappa centrale al 48% | `#42242c` → `#302128` → `#182029` | `#24432f` → `#1e3228` → `#182029` |
| Colore primario, anche per la linea accanto al titolo di sezione | `#8c1820` | `#1c512c` |
| Metallo | `#dbb65c` | `#c4ccd2` |
| Testo metallico chiaro | `#f0dca6` | `#f0f2f3` |
| Metallo scuro per i piccoli divisori | `#7e6029` | `#687883` |
| Fondo della voce di menu selezionata | `#352321` | `#1c3023` |
| Pulsante del profilo selezionato, gradiente a 120° con tappa al 48% | `#a17b31` → `#eed392` → `#b8903c` | `#8d9aa4` → `#edf1f3` → `#a3afb7` |
| Testo sul pulsante metallico | `#171208` | `#172027` |

Elementi comuni: riquadri `#22262b`, intestazioni dei riquadri `#292d32`,
controlli scuri `#181c21`, testo principale `#f3eee5`, testo secondario
`#c0c8d0`, separatori fra le voci `#3d4249`.

### Cornici, caratteri e dettagli

- Cornice continua dell'intera pagina: 2 px nel metallo del profilo, raggio
  16 px. Nessuna fascia superiore spessa e nessuna cornice doppia.
- Riquadri antracite: bordo di 1 px, raggio 12 px. Il bordo è un filo
  oro/argento attenuato: `color-mix(in srgb, var(--metal) 42%, var(--panel))`.
  Non usare il bordo rosso/verde dell'alternativa non scelta.
- Ombra leggera dei riquadri: `0 4px 14px #00000018`.
- Titoli in Georgia/serif; testo e controlli in carattere di sistema. Nel
  riferimento mobile: corpo 15 px con interlinea 1,5; titolo della sezione
  29 px; titolo del sito 27 px, 25 px sugli schermi stretti.
- Conservare gli accenti metallici della variante A: titolo del sito,
  titoli dei riquadri, pulsante del profilo selezionato, etichette dei luoghi,
  spunte, piccoli divisori e voce di menu attiva.
- L'emblema della casata affianca il titolo. Sono approvati i due simboli
  stilizzati degli animali presenti sul sito ufficiale Harry Potter,
  distinti dagli stemmi completi a scudo. Fonti delle immagini:
  [Grifondoro](https://www.harrypotter.com/_next/static/media/animal-gryffindor.0q5-bvidcq-rh.png)
  e [Serpeverde](https://www.harrypotter.com/_next/static/media/animal-slytherin.3-a7-c7djhr1e.png).
- Il riferimento descrive l'aspetto mobile; l'implementazione deve restare
  fluida, leggibile e senza scorrimento orizzontale anche alle altre larghezze.

Le tonalità sono le scelte grafiche approvate per questa guida, ispirate alle
casate; non sono una specifica ufficiale dei codici colore dei film.
