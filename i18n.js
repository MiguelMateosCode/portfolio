const supported = ["es", "en"];

// Detect if we are inside /html/ subfolder
const isSubpage = window.location.pathname.includes("/html/");
const BASE_PATH = isSubpage ? "../" : "";

function get(obj, path) {
  return path.split(".").reduce((a, k) => (a ? a[k] : undefined), obj);
}

function setTextPreserve(el, value) {
  let replaced = false;
  const nodes = Array.from(el.childNodes);
  nodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      if (!replaced && n.textContent.trim().length) {
        n.textContent = value;
        replaced = true;
      } else {
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

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = get(dict, key);
    if (value != null) setTextPreserve(el, value);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const pairs = el.dataset.i18nAttr.split("|");
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      const value = get(dict, key);
      if (attr && value != null) el.setAttribute(attr, value);
    });
  });
}

const browser = (navigator.language || "es").slice(0, 2);
setLang(supported.includes(browser) ? browser : "es");
