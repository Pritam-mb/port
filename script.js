import { projects, milestones, achievements } from './data.js';
const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];
const escapeHTML = (v='') => String(v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const editorMode = new URLSearchParams(window.location.search).get('edit') === '1';
const dialog = $('#detail-dialog');
const dialogContent = $('#dialog-content');
const toastEl = $('#toast');
let toastTimer;

function toast(message){ toastEl.textContent=message; toastEl.classList.add('shown'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toastEl.classList.remove('shown'),3200); }
function renderTags(tags){ return tags.map(t=>`<span>${escapeHTML(t)}</span>`).join(''); }
function projectArt(id){
 if(id==='orbital') return `<div class="art art-orbital"><div class="art-label">MISSION CONTROL // CONJUNCTION RADAR</div><div class="orbital-scene"><div class="orb-ring orb-ring-1"></div><div class="orb-ring orb-ring-2"></div><div class="orb-ring orb-ring-3"></div><div class="planet"><div class="planet-lines"></div></div><div class="satellite satellite-a">✳</div><div class="satellite satellite-b">◆</div><div class="satellite satellite-c">✧</div><span class="orb-coordinate a">OBJECT / 44387</span><span class="orb-coordinate b">SGP4 / TLE / 24H</span></div><div class="art-footer"><span>● TRACKING ACTIVE</span><span>EARTH / LEO</span></div></div>`;
 if(id==='rawbee') return `<div class="art art-rawbee"><div class="rawbee-head"><span class="rawbee-logo">▶ <b>rawbee</b></span><span>⌕ &nbsp; ◉</span></div><div class="rawbee-feature"><div class="play-circle">▶</div><div class="rawbee-video-title">CREATE / WATCH / SHARE</div></div><div class="rawbee-mini-row"><div><i></i><span></span></div><div><i></i><span></span></div><div><i></i><span></span></div></div><div class="art-footer"><span>STREAMING PLATFORM</span><span>01:42 ▶</span></div></div>`;
 if(id==='lobo') return `<div class="art art-lobo"><div class="lobo-bg"><span class="map-road map-r1"></span><span class="map-road map-r2"></span><span class="map-road map-r3"></span><span class="map-road map-r4"></span><div class="map-pin pin1">✦</div><div class="map-pin pin2">⌁</div><div class="map-pin pin3">✧</div></div><div class="lobo-panel"><small>DISCOVER NEAR YOU</small><strong>Find your next<br />local favorite.</strong><span>⌕ &nbsp; Search services...</span><div>CAFÉS &nbsp; · &nbsp; SALONS &nbsp; · &nbsp; MORE</div></div></div>`;
 if(id==='crypto') { const candles=[[27,30,62,44],[48,44,75,52],[70,34,82,61],[92,50,91,71],[114,48,82,58],[136,43,76,50],[158,24,67,38],[180,32,77,55],[202,42,87,63],[224,25,66,43],[246,17,55,32],[268,23,65,46],[290,13,54,23],[312,18,60,38],[334,10,46,19],[356,14,48,31],[378,7,40,14],[400,14,47,33]]; return `<div class="art art-crypto"><div class="crypto-top"><span>BTC / USD <b>LIVE DATA LAB</b></span><span>+ 04.21%</span></div><svg viewBox="0 0 440 155" preserveAspectRatio="none" aria-hidden="true"><path d="M0 35H440M0 76H440M0 117H440M45 0V155M135 0V155M225 0V155M315 0V155M405 0V155" stroke="#536045" stroke-width=".6" fill="none"/>${candles.map(([x,y1,y2,body],i)=>`<line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="${i%4===0?'#e68d6a':'#d4f58e'}" stroke-width="1.3"/><rect x="${x-4}" y="${Math.min(body,y1+6)}" width="8" height="${Math.max(7,Math.abs(y2-body)-13)}" fill="${i%4===0?'#e68d6a':'#b9f178'}"/>`).join('')}</svg><div class="crypto-bottom"><span>MARKET FEED / EXPERIMENTAL</span><span>IN DEVELOPMENT</span></div></div>`; }
 if(id==='omniml') return `<div class="art art-omniml"><div class="ml-caption">TRAINING PIPELINE // EXPERIMENT 002</div><div class="ml-flow"><div class="ml-box"><span>01</span><b>DATA</b><small>ingest</small></div><div class="ml-arrow">→</div><div class="ml-box active"><span>02</span><b>MODEL</b><small>train</small></div><div class="ml-arrow">→</div><div class="ml-box"><span>03</span><b>EVAL</b><small>compare</small></div></div><div class="ml-bottom"><span>accuracy <i></i><i></i><i></i><i></i></span><span>scikit-learn ↗</span></div></div>`;
 if(id==='metamorph') return `<div class="art art-metamorph"><div class="event-lines"></div><div class="event-qr">${Array.from({length:121},(_,i)=>`<i class="${((i*29+Math.floor(i/11)*7)%9)<5?'on':''}"></i>`).join('')}</div><div class="event-copy"><small>EVENT OPERATIONS / 2026</small><strong>METAMORPH<br />2K26</strong><span>SCAN → VERIFY → CHECK IN</span><div><b>● PRESENT</b><b>○ ABSENT</b></div></div></div>`;
 return '';
}

function renderProjects(filter='all'){
 const matching = projects.filter(p=>filter==='all'||p.category.includes(filter));
 $('#project-count').textContent=`Showing ${String(matching.length).padStart(2,'0')} project${matching.length!==1?'s':''}`;
 $('#projects-grid').innerHTML=matching.map((p)=>`<article class="project-card ${p.featured?'featured':''} ${p.wide?'wide':''} reveal visible" data-project="${p.id}"><div class="project-artwork">${projectArt(p.id)}</div><div class="project-info"><div class="project-meta"><span>${p.number} / ${escapeHTML(p.type)}</span><span>${escapeHTML(p.year)}</span></div><h3>${escapeHTML(p.title)} <span class="project-arrow">↗</span></h3><p class="project-tagline">${escapeHTML(p.tagline)}</p><p class="project-description">${escapeHTML(p.description)}</p><div class="project-tech">${renderTags(p.tech.slice(0, p.wide?4:3))}</div><div class="project-actions"><button class="project-details" type="button" data-open-project="${p.id}">Case study <span>↗</span></button>${p.repo?`<a href="${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(p.title)} GitHub repository">Source code ↗</a>`:'<span class="project-private">'+escapeHTML(p.status)+'</span>'}</div></div></article>`).join('');
 $$('[data-open-project]').forEach(el=>el.addEventListener('click',()=>openProject(el.dataset.openProject)));
}
function openProject(id){
 const p=projects.find(x=>x.id===id); if(!p) return;
 dialogContent.innerHTML=`<div class="modal-eyebrow">PROJECT CASE STUDY / ${p.number} <span>${escapeHTML(p.status)}</span></div><div class="modal-art">${projectArt(id)}</div><h2>${escapeHTML(p.title)}<span>.</span></h2><p class="modal-subtitle">${escapeHTML(p.tagline)}</p><p class="modal-description">${escapeHTML(p.description)}</p><h3>Inside the build</h3><ul class="modal-list">${p.highlights.map(h=>`<li>${escapeHTML(h)}</li>`).join('')}</ul><h3>Technologies</h3><div class="modal-tags">${renderTags(p.tech)}</div><div class="modal-actions">${p.repo?`<a class="button button-lime" href="${p.repo}" target="_blank" rel="noopener noreferrer">Explore repository ↗</a>`:`<a class="button button-lime" href="mailto:patrapritam567@gmail.com?subject=${encodeURIComponent('Tell me more about '+p.title)}">Ask about this project ↗</a>`}</div>`;
 openDialog();
}
function openDialog(){if(!dialog.open) dialog.showModal(); document.body.classList.add('dialog-open');}
function closeDialog(){if(dialog.open) dialog.close(); document.body.classList.remove('dialog-open');}
$('#dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
dialog.addEventListener('click',(e)=>{if(e.target===dialog) closeDialog();});

$$('#project-filters button').forEach(btn=>btn.addEventListener('click',()=>{
 $$('[data-filter]').forEach(b=>{const active=b===btn; b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 renderProjects(btn.dataset.filter);
}));
renderProjects();

function selectMilestone(index){
 const m=milestones[index]; if(!m) return;
 $$('#timeline-list .timeline-option').forEach((button,i)=>{button.classList.toggle('selected',i===index);button.setAttribute('aria-pressed',String(i===index));});
 $('#timeline-detail').innerHTML=`<div class="timeline-card-top"><span>${escapeHTML(m.meta)}</span><span>${String(index+1).padStart(2,'0')} / ${String(milestones.length).padStart(2,'0')}</span></div><div class="timeline-big-year">${escapeHTML(m.year)}</div><div class="timeline-card-body"><span class="timeline-star">✳</span><h3>${escapeHTML(m.title)}</h3><p>${escapeHTML(m.detail)}</p><div class="timeline-tags">${renderTags(m.tags)}</div></div>`;
}
$('#timeline-list').innerHTML=milestones.map((m,i)=>`<button class="timeline-option ${i===2?'selected':''}" type="button" data-milestone="${i}" aria-pressed="${i===2}"><span class="timeline-circle">${m.count}</span><span class="timeline-text"><small>${m.year}</small><strong>${escapeHTML(m.label)}</strong></span><span class="timeline-chevron">↗</span></button>`).join('');
$$('[data-milestone]').forEach(b=>b.addEventListener('click',()=>selectMilestone(Number(b.dataset.milestone))));
selectMilestone(2);

// Achievement images from the source repo or (optional) browser-local edit mode.
// Browser-local additions are saved with IndexedDB; they do NOT publish photos to other devices.
const localImages=new Map();
function openImageDb(){return new Promise((resolve,reject)=>{const r=indexedDB.open('pritam-portfolio-gallery',1);r.onupgradeneeded=()=>r.result.createObjectStore('images');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function localGetAll(){try{const db=await openImageDb();return await new Promise((resolve,reject)=>{const tx=db.transaction('images','readonly'), store=tx.objectStore('images'),req=store.getAllKeys();req.onsuccess=()=>{const keys=req.result;const result={};if(!keys.length){resolve(result);return;}let pending=keys.length;keys.forEach(key=>{const r=store.get(key);r.onsuccess=()=>{result[key]=r.result;if(--pending===0)resolve(result);};r.onerror=()=>{if(--pending===0)resolve(result);};});};req.onerror=()=>reject(req.error);});}catch{return {};}}
async function localPut(id,value){const db=await openImageDb();return new Promise((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.objectStore('images').put(value,id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function localDelete(id){const db=await openImageDb();return new Promise((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.objectStore('images').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
const imgFor = a => localImages.get(a.id) || a.image || null;
const featureIds = ['recursive','aki-hacks','metamorph-team','stellar','icc','isa-jadavpur'];
const stories = featureIds.map(id=>achievements.find(a=>a.id===id)).filter(Boolean);
let currentGalleryFilter = 'all';
let activeStory = 0;
const stage = $('#story-scroll');
const storyPanels = $('#story-panels');

function renderStories(){
  if(!storyPanels) return;
  storyPanels.innerHTML=stories.map((a,i)=>`
    <article class="story-card story-card-${a.artwork}${i===0?' is-current':''}" data-story="${escapeHTML(a.id)}" aria-hidden="${i===0?'false':'true'}">
      <button class="story-card-button" type="button" data-view-story="${escapeHTML(a.id)}" tabindex="${i===0?'0':'-1'}" aria-label="Open the real photo and story: ${escapeHTML(a.title)}">
        <span class="story-fine-grid" aria-hidden="true"></span>
        <span class="story-orbit orbit-one" aria-hidden="true"></span><span class="story-orbit orbit-two" aria-hidden="true"></span>
        <span class="story-huge-word" aria-hidden="true">${escapeHTML(a.headline)}</span>
        <span class="story-card-copy"><span class="story-kicker">${escapeHTML(a.eyebrow)}</span><span class="story-card-title">${escapeHTML(a.title)}</span><span class="story-card-description">${escapeHTML(a.detail.replace(/No photo provided for this entry\.?/g,''))}</span><span class="story-card-cta"><span class="story-cta-burst">✳</span> CLICK TO REVEAL THE MOMENT <b aria-hidden="true">↗</b></span></span>
        <span class="story-count" aria-hidden="true">${String(i+1).padStart(2,'0')} / ${String(stories.length).padStart(2,'0')}</span>
      </button>
    </article>`).join('');
  $$('[data-view-story]').forEach(button=>button.addEventListener('click',()=>openAchievement(button.dataset.viewStory)));
  updateStory();
}

function setActiveStory(index){
  if(!stories.length) return;
  const next=Math.max(0,Math.min(index,stories.length-1));
  activeStory=next;
  $$('.story-card').forEach((card,i)=>{
    const visible=i===next;
    card.classList.toggle('is-current',visible);
    card.classList.toggle('is-before',i<next);
    card.setAttribute('aria-hidden',String(!visible));
    const button=card.querySelector('button'); if(button)button.tabIndex=visible?0:-1;
  });
  $('#story-index').textContent=`${String(next+1).padStart(2,'0')} / ${String(stories.length).padStart(2,'0')}`;
  $('#story-next').disabled=next===stories.length-1;
}
function storyMetrics(){
  const navHeight=$('#site-header').offsetHeight;
  const start=window.scrollY + stage.getBoundingClientRect().top - navHeight;
  const stickyHeight=Math.max(400,window.innerHeight-navHeight);
  const range=Math.max(1,stage.offsetHeight-stickyHeight);
  return {start,range};
}
function updateStory(){
  if(!stage||!stories.length)return;
  if(window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches){
    $$('.story-card').forEach(card=>{card.setAttribute('aria-hidden','false');const btn=card.querySelector('button');if(btn)btn.tabIndex=0;});
    $('#story-index').textContent=`01 / ${String(stories.length).padStart(2,'0')}`;
    return;
  }
  const {start,range}=storyMetrics();
  $$('.story-card').forEach((card,i)=>{const visible=i===activeStory;card.setAttribute('aria-hidden',String(!visible));const btn=card.querySelector('button');if(btn)btn.tabIndex=visible?0:-1;});
  const progress=Math.min(1,Math.max(0,(window.scrollY-start)/range));
  const index=Math.min(stories.length-1,Math.floor(progress*stories.length));
  if(index!==activeStory) setActiveStory(index);
  $('#story-progress-bar').style.width=`${(progress*100).toFixed(2)}%`;
}
$('#story-next').addEventListener('click',()=>{
  if(activeStory>=stories.length-1)return;
  const {start,range}=storyMetrics();
  window.scrollTo({top:start+(activeStory+1.04)/stories.length*range,behavior:'smooth'});
});
window.addEventListener('scroll',()=>requestAnimationFrame(updateStory),{passive:true});
window.addEventListener('resize',()=>requestAnimationFrame(updateStory));

function renderGallery(filter='all'){
  const cards=achievements.filter(a=>!featureIds.includes(a.id)&&(filter==='all'||a.type===filter));
  $('#gallery-grid').innerHTML=cards.map(a=>`
    <article class="gallery-card gallery-${escapeHTML(a.artwork)}">
      <button type="button" class="gallery-main" data-view-gallery="${escapeHTML(a.id)}" aria-label="Open photo and story for ${escapeHTML(a.title)}">
        <div class="gallery-poster"><span class="poster-counter">${escapeHTML(a.index)} / ARCHIVE</span><strong>${escapeHTML(a.headline)}</strong><span class="poster-glyph">✳</span><small>${escapeHTML(a.eyebrow)}</small></div>
        <div class="gallery-overlay"><span>${escapeHTML(a.eyebrow)}</span><h3>${escapeHTML(a.title)}</h3><b>↗</b></div>
      </button>
      ${editorMode?`<div class="edit-tools"><label class="upload-label">Preview photo <input type="file" data-upload="${escapeHTML(a.id)}" accept="image/png,image/jpeg,image/webp,image/avif" aria-label="Preview photo for ${escapeHTML(a.title)}"/></label>${localImages.has(a.id)?`<button type="button" data-remove-photo="${escapeHTML(a.id)}">Remove</button>`:''}</div>`:''}
    </article>`).join('');
  $$('[data-view-gallery]').forEach(b=>b.addEventListener('click',()=>openAchievement(b.dataset.viewGallery)));
  $$('[data-upload]').forEach(input=>input.addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(file.size>5*1024*1024){toast('Please choose an image smaller than 5 MB.');return;}
    try{
      const value=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(file);});
      await localPut(input.dataset.upload,value);localImages.set(input.dataset.upload,value);renderGallery(currentGalleryFilter);toast('Stored on this device. Publish via assets/gallery + data.js.');
    }catch{toast('Local browser storage unavailable.');}
  }));
  $$('[data-remove-photo]').forEach(b=>b.addEventListener('click',async()=>{await localDelete(b.dataset.removePhoto);localImages.delete(b.dataset.removePhoto);renderGallery(currentGalleryFilter);toast('Local preview removed.');}));
}
function openAchievement(id){
  const a=achievements.find(x=>x.id===id);if(!a)return;
  const src=imgFor(a);
  dialogContent.innerHTML=`<div class="modal-eyebrow">FIELD NOTES / ${escapeHTML(a.index)}<span>${escapeHTML(a.eyebrow)}</span></div>
    <div class="achievement-modal-art ${src?'with-image':''}">${src?`<img src="${escapeHTML(src)}" alt="${escapeHTML(a.title)} — original event photograph" loading="eager"/>`:`<div class="gallery-poster gallery-${escapeHTML(a.artwork)}"><strong>${escapeHTML(a.headline)}</strong><small>${escapeHTML(a.eyebrow)}</small></div>`}</div>
    <h2>${escapeHTML(a.title)}<span>.</span></h2><p class="modal-description">${escapeHTML(a.detail)}</p>
    ${!src?'<p class="modal-hint">No photo for this milestone has been uploaded yet.</p>':''}
    ${editorMode?'<p class="modal-hint">Uploads in edit mode are local to this browser. Publish new photos in assets/gallery and update data.js.</p>':''}`;
  openDialog();
}
$$('[data-gallery-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  currentGalleryFilter=btn.dataset.galleryFilter;
  $$('[data-gallery-filter]').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  renderGallery(currentGalleryFilter);
}));
if(editorMode) $('#owner-hint').hidden=false;
renderStories();renderGallery();
localGetAll().then(data=>{Object.entries(data).forEach(([k,v])=>localImages.set(k,v));renderGallery(currentGalleryFilter);});
const menuBtn=$('#menu-toggle'); const mobileNav=$('#mobile-nav');
function closeMenu(){menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu');mobileNav.hidden=true;document.body.classList.remove('menu-open');}
menuBtn.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')!=='true';menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav.hidden=!open;document.body.classList.toggle('menu-open',open);});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>860)closeMenu();});
$('#year').textContent=new Date().getFullYear();
$('#copy-email').addEventListener('click',async()=>{const mail='patrapritam567@gmail.com';try{await navigator.clipboard.writeText(mail);toast('Email copied: '+mail);}catch{toast('Email: '+mail);}});

let scrollTicking=false;
function onScroll(){if(scrollTicking)return;scrollTicking=true;requestAnimationFrame(()=>{const distance=document.documentElement.scrollHeight-innerHeight;$('#scroll-progress').style.width=(distance>0?window.scrollY/distance*100:0)+'%';$('#site-header').classList.toggle('scrolled',window.scrollY>20);scrollTicking=false;});}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.09,rootMargin:'0px 0px -30px 0px'});$$('.reveal').forEach(el=>observer.observe(el));
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('.desktop-nav a').forEach(a=>a.classList.toggle('current',a.dataset.nav===e.target.id));}});},{rootMargin:'-30% 0px -58% 0px'});$$('main section[id]').forEach(s=>sectionObserver.observe(s));}
else $$('.reveal').forEach(el=>el.classList.add('visible'));

// GitHub contribution heatmap: public GitHub data, never simulated activity.
// This third-party public endpoint is cached; private contributions may be absent.
async function renderGitHubCalendar(){
  const status = $('#github-status');
  const grid = $('#contrib-grid');
  const months = $('#contrib-months');
  const summary = $('#github-total');
  if(!status || !grid || !months || !summary) return;
  const profileUrl='https://github.com/Pritam-mb';
  function dateUTC(date){ const [y,m,d] = date.split('-').map(Number); return new Date(Date.UTC(y,m-1,d)); }
  function keyUTC(d){ return d.toISOString().slice(0,10); }
  const dayMs=24*60*60*1000;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 12000);
    let response;
    try { response=await fetch('https://github-contributions-api.jogruber.de/v4/Pritam-mb?y=last', {signal:controller.signal, cache:'no-store'}); }
    finally {clearTimeout(timeout);}
    if(!response.ok) throw new Error('GitHub activity provider unavailable');
    const json=await response.json();
    const days=Array.isArray(json.contributions)?json.contributions:[];
    const clean=days.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isFinite(Number(d.count)) && Number.isFinite(Number(d.level))).sort((a,b)=>a.date.localeCompare(b.date));
    if(clean.length < 200) throw new Error('Not enough contribution days');
    // Align cells to Sunday to match GitHub's calendar grid.
    const firstDate=dateUTC(clean[0].date),lastDate=dateUTC(clean[clean.length-1].date);
    const start=new Date(firstDate.getTime()-firstDate.getUTCDay()*dayMs);
    const end=new Date(lastDate.getTime()+(6-lastDate.getUTCDay())*dayMs);
    const weeks=Math.ceil(((end-start)/dayMs+1)/7);
    const byDate=new Map(clean.map(d=>[d.date,d]));
    let total=0, activeDays=0;
    const cells=[];
    for(let index=0;index<weeks*7;index++){
      const day=new Date(start.getTime()+index*dayMs);
      const key=keyUTC(day);
      const entry=byDate.get(key);
      if(!entry){cells.push('<span class="contrib-cell-empty" aria-hidden="true"></span>');continue;}
      const count=Math.max(0,Math.round(Number(entry.count)));
      const level=Math.min(4,Math.max(0,Math.round(Number(entry.level))));
      total+=count;
      if(count>0)activeDays++;
      const label=`${key}: ${count} public contribution${count===1?'':'s'}`;
      cells.push(`<span class="contrib-cell level-${level}" data-date="${key}" data-count="${count}" title="${label}" aria-hidden="true"></span>`);
    }
    grid.innerHTML=cells.join('');
    grid.style.setProperty('--github-weeks',String(weeks));
    grid.setAttribute('aria-label',`${total.toLocaleString('en-IN')} public GitHub contributions across ${activeDays} active days in the past year`);
    summary.textContent=total.toLocaleString('en-IN');
    const monthLabels=[];
    let lastMonth='';
    for(let week=0;week<weeks;week++){
      const day=new Date(start.getTime()+week*7*dayMs);
      const month=day.toLocaleString('en-US',{month:'short',timeZone:'UTC'});
      if(month!==lastMonth){ monthLabels.push(`<span style="left:${week*19}px">${month}</span>`);lastMonth=month; }
    }
    months.innerHTML=monthLabels.join('');
    months.style.width=`${weeks*19}px`;
    status.innerHTML='<i></i> Live GitHub data';
    $('#github-footnote').textContent=`${activeDays} active days · Public contributions include qualifying commits, pull requests and more. Data may be cached.`;
  } catch (error) {
    // Never show made-up contribution squares or statistics.
    grid.innerHTML=`<div class="github-unavailable"><img class="github-fallback-image" src="https://ghchart.rshah.org/739d2d/Pritam-mb" alt="Public GitHub contribution calendar for Pritam-mb" loading="lazy" /><span>The interactive feed is temporarily unavailable. <a href="${profileUrl}" target="_blank" rel="noopener noreferrer">View the source on GitHub ↗</a></span></div>`;
    const backupImage=grid.querySelector('.github-fallback-image');
    backupImage.onerror=()=>{ backupImage.remove(); };
    grid.removeAttribute('role');
    summary.textContent='—';
    status.textContent='Live API unavailable';
    months.innerHTML='';
    $('#github-footnote').textContent='The backup public contribution image is supplied by an external service; view GitHub for authoritative information.';
  }
}
renderGitHubCalendar();


// Motion control: user can pause the landscape-photo crossfades.
const motionToggle = $('#motion-toggle');
const heroMotion = $('#hero-motion-video');
let motionPaused = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
function setMotionPaused(value){
  motionPaused = Boolean(value);
  document.body.classList.toggle('motion-paused', motionPaused);
  if (heroMotion) {
    if (motionPaused) heroMotion.pause();
    else heroMotion.play().catch(() => {}); // Autoplay can be restricted by browser settings.
  }
  if (motionToggle) {
    motionToggle.setAttribute('aria-pressed', String(motionPaused));
    motionToggle.innerHTML = motionPaused ? 'Resume backgrounds <span aria-hidden="true">▶</span>' : 'Pause backgrounds <span aria-hidden="true">❚❚</span>';
  }
}
if (motionToggle) motionToggle.addEventListener('click', () => setMotionPaused(!motionPaused));
setMotionPaused(motionPaused);
