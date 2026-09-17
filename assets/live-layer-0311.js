(() => {
  const STYLE_ID = 'anna-live-layer-style-v4';
  const LAYER_ID = 'anna-live-layer';
  const ASSET_ROOT = location.hostname === 'raw.githack.com'
    ? 'https://raw.githack.com/annaraeokay/annaraeart/main'
    : '';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${LAYER_ID}{width:min(100% - 48px,1440px);margin:0 auto;padding:22px 0 24px;border-top:1px solid rgba(242,238,230,.16);border-bottom:1px solid rgba(242,238,230,.16);display:grid;grid-template-columns:minmax(150px,.75fr) minmax(220px,1.15fr) minmax(220px,1.15fr);gap:28px;align-items:start;color:#f2eee6}
      #${LAYER_ID} .live-kicker{margin:0 0 7px;font:500 10px/1.3 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#aaa49a}
      #${LAYER_ID} p{margin:0} #${LAYER_ID} .live-date{font:400 clamp(15px,1.2vw,18px)/1.45 Georgia,"Times New Roman",serif}
      #${LAYER_ID} a{color:inherit;text-decoration:none;display:inline-flex;align-items:baseline;gap:.42em;font:400 clamp(17px,1.5vw,22px)/1.35 Georgia,"Times New Roman",serif}
      #${LAYER_ID} a::after{content:"↗";font-family:ui-sans-serif,system-ui,sans-serif;font-size:.62em;opacity:.58;transform:translateY(-.08em)}
      #${LAYER_ID} a[href^="/"]::after{content:"→"} #${LAYER_ID} a:hover{opacity:.68}
      #${LAYER_ID} .live-note{margin-top:6px;color:#aaa49a;font:400 12px/1.45 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}

      .anna-ner-tamid-refined{display:block!important;width:min(100%,1540px)!important;margin:0 auto!important;padding:clamp(92px,11vw,160px) clamp(20px,4vw,72px)!important;background:#0d0d0c!important;border:0!important;border-top:1px solid #2b2a27!important;box-shadow:none!important;color:#f2eee6!important}
      .anna-ner-tamid-refined::before,.anna-ner-tamid-refined::after{display:none!important;content:none!important}
      .anna-ner-tamid-refined .anna-ner-visual{position:relative;width:fit-content;max-width:100%;margin:0 auto}
      .anna-ner-tamid-refined .anna-ner-image{display:block;width:auto!important;max-width:100%;height:auto!important;max-height:min(78svh,820px);object-fit:contain!important;margin:0 auto;border:0;border-radius:0;box-shadow:none;filter:saturate(.92) contrast(1.025)}
      .anna-ner-tamid-refined .anna-ner-meta{position:absolute;inset:0;pointer-events:none}
      .anna-ner-tamid-refined .anna-ner-kicker{position:absolute;top:22px;left:24px;margin:0;color:rgba(242,238,230,.66);font:500 10px/1.3 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.18em;text-transform:uppercase}
      .anna-ner-tamid-refined .anna-ner-link{position:absolute;right:24px;bottom:22px;pointer-events:auto;display:inline-block;color:#f2eee6!important;text-decoration:none!important;font:500 10px/1.4 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;letter-spacing:.16em;text-transform:uppercase;padding:0 0 5px!important;border:0!important;border-bottom:1px solid rgba(242,238,230,.45)!important;background:transparent!important;border-radius:0!important;box-shadow:none!important}
      .anna-ner-tamid-refined .anna-ner-link:hover{opacity:.62}
      .anna-ner-tamid-refined .anna-ner-caption{width:min(100%,1160px);margin:18px auto 0;display:flex;justify-content:space-between;gap:24px;color:#77736c;font:400 11px/1.5 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      @media(max-width:760px){#${LAYER_ID}{width:min(100% - 32px,1440px);grid-template-columns:1fr;gap:18px;padding:20px 0}#${LAYER_ID}>div+div{padding-top:17px;border-top:1px solid rgba(242,238,230,.09)}.anna-ner-tamid-refined{padding:72px 0!important}.anna-ner-tamid-refined .anna-ner-visual{width:100%}.anna-ner-tamid-refined .anna-ner-kicker{top:14px;left:16px;font-size:9px}.anna-ner-tamid-refined .anna-ner-link{right:16px;bottom:14px;font-size:9px}.anna-ner-tamid-refined .anna-ner-caption{padding:0 18px;flex-direction:column;gap:4px}}
    `;
    document.head.appendChild(style);
  }

  function addParshaNav() {
    const nav = document.querySelector('header nav, .site-nav, nav');
    if (!nav || nav.querySelector('a[href="/parsha"]')) return;
    const a = document.createElement('a');
    a.href = '/parsha'; a.textContent = 'Parsha';
    const shop = [...nav.querySelectorAll('a')].find(el => /shop/i.test(el.textContent || ''));
    if (shop) nav.insertBefore(a, shop); else nav.appendChild(a);
  }

  function refineNerTamid() {
    if (document.querySelector('.anna-ner-tamid-refined')) return;
    const preview = document.querySelector('img[src*="ner-tamid-app-preview"]');
    const liveLink = document.querySelector('a[href*="nertamid.grok.me"]');
    const section = preview?.closest('section') || liveLink?.closest('section');
    if (!section) return;
    section.classList.add('anna-ner-tamid-refined');
    section.setAttribute('aria-label', 'Ner Tamid');
    section.innerHTML = `
      <div class="anna-ner-visual">
        <img class="anna-ner-image" src="${ASSET_ROOT}/art/ner-tamid-eternal-light.png" alt="Glowing Ner Tamid eternal light with embers and Hebrew lettering" loading="lazy" />
        <div class="anna-ner-meta">
          <p class="anna-ner-kicker">Live digital project · Jewish time and learning</p>
          <a class="anna-ner-link" href="https://nertamid.grok.me" target="_blank" rel="noreferrer">Open Ner Tamid ↗</a>
        </div>
      </div>
      <div class="anna-ner-caption" aria-hidden="true"><span>נר תמיד · Eternal light</span><span>Updated as the project evolves</span></div>`;
  }

  function mount() {
    addStyles(); addParshaNav(); refineNerTamid();
    if (document.getElementById(LAYER_ID)) return;
    const section = document.createElement('section'); section.id = LAYER_ID; section.setAttribute('aria-label', 'Today and this week');
    const date = new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:'America/Chicago'}).format(new Date());
    section.innerHTML = `<div><p class="live-kicker">Today</p><p class="live-date">${date}</p></div><div><p class="live-kicker">Live</p><a href="https://nertamid.grok.me" target="_blank" rel="noreferrer">Ner Tamid</a><p class="live-note">Jewish time, learning and the eternal light.</p></div><div><p class="live-kicker">This week</p><a href="/parsha">Ha’azinu · Shabbat Shuvah</a><p class="live-note">Weekly Torah graphic and reflection.</p></div>`;
    const hero=document.querySelector('.hero, [class*="hero"]'), main=document.querySelector('main');
    if(hero&&hero.parentNode) hero.insertAdjacentElement('afterend',section); else if(main) main.insertBefore(section,main.firstElementChild?.nextSibling||null); else document.body.insertBefore(section,document.body.firstChild);
  }
  const start=()=>requestAnimationFrame(()=>requestAnimationFrame(mount));
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
  window.addEventListener('load',()=>{setTimeout(mount,120);setTimeout(refineNerTamid,500)},{once:true});
})();
