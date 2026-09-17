(() => {
  const STYLE_ID = 'anna-live-layer-style';
  const LAYER_ID = 'anna-live-layer';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${LAYER_ID}{
        width:min(100% - 48px, 1440px);
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
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:clamp(76px,10vw,144px) max(24px,6vw)!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        color:#f2eee6!important;
        text-align:center!important;
        overflow:visible!important;
      }
      .anna-ner-tamid-refined::before,
      .anna-ner-tamid-refined::after{display:none!important;content:none!important;}
      .anna-ner-tamid-refined .anna-ner-inner{
        width:min(100%,760px);
        margin:0 auto;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .anna-ner-tamid-refined .anna-ner-mark{
        width:72px;
        height:auto;
        margin:0 0 34px;
        overflow:visible;
      }
      .anna-ner-tamid-refined .anna-ner-hebrew{
        margin:0;
        color:#f2eee6;
        font:400 clamp(42px,6vw,74px)/1.05 Georgia,"Times New Roman",serif;
        letter-spacing:.01em;
      }
      .anna-ner-tamid-refined .anna-ner-title{
        margin:14px 0 0;
        color:#aaa49a;
        font:500 10px/1.3 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        letter-spacing:.2em;
        text-transform:uppercase;
      }
      .anna-ner-tamid-refined .anna-ner-line{
        margin:30px 0 0;
        color:#d8d2c8;
        font:400 clamp(18px,2.1vw,27px)/1.5 Georgia,"Times New Roman",serif;
      }
      .anna-ner-tamid-refined .anna-ner-link{
        margin-top:34px;
        color:#f2eee6!important;
        text-decoration:none!important;
        font:500 11px/1.4 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        letter-spacing:.14em;
        text-transform:uppercase;
        border:0!important;
        background:none!important;
        padding:0 0 5px!important;
        border-bottom:1px solid rgba(242,238,230,.38)!important;
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
        .anna-ner-tamid-refined{padding:72px 24px!important;}
        .anna-ner-tamid-refined .anna-ner-mark{width:62px;margin-bottom:28px;}
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
        <svg class="anna-ner-mark" viewBox="0 0 120 150" role="img" aria-label="Hanging eternal light">
          <path d="M60 0v42" fill="none" stroke="rgba(242,238,230,.62)" stroke-width="1.5"/>
          <path d="M37 58h46l-8 16H45z" fill="none" stroke="rgba(242,238,230,.62)" stroke-width="1.5"/>
          <path d="M44 74h32c-1 23-8 38-16 38S45 97 44 74Z" fill="none" stroke="rgba(242,238,230,.8)" stroke-width="1.5"/>
          <path d="M60 92c-5-7-2-14 2-19 1 6 7 8 5 15-1 5-4 8-7 10-3-2-5-4-5-7 0-3 2-6 5-9 0 4 1 7 0 10Z" fill="#c89554"/>
          <path d="M49 116h22" fill="none" stroke="rgba(242,238,230,.38)" stroke-width="1.5"/>
        </svg>
        <p class="anna-ner-hebrew" lang="he" dir="rtl">נֵר תָּמִיד</p>
        <p class="anna-ner-title">Ner Tamid</p>
        <p class="anna-ner-line">A light kept burning.</p>
        <a class="anna-ner-link" href="https://nertamid.grok.me" target="_blank" rel="noreferrer">Open the light ↗</a>
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
