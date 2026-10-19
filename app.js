import { KEY, readProgress, setProgress, clearProgress } from './progress.js';

  (() => {
    'use strict';
    const zoneIds = {hogsmeade:['h1','h2','h3','h4','h5','h6','h7'], upper:['u1']};
    const mainIds = [...zoneIds.hogsmeade, ...zoneIds.upper];
    let completed = new Set();
    let filter = 'all';
    let canStore = true;
    const toast = document.querySelector('#toast');
    let toastTimer;

    const loaded = readProgress();
    completed = loaded.completed;
    canStore = loaded.ok;

    function warnStorage() {
      if (!document.querySelector('#storageWarning')) {
        const note = document.createElement('p');
        note.id = 'storageWarning';
        note.setAttribute('role', 'status');
        note.style.cssText = 'margin:10px 3px;color:#ffcf9e;font-size:.83rem';
        note.textContent = 'Attenzione: salvataggio non disponibile. Le nuove spunte non vengono applicate. Apri il link nel browser normale. Se il problema persiste, «Azzera spunte» può ripristinare il salvataggio, cancellando i progressi precedenti dopo la tua conferma.';
        document.querySelector('.toolbar').after(note);
      }
      showToast('Salvataggio non disponibile in questo browser');
    }
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    }
    function render() {
      const total = mainIds.filter(id => completed.has(id)).length;
      document.querySelector('#totalDone').textContent = total;
      document.querySelector('#progressFill').style.width = (total / 8 * 100) + '%';
      document.querySelector('#progressTrack').setAttribute('aria-valuenow', String(total));
      const msg = total === 8 ? 'Completato! Hai raccolto tutte le 8 lune della zona.' : total === 0 ? '7 a Hogsmeade + 1 a Hogsfield Superiore.' : `Ne mancano ${8 - total} per completare questa zona. Continua così!`;
      document.querySelector('#progressMessage').textContent = msg;
      document.querySelector('#hogsmeadeCount').textContent = `${zoneIds.hogsmeade.filter(id => completed.has(id)).length} / 7`;
      document.querySelector('#upperCount').textContent = `${zoneIds.upper.filter(id => completed.has(id)).length} / 1`;
      document.querySelector('#bonusMessage').textContent = completed.has('b1')
        ? 'Luna bonus trovata! Il contatore principale rimane dedicato a Hogsmeade e dintorni.'
        : 'Questa luna extra ha una spunta indipendente e non cambia il contatore delle 8 della zona.';
      document.querySelectorAll('.item[data-id]').forEach(item => {
        const id=item.dataset.id;
        const checked=completed.has(id);
        item.classList.toggle('checked', checked);
        item.querySelector('input.moon-check').checked=checked;
        item.hidden = filter === 'todo' && checked && id !== 'b1';
      });
      for (const [zone, id] of [['hogsmeade','hogsmeadeSection'], ['upper','upperSection']]) {
        const count = zoneIds[zone].filter(x => !completed.has(x)).length;
        const section = document.getElementById(id);
        const allDone = count === 0;
        section.querySelector('.empty').style.display = filter === 'todo' && allDone ? 'block' : 'none';
      }
    }
    document.querySelectorAll('.moon-check').forEach(input => input.addEventListener('change', e => {
      const id=e.currentTarget.dataset.id;
      const checked = e.currentTarget.checked;
      const result = setProgress(id, e.currentTarget.checked);
      canStore = result.ok;
      if (canStore) {
        completed = result.completed;
        document.querySelector('#storageWarning')?.remove();
      }
      render();
      if (!canStore) warnStorage();
      else if (checked) showToast(id === 'b1' ? 'Luna bonus segnata!' : 'Luna raccolta! ✦');
    }));
    document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      document.querySelectorAll('.tab').forEach(b => {const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      render();
    }));
    document.querySelector('#resetBtn').addEventListener('click', () => {
      if (!completed.size && canStore) { showToast('Non ci sono spunte da azzerare'); return; }
      if (confirm('Vuoi davvero togliere tutte le spunte, compresa la luna bonus?')) {
        const result = clearProgress();
        canStore = result.ok;
        if (canStore) {
          completed = result.completed;
          document.querySelector('#storageWarning')?.remove();
          render();
          showToast('Checklist azzerata');
        } else warnStorage();
      }
    });
    // Another open tab can update checks without overwriting this tab's state.
    window.addEventListener('storage', event => {
      if (event.key !== KEY && event.key !== null) return;
      const result = readProgress();
      canStore = result.ok;
      if (canStore) {
        completed = result.completed;
        document.querySelector('#storageWarning')?.remove();
        render();
      } else warnStorage();
    });
    render();
    if (!canStore) warnStorage();
  })();
