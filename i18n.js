(() => {
  const SUPPORTED = ["es", "en"];
  const basePath = window.location.pathname.includes('/html/') ? '../' : './';
  const dictUrl = (lang) => `${basePath}i18n/${lang}.json`;

  const get = (obj, path) => path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);

  async function loadDict(lang) {
    const res = await fetch(dictUrl(lang), { cache: 'no-store' });
    if (!res.ok) throw new Error(`i18n: cannot load ${lang}`);
    return res.json();
  }

  function applyDict(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = get(dict, key);
      if (value == null) return;
      el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = get(dict, key);
      if (value == null) return;
      el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const raw = el.getAttribute('data-i18n-attr');
      // format: "attrName:key,attrName2:key2"
      raw.split(',').map(s => s.trim()).filter(Boolean).forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!attr || !key) return;
        const value = get(dict, key);
        if (value == null) return;
        el.setAttribute(attr, value);
      });
    });
  }

  async function setLang(lang) {
    const safe = SUPPORTED.includes(lang) ? lang : 'en';
    try {
      const dict = await loadDict(safe);
      document.documentElement.lang = safe;
      applyDict(dict);
      localStorage.setItem('lang', safe);
      document.querySelectorAll('[data-lang]').forEach((b) => {
        b.setAttribute('aria-pressed', b.getAttribute('data-lang') === safe ? 'true' : 'false');
      });
    } catch (e) {
      // If translations fail, keep the HTML as-is.
      console.warn(e);
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (btn) setLang(btn.getAttribute('data-lang'));
  });

  const saved = localStorage.getItem('lang');
  const browser = (navigator.language || 'en').slice(0, 2);
  const initial = saved || (SUPPORTED.includes(browser) ? browser : 'es');
  setLang(initial);
})();
