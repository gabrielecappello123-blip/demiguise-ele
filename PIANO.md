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

## Pagina iniziale approvata

- [x] Thomas sceglie C il 20/10/2026: dopo la selezione di Ele o Thom,
  mostrare le tre sezioni Missioni, Sblocchi e potenziamenti, Guide pratiche,
  insieme a un piccolo riquadro «Riprendi» con le attività segnate «In corso».
- [ ] Implementare questa pagina nella successiva fase di sviluppo.

Gli stati sono espliciti, manuali e reversibili. Consultare una guida,
effettuare una ricerca o aprire una sezione non segna un'attività in corso.

## Costi e scelta del modello

Vincolo confermato da Thomas il 20/10/2026: **0 € di costi aggiuntivi per il
sito**, oltre al normale uso della sua offerta ChatGPT Work/Codex per
progettarlo e aggiornarlo. Anche profili sincronizzati e ricerca fotografica
devono rientrare in questo budget. Nessun servizio a pagamento è autorizzato.
La proposta di backend nel documento sui profili resta da verificare rispetto
a questo vincolo prima di adottare una piattaforma.

Controllo del 20/10/2026: i quattro file del sito pubblicato (`index.html`,
`styles.css`, `app.js`, `progress.js`) restituiscono HTTP 200 e pesano in tutto
27.575 byte, prima della compressione HTTP. Il sito attuale non effettua
chiamate ad API AI. Il valore non è una stima della futura guida completa.
Le foto future dovranno essere ottimizzate e caricate quando richieste.

GitHub Pages è disponibile per repository pubblici con GitHub Free. Limiti
ufficiali verificati alla stessa data: 1 GB per il sito pubblicato e 100 GB/mese
di traffico come soglia flessibile. Le fatture personali dell'account non sono
state verificate tramite il collegamento, che espone il solo progetto.
Fonti: [disponibilità gratuita](https://docs.github.com/en/pages/quickstart),
[limiti Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Preferenza operativa di Thomas: consigliare modello e livello di ragionamento
prima del compito quando conviene cambiare; altrimenti continuare con
l'impostazione adatta senza avvisi ripetitivi. Raccomandazione per la fase di
progettazione attuale: **GPT-6.1 Sol / High**. Le indicazioni per compiti più
impegnativi vanno rivalutate caso per caso; non sono classifiche universali.

La documentazione OpenAI distingue Max, che dà più tempo di ragionamento al
modello, da Ultra, che coordina più agenti per parti indipendenti. Modello,
contesto, ragionamento e strumenti influenzano l'uso della quota; i costi API
non permettono di dedurre un consumo settimanale esatto per questa chat.
Fonti verificate il 20/10/2026: [modelli Work](https://learn.chatgpt.com/docs/models),
[quote e consumo](https://learn.chatgpt.com/docs/pricing).

## Demiguise: filtro approvato e progressi condivisi

- [x] Thomas sceglie B il 20/10/2026: le lune raccolte restano al loro posto,
  spuntate; un filtro «Mostra solo quelle da raccogliere» permette di nasconderle.
- [ ] Implementare il filtro nel futuro aggiornamento.
- [x] Precisazione del 20/10/2026: entrambi i profili devono essere visibili e
  aggiornabili sia dal telefono di Thomas sia da quello di Ele. La priorità
  sono i due telefoni; un salvataggio soltanto locale non soddisfa il requisito.
- [x] Thomas autorizza a gestire da qui la verifica Sites, senza chiedergli
  di aprire Sites sul telefono o di creare un account Cloudflare.

### Prova Sites separata, senza dati reali

Creato e pubblicato un progetto **owner-private di sola prova**, distinto dalla
guida: progetto `appgprj_6ad762d4349881919a160ba1dedc1b36`, sorgenti in
`/workspace/sites/demiguise-progressi` e repository Sites sincronizzato dal
workflow ufficiale. Identità persistita nel suo `.openai/hosting.json`.
Non creare un altro progetto per ripetere questa prova.

Deployment `appgdep_6ad763ba160881919662852e72a7506f`, versione
`appgprj_6ad762d4349881919a160ba1dedc1b36~appgver_b764eb843e388191b2351e657a50296e`,
sorgente `efef811827bf3311eb7ee91d62ac4696ddc71d89`: stato succeeded.
URL tecnico privato: https://demiguise-progressi.leigan.chatgpt.site.
Binding D1 `DB`, unica tabella applicativa `sync_probe`.

Verifiche effettive: controllo TypeScript e build superati; POST di un UUID e
booleano di prova; GET indipendente che ritrova il valore; rifiuto di un valore
non booleano senza sovrascrittura; DELETE e successivo GET 404. Dati di prova
rimossi. Una richiesta priva di accesso riceve HTTP 401. Il controllo integrato
`tests/probe-live.mjs` è passato con exit 0. URL e token di servizio sono
passati solo tramite stdin nascosto; nessun token nel repository o nei documenti.

Nessun account Cloudflare o piano a pagamento attivato. Sites è incluso nei
piani compatibili durante la beta; l'accesso e il provisioning D1 sono riusciti,
ma il connettore non ha mostrato la quota residua esatta o garantito le condizioni
future. Il vincolo di 0 € aggiuntivi rimane obbligatorio.

**La prova non è il backend di produzione.** L'endpoint diagnostico deve restare
privato. Restano da progettare e implementare i profili reali, la loro
autorizzazione, la migrazione conservativa, il recupero offline e l'integrazione
dal dominio GitHub Pages. Non è stata fatta una prova nei browser dei due
telefoni o una verifica CORS di quel flusso. Non dichiarare già attiva la
sincronizzazione Ele/Thom. La futura integrazione deve rispettare la specifica
dei profili, aggiornata alle successive scelte, e i relativi passaggi di sviluppo.

La guida pubblica non è stata modificata da questa prova: i quattro asset
restituiscono HTTP 200 e restano complessivamente 27.575 byte, con hash invariati
rispetto alla versione 1.0.3. Il link da condividere resta quello GitHub Pages.

## Rilascio profili sincronizzati 1.1.0

Autorizzato esplicitamente da Thomas il 20/10/2026 con richiesta di procedere
autonomamente fino al collegamento e alla pubblicazione, senza ulteriori
conferme di routine. Questo rilascio aggiunge profili, sincronizzazione e filtro;
la nuova struttura e lo stile completo della guida restano una fase separata.

- [x] Piano e specifica aggiornati; copie di lavoro isolate, sorgenti originali conservati.
- [x] Backend Sites pubblicato: sorgente `aedca2a1836e50e1ea7697c948ded568565d4095`,
  deployment `appgdep_6ad76915df0081918a8a2d66bf015327`, stato succeeded.
- [x] Accesso reso pubblico per i due profili senza account, come già concordato;
  diagnostica rimossa, nuove migrazioni append-only, nessun token nel frontend.
- [x] Backend: 15 test SQLite, TypeScript e build superati.
- [x] Client/interfaccia/compatibilità: 51 test automatici superati.
- [x] Revisione indipendente: corretti timeout delle richieste e compatibilità
  delle importazioni con i limiti del server; regressioni riprodotte e superate.
- [x] Verifica HTTPS reale: API pubblica, preflight CORS, profili distinti,
  importazioni conservative, replay/reset, due memorie client indipendenti,
  coda offline e riapertura. Dataset isolato `verify-3dfced97-aa70-45d2-b646-702bbedf66c8`;
  zero scritture nei progressi di produzione.
- [x] Frontend 1.1.0 pubblicato: commit `db89dfb4d4b65c2d0b7ab2aac6273bb3ec069d5b`,
  Pages `39429353655` success. HTML/CSS/JS e modulo di salvataggio rispondono
  HTTP 200 e coincidono byte per byte con i file verificati; totale runtime 48.487 byte.
- [x] Browser reale Chrome su archivio `verify-7b596168-5b72-49e5-aa3e-b80b09657224`:
  scelta obbligatoria, Ele h2+b1 con contatore 1/8 e bonus separato, Thom 0/8,
  cambio profilo, filtro con bonus nascosto, ricaricamento e nuova scheda.
  Azzeramento annullato conserva le spunte; confermato azzera solo il profilo.
  Spunte h2+b1 ripristinate e confermate «Salvato online» per la prova di aggiornamento.
- [x] Veri viewport iframe 360/390/430 px: nessuno scorrimento orizzontale,
  misure clientWidth=scrollWidth 345/375/415 px (barra verticale desktop 15 px).
  Istruzioni espanse e controlli leggibili. Non è una prova sui telefoni fisici.
- [ ] Aggiornamento innocuo 1.1.1 (soli metadati/versione) e riapertura con progressi conservati.

Restano distinte le verifiche HTTP/Node, quelle nel browser e quelle sui telefoni
fisici. Non dichiarare una prova su hardware mobile se fatta soltanto in iframe.
La chiave originale non è stata cancellata o modificata.
