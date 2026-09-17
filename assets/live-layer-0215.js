(() => {
  const STYLE_ID = 'anna-live-layer-style-v2';
  const LAYER_ID = 'anna-live-layer';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${LAYER_ID}{
        width:min(100% - 48px,1440px);
        margin:0 auto;
        padding:22px 0 24px;
        border-top:1px solid rgba(242,238,230,.16);
        border-bottom:1px solid rgba(242,238,230,.16);
        display:grid;
        grid-template-columns:minmax(150px,.75fr) minmax(220px,1.15fr) minmax(220px,1.15fr);
        gap:28px;
        align-items:start;
        color:#f2eee6;
      }
      #${LAYER_ID} .live-kicker{
        margin:0 0 7px;
        font:500 10px/1.3 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:#aaa49a;
      }
      #${LAYER_ID} p{margin:0;}
      #${LAYER_ID} .live-date{
        font:400 clamp(15px,1.2vw,18px)/1.45 Georgia,"Times New Roman",serif;
      }
      #${LAYER_ID} a{
        color:inherit;
        text-decoration:none;
        display:inline-flex;
        align-items:baseline;
        gap:.42em;
        font:400 clamp(17px,1.5vw,22px)/1.35 Georgia,"Times New Roman",serif;
      }
      #${LAYER_ID} a::after{
        content:"↗";
        font-family:ui-sans-serif,system-ui,sans-serif;
        font-size:.62em;
        opacity:.58;
        transform:translateY(-.08em);
      }
      #${LAYER_ID} a[href^="/"]::after{content:"→";}
      #${LAYER_ID} a:hover{opacity:.68;}
      #${LAYER_ID} .live-note{
        margin-top:6px;
        color:#aaa49a;
        font:400 12px/1.45 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }

      .anna-ner-tamid-refined{
        display:block!important;
        width:min(100%,1540px)!important;
        margin:0 auto!important;
        padding:clamp(96px,12vw,176px) clamp(20px,4vw,72px)!important;
        background:transparent!important;
        border:0!important;
        border-top:1px solid #2b2a27!important;
        box-shadow:none!important;
        color:#f2eee6!important;
        text-align:left!important;
      }
      .anna-ner-tamid-refined::before,
      .anna-ner-tamid-refined::after{display:none!important;content:none!important;}
      .anna-ner-tamid-refined .anna-ner-inner{
        width:100%;
        display:grid;
        grid-template-columns:minmax(260px,.82fr) minmax(320px,1.18fr);
        gap:clamp(48px,9vw,150px);
        align-items:end;
      }
      .anna-ner-tamid-refined .anna-ner-hebrew{
        margin:0;
        color:#f2eee6;
        font:400 clamp(72px,12vw,184px)/.82 Georgia,"Times New Roman",serif;
        letter-spacing:-.04em;
        white-space:nowrap;
      }
      .anna-ner-tamid-refined .anna-ner-copy{
        max-width:560px;
        padding-bottom:8px;
      }
      .anna-ner-tamid-refined .anna-ner-title{
        margin:0;
        color:#aaa49a;
        font:500 10px/1.3 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        letter-spacing:.2em;
        text-transform:uppercase;
      }
      .anna-ner-tamid-refined .anna-ner-line{
        margin:18px 0 0;
        color:#f2eee6;
        font:400 clamp(30px,4vw,58px)/1 Georgia,"Times New Roman",serif;
        letter-spacing:-.035em;
      }
      .anna-ner-tamid-refined .anna-ner-subline{
        margin:22px 0 0;
        max-width:34rem;
        color:#aaa49a;
        font:400 14px/1.65 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }
      .anna-ner-tamid-refined .anna-ner-link{
        display:inline-block;
        margin-top:30px;
        color:#f2eee6!important;
        text-decoration:none!important;
        font:500 11px/1.4 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        letter-spacing:.14em;
        text-transform:uppercase;
        padding:0 0 5px!important;
        border:0!important;
        border-bottom:1px solid rgba(242,238,230,.38)!important;
        background:none!important;
        border-radius:0!important;
        box-shadow:none!important;
      }
      .anna-ner-tamid-refined .anna-ner-link:hover{opacity:.62;}

      @media(max-width:760px){
        #${LAYER_ID}{
          width:min(100% - 32px,1440px);
          grid-template-columns:1fr;
          gap:18px;
          padding:20px 0;
        }
        #${LAYER_ID}>div+div{padding-top:17px;border-top:1px solid rgba(242,238,230,.09);}
        .anna-ner-tamid-refined{padding:82px 18px!important;}
        .anna-ner-tamid-refined .anna-ner-inner{grid-template-columns:1fr;gap:34px;}
        .anna-ner-tamid-refined .anna-ner-hebrew{font-size:clamp(64px,23vw,104px);white-space:normal;}
        .anna-ner-tamid-refined .anna-ner-copy{padding-bottom:0;}
      }
    `;
    document.head.appendChild(style);
  }

  function addParshaNav() {
    const nav = document.querySelector('header nav, .site-nav, nav');
    if (!nav || nav.querySelector('a[href="/parsha.html"]')) return;
    const a = document.createElement('a');
    a.href = '/parsha.html';
    a.textContent = 'Parsha';
    const shop = [...nav.querySelectorAll('a')].find(el => /shop/i.test(el.textContent || ''));
    if (shop) nav.insertBefore(a, shop);
    else nav.appendChild(a);
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
      <div class="anna-ner-inner">
        <p class="anna-ner-hebrew" lang="he" dir="rtl">נר תמיד</p>
        <div class="anna-ner-copy">
          <p class="anna-ner-title">Ner Tamid</p>
          <p class="anna-ner-line">A light kept burning.</p>
          <p class="anna-ner-subline">A quiet digital space for Jewish time, learning, and the rhythms of the week.</p>
          <a class="anna-ner-link" href="https://nertamid.grok.me" target="_blank" rel="noreferrer">Open Ner Tamid ↗</a>
        </div>
      </div>
    `;
  }

  function mount() {
    addStyles();
    addParshaNav();
    refineNerTamid();

    if (document.getElementById(LAYER_ID)) return;
    const section = document.createElement('section');
    section.id = LAYER_ID;
    section.setAttribute('aria-label', 'Today and this week');

    const date = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Chicago'
    }).format(new Date());

    section.innerHTML = `
      <div>
        <p class="live-kicker">Today</p>
        <p class="live-date">${date}</p>
      </div>
      <div>
        <p class="live-kicker">Live</p>
        <a href="https://nertamid.grok.me" target="_blank" rel="noreferrer">Ner Tamid</a>
        <p class="live-note">Jewish time, learning and the eternal light.</p>
      </div>
      <div>
        <p class="live-kicker">This week</p>
        <a href="/parsha.html">Ha’azinu · Shabbat Shuvah</a>
        <p class="live-note">Weekly Torah graphic and reflection.</p>
      </div>
    `;

    const hero = document.querySelector('.hero, [class*="hero"]');
    const main = document.querySelector('main');
    if (hero && hero.parentNode) hero.insertAdjacentElement('afterend', section);
    else if (main) main.insertBefore(section, main.firstElementChild?.nextSibling || null);
    else document.body.insertBefore(section, document.body.firstChild);
  }

  const start = () => requestAnimationFrame(() => requestAnimationFrame(mount));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  window.addEventListener('load', () => {
    setTimeout(mount, 120);
    setTimeout(refineNerTamid, 500);
  }, { once: true });
})();
