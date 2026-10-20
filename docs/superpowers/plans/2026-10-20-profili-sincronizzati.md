# Profili sincronizzati Ele e Thom — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** due profili sincronizzati fra i due telefoni, sul link GitHub Pages esistente.

**Architecture:** client statico senza dipendenze, coda locale conservativa e API Sites/D1. Operazioni puntuali idempotenti, cache con revisione e importazione non distruttiva della chiave originale. Componenti indipendenti implementati in parallelo, integrazione e rilascio gestiti dall'agente principale.

**Tech Stack:** JavaScript ES modules, Node >=22, Sites Vinext/Workers, D1 SQLite.

**Spec:** `docs/superpowers/specs/2026-10-20-profili-sincronizzati-design.md`.

## Global Constraints

- URL `https://gabrielecappello123-blip.github.io/demiguise-ele/` invariato.
- Budget aggiuntivo 0 €; nessun account richiesto a Ele e nessuna API AI.
- Chiave originale `ele-demiguise-hogsmeade-v1` e ID `h1`..`h7`,`u1`,`b1` conservati.
- Profili `ele` e `thom`, accesso condiviso senza password già accettato.
- Per questo rilascio conservare contenuti e impaginazione, aggiungere solo controlli dei profili/stato e filtro concordato; la nuova guida completa rimane una fase separata.
- Esecuzione e pubblicazione autorizzate da Thomas; non richiedere approvazioni ripetitive sul lavoro già richiesto.

## Review Focus

- Risposta persa e tentativo ritardato dopo una rimozione o reset: nessuna resurrezione.
- Due schede e due telefoni: nessuna perdita di operazioni o scambio di profilo.
- Dati locali malformati/quota esaurita: conservare gli originali e segnalare il limite.
- Telefono con spunte originali collegato tardi: importare ID assenti senza annullare scelte successive.
- Dati di verifica e produzione: nessuna contaminazione fra archivi.

### Task 1: API persistente (backend worktree `/workspace/sites/demiguise-profili`)

**Files:** `db/schema.ts`, nuove `drizzle/*.sql`, `app/api/progress/route.ts`, helper con SQL/API e test SQLite. Rimuovere `app/api/probe/route.ts`.
**Interfaces:** contratto GET/POST della specifica, istantanee coerenti con revisioni monotone.

- [ ] Scrivere test su SQLite reali per isolamento, importazioni, rimozioni, replay, reset, origine e input.
- [ ] Osservare il fallimento prima dell'implementazione; implementare batch D1 atomici e ricevute.
- [ ] Eseguire test, TypeScript e build; commettere sorgenti senza credenziali.

### Task 2: coda e cache browser

**Files:** `profile-sync.js`, `profile-sync.test.js`.
**Interfaces:** `createProfileSync({storage,fetchImpl,baseUrl,dataset,onChange})` restituisce `select`, `set`, `reset`, `refresh`, `retry`, `getState`, `isRelevantStorageKey`. Stato con profilo, Set completed, pending e status.

- [ ] Scrivere e osservare fallire test di migrazione, due istanze, richieste pendenti, riapertura/rete e storage bloccato.
- [ ] Implementare operazioni locali immutabili, fusione delle risposte e coda senza perdita.
- [ ] Verificare tutti i test e commettere i due file.

### Task 3: interfaccia attuale

**Files:** `app.js`, `app.test.js`, `index.html`, `styles.css`, `mobile-check.html`, `package.json`.

- [ ] Aggiungere test prima del codice per scelta obbligatoria, profili distinti, filtro, reset e messaggi di salvataggio.
- [ ] Collegare i controlli Ele/Thom, recupero al ritorno online/focus e stato onesto delle modifiche in attesa.
- [ ] Aggiornare spiegazioni del salvataggio, versione 1.1.0 e riquadri mobile con dataset isolato.
- [ ] Eseguire `npm run check`; revisione indipendente dell'intero flusso.

### Task 4: rilascio e prova reale

- [ ] Pubblicare prima API, verificare due profili e dataset separati su HTTPS.
- [ ] Pubblicare frontend tramite commit GitHub con genitore remoto corrente, soltanto file previsti.
- [ ] Verificare richiesta CORS, selezione e spunte nel browser, riapertura e aggiornamento innocuo con conservazione.
- [ ] Verificare riquadri browser 360/390/430 px, filtri e azzeramento annullato/confermato su soli dati di prova.
- [ ] Registrare risultati e limiti; restituire il link definitivo senza dichiarare prove sui telefoni fisici non effettuate.
