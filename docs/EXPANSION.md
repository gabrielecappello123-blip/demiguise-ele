# Espansione completa — autorizzata 20 ottobre 2026

## Mandato
Pubblicazione unica finale sullo stesso URL, dopo verifica. Tutte e tre le sezioni popolate: missioni principali, secondarie, incarichi e relazioni; sblocchi e potenziamenti; guide pratiche. Demiguise da zero completo, non il precedente caso personale. Percorso generale 100% e censimento collezionabili rinviati; luoghi degli enigmi ripetitivi inclusi, scheda locale breve e metodo comune apribile. Nessuna spesa/API AI. Stile e profili approvati conservati. ID legacy h1..h7/u1/b1, dataset e URL invariati. Stati manuali reversibili, immagini ampie reali apribili, spoiler soltanto dove necessari. Traduzioni verificate online.

## Contratto contenuti
File ES modules in content/, named export arrays. No imports needed within individual files.
Guides export fields:
- id: immutable ASCII slug (unique across all content)
- title: Italian verified title, spoiler-safe (neutral editorial when needed)
- officialTitle: optional spoiler title, NEVER globally visible or indexed; exact full known-title lookup may return safe neutral label
- summary: 1 short non-spoiler useful sentence
- section: missioni|sblocchi|pratiche
- category: existing guide-data.js category id
- location: verified geographic label
- aliases: safe strings only
- house: optional gryffindor|slytherin|ravenclaw|hufflepuff
- order: numeric narrative/area ordering
- requirements: short safe array
- steps: array of brief original actionable strings, main directions always visible
- panels: [{title,spoiler?:true, paragraphs?:string[], steps?:string[]}] local disclosures (choices/consequences etc)
- photos: [{src,alt,credit,source}] actual relevant wide screenshot URL, verified; no generated images. Prefer evidence not padding.
- related: [canonical guide IDs] optional
- sources: [{url,title}] traceable primary/guide source links
- verified: '2026-10-20'
- tracking: boolean; true missions/activities, false explanatory references
- methodId: optional shared puzzle method ID (renderer inline +Come si risolve)
- group: optional geographic group

Mission spoilers: safe instructions visible; actual plot only local panels. Do not hide every whole mission behind spoiler. Choices expandable explicitly explain dialogue-only vs real future effect; never invent consequences. Multiple house paths: appropriate default, other house variants opt-in.

Demiguise export MOONS 30 world locations + INTRO_MOONS 3 tutorial objects: {id,title,location,group,lock:0|1|2,steps,photos,sources,verified}; preserve old IDs by reading index.html exact mappings. export DEMIGUISE_GUIDE intro/unlock instructions as guide schema. All 30 world included; no III locks. Keep tutorial separate counting from 9+13 hand-ins.

## Execution ledger
- Base local 042039e; canonical remote ad1171ca92cfb138560179f679f43777ba75c222.
- User explicitly authorized start after all scope decisions.
- Parallel isolated content files; controller handles renderer/integration. Separate sync task if necessary; final independent review.
- Content can contain links/actual screenshots but must use original concise directions, with source provenance and uncertainty recorded rather than invented.
