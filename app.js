import { createProfileSync } from './profile-sync.js?v=1.1.0';
import { SECTIONS, GUIDES } from './guide-data.js?v=1.2.0';
import { searchGuide } from './search.js?v=1.2.0';

(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const zoneIds = { hogsmeade: ['h1','h2','h3','h4','h5','h6','h7'], upper: ['u1'] };
  const mainIds = [...zoneIds.hogsmeade, ...zoneIds.upper];
  const moonIds = [...mainIds, 'b1'];
  const activityId = 'activity:demiguise:in-progress';
  const profiles = { ele: { name:'Ele', house:'Grifondoro', image:'gryffindor' }, thom: { name:'Thom', house:'Serpeverde', image:'slytherin' } };
  const verification = new URLSearchParams(window.location.search).get('verifica');
  const isVerification = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(verification || '');
  const dataset = isVerification ? 'verify-' + verification.toLowerCase() : 'guide-v1';
  const items = [...document.querySelectorAll('.item[data-id]')];
  const searchInput = $('guideSearch');
  let entered = false, choosing = true, canReturn = false, desiredProfile = null;
  let current, rememberedProfile, route, allScope = false, filter = 'all', toastTimer;
  const sync = createProfileSync({ dataset, onChange: render });
  current = sync.getState();
  rememberedProfile = current.profile;
  choosing = !rememberedProfile;
  $('verificationNotice').hidden = !isVerification;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function link(title, href, className = '') {
    const node = element('a', className, title);
    node.href = href;
    node.addEventListener('click', () => {
      clearSearch();
      if (window.location.hash === href) renderRoute(true);
    });
    return node;
  }
  function showToast(message) {
    $('toast').textContent = message;
    $('toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2600);
  }
  function statusText(state) {
    if (state.status === 'storage-error') return 'Salvataggio sul telefono non disponibile. Le nuove spunte non vengono applicate.';
    if (!state.profile) return 'Scegli Ele o Thom per usare le spunte.';
    if (state.status === 'saved') return 'Salvato online · disponibile su entrambi i telefoni';
    if (state.status === 'syncing') return 'Sincronizzazione in corso…';
    if (state.status === 'offline' || state.status === 'error') return state.pending
      ? 'Salvato sul telefono · modifiche da sincronizzare'
      : 'Collegamento non disponibile · visualizzi la copia di questo telefono';
    return 'Caricamento dei progressi…';
  }
  const moonEntries = items.map(item => {
    const id = item.dataset.id;
    item.id = 'moon-' + id;
    item.setAttribute('tabindex', '-1');
    const place = item.dataset.zone === 'hogsmeade' ? 'Hogsmeade' : item.dataset.zone === 'upper' ? 'Upper Hogsfield' : 'Hogwarts';
    return { id:'moon:' + id, moonId:id, title:item.querySelector('.item-title').textContent,
      summary:place + ' · ' + item.querySelector('.item-desc').textContent,
      aliases:['luna','lune','demiguise','demigais','dimigais','statuetta','alohomora','alomora'],
      scope:'sblocchi/demiguise', route:'#/sblocchi/demiguise/' + id, kind:'Luna Demiguise' };
  });
  const entries = [
    ...SECTIONS.flatMap(section => [
      {id:'section:' + section.id,title:section.title,summary:section.summary,scope:section.id,route:'#/' + section.id,kind:'Sezione'},
      ...section.categories.filter(category => category.id !== 'demiguise').map(category => ({
        id:'category:' + section.id + ':' + category.id,title:category.title,summary:category.summary,
        scope:section.id + '/' + category.id,route:'#/' + section.id + '/' + category.id,kind:'Sezione · In preparazione'
      }))
    ]),
    ...GUIDES.map(guide => ({...guide,scope:guide.section + '/' + guide.category,kind:'Guida disponibile'})),
    ...moonEntries
  ];
  function resolveRoute() {
    const hash = window.location.hash || '#/';
    const legacy = { '#hogsmeadeSection':'hogsmeadeSection', '#upperSection':'upperSection', '#bonusTitle':'moon-b1' };
    if (legacy[hash]) return {kind:'demiguise',section:SECTIONS.find(s => s.id === 'sblocchi'),scope:'sblocchi/demiguise',target:legacy[hash]};
    const parts = hash.replace(/^#\/?/, '').split('/');
    const section = SECTIONS.find(s => s.id === parts[0]);
    if (!section) return {kind:'home',scope:''};
    if (!parts[1]) return {kind:'section',section,scope:section.id};
    const category = section.categories.find(c => c.id === parts[1]);
    if (!category) return {kind:'section',section,scope:section.id};
    if (section.id === 'sblocchi' && category.id === 'demiguise') return {
      kind:'demiguise',section,category,scope:'sblocchi/demiguise',
      target:moonIds.includes(parts[2]) ? 'moon-' + parts[2] : null
    };
    return {kind:'category',section,category,scope:section.id + '/' + category.id};
  }
  function card(title, summary, href, className, badge, icon) {
    const node = link('', href, className);
    if (icon) {
      const drawing = element('span','card-icon');
      drawing.setAttribute('aria-hidden','true');
      const paths = {
        missioni: '<path d="M12 6C9 3 4 3 2 4v15c3-1 7-1 10 1m0-14c3-3 8-3 10-2v15c-3-1-7-1-10 1V6Z"/>',
        sblocchi: '<path d="m4 20 12-12 3 3L7 23 4 20Zm11-11 3 3M6 2v4M2 6h4M8 8l2 2M18 2v3M21 6h2"/>',
        pratiche: '<path d="M8 2h8M10 2v7l-6 10c-1 2 0 3 2 3h12c2 0 3-1 2-3L14 9V2M7 15h10"/>'
      };
      // Static application-owned SVG only; search text is always textContent.
      drawing.innerHTML = '<svg viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + paths[icon] + '</svg>';
      node.append(drawing);
    }
    const copy = element('span', 'card-copy');
    copy.append(element('span','card-title',title), element('span','card-summary',summary));
    if (badge) copy.append(element('span','availability',badge));
    const arrow = element('span','card-arrow','›'); arrow.setAttribute('aria-hidden','true');
    node.append(copy, arrow);
    return node;
  }
  $('homeCards').replaceChildren(...SECTIONS.map(section => card(section.title,section.summary,'#/' + section.id,'section-card',null,section.id)));

  function renderRoute(focus = false) {
    route = resolveRoute();
    if (route.target && filter !== 'all') {
      // A direct search result must stay visible even when collected moons were
      // filtered out before navigation. This changes the view, never progress.
      filter = 'all';
      document.querySelectorAll('.tab').forEach(tab => {
        const active = tab.dataset.filter === 'all';
        tab.classList.toggle('active',active);
        tab.setAttribute('aria-pressed',String(active));
      });
    }
    $('homeView').hidden = route.kind !== 'home';
    $('sectionView').hidden = route.kind !== 'section';
    $('categoryView').hidden = route.kind !== 'category';
    $('demiguiseView').hidden = route.kind !== 'demiguise';
    $('viewTitle').textContent = route.kind === 'home' ? 'Esplora la guida'
      : route.kind === 'demiguise' ? 'Demiguise e Alohomora'
      : route.category?.title || route.section.title;
    const crumbs = [];
    if (route.kind !== 'home') crumbs.push(link('Home','#/'));
    if (route.category || route.kind === 'demiguise') crumbs.push(link(route.section.title,'#/' + route.section.id));
    $('breadcrumbs').replaceChildren(...crumbs);
    $('breadcrumbs').hidden = !crumbs.length;
    document.querySelectorAll('.nav-link').forEach(node => {
      if (node.dataset.section === (route.section?.id || '')) node.setAttribute('aria-current','page');
      else node.removeAttribute('aria-current');
    });
    if (route.kind === 'section') {
      $('sectionIntro').textContent = route.section.summary;
      $('categoryGrid').replaceChildren(...route.section.categories.map(category => {
        const available = GUIDES.some(guide => guide.section === route.section.id && guide.category === category.id);
        return card(category.title, category.summary, '#/' + route.section.id + '/' + category.id,
          'category-card', available ? 'Disponibile' : 'In preparazione');
      }));
    }
    if (route.kind === 'category') {
      $('categoryIntro').textContent = route.category.summary;
      const guides = GUIDES.filter(guide => guide.section === route.section.id && guide.category === route.category.id);
      $('categoryContents').replaceChildren(...(guides.length
        ? guides.map(guide => card(guide.title,guide.summary,guide.route,'guide-card'))
        : [element('div','empty-state','Le guide di questa sezione sono in preparazione. Qui troverai i contenuti verificati man mano che vengono aggiunti.')]));
    }
    $('searchLabel').textContent = route.kind === 'home' || allScope ? 'Cerca nella guida'
      : 'Cerca in ' + (route.kind === 'demiguise' ? 'Demiguise' : route.category?.title || route.section.title);
    searchInput.placeholder = route.kind === 'demiguise' ? 'Cerca un luogo o una luna…' : 'Una missione, un luogo, un oggetto…';
    renderSearch();
    render(current);
    if (focus && entered) {
      requestAnimationFrame(() => {
        if (route.target) {
          const target = $(route.target);
          if (target) {
            const details = target.querySelector('.details');
            if (details) details.open = true;
            target.scrollIntoView({block:'start'});
            target.focus({preventScroll:true});
            return;
          }
        }
        $('viewTitle').focus({preventScroll:true});
        window.scrollTo({top:0});
      });
    }
  }
  function clearSearch() {
    searchInput.value = '';
    allScope = false;
    renderSearch();
  }
  function renderSearch() {
    const query = searchInput.value.trim();
    const scope = allScope ? '' : route?.scope || '';
    $('clearSearch').hidden = !query;
    $('searchAll').hidden = !route?.scope;
    $('searchAll').textContent = allScope ? 'Torna a questa sezione' : 'Cerca in tutta la guida';
    $('searchLabel').textContent = !scope ? 'Cerca nella guida'
      : 'Cerca in ' + (route.kind === 'demiguise' ? 'Demiguise' : route.category?.title || route.section.title);
    $('searchResults').hidden = !query;
    if (!query) {
      $('resultList').replaceChildren();
      $('searchMessage').textContent = '';
      if (route) renderChecklist(current);
      return;
    }
    const results = searchGuide(entries,query,{scope});
    $('resultList').replaceChildren(...results.map(result => {
      const li = element('li');
      const resultLink = link('', result.route);
      resultLink.append(element('span','result-title',result.title),
        element('span','result-meta',result.kind + (result.approximate ? ' · Corrispondenza simile' : '')),
        element('span','result-summary',result.summary));
      li.append(resultLink); return li;
    }));
    $('searchMessage').textContent = results.length
      ? results.length + (results.length === 1 ? ' risultato' : ' risultati') + (scope ? ' in questa sezione.' : ' nella guida.')
      : 'Nessun risultato. Prova un nome più breve' + (scope ? ' oppure cerca in tutta la guida.' : '. Le guide ancora da scrivere non sono incluse.');
    if (route) renderChecklist(current);
  }
  function renderChecklist(state) {
    const completed = state.completed;
    const canEdit = entered && state.profile === desiredProfile && state.status !== 'storage-error';
    $('resetBtn').disabled = !canEdit;
    $('activityBtn').disabled = !canEdit;
    const inProgress = completed.has(activityId);
    $('activityBtn').textContent = inProgress ? 'In corso · Rimuovi da Riprendi' : 'Segna in corso';
    $('activityBtn').setAttribute('aria-pressed',String(inProgress));
    const total = mainIds.filter(id => completed.has(id)).length;
    $('totalDone').textContent = total;
    $('progressFill').style.width = (total / mainIds.length * 100) + '%';
    $('progressTrack').setAttribute('aria-valuenow',String(total));
    $('progressMessage').textContent = total === 8 ? 'Completato! Hai raccolto tutte le 8 lune della zona.'
      : total === 0 ? '7 a Hogsmeade + 1 a Upper Hogsfield.' : 'Ne mancano ' + (8-total) + ' per completare questa zona.';
    $('hogsmeadeCount').textContent = zoneIds.hogsmeade.filter(id => completed.has(id)).length + ' / 7';
    $('upperCount').textContent = zoneIds.upper.filter(id => completed.has(id)).length + ' / 1';
    $('bonusMessage').textContent = completed.has('b1') ? 'Luna bonus trovata! Il contatore principale rimane dedicato a Hogsmeade e dintorni.'
      : 'Questa luna extra ha una spunta indipendente e non cambia il contatore delle 8 della zona.';
    const query = route?.kind === 'demiguise' && !allScope ? searchInput.value.trim() : '';
    const matched = query ? new Set(searchGuide(moonEntries,query,{scope:'sblocchi/demiguise'}).map(entry => entry.moonId)) : null;
    items.forEach(item => {
      const checked = completed.has(item.dataset.id);
      item.classList.toggle('checked',checked);
      const input = item.querySelector('input.moon-check');
      input.checked = checked; input.disabled = !canEdit;
      item.hidden = (filter === 'todo' && checked) || Boolean(matched && !matched.has(item.dataset.id));
    });
    for (const [zone,id] of [['hogsmeade','hogsmeadeSection'],['upper','upperSection']]) {
      const allDone = zoneIds[zone].every(value => completed.has(value));
      $(id).querySelector('.empty').style.display = !query && filter === 'todo' && allDone ? 'block' : 'none';
    }
    $('itemSearchEmpty').hidden = !query || items.some(item => !item.hidden);
  }
  function render(state) {
    current = state;
    const showingGuide = entered && state.profile === desiredProfile && Boolean(state.profile);
    $('profileGate').hidden = showingGuide;
    $('guideApp').hidden = !showingGuide;
    $('welcomeBack').hidden = choosing || !rememberedProfile;
    $('profileChoices').hidden = !choosing && Boolean(rememberedProfile);
    $('cancelProfileChange').hidden = !canReturn;
    const remembered = profiles[rememberedProfile];
    $('gateTitle').textContent = choosing || !remembered ? 'Chi gioca?' : 'Riprendiamo?';
    $('continueBtn').textContent = remembered ? 'Continua come ' + remembered.name : 'Continua';
    $('gateError').hidden = showingGuide || state.status !== 'storage-error';
    $('gateError').textContent = state.status === 'storage-error' ? 'Il telefono non consente di salvare il profilo. Controlla la memoria del browser e riprova.' : '';
    document.body.dataset.profile = showingGuide ? state.profile : choosing ? '' : rememberedProfile || '';
    const profile = profiles[state.profile];
    if (profile) {
      $('profileName').textContent = profile.name + ' · ' + profile.house;
      $('houseEmblem').src = './assets/houses/' + profile.image + '.png';
    }
    $('syncStatus').textContent = statusText(state);
    $('syncStatus').dataset.status = state.status;
    $('retrySyncBtn').hidden = !['offline','error','storage-error'].includes(state.status);
    $('resumeContent').replaceChildren(...(state.completed.has(activityId)
      ? [card('Demiguise e Alohomora','In corso · Continua da dove eri rimasto','#/sblocchi/demiguise','guide-card')]
      : [element('p','','Qui trovi le attività che segni «In corso».')]));
    renderChecklist(state);
  }
  async function enterProfile(profile) {
    desiredProfile = profile; entered = true; canReturn = false;
    $('profileMenu').open = false;
    const action = sync.select(profile);
    current = sync.getState();
    if (current.profile === profile) {
      rememberedProfile = profile;
      renderRoute(true);
    } else render(current);
    await action;
  }
  document.querySelectorAll('.profile-choice[data-profile]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click',() => enterProfile(button.dataset.profile));
  });
  $('continueBtn').addEventListener('click',() => rememberedProfile && enterProfile(rememberedProfile));
  $('chooseInsteadBtn').addEventListener('click',() => { choosing = true; render(current); $('gateTitle').focus(); });
  $('changeProfileBtn').addEventListener('click',() => {
    entered = false; choosing = true; canReturn = true; $('profileMenu').open = false;
    render(current); $('gateTitle').focus(); window.scrollTo({top:0});
  });
  $('cancelProfileChange').addEventListener('click',() => {
    if (!current.profile) return;
    entered = true; desiredProfile = current.profile; canReturn = false;
    render(current); $('profileName').focus();
  });
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && $('profileMenu').open) { $('profileMenu').open = false; $('profileName').focus(); }
  });
  document.addEventListener('click',event => { if (!$('profileMenu').contains(event.target)) $('profileMenu').open = false; });
  document.querySelectorAll('.moon-check').forEach(input => input.addEventListener('change',async event => {
    if (!entered || current.profile !== desiredProfile || current.status === 'storage-error') { render(current); return; }
    const id = event.currentTarget.dataset.id, checked = event.currentTarget.checked, profile = current.profile;
    const result = await sync.set(id,checked);
    if (current.profile === profile && result?.status !== 'storage-error' && checked) showToast(id === 'b1' ? 'Luna bonus segnata!' : 'Luna raccolta!');
  }));
  document.querySelectorAll('.tab').forEach(button => button.addEventListener('click',() => {
    filter = button.dataset.filter;
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active',tab === button); tab.setAttribute('aria-pressed',String(tab === button));
    });
    renderChecklist(current);
  }));
  $('activityBtn').addEventListener('click',async () => {
    if (!entered || !current.profile || current.status === 'storage-error') return;
    const active = !current.completed.has(activityId), profile = current.profile;
    const result = await sync.set(activityId,active);
    if (current.profile === profile && result?.status !== 'storage-error') showToast(active ? 'Aggiunta a Riprendi' : 'Rimossa da Riprendi');
  });
  $('resetBtn').addEventListener('click',async () => {
    if (!entered || !current.profile || current.status === 'storage-error') return;
    if (!moonIds.some(id => current.completed.has(id))) { showToast('Non ci sono lune da azzerare'); return; }
    const profile = current.profile, name = profiles[profile].name;
    if (!confirm('Vuoi togliere le spunte di queste 9 lune di ' + name + '? Le altre attività e l’altro profilo rimangono invariati.')) return;
    // Capture all nine operations synchronously: switching profile while awaiting
    // the network must never route the remainder to the new profile.
    const operations = moonIds.map(id => sync.set(id,false));
    const results = await Promise.all(operations);
    if (current.profile === profile && !results.some(result => result?.status === 'storage-error')) showToast('Spunte delle lune di ' + name + ' azzerate');
  });
  searchInput.addEventListener('input',renderSearch);
  $('clearSearch').addEventListener('click',() => { clearSearch(); searchInput.focus(); });
  $('searchAll').addEventListener('click',() => { allScope = !allScope; renderSearch(); });
  $('retrySyncBtn').addEventListener('click',() => sync.retry());
  window.addEventListener('hashchange',() => { clearSearch(); renderRoute(true); });
  window.addEventListener('focus',() => { if (entered) return sync.refresh(); });
  window.addEventListener('online',() => { if (entered) return sync.retry(); });
  document.addEventListener('visibilitychange',() => { if (entered && document.visibilityState === 'visible') return sync.refresh(); });
  window.addEventListener('storage',event => { if (entered && sync.isRelevantStorageKey(event.key)) return sync.refresh(); });
  renderRoute();
})();
