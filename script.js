document.addEventListener("DOMContentLoaded", () => {

  // --- Smooth scroll para enlaces internos ---
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // --- Fullscreen para imágenes ---
  const requestFS = (el) => {
    const fn =
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen;
    if (fn) fn.call(el);
  };

  const exitFS = () => {
    const fn =
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;
    if (fn) fn.call(document);
  };

  document.querySelectorAll(".img-fullscreen").forEach((img) => {
    img.addEventListener("click", () => requestFS(img));
  });

  const closeBtn = document.getElementById("closeFullscreen");

  document.addEventListener("fullscreenchange", () => {
    if (closeBtn) closeBtn.style.display = document.fullscreenElement ? "block" : "none";
  });

  if (closeBtn) closeBtn.addEventListener("click", exitFS);

});
