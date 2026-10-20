import test from 'node:test';
import assert from 'node:assert/strict';
const data = await import('./guide-data.js').catch(() => ({}));

test('catalogue has the three approved top-level sections in order', () => {
  assert.deepEqual(data.SECTIONS?.map(section => section.id), ['missioni', 'sblocchi', 'pratiche']);
  assert.deepEqual(data.SECTIONS?.map(section => section.title), ['Missioni', 'Sblocchi e potenziamenti', 'Guide pratiche']);
});
test('category IDs are unique and stable within each section', () => {
  assert.ok(Array.isArray(data.SECTIONS));
  for (const section of data.SECTIONS) {
    assert.ok(section.summary && section.categories.length);
    assert.equal(new Set(section.categories.map(item => item.id)).size, section.categories.length);
    for (const category of section.categories) {
      assert.match(category.id, /^[a-z]+$/);
      assert.ok(category.title && category.summary);
    }
  }
});
test('Demiguise has one canonical guide route and a real matching category', () => {
  assert.equal(data.GUIDES?.length, 1);
  const guide = data.GUIDES[0];
  assert.equal(guide.id, 'demiguise');
  assert.equal(guide.route, '#/sblocchi/demiguise');
  const section = data.SECTIONS.find(item => item.id === guide.section);
  assert.ok(section.categories.some(item => item.id === guide.category));
  assert.ok(guide.aliases.includes('alohomora'));
});
test('professor assignments remain separate from the unlocks category', () => {
  assert.ok(Array.isArray(data.SECTIONS));
  assert.ok(data.SECTIONS.find(x => x.id === 'missioni').categories.some(x => x.id === 'incarichi'));
  assert.ok(!data.SECTIONS.find(x => x.id === 'missioni').categories.some(x => x.id === 'demiguise'));
});
test('safe search aliases cover the spoken spellings used by the two readers', async () => {
  const { searchGuide } = await import('./search.js');
  for (const query of ['demigais', 'dimigais', 'alomora']) {
    const results = searchGuide(data.GUIDES, query);
    assert.equal(results[0]?.id, 'demiguise');
    assert.equal(results[0]?.title, 'Demiguise e Alohomora');
  }
});
