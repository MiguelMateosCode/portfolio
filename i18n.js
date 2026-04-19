const supported = ["es", "en"];

// Detect if we are inside /html/ subfolder
const isSubpage = window.location.pathname.includes("/html/");
const BASE_PATH = isSubpage ? "../" : "";

function get(obj, path) {
  return path.split(".").reduce((a, k) => (a ? a[k] : undefined), obj);
}

function setTextPreserve(el, value) {
  // Replace only text nodes, keep child elements (icons, etc.)
  let replaced = false;
  const nodes = Array.from(el.childNodes);
  nodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      if (!replaced && n.textContent.trim().length) {
        n.textContent = value;
        replaced = true;
      } else {
        // Clear any extra text nodes
        n.textContent = n.textContent.replace(/\S/g, "");
      }
    }
  });
  if (!replaced) {
    el.textContent = value;
  }
}

async function setLang(lang) {
  if (!supported.includes(lang)) lang = "es";

  const dict = await fetch(`${BASE_PATH}i18n/${lang}.json`)
    .then((r) => r.json());

  document.documentElement.lang = lang;

  // Text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = get(dict, key);
    if (value != null) setTextPreserve(el, value);
  });

  // Attributes: format "alt:key|title:key2|aria-label:key3"
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const pairs = el.dataset.i18nAttr.split("|");
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      const value = get(dict, key);
      if (attr && value != null) el.setAttribute(attr, value);
    });
  });

  // Buttons state
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });

  localStorage.setItem("lang", lang);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-lang]");
  if (btn) setLang(btn.dataset.lang);
});

const saved = localStorage.getItem("lang");
const browser = (navigator.language || "es").slice(0, 2);
setLang(saved || (supported.includes(browser) ? browser : "es"));
