# Le lune Demiguise · Il diario di Ele

Checklist statica per smartphone: 8 lune di Hogsmeade e dintorni, più una bonus.
Grafica e contenuti derivano dall'HTML allegato da Thomas.

## Struttura

- `index.html`: contenuti, etichette e struttura della pagina.
- `styles.css`: grafica originale, estratta senza modificare le regole.
- `app.js`: contatori, filtri, reset e collegamento con il salvataggio.
- `progress.js`: salvataggio compatibile con l'HTML originale.
- `progress.test.js`: test automatici di compatibilità e persistenza.
- `app.test.js`: prova del codice interattivo con adattatore DOM simulato.
- `AGENTS.md`: regole per le successive modifiche di ChatGPT/Codex.
- `PUBBLICAZIONE.md`: configurazione e verifica GitHub Pages.

Non servono compilazione, dipendenze, account per Ele o abbonamenti.

## Salvataggio delle spunte

La chiave permanente è `ele-demiguise-hogsmeade-v1`, con un array JSON di ID.
Gli ID esistenti sono `h1`–`h7`, `u1` e `b1`: non rinominarli e non riutilizzarli.
Gli aggiornamenti conservano i progressi nello stesso browser e sullo stesso
indirizzo HTTPS. Anche gli ID non presenti nella versione corrente restano salvati,
così un ripristino temporaneo del codice non li elimina.

Il salvataggio appartiene al browser, non al repository: non si sincronizza fra
telefoni o browser e non viene trasferito automaticamente da vecchi file HTML
o da altri indirizzi. La cancellazione dei dati del browser, l'uso della modalità
privata o il cambio di dispositivo possono far perdere le spunte.
Un aggiornamento normale non esegue cancellazioni o migrazioni dei dati.

## Modifiche e test

Con Node.js 22 o successivo:

```sh
npm run check
```

I test non richiedono `npm install`. Per la prova manuale servire la cartella con
un server HTTP locale; i moduli JavaScript non sono destinati all'apertura `file://`.
Pubblicare modificando lo stesso repository e lo stesso ramo `main`.
Le verifiche reali su telefono e sull'URL pubblicato sono descritte in
`PUBBLICAZIONE.md`: i test Node non le sostituiscono.

## Repository

Il progetto è mantenuto in
https://github.com/gabrielecappello123-blip/demiguise-ele.
La pubblicazione GitHub Pages usa il ramo `main` e la cartella `/(root)`.

Per il controllo del layout, `mobile-check.html` contiene tre anteprime della
pagina reale con viewport da 360, 390 e 430 px. Non è un'emulazione di hardware
Android/iOS: permette di controllare il layout responsive nel browser.
