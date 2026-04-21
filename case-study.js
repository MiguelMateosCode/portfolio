(function () {
  'use strict';

  var sections = document.querySelectorAll('#main-content section[id]');
  var navLinks = document.querySelectorAll('.nav-section[href]');

  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Primera sección activa por defecto al cargar
  setActive(sections[0].id);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
