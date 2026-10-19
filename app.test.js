// Runs the real app against a minimal DOM adapter. This is not browser/mobile QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { KEY, readProgress, setProgress, clearProgress } from './progress.js';

const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8')
  .replace(/^import .*;\n/, '');

function openApp(storage) {
  const nodes = new Map();
  class Element {
    constructor() {
      this.style = {}; this.dataset = {}; this.events = {};
      this.attributes = {}; this.checked = false; this.hidden = false;
      const classes = new Set();
      this.classList = {
        add: x => classes.add(x), remove: x => classes.delete(x),
        toggle: (x, yes) => yes ? classes.add(x) : classes.delete(x)
      };
    }
    setAttribute(key, value) { this.attributes[key] = value; }
    addEventListener(type, callback) { this.events[type] = callback; }
    after(element) { nodes.set(`#${element.id}`, element); }
    remove() { nodes.delete(`#${this.id}`); }
    querySelector() { return this.child; }
    fire(type) { this.events[type]({ currentTarget: this }); }
  }
  for (const id of ['toast', 'totalDone', 'progressFill', 'progressTrack',
    'progressMessage', 'hogsmeadeCount', 'upperCount', 'bonusMessage', 'resetBtn']) {
    nodes.set(`#${id}`, new Element());
  }
  nodes.set('.toolbar', new Element());
  const ids = ['h1','h2','h3','h4','h5','h6','h7','u1','b1'];
  const inputs = ids.map(id => Object.assign(new Element(), { dataset: { id } }));
  const items = ids.map((id, i) => Object.assign(new Element(), {
    dataset: { id }, child: inputs[i]
  }));
  const tabs = ['all','todo'].map(filter => Object.assign(new Element(), { dataset: { filter } }));
  for (const id of ['hogsmeadeSection', 'upperSection']) {
    nodes.set(`#${id}`, Object.assign(new Element(), { child: new Element() }));
  }
  const state = { confirm: false };
  const document = {
    querySelector: selector => nodes.get(selector) ?? null,
    querySelectorAll: selector => ({ '.moon-check': inputs, '.tab': tabs, '.item[data-id]': items })[selector],
    getElementById: id => nodes.get(`#${id}`),
    createElement: () => new Element()
  };
  const events = {};
  vm.runInNewContext(source, {
    document, window: { addEventListener: (type, callback) => { events[type] = callback; } },
    KEY, readProgress: () => readProgress(storage),
    setProgress: (id, checked) => setProgress(id, checked, storage),
    clearProgress: () => clearProgress(storage),
    confirm: () => state.confirm, setTimeout: () => 1, clearTimeout() {}
  });
  return { nodes, inputs, items, tabs, state, events,
    check(id, checked = true) {
      const input = inputs[ids.indexOf(id)];
      input.checked = checked; input.fire('change');
    }
  };
}

function storage(raw = null) {
  return { raw, blocked: false,
    getItem() { return this.raw; },
    setItem(key, value) {
      if (this.blocked) throw new Error('QuotaExceededError');
      this.raw = value;
    }
  };
}

test('real app restores checks on reopening and keeps bonus out of the main counter', () => {
  const saved = storage();
  const app = openApp(saved);
  app.check('h2'); app.check('b1');
  const reopened = openApp(saved);
  assert.equal(reopened.inputs[1].checked, true);
  assert.equal(reopened.inputs[8].checked, true);
  assert.equal(reopened.nodes.get('#totalDone').textContent, 1);
  reopened.tabs[1].fire('click');
  assert.equal(reopened.items[1].hidden, true);
  assert.equal(reopened.items[8].hidden, false);
});

test('a failed check is not shown as saved; recovery clears the warning', () => {
  const saved = storage('["h1"]');
  const app = openApp(saved);
  saved.blocked = true;
  app.check('h2');
  assert.equal(app.inputs[1].checked, false);
  assert.equal(app.inputs[0].checked, true);
  assert.equal(app.nodes.has('#storageWarning'), true);
  saved.blocked = false;
  app.check('h2');
  assert.equal(app.inputs[1].checked, true);
  assert.equal(app.nodes.has('#storageWarning'), false);
  assert.deepEqual(JSON.parse(saved.raw), ['h1', 'h2']);
});

test('unrecognized data can be reset only after explicit confirmation', () => {
  const saved = storage('corrupted');
  const app = openApp(saved);
  app.nodes.get('#resetBtn').fire('click');
  assert.equal(saved.raw, 'corrupted');
  app.state.confirm = true;
  app.nodes.get('#resetBtn').fire('click');
  assert.equal(saved.raw, '[]');
  assert.equal(app.nodes.has('#storageWarning'), false);
  app.check('h2');
  assert.deepEqual(JSON.parse(saved.raw), ['h2']);
});

test('a storage event refreshes checks made in another open tab', () => {
  const saved = storage();
  const app = openApp(saved);
  setProgress('u1', true, saved);
  app.events.storage({ key: KEY });
  assert.equal(app.inputs[7].checked, true);
  assert.equal(app.nodes.get('#totalDone').textContent, 1);
});
