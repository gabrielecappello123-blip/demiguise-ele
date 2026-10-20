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

## Precisazioni per il rilascio autorizzato

Thomas il 20/10/2026 autorizza esplicitamente il collegamento e la pubblicazione
autonoma, chiedendo di coinvolgerlo solo per dubbi sostanziali. Il progetto Sites
di prova è verificato; viene riusato per l'archivio effettivo, rimuovendo prima
gli endpoint diagnostici e aggiungendo le tabelle dei profili con nuove migrazioni.
Il passaggio pubblico è necessario ai due telefoni senza account ed è compreso
nella scelta già confermata di due profili condivisi, modificabili da chi ha il link.
Nessun token amministrativo sarà nel sito o nel repository GitHub pubblico.

Il budget aggiuntivo è 0 €; Sites resta nei limiti inclusi della beta. In caso
di indisponibilità la pagina conserva una coda locale e mostra che manca la
sincronizzazione, senza acquistare crediti o attivare altri servizi.

Il server autorizza solo operazioni limitate ai profili `ele` e `thom`: lettura,
spunta puntuale, importazione conservativa e azzeramento del solo profilo scelto.
I nomi non costituiscono un'autenticazione privata. I controlli di origine CORS
evitano richieste accidentali da altri siti e non sono presentati come password.

Contratto: GET `/api/progress?profile=ele&dataset=guide-v1`; POST allo stesso
percorso con `profile`, `dataset`, `requestId` UUID e `type` `set` (`id`, `checked`),
`seed` (`ids`) oppure `reset`. Ogni risposta contiene `version:1`, `profile`,
`entries` con `id`, `checked`, `revision`, oltre a `revision` e `resetRevision`.
Ricevute persistenti rendono i tentativi ripetuti idempotenti. Una revisione
precedente non ripristina una spunta o annulla un azzeramento successivo.

L'importazione delle spunte originali inserisce solo ID assenti, senza
sovrascrivere valori espliciti. Un azzeramento blocca importazioni successive
nel profilo. Ciò permette di recuperare anche spunte originali di un telefono
collegato più tardi, conservando sempre il dato originale come recupero.

La coda locale contiene operazioni immutabili con profilo e UUID; la conferma
online ne consente la rimozione. Letture e risposte obsolete non prevalgono
sulle modifiche ancora in attesa. Preferenza del profilo e filtro sono locali;
nessuna apertura o consultazione modifica automaticamente una spunta.

Per verifiche live si usa `?verifica=<UUID>`: dataset `verify-<UUID>`, memoria
locale separata e nessuna importazione originale. L'indicazione di prova è
visibile. Le prove nei riquadri browser a 360/390/430 px sono distinte dalle
prove fisiche sui telefoni. Il sito continua al suo URL GitHub Pages.
