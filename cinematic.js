(() => {
  const hero = document.querySelector('.hero');
  const video = hero?.querySelector('.hero-video');
  const choice = hero?.querySelector('.hero-media-choice');
  const status = hero?.querySelector('.hero-video-status');
  if (!video || !choice || !status) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const connection = navigator.connection;
  const preferenceKey = 'alexis-hero-portrait';
  let portrait = false;
  let allowDataUse = false;
  let inView = false;
  let failed = false;
  let autoplayBlocked = false;
  let playPending = false;
  let frame = 0;
  try { portrait = localStorage.getItem(preferenceKey) === 'true'; } catch { /* Use the current visit. */ }

  function movementPaused() {
    return reducedMotion.matches || root.classList.contains('motion-paused');
  }

  function wantsVideo() {
    return !portrait && !failed && !autoplayBlocked && !movementPaused() &&
      (!connection?.saveData || allowDataUse);
  }

  function updateChoice() {
    choice.disabled = failed || movementPaused();
    choice.textContent = choice.disabled ? 'Retrato' : wantsVideo() ? 'Ver retrato' : 'Ver animación';
    // This is an action with a changing label, rather than a toggle with a fixed label.
    choice.removeAttribute('aria-pressed');
  }

  function playLoop() {
    if (playPending || !video.paused) return;
    playPending = true;
    video.play().catch((error) => {
      if (error.name !== 'NotAllowedError' || !wantsVideo()) return;
      autoplayBlocked = true;
      status.textContent = 'Puedes activar la animación con el botón Ver animación.';
      sync();
    }).finally(() => { playPending = false; });
  }

  function syncFrame() {
    frame = 0;
    if (!inView || document.hidden || !wantsVideo()) return;
    if (!video.hasAttribute('src')) {
      video.preload = 'auto';
      video.src = video.dataset.src;
    }
    const bounds = hero.getBoundingClientRect();
    const scrollThroughHero = Math.min(1, Math.max(0, -bounds.top / bounds.height));
    if (!desktopPointer.matches || scrollThroughHero < 0.002) {
      playLoop();
      return;
    }
    video.pause();
    if (!Number.isFinite(video.duration) || video.seeking) return;
    const target = scrollThroughHero * Math.max(0, video.duration - 1 / 30);
    if (Math.abs(video.currentTime - target) >= 1 / 30) video.currentTime = target;
  }

  function requestFrame() {
    if (!frame && inView && !document.hidden && wantsVideo()) {
      frame = requestAnimationFrame(syncFrame);
    }
  }

  function sync() {
    const selected = wantsVideo();
    hero.classList.toggle('show-video', selected && video.readyState >= 2);
    updateChoice();
    if (selected && inView && !document.hidden) {
      requestFrame();
    } else {
      video.pause();
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (video.hasAttribute('src') && (movementPaused() || (connection?.saveData && !allowDataUse))) {
      video.removeAttribute('src');
      video.preload = 'none';
      video.load();
    }
  }

  choice.addEventListener('click', () => {
    if (failed || movementPaused()) return;
    portrait = wantsVideo();
    if (!portrait) {
      autoplayBlocked = false;
      allowDataUse = true;
    }
    try { localStorage.setItem(preferenceKey, String(portrait)); } catch { /* Use the current visit. */ }
    status.textContent = portrait ? 'Se muestra el retrato de Alexis.' : 'Animación seleccionada.';
    sync();
    if (!portrait && inView && !document.hidden) {
      cancelAnimationFrame(frame);
      syncFrame();
    }
  });

  video.addEventListener('loadeddata', sync);
  video.addEventListener('loadedmetadata', requestFrame);
  video.addEventListener('seeked', requestFrame);
  video.addEventListener('error', () => {
    if (!video.hasAttribute('src')) return;
    failed = true;
    status.textContent = 'El video no está disponible. Se muestra el retrato de Alexis.';
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  desktopPointer.addEventListener('change', requestFrame);
  connection?.addEventListener('change', sync);
  const pauseObserver = new MutationObserver(() => {
    const paused = movementPaused();
    if (paused !== previousPause) {
      previousPause = paused;
      sync();
    }
  });
  let previousPause = movementPaused();
  pauseObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  observer.observe(hero);
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame, { passive: true });
  sync();
})();
