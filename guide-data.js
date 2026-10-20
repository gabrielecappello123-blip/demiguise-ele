// Editorial navigation, separate from the progress store. Keep these IDs and
// canonical routes stable when adding content or changing a visible label.
export const SECTIONS = [
  {
    id: 'missioni', title: 'Missioni', summary: 'Principali, secondarie e incarichi.',
    categories: [
      { id: 'principali', title: 'Missioni principali', summary: 'Il percorso della storia, con gli spoiler protetti.' },
      { id: 'secondarie', title: 'Missioni secondarie', summary: 'Le missioni facoltative, organizzate per luogo.' },
      { id: 'incarichi', title: 'Incarichi dei professori', summary: 'Obiettivi richiesti e ricompense degli incarichi.' },
      { id: 'relazioni', title: 'Missioni dei compagni', summary: 'I percorsi dei personaggi che ti accompagnano.' }
    ]
  },
  {
    id: 'sblocchi', title: 'Sblocchi e potenziamenti', summary: 'Demiguise, incantesimi e abilità.',
    categories: [
      { id: 'demiguise', title: 'Demiguise e Alohomora', summary: 'Le statuette da trovare e le serrature da aprire.' },
      { id: 'incantesimi', title: 'Incantesimi', summary: 'Come ottenere e utilizzare gli incantesimi.' },
      { id: 'talenti', title: 'Talenti e abilità', summary: 'Scelte per sviluppare il tuo personaggio.' },
      { id: 'equipaggiamento', title: 'Equipaggiamento', summary: 'Caratteristiche e miglioramenti del tuo equipaggiamento.' }
    ]
  },
  {
    id: 'pratiche', title: 'Guide pratiche', summary: 'Oggetti, pozioni ed enigmi.',
    categories: [
      { id: 'oggetti', title: 'Oggetti e risorse', summary: 'A cosa servono, dove trovarli e quando conservarli.' },
      { id: 'pozioni', title: 'Pozioni', summary: 'Ingredienti, preparazione e utilizzo.' },
      { id: 'piante', title: 'Piante', summary: 'Coltivazione e utilizzo delle piante.' },
      { id: 'stanza', title: 'Stanza delle necessità', summary: 'Organizzazione e soluzioni pratiche per la tua stanza.' },
      { id: 'combattimento', title: 'Combattimento', summary: 'Preparazione, incantesimi e strategie per i nemici.' },
      { id: 'enigmi', title: 'Enigmi e attività', summary: 'Indicazioni chiare per superare gli ostacoli.' },
      { id: 'collezionabili', title: 'Esplorazione e collezionabili', summary: 'Luoghi da esplorare e oggetti da raccogliere.' }
    ]
  }
];

// Only published, usable guides belong here. Pending categories remain navigation
// pages; do not pretend a walkthrough exists by adding an empty guide record.
export const GUIDES = [
  {
    id: 'demiguise', title: 'Demiguise e Alohomora',
    summary: 'Hogsmeade e dintorni, con una luna bonus a Hogwarts.',
    section: 'sblocchi', category: 'demiguise', route: '#/sblocchi/demiguise',
    // Search-only transcription variants; visible names remain the verified ones.
    aliases: ['lune', 'luna', 'statuette', 'alohomora', 'demigais', 'dimigais', 'alomora']
  }
];
