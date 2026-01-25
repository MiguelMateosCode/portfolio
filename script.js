
document.addEventListener("DOMContentLoaded", () => {
    // Suavizar el desplazamiento para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Configurar todas las imágenes para entrar en pantalla completa
    document.querySelectorAll('.img-fullscreen').forEach(img => {
        img.addEventListener('click', function() {
            if (this.requestFullscreen) {
                this.requestFullscreen();
            } else if (this.mozRequestFullScreen) { // Firefox
                this.mozRequestFullScreen();
            } else if (this.webkitRequestFullscreen) { // Chrome, Safari & Opera
                this.webkitRequestFullscreen();
            } else if (this.msRequestFullscreen) { // IE/Edge
                this.msRequestFullscreen();
            }
        });
    });

    // Escuchar cambios en el estado de pantalla completa para mostrar/ocultar el botón de cerrar
    document.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) {
            document.getElementById('closeFullscreen').style.display = 'block';
        } else {
            document.getElementById('closeFullscreen').style.display = 'none';
        }
    });

    // Función para salir de pantalla completa
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }

});

/* --- Safe improvements (accessibility & robustness) --- */
(function () {
  // Smooth scroll should be handled by CSS (scroll-behavior). Keep JS only for valid targets.
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return; // allow normal behavior if it doesn't exist
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, true);

  // Guard fullscreen close button listeners (if element doesn't exist, do nothing)
  const closeBtn = document.querySelector('#closeFullscreen');
  if (!closeBtn) return;
})();
