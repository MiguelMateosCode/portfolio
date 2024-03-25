document.addEventListener("DOMContentLoaded", () => {
    // Suavizar el desplazamiento para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
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
    document.addEventListener('fullscreenchange', () => {
        const closeButton = document.getElementById('closeFullscreen');
        if (document.fullscreenElement) {
            if (closeButton) closeButton.style.display = 'block';
        } else {
            if (closeButton) closeButton.style.display = 'none';
        }
    });

    // Función para salir de pantalla completa
    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    };

    // Asegurarse de que el botón de cerrar existe antes de añadirle el evento
    const closeButton = document.getElementById('closeFullscreen');
    if (closeButton) {
        closeButton.addEventListener('click', closeFullscreen);
    }
});
