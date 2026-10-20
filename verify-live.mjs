// Explicit opt-in HTTPS integration check. Writes only to a fresh verify-* dataset.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { API_BASE, createProfileSync } from './profile-sync.js';

const dataset = 'verify-' + randomUUID();
const origin = 'https://gabrielecappello123-blip.github.io';
const headers = { Origin: origin, 'Content-Type': 'application/json' };
const checked = snapshot => snapshot.entries.filter(entry => entry.checked).map(entry => entry.id).sort();
const endpoint = profile => API_BASE + '/api/progress?profile=' + profile + '&dataset=' + dataset;

async function read(profile) {
  const response = await fetch(endpoint(profile), { headers: { Origin: origin }, signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, 'Public GET must be available without sign-in');
  assert.equal(response.headers.get('access-control-allow-origin'), origin);
  assert.equal(response.headers.get('access-control-allow-credentials'), null);
  return response.json();
}
async function post(operation, status = 200) {
  const response = await fetch(API_BASE + '/api/progress', {
    method: 'POST', headers, body: JSON.stringify({ dataset, ...operation }), signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, status, 'Public mutation must match its contract');
  return response.json();
}
const op = (profile, type, fields = {}) => ({ profile, type, requestId: randomUUID(), ...fields });

class MemoryStorage {
  records = new Map();
  get length() { return this.records.size; }
  key(index) { return [...this.records.keys()][index] ?? null; }
  getItem(key) { return this.records.get(key) ?? null; }
  setItem(key, value) { this.records.set(key, String(value)); }
  removeItem(key) { this.records.delete(key); }
}

const initial = await Promise.all([read('ele'), read('thom')]);
assert.ok(initial.every(snapshot => snapshot.entries.length === 0));
const preflight = await fetch(API_BASE + '/api/progress', {
  method: 'OPTIONS', headers: { Origin: origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' },
  signal: AbortSignal.timeout(20000),
});
assert.equal(preflight.status, 204);
assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
await Promise.all(['ele','thom'].map(profile => post(op(profile, 'seed', { ids: ['h1','b1'] }))));
assert.deepEqual(checked(await read('ele')), ['b1','h1']);
assert.deepEqual(checked(await read('thom')), ['b1','h1']);

await post(op('ele', 'set', { id: 'h1', checked: false }));
await post(op('ele', 'seed', { ids: ['h1','future-test'] }));
assert.deepEqual(checked(await read('ele')), ['b1','future-test']);
const oldTrue = op('ele', 'set', { id: 'h3', checked: true });
await post(oldTrue);
const removed = await post(op('ele', 'set', { id: 'h3', checked: false }));
const replayed = await post(oldTrue);
assert.equal(replayed.revision, removed.revision);
assert.equal(replayed.entries.find(entry => entry.id === 'h3').checked, false);
await post({ ...oldTrue, checked: false }, 409);
await post(op('ele', 'reset'));
await post(op('ele', 'seed', { ids: ['h1','late-future-test'] }));
assert.deepEqual(checked(await post(oldTrue)), []);
assert.deepEqual(checked(await read('thom')), ['b1','h1']);

const storeA = new MemoryStorage(), storeB = new MemoryStorage();
let offline = false;
const transport = (...args) => {
  if (offline) return Promise.reject(new TypeError('Offline simulation'));
  return fetch(...args);
};
let a = createProfileSync({ storage: storeA, dataset, fetchImpl: transport });
const b = createProfileSync({ storage: storeB, dataset });
await Promise.all([a.select('ele'), b.select('ele')]);
assert.equal((await a.set('u1', true)).status, 'saved');
assert.equal((await b.refresh()).completed.has('u1'), true);
assert.equal((await b.set('h2', true)).status, 'saved');
const refreshed = await a.refresh();
assert.equal(refreshed.completed.has('h2'), true);
assert.equal(refreshed.completed.has('u1'), true);
offline = true;
const pending = await a.set('h4', true);
assert.equal(pending.status, 'offline');
assert.equal(pending.pending, 1);
a.destroy();
offline = false;
a = createProfileSync({ storage: storeA, dataset, fetchImpl: transport });
const reopened = await a.select('ele');
assert.equal(reopened.status, 'saved');
assert.equal(reopened.completed.has('h4'), true);
assert.equal((await b.refresh()).completed.has('h4'), true);
await b.select('thom');
assert.equal(b.getState().completed.has('h4'), false);
assert.equal(b.getState().completed.has('h1'), true);
a.destroy(); b.destroy();
console.log(JSON.stringify({ result: 'PASS', dataset, checks: [
  'public API and CORS preflight', 'separate Ele/Thom progress',
  'late import and false tombstones', 'idempotent replay and reset',
  'two independent client storages', 'offline queue and reopen recovery',
], productionWrites: 0 }));
