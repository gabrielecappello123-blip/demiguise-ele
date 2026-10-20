// Exercise the real controller with a small deterministic DOM adapter.
// Actual rendering, focus and touch layout are checked separately in the browser.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8').replace(/^import[^\n]*\n/gm, '');
const fixtureSections = [
  {id:'missioni', title:'Missioni', summary:'Principali, secondarie e incarichi', categories:[{id:'principali',title:'Principali',summary:'Storia'}]},
  {id:'sblocchi', title:'Sblocchi e potenziamenti', summary:'Demiguise e abilità', categories:[{id:'demiguise',title:'Demiguise',summary:'Lune'}]},
  {id:'pratiche', title:'Guide pratiche', summary:'Oggetti e pozioni', categories:[{id:'oggetti',title:'Oggetti',summary:'Risorse'}]}
];
const fixtureGuides = [{id:'demiguise', title:'Demiguise e Alohomora',summary:'Hogsmeade',section:'sblocchi',category:'demiguise',route:'#/sblocchi/demiguise',aliases:['lune']}];
function openApp({search='', remembered=null, hash='#/'}={}) {
  const nodes=new Map();
  class Element {
    constructor(tag='div') { this.tagName=tag.toUpperCase(); this.style={}; this.dataset={}; this.events={}; this.attributes={}; this.children=[];
      this.checked=false; this.hidden=false; this.disabled=false; this.textContent=''; this.value=''; this.open=false;
      const classes=new Set(); this.classList={add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,yes)=>yes?classes.add(x):classes.delete(x)}; }
    setAttribute(k,v) { this.attributes[k]=String(v); }
    removeAttribute(k) { delete this.attributes[k]; }
    addEventListener(t,f) { this.events[t]=f; }
    append(...children) { this.children.push(...children); }
    appendChild(child) { this.append(child); return child; }
    replaceChildren(...children) { this.children=[...children]; this.textContent=''; }
    querySelector(s) { return this.parts?.[s] || this.child || null; }
    contains(el) { return this===el || this.children.includes(el); }
    focus() { document.activeElement=this; }
    scrollIntoView() { this.scrolled=true; }
    fire(type,extra={}) { return this.events[type]?.({currentTarget:this,target:this,preventDefault(){},...extra}); }
  }
  const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
  for(const match of html.matchAll(/id="([^"]+)"/g))nodes.set('#'+match[1],new Element());
  // New nodes are available in the adapter before HTML implementation, so RED proves controller behavior.
  for(const id of ['profileGate','guideApp','welcomeBack','profileChoices','continueBtn','chooseInsteadBtn','cancelProfileChange','gateError','gateTitle','profileMenu','changeProfileBtn','houseEmblem','homeCards','homeView','sectionView','categoryView','demiguiseView','viewTitle','breadcrumbs','searchLabel','guideSearch','clearSearch','searchAll','searchResults','resultList','searchMessage','sectionIntro','categoryGrid','categoryIntro','categoryContents','resumeContent','activityBtn','itemSearchEmpty'])if(!nodes.has('#'+id))nodes.set('#'+id,new Element());
  const ids=['h1','h2','h3','h4','h5','h6','h7','u1','b1'];
  const titles=['Tomi e Pergamene','Testa di Porco','Tre Manici di Scopa','Casa a est','Stratchy & Sons','Casa dietro Mielandia','Casa di fronte','Casa vicino al pozzo','Hogwarts · Aula di Divinazione'];
  const inputs=ids.map(id=>Object.assign(new Element('input'),{dataset:{id}}));
  const items=ids.map((id,i)=>Object.assign(new Element('article'),{dataset:{id,zone:i<7?'hogsmeade':i===7?'upper':'bonus'},child:inputs[i],parts:{'input.moon-check':inputs[i],'.item-title':Object.assign(new Element(),{textContent:titles[i]}),'.item-desc':Object.assign(new Element(),{textContent:'Dove trovare la luna'})}}));
  const tabs=['all','todo'].map(filter=>Object.assign(new Element('button'),{dataset:{filter}}));
  const profiles=['ele','thom'].map(profile=>Object.assign(new Element('button'),{dataset:{profile}}));
  const nav=['','missioni','sblocchi','pratiche'].map(section=>Object.assign(new Element('a'),{dataset:{section}}));
  for(const id of ['hogsmeadeSection','upperSection'])nodes.get('#'+id).child=new Element();
  const windowEvents={},documentEvents={},calls=[];
  const state={confirm:false,profile:remembered,status:remembered?'saved':'choose',pending:0};
  const values={ele:new Set(['h1','b1']),thom:new Set(['h2'])};
  let notify=()=>{};
  const snapshot=()=>({profile:state.profile,completed:new Set(values[state.profile]||[]),status:state.status,pending:state.pending});
  const controller={getState:snapshot,
    async select(p){calls.push(['select',p]);state.profile=p;state.status='saved';notify(snapshot());return snapshot();},
    async set(id,checked){calls.push(['set',state.profile,id,checked]);checked?values[state.profile].add(id):values[state.profile].delete(id);notify(snapshot());return snapshot();},
    async reset(){calls.push(['reset']);values[state.profile].clear();notify(snapshot());return snapshot();},
    async refresh(){calls.push(['refresh']);notify(snapshot());return snapshot();},
    async retry(){state.status='saved';state.pending=0;notify(snapshot());return snapshot();},
    isRelevantStorageKey:k=>k===null||k.startsWith('demiguise-profile-sync-v1:')};
  const document={body:new Element('body'),visibilityState:'visible',activeElement:null,
    querySelector:s=>nodes.get(s)||null,
    querySelectorAll:s=>({'.moon-check':inputs,'.tab':tabs,'.item[data-id]':items,'.profile-choice[data-profile]':profiles,'.profile-button[data-profile]':profiles,'.nav-link':nav})[s]||[],
    getElementById:id=>nodes.get('#'+id)||items.find(item=>item.id===id),createElement:tag=>new Element(tag),
    addEventListener:(t,f)=>documentEvents[t]=f};
  let options;
  const location={search,hash};
  const searchCalls=[];
  const searchGuide=(entries,q,options={})=>{searchCalls.push({q,...options}); return entries.filter(e=>(!options.scope||e.scope===options.scope||e.scope.startsWith(options.scope+'/'))&&(e.title+' '+e.summary+' '+(e.aliases||[]).join(' ')).toLowerCase().includes(q.toLowerCase())).map(e=>({...e,approximate:false}));};
  vm.runInNewContext(source,{document,window:{location,addEventListener:(t,f)=>windowEvents[t]=f,scrollTo(){}},
    URLSearchParams,Set,Map,Promise,SECTIONS:fixtureSections,GUIDES:fixtureGuides,searchGuide,
    createProfileSync:config=>{options=config;notify=config.onChange;return controller;},
    confirm:()=>state.confirm,setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:f=>f()});
  return {nodes,inputs,items,tabs,profiles,values,state,calls,controller,windowEvents,documentEvents,searchCalls,
    options:()=>options,
    async choose(p){await profiles[p==='ele'?0:1].fire('click');},
    async click(id){await nodes.get('#'+id).fire('click');},
    navigate(value){location.hash=value;windowEvents.hashchange?.();},
    query(value){nodes.get('#guideSearch').value=value;nodes.get('#guideSearch').fire('input');},
    setStatus(status,pending=0){state.status=status;state.pending=pending;notify(snapshot());},
    async check(id,checked=true){const i=inputs[ids.indexOf(id)];i.checked=checked;await i.fire('change');}
  };
}

test('fresh visitor sees only profile chooser; no progress or network mutation on opening',async()=>{
 const a=openApp();assert.equal(a.nodes.get('#guideApp').hidden,true);assert.equal(a.nodes.get('#profileGate').hidden,false);assert.equal(a.calls.length,0);assert.ok(a.inputs.every(i=>i.disabled));
 await a.choose('ele');assert.equal(a.nodes.get('#profileGate').hidden,true);assert.equal(a.nodes.get('#guideApp').hidden,false);assert.match(a.nodes.get('#profileName').textContent,/Ele/);assert.ok(!a.nodes.get('#profileName').textContent.includes('Thom'));assert.equal(a.inputs[0].checked,true);
});
test('remembered profile requires Continue on each new opening',async()=>{
 const a=openApp({remembered:'thom'});assert.equal(a.nodes.get('#guideApp').hidden,true);assert.equal(a.nodes.get('#welcomeBack').hidden,false);assert.equal(a.nodes.get('#profileChoices').hidden,true);assert.match(a.nodes.get('#continueBtn').textContent,/Thom/);assert.equal(a.calls.length,0);
 await a.click('continueBtn');assert.equal(a.nodes.get('#guideApp').hidden,false);assert.equal(a.inputs[1].checked,true);
});
test('switching opens the chooser, cancel returns and another profile preserves independent checks',async()=>{
 const a=openApp();await a.choose('ele');await a.click('changeProfileBtn');assert.equal(a.nodes.get('#guideApp').hidden,true);assert.equal(a.nodes.get('#profileChoices').hidden,false);await a.click('cancelProfileChange');assert.equal(a.nodes.get('#guideApp').hidden,false);
 await a.click('changeProfileBtn');await a.choose('thom');assert.equal(a.inputs[0].checked,false);assert.equal(a.inputs[1].checked,true);
});
test('home and routes isolate Demiguise while legacy deep links remain usable',async()=>{
 const a=openApp();await a.choose('ele');assert.equal(a.nodes.get('#homeView').hidden,false);assert.equal(a.nodes.get('#demiguiseView').hidden,true);
 a.navigate('#/sblocchi/demiguise/h2');assert.equal(a.nodes.get('#demiguiseView').hidden,false);assert.equal(a.nodes.get('#homeView').hidden,true);
 a.navigate('#upperSection');assert.equal(a.nodes.get('#demiguiseView').hidden,false);
 a.navigate('#/missioni');assert.equal(a.nodes.get('#sectionView').hidden,false);assert.equal(a.nodes.get('#demiguiseView').hidden,true);
});
test('navigation and scoped search never mark an activity in progress',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi');a.query('lune');assert.equal(a.searchCalls.at(-1).scope,'sblocchi');await a.click('searchAll');assert.equal(a.searchCalls.at(-1).scope,'');assert.equal(a.calls.filter(c=>c[0]==='set').length,0);
});
test('Demiguise is added to and removed from Riprendi only by the explicit action',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');await a.click('activityBtn');assert.ok(a.values.ele.has('activity:demiguise:in-progress'));a.navigate('#/');assert.ok(a.nodes.get('#resumeContent').children.length>0);await a.click('activityBtn');assert.ok(!a.values.ele.has('activity:demiguise:in-progress'));
});
test('local search combines with collected filter including the bonus without changing totals',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');a.query('Tomi');assert.equal(a.items[0].hidden,false);assert.equal(a.items[1].hidden,true);a.tabs[1].fire('click');assert.equal(a.items[0].hidden,true);assert.equal(a.items[8].hidden,true);assert.equal(Number(a.nodes.get('#totalDone').textContent),1);
});
test('clearing moon checks preserves manual activity, future IDs and the other profile',async()=>{
 const a=openApp();await a.choose('ele');a.values.ele.add('activity:demiguise:in-progress');a.values.ele.add('future:quest');await a.click('resetBtn');assert.ok(a.values.ele.has('h1'));a.state.confirm=true;await a.click('resetBtn');assert.ok(!a.values.ele.has('h1'));assert.ok(!a.values.ele.has('b1'));assert.ok(a.values.ele.has('activity:demiguise:in-progress'));assert.ok(a.values.ele.has('future:quest'));assert.ok(a.values.thom.has('h2'));assert.ok(!a.calls.some(c=>c[0]==='reset'));
});
test('offline and blocked storage stay honest and prevent undurable changes',async()=>{
 const a=openApp();await a.choose('ele');a.setStatus('offline',2);assert.match(a.nodes.get('#syncStatus').textContent,/telefono.*sincronizzare/i);await a.click('retrySyncBtn');assert.match(a.nodes.get('#syncStatus').textContent,/Salvato online/);a.setStatus('storage-error');assert.ok(a.inputs.every(i=>i.disabled));assert.equal(a.nodes.get('#activityBtn').disabled,true);
});
test('verification remains isolated, refresh is gated before entry and active afterward',async()=>{
 const a=openApp({remembered:'ele',search:'?verifica=134e4a77-ad41-4f8f-8e45-32c99aa20adf'});assert.equal(a.options().dataset,'verify-134e4a77-ad41-4f8f-8e45-32c99aa20adf');assert.equal(a.nodes.get('#verificationNotice').hidden,false);await a.windowEvents.focus();assert.equal(a.calls.length,0);await a.click('continueBtn');a.values.ele.add('u1');await a.windowEvents.focus();assert.equal(a.inputs[7].checked,true);
});

test('opening a collected search target reveals it even with Da raccogliere active',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');a.tabs[1].fire('click');assert.equal(a.items[0].hidden,true);
 a.navigate('#/sblocchi/demiguise/h1');assert.equal(a.items[0].hidden,false);assert.equal(a.tabs[0].attributes['aria-pressed'],'true');assert.equal(a.tabs[1].attributes['aria-pressed'],'false');
});

test('save status and retry are before long guide content, accessible when controls fail',()=>{
 const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
 const status=html.indexOf('id="syncStatus"'),retry=html.indexOf('id="retrySyncBtn"'),content=html.indexOf('id="homeView"');
 assert.ok(status>0&&retry>0&&status<content&&retry<content,'save feedback must not be below the long checklist');
});
