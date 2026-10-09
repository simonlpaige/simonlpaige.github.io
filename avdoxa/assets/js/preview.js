let themePreference = 'auto';
try { themePreference = sessionStorage.getItem('avdoxa-preview-theme') || 'auto'; } catch (_) {}
if (!['auto', 'light', 'dark'].includes(themePreference)) themePreference = 'auto';
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
function refreshThemeControl() {
  const active = themePreference === 'auto' ? (themeMedia.matches ? 'dark' : 'light') : themePreference;
  document.querySelectorAll('[data-theme-choice]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === active));
  });
  const control = document.querySelector('.theme-toggle');
  if (control) control.title = themePreference === 'auto' ? 'Theme follows your system' : 'Select the active theme again to follow your system';
}
function setTheme(value) {
  themePreference = value;
  if (value === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = value;
  try { sessionStorage.setItem('avdoxa-preview-theme', value); } catch (_) {}
  refreshThemeControl();
}
document.querySelectorAll('[data-theme-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const active = themePreference === 'auto' ? (themeMedia.matches ? 'dark' : 'light') : themePreference;
    setTheme(themePreference !== 'auto' && button.dataset.themeChoice === active ? 'auto' : button.dataset.themeChoice);
  });
});
themeMedia.addEventListener('change', refreshThemeControl);
refreshThemeControl();
const menu = document.querySelector('.menu'), navigation = document.querySelector('#navigation');
function setMenu(open) {
  menu?.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('open', open);
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {setMenu(false); menu.focus();} });
window.addEventListener('resize', () => { if (innerWidth > 980) setMenu(false); });
document.querySelectorAll('.person').forEach(card => {
  const details = card.querySelector('.bio-details');
  if (!details) return;
  let pinned = false;
  details.querySelector('summary').addEventListener('click', () => { pinned = !details.open; });
  card.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse' && matchMedia('(hover:hover)').matches) details.open = true;
  });
  card.addEventListener('pointerleave', () => {
    if (!pinned && !card.contains(document.activeElement)) details.open = false;
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Escape' && details.open) {
      details.open = false; pinned = false; details.querySelector('summary').focus();
    }
  });
});
// This internal preview validates and reviews input locally. It never posts to an external system.
document.querySelectorAll('[data-review-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.replaceChildren();
    const headline = document.createElement('p');
    headline.textContent = 'Preview validation passed. Nothing was sent.';
    headline.style.fontWeight = '700';
    status.append(headline);
    for (const [key, value] of new FormData(form)) {
      if (key.startsWith('_')) continue;
      if (!String(value).trim()) continue;
      const line = document.createElement('p');
      const field = form.querySelector(`[name="${key}"]`);
      const label = field?.closest('label')?.childNodes[0]?.textContent?.trim() || key;
      line.textContent = `${label}: ${value}`;
      status.append(line);
    }
    const note = document.createElement('p');
    note.textContent = form.dataset.kind === 'service'
      ? 'Service requests go to help@avdoxa.com with the subject Service Request. You can open the reviewed request in your email app below.'
      : 'Production delivery and its confirmation must be verified from avdoxa.com before release.';
    status.append(note);
    if (form.dataset.kind === 'service') {
      const body = [...new FormData(form)].filter(([key]) => !key.startsWith('_')).map(([key,value]) => `${key}: ${value}`).join('\r\n');
      const email = document.createElement('a');
      email.className = 'button';
      email.textContent = 'Open service email';
      email.href = `mailto:help@avdoxa.com?subject=Service%20Request&body=${encodeURIComponent(body)}`;
      status.append(email);
      const hint = document.createElement('p');
      hint.textContent = 'This opens a draft in your email app. Send it there to deliver your request.';
      status.append(hint);
    }
    status.hidden = false;
    status.focus();
  });
});
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

/* Carry the requested specialty into the project inquiry without injecting content. */
{ const field=document.querySelector('select[name="specialty"]'); const choice=new URLSearchParams(location.search).get("specialty"); if(field && [...field.options].some(option=>option.value===choice)) field.value=choice; }
