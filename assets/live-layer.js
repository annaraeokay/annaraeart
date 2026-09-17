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
      @media(max-width:760px){
        #${LAYER_ID}{
          width:min(100% - 32px,1440px);
          grid-template-columns:1fr;
          gap:18px;
          padding:20px 0;
        }
        #${LAYER_ID}>div+div{padding-top:17px;border-top:1px solid rgba(242,238,230,.09);}
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

  function mount() {
    if (document.getElementById(LAYER_ID)) return;
    addStyles();
    addParshaNav();

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
  window.addEventListener('load', () => setTimeout(mount, 120), { once: true });
})();
