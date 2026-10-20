# Prova browser del rilascio 2.0

Data: 20 ottobre 2026. Frontend pubblicato: commit `93971a54dfce41e46e97df64d2e57cfe15d31cac`, Actions `39450598001` (riferimenti di rilascio forniti dal coordinatore).

Prove effettive in Chrome cloud tramite CUA, sul sito HTTPS pubblico. Tutta la guida è stata aperta esclusivamente con `?verifica=7b596168-5b72-49e5-aa3e-b80b09657224`; nessuna modifica ai progressi di produzione. Non sono simulazioni HTTP o test Node.

## Evidenze osservate

| Area | Risultato concreto |
| --- | --- |
| Ingresso | Il reload di tab7 mostra soltanto «Riprendiamo?» con «Continua come Ele» e «Cambia profilo». Dopo il cambio a Thom, un altro reload ricorda correttamente Thom. La guida richiede sempre la conferma. |
| Compatibilità | Dopo l'aggiornamento Ele mantiene `h2` Testa di Porco e `b1` Aula di Divinazione spuntati. Contatore nuovo `2 / 30`; gruppi Zona ovest `1 / 2`, Biblioteca `1 / 3`. L'attività legacy è «In corso» e compare in Home → Riprendi. |
| Stato missione | `q-com-12` L'astrolabio perduto: Da iniziare → In corso → Completata. Dopo reload e conferma profilo, Completata rimane. Infine riportata a Da iniziare, con «Salvato online». |
| Scalari | Ele: Alohomora impostato a Livello I e consegne a 1, senza cambiare `2 / 30`. Dopo riapertura e cambio profilo entrambi i valori rimangono. |
| Profili separati | Thom mostra `q-com-12` Da iniziare, Demiguise Da iniziare, `0 / 30`, Alohomora Non ancora, consegne 0. Ritornando a Ele ricompaiono attività In corso, `2 / 30`, Livello I e consegne 1. |
| Ricerca | A 360 px la ricerca globale «astrolabio» restituisce oggetto e missione; il risultato apre la missione corretta. In Missioni secondarie «Tseta» non trova risultati; «Cerca in tutta la guida» trova Testa di Porco come corrispondenza simile. |
| Scheda rapida | Il termine astrolabio apre un dialogo con informazioni e collegamento alla scheda completa. La chiusura torna al punto di partenza. Screenshot desktop e 360 px leggibili, senza tagli orizzontali. |
| Spoiler | «Mostra le scelte e le conseguenze» è inizialmente chiuso; il testo delle conseguenze appare soltanto dopo apertura esplicita. |

## Immagini realmente caricate

Per ciascuna delle tre schede Merlino è stato aperto il pannello immagini e controllato il rendering tramite screenshot e proprietà DOM `complete`, `naturalWidth`, `naturalHeight`.

| Scheda | Foto | Mappa |
| --- | --- | --- |
| `merlin-hogsmeade-01` · Falbarton: farfalle a nord | Caricata, 1024 × 576 | Caricata, 1024 × 576 |
| `merlin-hogsmeade-03` · Valle orientale: cerchio con candele | Caricata, 1024 × 576 | Caricata, 1024 × 576 |
| `merlin-poidsear-09` · Ponte di Marunweem: statue in quota | Caricata, 1024 × 576 | Caricata, 1024 × 576 |

Controllato anche il pannello Reparto Proibito (`assets/demiguise/08.jpg`, 800 × 450) e, come prova del nuovo materiale locale, aperta direttamente `assets/demiguise/28-room.jpg` con query verifica: fotografia interna renderizzata, titolo browser 1200 × 675.

## Layout mobile e limiti

Harness pubblico `mobile-check.html` con la stessa query verifica: iframe reali da 360, 390 e 430 px, che attivano i breakpoint della pagina. Gate, Home, intestazione e navigazione sono leggibili negli screenshot. Le misure DOM `clientWidth / scrollWidth` sono rispettivamente `345 / 345`, `375 / 375`, `415 / 415`: nessuno scorrimento orizzontale; i 15 px rimanenti sono la scrollbar desktop. A 360 px anche il dialogo Astrolabio mantiene `345 / 345`.

Non è una prova su telefono fisico né un'emulazione del dispositivo. Screenshot ispezionati nell'output CUA; il runtime non esponeva un percorso file da allegare. Log warning/error filtrato sul dominio del sito: vuoto.

Nessun bug materiale emerso nei percorsi campionati. Ordine completo delle principali, tutti i filtri, reset e algoritmi di ricerca non sono stati ricampionati esaustivamente in questo passaggio: la copertura automatica e le revisioni indipendenti restano evidenze separate.

Stato finale del solo archivio di verifica: Ele `h2` e `b1` conservati, Demiguise In corso, Livello I, 1 consegnata; `q-com-12` Da iniziare. Thom invariato.
