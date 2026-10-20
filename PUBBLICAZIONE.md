# Pubblicazione e verifica

## Configurazione permanente

Repository: https://github.com/gabrielecappello123-blip/demiguise-ele.
Guida: https://gabrielecappello123-blip.github.io/demiguise-ele/.

GitHub Pages pubblica `main`, cartella `/(root)`, con `.nojekyll`.
Non rinominare account/progetto, non spostare la cartella e non cambiare URL.
Il frontend è statico senza compilazione; le versioni degli asset evitano
che una vecchia cache JavaScript nasconda i nuovi controlli.

Archivio: progetto Sites `appgprj_6ad762d4349881919a160ba1dedc1b36`,
https://demiguise-progressi.leigan.chatgpt.site,
binding D1 `DB`. Da 1.1.0 l'API è pubblica per i due profili condivisi senza
password. Il repository GitHub contiene codice, mai credenziali o spunte.
I dati sono nell'archivio e nella coda/cache del browser.

Il progetto di prova iniziale è stato riusato: non crearne un duplicato. Per
modifiche del backend leggere il suo manifest, recuperare accesso al repository
sorgente tramite Sites e seguire il workflow ufficiale. Preservare tutte le
migrazioni già applicate e aggiungere SQL per gli aggiornamenti. Nessun servizio
a pagamento è autorizzato; Sites resta entro le quote incluse durante la beta.

## Regole per aggiornare

1. Conservare gli ID `h1`–`h7`, `u1`, `b1`, dataset `guide-v1`, progetto Sites
   e prefisso `demiguise-profile-sync-v1:guide-v1:`.
2. Non scrivere/cancellare la chiave originale `ele-demiguise-hogsmeade-v1`.
3. Eseguire `npm run check`. Non richiede installazione di dipendenze.
4. Se cambia l'API, pubblicare prima una versione compatibile del backend e
   verificare `node verify-live.mjs` (solo dati di prova).
5. Pubblicare il frontend sullo stesso ramo. Se si usa GitHub API, leggere
   prima il genitore remoto e aggiornare il ref con confronto SHA; non forzare.
6. Attendere GitHub Pages, verificare HTTPS, asset e versione realmente online.
7. Ricaricare la guida dopo il rilascio; nessun nuovo file da scaricare per Ele.

I tentativi ripetuti usano lo stesso UUID: non generarne uno nuovo per un
errore di rete. Risposte obsolete non sovrascrivono copie più recenti, falsi
espliciti o azzeramenti. Il nome del profilo è catturato quando nasce una modifica.

## Collaudo senza toccare i vostri progressi

Aprire la guida con `?verifica=<UUID>`: l'avviso visibile conferma che memoria
locale e dataset sono isolati. Nessuna importazione della chiave originale.
`mobile-check.html?verifica=<UUID>` usa il medesimo archivio separato.

- Scegliere Ele; spuntare una luna e il bonus: contatore principale 1/8.
- Passare a Thom: le spunte di Ele non devono apparire.
- Tornare a Ele, ricaricare e riaprire una nuova scheda: progressi conservati.
- Aprire lo stesso profilo da una seconda sessione/memoria e controllare la sincronizzazione.
- Filtro «Da raccogliere»: nascondere le lune raccolte, compreso il bonus.
- Azzera → Annulla: nessun cambiamento. Confermare: soltanto il profilo corrente.
- Verificare «da sincronizzare» senza rete e recupero dopo la riapertura.
- Pubblicare un aggiornamento innocuo, ricaricare e ricontrollare le spunte.
- Nei viewport iframe 360/390/430 px nessuno scorrimento orizzontale.

I test Node/SQLite e HTTP non sono prove di un browser. Gli iframe sono veri
viewport del browser, ma non emulano hardware o comportamenti Android/iOS.
Segnalare esplicitamente se manca una prova sui due telefoni fisici.

## Evidenze e storia

Prima pubblicazione: commit `806e09f0b9563f8ef0c15746d287971e99a744c5`,
deployment Pages `39342179312`, HTTP 200. Thomas confermò la riapertura sul suo
telefono il 20/10/2026. Versione 1.0.2: localizzazione verificata, deployment
`39393040877`, stessi ID e 16 test automatici. La rinomina 1.0.3 mantiene il link.

Il resoconto puntuale dei profili 1.1.x, commit, deployment, prove e limiti
è in `PIANO.md`. Non confondere una prova del vecchio salvataggio locale
con la verifica della nuova sincronizzazione.

Fonti tecniche:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://learn.chatgpt.com/docs/sites/data-and-connections
- https://learn.chatgpt.com/docs/pricing

