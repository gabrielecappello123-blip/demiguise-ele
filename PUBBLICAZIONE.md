# Pubblicazione e verifica

## Pubblicazione esistente

Repository: https://github.com/gabrielecappello123-blip/demiguise-ele.
URL pubblico: https://gabrielecappello123-blip.github.io/demiguise-ele/.
Il primo deployment Pages `39342179312` è terminato con successo sul commit
`806e09f0b9563f8ef0c15746d287971e99a744c5`; HTML, CSS e moduli JavaScript
rispondono via HTTPS con HTTP 200. Thomas ha confermato il 20/10/2026 che le
spunte persistono dopo chiusura e riapertura sul proprio telefono.

La versione 1.0.2 corregge i nomi italiani verificati online e usa gli stessi
identificativi delle lune. CSS e modulo di salvataggio sono identici alla prima
pubblicazione. Il resoconto del rilascio è conservato in `PIANO.md`.

## Configurazione per manutenzione

Usare il repository dedicato `demiguise-ele` già esistente. Il repository
pubblico contiene solo il sito e il codice, non le spunte di Ele. I progressi
rimangono nel browser di chi usa la pagina.

Caricare il progetto sul ramo `main`. In **Settings → Pages → Build and
deployment**, scegliere **Deploy from a branch**, ramo **main**, cartella
**/(root)** e salvare. Il file `.nojekyll` disabilita la compilazione Jekyll.
Usare l'URL HTTPS restituito da GitHub e verificare **Enforce HTTPS**.

Conservare l'URL pubblico già assegnato e verificato: non creare un nuovo
repository, non rinominare l'account o il progetto e non spostare la cartella.

Per gli aggiornamenti successivi bastano commit nello stesso ramo; Ele apre
sempre il medesimo link. Non serve scaricare nuovi file. Per ricevere una versione
appena pubblicata può essere necessario ricaricare la pagina o attendere la cache.
Non è presente un service worker che possa trattenere indefinitamente vecchi file.

## Collaudo obbligatorio dopo il primo rilascio

- [x] GitHub conferma il primo deployment completato.
- [x] HTML, CSS e moduli JS rispondono all'URL HTTPS (HTTP 200).
- [ ] Prova a larghezza 360, 390 e 430 px, nessuno scorrimento orizzontale.
- [ ] Spuntare `h2` e `b1`: il contatore principale mostra 1/8, bonus indipendente.
- [ ] Con il filtro Da trovare, `h2` scompare; il bonus resta visibile.
- [ ] Chiudere completamente la scheda e riaprire lo stesso URL nello stesso
  profilo browser: entrambe le spunte e il contatore devono rimanere.
- [ ] Pubblicare un aggiornamento innocuo su `main`, attendere il deployment,
  ricaricare e controllare che entrambe le spunte siano ancora presenti.
- [ ] Azzera spunte → Annulla: nessun cambiamento. Poi confermare: 0/8 e bonus
  deselezionato. Non eseguire questa prova sul browser personale di Ele.
- [ ] Aprire il link su un telefono reale o dichiarare esplicitamente che
  la verifica è stata limitata a viewport mobile simulato.

## Fonti tecniche

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

