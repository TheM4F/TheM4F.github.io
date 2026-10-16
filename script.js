(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    menu?.classList.toggle('is-open', open);
  });

  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Menüyü aç');
  }));

  document.querySelectorAll('.accordion details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.accordion details[open]').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    revealItems.forEach((item, index) => item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const gallery = document.querySelector('.gallery-frame');
  if (!gallery) return;

  const layers = [...gallery.querySelectorAll('.gallery-frame__image')];
  const counter = gallery.querySelector('.gallery-frame__counter');
  const badgeCount = gallery.querySelector('.gallery-frame__badge span');
  const progress = gallery.querySelector('.gallery-frame__progress span');
  const previous = gallery.querySelector('.gallery-frame__button--prev');
  const next = gallery.querySelector('.gallery-frame__button--next');
  const fallback = layers.map((image) => image.getAttribute('src').split('/').pop());
  let photos = fallback;
  let index = 0;
  let activeLayer = 0;
  let timer;

  const pathFor = (file) => `site-fotograflari/${file}`;
  const formatIndex = (value) => String(value).padStart(2, '0');

  const restartProgress = () => {
    if (!progress || reducedMotion) return;
    progress.classList.remove('is-running');
    void progress.offsetWidth;
    progress.classList.add('is-running');
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!reducedMotion && photos.length > 1) {
      timer = window.setTimeout(() => show(index + 1), 5000);
      restartProgress();
    }
  };

  const updateMeta = () => {
    if (counter) counter.textContent = `${formatIndex(index + 1)} / ${formatIndex(photos.length)}`;
    if (badgeCount) badgeCount.textContent = String(photos.length);
  };

  const show = (newIndex, instant = false) => {
    index = (newIndex + photos.length) % photos.length;
    const incomingIndex = activeLayer === 0 ? 1 : 0;
    const incoming = layers[incomingIndex];
    const outgoing = layers[activeLayer];

    const activate = () => {
      if (instant) {
        incoming.style.transition = 'none';
        outgoing.style.transition = 'none';
      }
      incoming.classList.add('is-active');
      outgoing.classList.remove('is-active');
      incoming.alt = `Stüdyo Genç Elmadağ fotoğraf portfolyosu, kare ${index + 1}`;
      activeLayer = incomingIndex;
      updateMeta();
      if (instant) requestAnimationFrame(() => {
        incoming.style.removeProperty('transition');
        outgoing.style.removeProperty('transition');
      });
      schedule();
    };

    const newSource = pathFor(photos[index]);
    if (incoming.getAttribute('src') === newSource && incoming.complete) {
      activate();
    } else {
      incoming.onload = activate;
      incoming.onerror = schedule;
      incoming.src = newSource;
    }
  };

  previous?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));
  fetch('site-fotograflari/photos.json')
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('Galeri listesi alınamadı.')))
    .then((files) => {
      if (!Array.isArray(files) || !files.length) return;
      photos = files.filter((file) => typeof file === 'string' && file.toLowerCase().endsWith('.webp'));
      updateMeta();
      schedule();
    })
    .catch(() => schedule());
})();
