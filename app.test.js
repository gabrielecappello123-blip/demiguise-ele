// Tests the real UI controller against a small DOM adapter; live browser QA is separate.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { KEY, readProgress, setProgress, clearProgress } from './progress.js';

const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8').replace(/^import[^\n]*\n/gm, '');
function openApp({ search = '', remembered = null } = {}) {
  const nodes = new Map();
  class Element {
    constructor() {
      this.style = {}; this.dataset = {}; this.events = {}; this.attributes = {};
      this.checked = false; this.hidden = false; this.disabled = false; this.textContent = '';
      const classes = new Set();
      this.classList = { add: x => classes.add(x), remove: x => classes.delete(x),
        toggle: (x, yes) => yes ? classes.add(x) : classes.delete(x) };
    }
    setAttribute(key, value) { this.attributes[key] = value; }
    addEventListener(type, callback) { this.events[type] = callback; }
    after(element) { nodes.set('#' + element.id, element); }
    remove() { nodes.delete('#' + this.id); }
    querySelector() { return this.child; }
    fire(type) { return this.events[type]?.({ currentTarget: this }); }
  }
  for (const id of ['toast','totalDone','progressFill','progressTrack','progressMessage',
    'hogsmeadeCount','upperCount','bonusMessage','resetBtn','profileName','syncStatus','retrySyncBtn','verificationNotice']) {
    nodes.set('#' + id, new Element());
  }
  nodes.set('.toolbar', new Element());
  const ids = ['h1','h2','h3','h4','h5','h6','h7','u1','b1'];
  const inputs = ids.map(id => Object.assign(new Element(), { dataset: { id } }));
  const items = ids.map((id, i) => Object.assign(new Element(), { dataset: { id }, child: inputs[i] }));
  const tabs = ['all','todo'].map(filter => Object.assign(new Element(), { dataset: { filter } }));
  const profiles = ['ele','thom'].map(profile => Object.assign(new Element(), { dataset: { profile } }));
  for (const id of ['hogsmeadeSection','upperSection']) {
    nodes.set('#' + id, Object.assign(new Element(), { child: new Element() }));
  }
  const windowEvents = {}, documentEvents = {};
  const state = { confirm: false, profile: remembered, status: remembered ? 'saved' : 'choose', pending: 0 };
  const values = { ele: new Set(['h1','b1']), thom: new Set(['h2']) };
  let notify = () => {};
  const snapshot = () => ({ profile: state.profile, completed: new Set(values[state.profile] || []),
    pending: state.pending, status: state.status });
  const controller = {
    getState: snapshot,
    async select(profile) { state.profile = profile; state.status = 'saved'; notify(snapshot()); },
    async set(id, checked) {
      if (!state.profile) throw Error('No profile');
      checked ? values[state.profile].add(id) : values[state.profile].delete(id); notify(snapshot());
    },
    async reset() { values[state.profile].clear(); notify(snapshot()); },
    async refresh() { notify(snapshot()); },
    async retry() { state.status = 'saved'; state.pending = 0; notify(snapshot()); },
    isRelevantStorageKey: key => key === null || key.startsWith('demiguise-profiles-'),
  };
  const document = {
    body: Object.assign(new Element(), { dataset: {} }), visibilityState: 'visible',
    querySelector: selector => nodes.get(selector) ?? null,
    querySelectorAll: selector => ({ '.moon-check': inputs, '.tab': tabs,
      '.item[data-id]': items, '.profile-button[data-profile]': profiles })[selector] ?? [],
    getElementById: id => nodes.get('#' + id), createElement: () => new Element(),
    addEventListener: (type, callback) => { documentEvents[type] = callback; }
  };
  const legacy = { getItem: () => '["h1","b1"]', setItem() {} };
  let options;
  vm.runInNewContext(source, {
    document, window: { location: { search }, addEventListener: (t, c) => { windowEvents[t] = c; } },
    URLSearchParams, Set, Promise,
    createProfileSync: config => { options = config; notify = config.onChange; return controller; },
    KEY, readProgress: () => readProgress(legacy), setProgress: (id, checked) => setProgress(id, checked, legacy),
    clearProgress: () => clearProgress(legacy), confirm: () => state.confirm,
    setTimeout: () => 1, clearTimeout() {}
  });
  return { nodes, inputs, items, tabs, profiles, state, values, controller, windowEvents, documentEvents,
    options: () => options,
    setStatus(status, pending = 0) { state.status = status; state.pending = pending; notify(snapshot()); },
    async choose(profile) { await profiles[profile === 'ele' ? 0 : 1].fire('click'); },
    async check(id, checked = true) {
      const input = inputs[ids.indexOf(id)]; input.checked = checked; await input.fire('change');
    }
  };
}

test('requires explicit profile selection before checks and shows the chosen profile', async () => {
  const app = openApp();
  assert.ok(app.inputs.every(input => input.disabled));
  assert.match(app.nodes.get('#syncStatus').textContent, /Scegli/);
  await app.choose('ele');
  assert.equal(app.nodes.get('#profileName').textContent, 'Ele · Grifondoro');
  assert.ok(app.inputs.every(input => !input.disabled));
  assert.equal(app.inputs[0].checked, true);
  assert.equal(app.inputs[8].checked, true);
  assert.equal(app.nodes.get('#totalDone').textContent, 1);
});
test('profile switching keeps checklists independent and never auto-checks a moon', async () => {
  const app = openApp();
  await app.choose('thom');
  await app.check('u1');
  assert.equal(app.nodes.get('#totalDone').textContent, 2);
  await app.choose('ele');
  assert.equal(app.inputs[7].checked, false);
  assert.equal(app.inputs[0].checked, true);
  assert.equal(app.profiles[0].attributes['aria-pressed'], 'true');
});
test('todo filter hides collected moons including bonus without changing the main total', async () => {
  const app = openApp(); await app.choose('ele');
  app.tabs[1].fire('click');
  assert.equal(app.items[0].hidden, true);
  assert.equal(app.items[8].hidden, true);
  assert.equal(app.nodes.get('#totalDone').textContent, 1);
});
test('offline status is honest and the retry action restores saved status', async () => {
  const app = openApp(); await app.choose('ele');
  app.setStatus('offline', 2);
  assert.match(app.nodes.get('#syncStatus').textContent, /telefono.*sincronizzare/i);
  assert.equal(app.nodes.get('#retrySyncBtn').hidden, false);
  await app.nodes.get('#retrySyncBtn').fire('click');
  assert.match(app.nodes.get('#syncStatus').textContent, /Salvato online/);
});
test('storage failure disables new mutations and does not claim online success', async () => {
  const app = openApp(); await app.choose('ele'); app.setStatus('storage-error');
  assert.ok(app.inputs.every(input => input.disabled));
  assert.match(app.nodes.get('#syncStatus').textContent, /non disponibile/i);
});
test('reset requires confirmation and affects only the currently selected profile', async () => {
  const app = openApp(); await app.choose('ele');
  await app.nodes.get('#resetBtn').fire('click');
  assert.equal(app.inputs[0].checked, true);
  app.state.confirm = true;
  await app.nodes.get('#resetBtn').fire('click');
  assert.equal(app.nodes.get('#totalDone').textContent, 0);
  await app.choose('thom');
  assert.equal(app.inputs[1].checked, true);
});
test('a return to the page refreshes the selected profile', async () => {
  const app = openApp(); await app.choose('ele');
  app.values.ele.add('u1'); await app.windowEvents.focus();
  assert.equal(app.inputs[7].checked, true);
});
test('a verification URL selects an isolated dataset and displays a clear notice', () => {
  const app = openApp({ search: '?verifica=134e4a77-ad41-4f8f-8e45-32c99aa20adf' });
  assert.equal(app.options().dataset, 'verify-134e4a77-ad41-4f8f-8e45-32c99aa20adf');
  assert.equal(app.nodes.get('#verificationNotice').hidden, false);
});
