let themePreference = 'auto';
try { themePreference = sessionStorage.getItem('avdoxa-preview-theme') || 'auto'; } catch (_) {}
if (!['auto','light','dark'].includes(themePreference)) themePreference='auto';
const themeMedia=matchMedia('(prefers-color-scheme: dark)');
const activeTheme=()=>themePreference==='auto'?(themeMedia.matches?'dark':'light'):themePreference;
function refreshThemeControl(){
 const button=document.querySelector('.theme-toggle');
 if(!button)return;
 const dark=activeTheme()==='dark';
 button.setAttribute('aria-checked',String(dark));
 button.dataset.active=dark?'dark':'light';
 button.title=`Switch to ${dark?'light':'dark'} theme. Press Escape to follow your system.`;
}
function setTheme(value){
 themePreference=value;
 if(value==='auto')delete document.documentElement.dataset.theme;
 else document.documentElement.dataset.theme=value;
 try{sessionStorage.setItem('avdoxa-preview-theme',value)}catch(_){}
 refreshThemeControl();
}
document.querySelector('.theme-toggle')?.addEventListener('click',()=>setTheme(activeTheme()==='dark'?'light':'dark'));
document.querySelector('.theme-toggle')?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setTheme('auto')}});
themeMedia.addEventListener('change',refreshThemeControl);
refreshThemeControl();
const menu = document.querySelector('.menu'), navigation = document.querySelector('#navigation');
function setMenu(open) {
  menu?.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('open', open);
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {setMenu(false); menu.focus();} });
window.addEventListener('resize', () => { if (innerWidth > 1160) setMenu(false); });
// Photo links work without JavaScript; the dialog adds keyboard gallery browsing.
(() => {
 const links = [...document.querySelectorAll('[data-photo]')];
 if (!links.length || typeof HTMLDialogElement === 'undefined') return;
 const dialog = document.createElement('dialog');
 dialog.className = 'photo-viewer';
 dialog.setAttribute('aria-labelledby', 'photo-viewer-title');
 dialog.innerHTML = '<div class="viewer-controls"><strong id="photo-viewer-title">Project photos</strong><button type="button" data-prev aria-label="Previous photo">← Previous</button><button type="button" data-next aria-label="Next photo">Next →</button><button type="button" data-close autofocus>Close</button></div><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure>';
 document.body.append(dialog);
 let current = 0, opener;
 const show = index => {
  current = (index + links.length) % links.length;
  const image = links[current].querySelector('img');
  dialog.querySelector('img').src = links[current].href;
  dialog.querySelector('img').alt = image.alt;
  dialog.querySelector('figcaption').textContent = image.alt;
  dialog.querySelector('strong').textContent = `Photo ${current + 1} of ${links.length}`;
 };
 links.forEach((link, index) => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();opener = link;show(index);dialog.showModal();
 }));
 dialog.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
 dialog.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
 dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
 dialog.addEventListener('keydown', event => {
  if(event.key === 'ArrowLeft'){event.preventDefault();show(current - 1)}
  if(event.key === 'ArrowRight'){event.preventDefault();show(current + 1)}
 });
 dialog.addEventListener('close', () => opener?.focus());
})();
(() => {
 const section = document.querySelector('.featured-brands');
 const toggle = section?.querySelector('[data-brand-pause]');
 if (!toggle) return;
 toggle.addEventListener('click', () => {
  const paused = section.classList.toggle('motion-paused');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.textContent = paused ? 'Resume logo motion' : 'Pause logo motion';
 });
})();

document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
 const frame=document.createElement('iframe');
 frame.src=`https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`;
 frame.title=button.dataset.title;frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
 frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;
 button.replaceWith(frame);frame.focus();
}));

// Only presentation messages are exchanged; WordPress handles every form field and submission.
const nativeFrames=[...document.querySelectorAll('iframe[data-native-form]')];
function syncNativeTheme(){nativeFrames.forEach(frame=>frame.contentWindow?.postMessage({type:'avdoxa-theme',theme:activeTheme()},'https://avdoxa.com'))}
nativeFrames.forEach(frame=>frame.addEventListener('load',syncNativeTheme));
themeMedia.addEventListener('change',syncNativeTheme);
document.querySelector('.theme-toggle')?.addEventListener('click',syncNativeTheme);
document.querySelector('.theme-toggle')?.addEventListener('keydown',event=>{if(event.key==='Escape')syncNativeTheme()});
window.addEventListener('message',event=>{if(event.origin!=='https://avdoxa.com'||event.data?.type!=='avdoxa-form-height')return;const frame=nativeFrames.find(f=>f.contentWindow===event.source);const height=Number(event.data.height);if(frame&&Number.isFinite(height)&&height>=100&&height<=10000){frame.style.height=Math.max(180,height)+'px';if(frame.dataset.nativeTheme!==activeTheme()){frame.dataset.nativeTheme=activeTheme();frame.contentWindow?.postMessage({type:'avdoxa-theme',theme:activeTheme()},'https://avdoxa.com')}}});

// Hover/focus biographies can be dismissed with Escape and reopen on a new visit.
document.querySelectorAll('.person').forEach(card=>{
 card.addEventListener('mouseleave',()=>card.classList.remove('bio-dismissed'));
 card.addEventListener('focusout',event=>{if(!card.contains(event.relatedTarget))card.classList.remove('bio-dismissed')});
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.person:hover,.person:focus-within').forEach(card=>card.classList.add('bio-dismissed'))});
