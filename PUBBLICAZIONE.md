# Pubblicazione e verifica

## Configurazione prevista

Creare un repository dedicato `demiguise-ele` nell'account GitHub di Thomas.
Con GitHub Free usare un repository pubblico; contiene solo il sito e il codice,
non le spunte di Ele. I progressi rimangono nel browser di chi usa la pagina.

Caricare il progetto sul ramo `main`. In **Settings → Pages → Build and
deployment**, scegliere **Deploy from a branch**, ramo **main**, cartella
**/(root)** e salvare. Il file `.nojekyll` disabilita la compilazione Jekyll.
Usare l'URL HTTPS restituito da GitHub e verificare **Enforce HTTPS**.

Non è stato assegnato un URL definitivo in questa preparazione: non condividere
un indirizzo calcolato prima che GitHub ne abbia confermato il rilascio.

Per gli aggiornamenti successivi bastano commit nello stesso ramo; Ele apre
sempre il medesimo link. Non serve scaricare nuovi file. Per ricevere una versione
appena pubblicata può essere necessario ricaricare la pagina o attendere la cache.
Non è presente un service worker che possa trattenere indefinitamente vecchi file.

## Collaudo obbligatorio dopo il primo rilascio

- [ ] GitHub conferma il deployment completato.
- [ ] L'URL HTTPS risponde e mostra la checklist, con CSS e moduli JS caricati.
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

