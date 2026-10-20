// Controller integration against an intentionally small DOM adapter.
// Rendering, layout and actual focus are checked separately in the browser.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as model from './guide-model.js';
import {searchGuide} from './search.js';
const source=readFileSync(new URL('./app.js',import.meta.url),'utf8').replace(/^import[^\n]*\n/gm,'');
const SECTIONS=[{id:'missioni',title:'Missioni',summary:'Missioni',categories:[{id:'secondarie',title:'Secondarie',summary:'Per luogo'}]},
{id:'sblocchi',title:'Sblocchi',summary:'Abilità',categories:[{id:'demiguise',title:'Demiguise',summary:'Lune'}]},
{id:'pratiche',title:'Pratiche',summary:'Risorse',categories:[{id:'oggetti',title:'Oggetti',summary:'Risorse'}]}];
const GUIDES=[{id:'demiguise',title:'Demiguise e Alohomora',summary:'Tutte le lune',section:'sblocchi',category:'demiguise',tracking:true,steps:['Raccogli di notte'],aliases:['demigais']},
{id:'quest',title:'Una richiesta',officialTitle:'Un segreto futuro',summary:'Una ricerca nel villaggio',section:'missioni',category:'secondarie',location:'Hogsmeade',tracking:true,steps:['Trova l’Astrolabio.'],photos:[{src:'assets/test.jpg',source:'https://example.org',credit:'Fonte',alt:'Stanza'}]},
{id:'astrolabio',title:'Astrolabio',summary:'Oggetto di missione',section:'pratiche',category:'oggetti',steps:['Oggetto da restituire']}];
const MOONS=[{id:'h1',title:'Tomi e Pergamene',location:'Hogsmeade',group:'Hogsmeade',lock:0,steps:['Nel retro']},
{id:'h2',title:'Testa di Porco',location:'Hogsmeade',group:'Hogsmeade',lock:1,steps:['Dietro il bancone']},
{id:'b1',title:'Aula di Divinazione',location:'Hogwarts',group:'Biblioteca',lock:0,steps:['Sulla scrivania']},
{id:'dm-new',title:'Serratura II',location:'Hogwarts',group:'Biblioteca',lock:2,steps:['Apri la porta']}];
const INTRO_MOONS=[{id:'dm-intro',title:'Luna introduttiva',steps:['Segui Moon']}];
function openApp({remembered=null,hash='#/',search=''}={}) {
  const roots=[],events={},docEvents={},calls=[];
  const key=s=>s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
  class Element {
    constructor(tag='div',text=''){this.tagName=tag.toUpperCase();this.children=[];this.parentElement=null;this.dataset={};this.attributes={};this.events={};this.style={};this.className='';this._text=text;this.value='';this.checked=false;this.disabled=false;this.hidden=false;this.open=false;this.id='';
      this.classList={add:c=>{this.className+=' '+c;},remove:c=>{this.className=this.className.split(' ').filter(x=>x!==c).join(' ');},contains:c=>this.className.split(' ').includes(c),toggle:(c,b)=>b?this.classList.add(c):this.classList.remove(c)};
    }
    get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
    set textContent(v){this._text=String(v);this.children=[];}
    setAttribute(k,v){this.attributes[k]=String(v);if(k==='id')this.id=String(v);if(k.startsWith('data-'))this.dataset[key(k.slice(5))]=String(v);}
    removeAttribute(k){delete this.attributes[k];}
    append(...cs){for(let c of cs){if(typeof c==='string')c=new Element('#text',c);c.parentElement=this;this.children.push(c);}}
    insertBefore(c,b){c.parentElement=this;const i=this.children.indexOf(b);this.children.splice(i<0?this.children.length:i,0,c);}
    replaceChildren(...cs){this.children=[];this._text='';this.append(...cs);}
    addEventListener(t,f){(this.events[t]??=[]).push(f);}
    async fire(t,extra={}){for(const f of this.events[t]||[])await f({target:this,currentTarget:this,preventDefault(){},...extra});}
    matches(s){
      const attr=s.match(/\[([^=\]]+)(?:="([^"]+)")?\]/);const base=s.replace(/\[[^\]]+\]/g,'');
      if(base.startsWith('.')&&!this.classList.contains(base.slice(1)))return false;
      if(base.startsWith('#')&&this.id!==base.slice(1))return false;
      if(base&&!base.startsWith('.')&&!base.startsWith('#')&&this.tagName.toLowerCase()!==base)return false;
      if(attr){const value=attr[1].startsWith('data-')?this.dataset[key(attr[1].slice(5))]:this.attributes[attr[1]];if(value===undefined)return false;if(attr[2]!==undefined&&String(value)!==attr[2])return false;}
      return true;
    }
    querySelectorAll(s){return this.children.flatMap(c=>[...(c.matches(s)?[c]:[]),...c.querySelectorAll(s)]);}
    querySelector(s){return this.querySelectorAll(s)[0]||null;}
    closest(s){let n=this;while(n){if(n.matches(s))return n;n=n.parentElement;}return null;}
    contains(n){return n===this||this.children.some(c=>c.contains(n));}
    focus(){document.activeElement=this;} scrollIntoView(){this.scrolled=true;}
    showModal(){this.open=true;}close(){this.open=false;}
  }
  const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
  for(const m of html.matchAll(/id="([^"]+)"/g)){const n=new Element();n.id=m[1];roots.push(n);}
  const all=()=>roots.flatMap(n=>[n,...n.querySelectorAll('')]);
  const document={body:new Element('body'),visibilityState:'visible',activeElement:null,
    getElementById:id=>all().find(n=>n.id===id),querySelectorAll:s=>all().filter(n=>n.matches(s)),createElement:t=>new Element(t),createTextNode:t=>new Element('#text',t),addEventListener:(t,f)=>docEvents[t]=f};
  const $=document.getElementById;
  const profiles=['ele','thom'].map(p=>{const n=new Element('button');n.className='profile-choice';n.dataset.profile=p;$('profileChoices').append(n);return n;});
  for(const s of ['','missioni','sblocchi','pratiche']){const n=new Element('a');n.className='nav-link';n.dataset.section=s;roots.push(n);}
  const completed={ele:new Set(['h1','b1','future:id']),thom:new Set(['h2'])};
  const values={ele:new Map(),thom:new Map()};let selected=remembered,status=remembered?'saved':'choose',notify=()=>{},pending=0;
  const snap=()=>({profile:selected,status,pending,completed:new Set(completed[selected]||[]),values:new Map(values[selected]||[])});
  const controller={getState:snap,async select(p){calls.push(['select',p]);selected=p;status='saved';notify(snap());return snap();},async set(id,checked){calls.push(['set',selected,id,checked]);checked?completed[selected].add(id):completed[selected].delete(id);notify(snap());return snap();},async setValue(id,value){calls.push(['setValue',selected,id,value]);values[selected].set(id,value);notify(snap());return snap();},async refresh(){calls.push(['refresh']);notify(snap());},async retry(){status='saved';pending=0;notify(snap());},isRelevantStorageKey:k=>!k||k.startsWith('demiguise-profile-sync-v1:')};
  let options;const location={hash,search},state={confirm:false};
  vm.runInNewContext(source,{document,window:{location,addEventListener:(t,f)=>events[t]=f,scrollTo(){}},URLSearchParams,Set,Map,Promise,URL,...model,searchGuide,SECTIONS,GUIDES,MOONS,INTRO_MOONS,PUZZLE_METHODS:[],createProfileSync:c=>{options=c;notify=c.onChange;return controller;},confirm:()=>state.confirm,setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:f=>f()});
  return {document,$,calls,state,completed,values,options:()=>options,events,
    choose:async p=>profiles[p==='ele'?0:1].fire('click'),click:async id=>$(id).fire('click'),
    navigate:h=>{location.hash=h;events.hashchange();},query:q=>{$('guideSearch').value=q;return $('guideSearch').fire('input');},
    setStatus:(s,p=0)=>{status=s;pending=p;notify(snap());},
    async set(selector,value){const n=document.querySelectorAll(selector)[0];assert.ok(n,selector);if(n.tagName==='INPUT')n.checked=value;else n.value=value;await n.fire('change');}
  };
}

test('profile gate survives every opening and viewing/search never writes progress',async()=>{
 const a=openApp({remembered:'ele'});assert.ok(a.$('guideApp').hidden);assert.equal(a.calls.length,0);
 await a.click('continueBtn');assert.ok(!a.$('guideApp').hidden);a.navigate('#/missioni/secondarie');await a.query('ricerca');a.navigate('#/missioni/secondarie/quest');
 assert.equal(a.calls.filter(x=>x[0].startsWith('set')).length,0);assert.match(a.$('profileName').textContent,/Ele/);assert.ok(!a.$('profileName').textContent.includes('Thom'));
});
test('three manual states are reversible and separate across profiles',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/missioni/secondarie/quest');
 for(const status of ['doing','done','todo']){await a.set('[data-guide-status="quest"]',status);assert.equal(a.values.ele.get('status:quest'),status);}
 await a.set('[data-guide-status="quest"]','doing');a.navigate('#/');assert.match(a.$('resumeContent').textContent,/Una richiesta/);
 await a.click('changeProfileBtn');assert.ok(a.$('guideApp').hidden);await a.choose('thom');assert.ok(!a.$('resumeContent').textContent.includes('Una richiesta'));
 assert.equal(a.values.ele.get('status:quest'),'doing');assert.equal(a.values.thom.size,0);
});
test('moon counts include old bonus and new moons but not unrelated or tutorial IDs',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');assert.equal(a.$('totalDone').textContent,'2 / 4');
 await a.set('[data-moon-check="dm-intro"]',true);assert.equal(a.$('totalDone').textContent,'2 / 4');
 await a.set('[data-scalar-id="demiguise:handed-in"]','9');assert.equal(a.values.ele.get('demiguise:handed-in'),9);assert.equal(a.$('totalDone').textContent,'2 / 4');
 a.navigate('#/sblocchi/demiguise/dm-new');assert.equal(a.$('moon-dm-new').hidden,false);assert.ok(a.$('moon-dm-new').scrolled);
});
test('reset moons is confirmed scoped and preserves scalar quest future and other profile',async()=>{
 const a=openApp();await a.choose('ele');a.values.ele.set('status:quest','doing');a.values.ele.set('demiguise:handed-in',9);a.navigate('#/sblocchi/demiguise');
 const reset=a.document.querySelectorAll('.reset-btn')[0];await reset.fire('click');assert.ok(a.completed.ele.has('h1'));a.state.confirm=true;await reset.fire('click');
 assert.ok(!a.completed.ele.has('h1'));assert.ok(!a.completed.ele.has('b1'));assert.ok(a.completed.ele.has('future:id'));assert.ok(a.completed.thom.has('h2'));
 assert.equal(a.values.ele.get('status:quest'),'doing');assert.equal(a.values.ele.get('demiguise:handed-in'),9);
});
test('known spoiler title returns a safe result and photo is requested only when opened',async()=>{
 const a=openApp();await a.choose('ele');await a.query('Un segreto futuro');assert.match(a.$('resultList').textContent,/Una richiesta/);assert.ok(!a.$('resultList').textContent.includes('Un segreto futuro'));
 a.navigate('#/missioni/secondarie/quest');const d=a.document.querySelectorAll('.photo-disclosure')[0];assert.equal(d.querySelectorAll('img').length,0);d.open=true;await d.fire('toggle');assert.equal(d.querySelector('img').src,'assets/test.jpg');
});
test('quick object card opens in place and closes without modifying progress',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/missioni/secondarie/quest');const b=a.document.querySelectorAll('.object-link')[0];await b.fire('click');assert.equal(a.$('objectDialog').open,true);assert.match(a.$('objectDialogContent').textContent,/Astrolabio/);await a.click('closeObjectDialog');assert.equal(a.$('objectDialog').open,false);assert.equal(a.calls.filter(x=>x[0].startsWith('set')).length,0);
});
test('storage failure disables actual controls and offline feedback stays at the top',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');a.setStatus('offline',2);assert.match(a.$('syncStatus').textContent,/telefono.*sincronizzare/i);a.setStatus('storage-error');assert.ok(a.document.querySelectorAll('[data-moon-check]').every(n=>n.disabled));assert.ok(a.document.querySelectorAll('[data-scalar-id]').every(n=>n.disabled));
 const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');assert.ok(html.indexOf('id="syncStatus"')<html.indexOf('id="homeView"'));
});
test('verification dataset remains isolated and network refresh starts only after entry',async()=>{
 const a=openApp({remembered:'ele',search:'?verifica=134e4a77-ad41-4f8f-8e45-32c99aa20adf'});assert.equal(a.options().dataset,'verify-134e4a77-ad41-4f8f-8e45-32c99aa20adf');await a.events.focus();assert.equal(a.calls.length,0);await a.click('continueBtn');await a.events.focus();assert.ok(a.calls.some(x=>x[0]==='refresh'));
});

test('moon aliases filter the same locations as their search suggestions',async()=>{
 const a=openApp();await a.choose('ele');a.navigate('#/sblocchi/demiguise');
 for(const q of ['alohomora','demigais','dimigais']){await a.query(q);assert.equal(a.$('moon-h1').hidden,false,q);assert.equal(a.$('itemSearchEmpty').hidden,true,q);}
});
test('catalogue filtering keeps every match beyond the 30 search suggestions',async()=>{
 const extra=Array.from({length:40},(_,i)=>({id:'trial-'+i,title:'Prova Merlino '+i,summary:'Risolvi qui',section:'pratiche',category:'oggetti',location:i<30?'Nord':'Sud',steps:['Passo specifico']}));
 GUIDES.push(...extra);
 try {const a=openApp();await a.choose('ele');a.navigate('#/pratiche/oggetti');await a.query('Merlino');assert.equal(a.document.querySelectorAll('[data-guide-id]').filter(n=>!n.hidden).length,40);assert.equal(a.$('resultList').children.length,30);}
 finally{GUIDES.splice(GUIDES.length-40,40);}
});
test('main mission sequence stays narrative when consecutive missions change location',async()=>{
 const category={id:'principali',title:'Principali',summary:'Storia'};SECTIONS[0].categories.push(category);
 GUIDES.push(...['Hogwarts','Hogsmeade','Hogwarts'].map((location,i)=>({id:'main-test-'+i,title:'Tappa '+i,summary:'Procedi',section:'missioni',category:'principali',location,order:i+1,steps:['Passo specifico']})));
 try {const a=openApp();await a.choose('ele');a.navigate('#/missioni/principali');assert.deepEqual(a.document.querySelectorAll('[data-guide-id]').map(n=>n.dataset.guideId),['main-test-0','main-test-1','main-test-2']);}
 finally{GUIDES.splice(GUIDES.length-3,3);SECTIONS[0].categories.pop();}
});
