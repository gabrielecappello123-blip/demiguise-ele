# Primo aggiornamento: profili Ele e Thom

Progetto da verificare prima dell'implementazione, 20 ottobre 2026.

## Scelte confermate da Thomas

- Nome del sito: **Guida Completa Hogwarts Legacy**.
- Due profili fissi: **Ele** e **Thom**.
- Spunte separate, sincronizzate fra telefoni e PC.
- Accesso scegliendo il nome, senza PIN, email o password.
- Le spunte esistenti diventano il punto di partenza di entrambi; poi ciascuno
  può cambiarle indipendentemente.
- Conservare il link GitHub Pages e la grafica attuale. La guida completa si
  costruirà per passi successivi: questo aggiornamento riguarda solo i profili.

## Esperienza proposta

Al primo accesso appare «Chi sta giocando?» con i pulsanti Ele e Thom. Il
dispositivo ricorda la scelta. Un comando «Cambia profilo» permette di passare
all'altro; nome e contatori indicano sempre il profilo attivo. Spuntare, togliere
una spunta e azzerare dopo conferma agiscono soltanto sul profilo selezionato.
Il profilo scelto su un dispositivo è una preferenza locale; i progressi sono
online e vengono riletti all'apertura, al cambio di profilo e al ritorno alla
pagina. Non si presentano questi profili come account privati.

## Salvataggio online

GitHub Pages continua a servire la guida. Per la sincronizzazione serve un
servizio aggiuntivo, perché Pages ospita file statici.

Opzione proposta: piccolo servizio tramite Sites con archivio D1, gestibile
dagli strumenti già disponibili. Alternativa: database gestito da un servizio
esterno con un account dedicato, con maggiore separazione amministrativa ma
anche configurazione e accessi aggiuntivi. Per questo primo passo si propone
Sites; non si attivano abbonamenti aggiuntivi.

Il servizio accetta soltanto i due profili e operazioni sui progressi, valida
i dati e non espone credenziali amministrative. La scelta senza PIN permette
ai visitatori del link di usare entrambi i profili, come già scelto da Thomas.
Una modifica aggiorna la singola voce: una pagina rimasta aperta non sostituisce
l'intero salvataggio con una copia vecchia. A parità di voce vale l'ultima
modifica accettata dal servizio. Il cambio di profilo non sposta le modifiche
ancora da inviare da un utente all'altro.

Il browser conserva una copia e le modifiche in attesa. Se la rete manca,
mostra «Da sincronizzare»; al ripristino invia le modifiche senza presentare
un salvataggio locale come già salvato online.

## Trasferimento dei progressi e verifiche

La chiave originale `ele-demiguise-hogsmeade-v1` e i nove ID non cambiano.
La copia iniziale online è idempotente: non sovrascrive progressi già modificati
e non ripristina spunte tolte successivamente. I dati locali originali restano
disponibili per recupero; dati malformati non sono cancellati automaticamente.

Prima del rilascio verificare: separazione Ele/Thom; copia iniziale ripetuta
senza duplicazioni; spunte tolte che non ricompaiono; due browser che ritrovano
lo stesso profilo; assenza di sovrascritture fra dispositivi; rete interrotta e
successivo recupero; cambio di profilo con richieste in corso; reset limitato
al profilo corrente; mantenimento dei progressi dopo un aggiornamento.
Controllare anche il layout mobile e il sito all'URL HTTPS definitivo,
distinguendo test automatici, prove in browser ed eventuali verifiche mancanti.

Fonti tecniche: istruzioni Sites su D1 e accesso pubblico; documentazione
GitHub Pages e Cloudflare D1:

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://developers.cloudflare.com/d1/worker-api/
