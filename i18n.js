const supported = ["es", "en"];

// Detecta si estamos en /html/ o en root
const isSubpage = window.location.pathname.includes("/html/");
const BASE_PATH = isSubpage ? "../" : "";

function get(obj, path) {
  return path.split(".").reduce((a, k) => (a ? a[k] : undefined), obj);
}

async function setLang(lang) {
  if (!supported.includes(lang)) lang = "es";

  const dict = await fetch(`${BASE_PATH}i18n/${lang}.json`, { cache: "no-store" })
    .then(r => r.json());

  document.documentElement.lang = lang;

  // Textos
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = get(dict, key);
    if (value != null) el.textContent = value;
  });

  // Atributos (alt, aria-label, title, placeholder…)
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    const pairs = el.dataset.i18nAttr.split("|");
    pairs.forEach(pair => {
      const [attr, key] = pair.split(":").map(s => s.trim());
      const value = get(dict, key);
      if (attr && value != null) el.setAttribute(attr, value);
    });
  });

  // Estado botones idioma
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });

  localStorage.setItem("lang", lang);
}

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-lang]");
  if (btn) setLang(btn.dataset.lang);
});

const saved = localStorage.getItem("lang");
const browser = (navigator.language || "es").slice(0, 2);
setLang(saved || (supported.includes(browser) ? browser : "es"));
