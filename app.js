import { createProfileSync } from './profile-sync.js?v=1.1.0';

(() => {
  'use strict';
  const zoneIds = { hogsmeade: ['h1','h2','h3','h4','h5','h6','h7'], upper: ['u1'] };
  const mainIds = [...zoneIds.hogsmeade, ...zoneIds.upper];
  const profiles = { ele: 'Ele · Grifondoro', thom: 'Thom · Serpeverde' };
  const query = new URLSearchParams(window.location.search);
  const verification = query.get('verifica');
  const isVerification = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(verification || '');
  const dataset = isVerification ? 'verify-' + verification.toLowerCase() : 'guide-v1';
  let filter = 'all', toastTimer, current;
  const toast = document.querySelector('#toast');
  const sync = createProfileSync({ dataset, onChange: render });
  current = sync.getState();

  if (isVerification) document.querySelector('#verificationNotice').hidden = false;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function statusText(state) {
    if (state.status === 'storage-error') return 'Salvataggio sul telefono non disponibile. Le nuove spunte non vengono applicate.';
    if (!state.profile) return 'Scegli Ele o Thom per usare le spunte.';
    if (state.status === 'saved') return 'Salvato online · disponibile su entrambi i telefoni';
    if (state.status === 'syncing') return 'Sincronizzazione in corso…';
    if (state.status === 'offline' || state.status === 'error') {
      return state.pending
        ? 'Salvato sul telefono · modifiche da sincronizzare'
        : 'Collegamento non disponibile · visualizzi la copia di questo telefono';
    }
    return 'Caricamento dei progressi…';
  }
  function render(state) {
    current = state;
    const completed = state.completed;
    const canEdit = Boolean(state.profile) && state.status !== 'storage-error';
    document.body.dataset.profile = state.profile || '';
    document.querySelector('#profileName').textContent = profiles[state.profile] || 'Chi sta giocando?';
    document.querySelector('#syncStatus').textContent = statusText(state);
    document.querySelector('#syncStatus').dataset.status = state.status;
    document.querySelector('#retrySyncBtn').hidden = !['offline','error','storage-error'].includes(state.status);
    document.querySelectorAll('.profile-button[data-profile]').forEach(button => {
      const active = button.dataset.profile === state.profile;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#resetBtn').disabled = !canEdit;
    const total = mainIds.filter(id => completed.has(id)).length;
    document.querySelector('#totalDone').textContent = total;
    document.querySelector('#progressFill').style.width = (total / 8 * 100) + '%';
    document.querySelector('#progressTrack').setAttribute('aria-valuenow', String(total));
    document.querySelector('#progressMessage').textContent = total === 8
      ? 'Completato! Hai raccolto tutte le 8 lune della zona.'
      : total === 0 ? '7 a Hogsmeade + 1 a Upper Hogsfield.'
      : 'Ne mancano ' + (8 - total) + ' per completare questa zona. Continua così!';
    document.querySelector('#hogsmeadeCount').textContent = zoneIds.hogsmeade.filter(id => completed.has(id)).length + ' / 7';
    document.querySelector('#upperCount').textContent = zoneIds.upper.filter(id => completed.has(id)).length + ' / 1';
    document.querySelector('#bonusMessage').textContent = completed.has('b1')
      ? 'Luna bonus trovata! Il contatore principale rimane dedicato a Hogsmeade e dintorni.'
      : 'Questa luna extra ha una spunta indipendente e non cambia il contatore delle 8 della zona.';
    document.querySelectorAll('.item[data-id]').forEach(item => {
      const checked = completed.has(item.dataset.id);
      item.classList.toggle('checked', checked);
      const input = item.querySelector('input.moon-check');
      input.checked = checked;
      input.disabled = !canEdit;
      item.hidden = filter === 'todo' && checked;
    });
    for (const [zone, id] of [['hogsmeade','hogsmeadeSection'],['upper','upperSection']]) {
      const allDone = zoneIds[zone].every(value => completed.has(value));
      document.getElementById(id).querySelector('.empty').style.display = filter === 'todo' && allDone ? 'block' : 'none';
    }
  }
  document.querySelectorAll('.profile-button[data-profile]').forEach(button => button.addEventListener('click',
    () => sync.select(button.dataset.profile)));
  document.querySelectorAll('.moon-check').forEach(input => input.addEventListener('change', async event => {
    if (!current.profile || current.status === 'storage-error') { render(current); return; }
    const id = event.currentTarget.dataset.id, checked = event.currentTarget.checked;
    const profile = current.profile;
    const result = await sync.set(id, checked);
    if (current.profile !== profile) return;
    if (result?.status === 'storage-error') return;
    if (checked) showToast(id === 'b1' ? 'Luna bonus segnata!' : 'Luna raccolta! ✦');
  }));
  document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab === button);
      tab.setAttribute('aria-pressed', String(tab === button));
    });
    render(current);
  }));
  document.querySelector('#resetBtn').addEventListener('click', async () => {
    if (!current.profile || current.status === 'storage-error') return;
    if (!current.completed.size) { showToast('Non ci sono spunte da azzerare'); return; }
    const name = profiles[current.profile].split(' · ')[0];
    if (!confirm('Vuoi togliere tutte le spunte di ' + name + ', compresa la luna bonus? L’altro profilo rimane invariato.')) return;
    const result = await sync.reset();
    if (result?.status !== 'storage-error') showToast('Spunte di ' + name + ' azzerate');
  });
  document.querySelector('#retrySyncBtn').addEventListener('click', () => sync.retry());
  window.addEventListener('focus', () => sync.refresh());
  window.addEventListener('online', () => sync.retry());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') return sync.refresh();
  });
  window.addEventListener('storage', event => {
    if (sync.isRelevantStorageKey(event.key)) return sync.refresh();
  });
  render(current);
  if (current.profile) sync.select(current.profile);
})();
