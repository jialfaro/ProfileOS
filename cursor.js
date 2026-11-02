(() => {
  'use strict';

  if (document.querySelector('.cinematic-cursor')) return;

  const root = document.documentElement;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interactiveSelector = 'a, button, summary, [role="button"], input, textarea, select';
  const imageSelector = '.hero-media, .hero, .case-visual, .architecture-art, .profile-portrait, .company-logo, [data-cursor="image"]';
  const cursor = document.createElement('div');
  cursor.className = 'cinematic-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.append(document.createElement('span'));
  document.body.append(cursor);

  let eligible = false;
  let active = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let frameId = 0;
  let previousTime = 0;
  const radius = 15;

  function paint() {
    cursor.style.transform = `translate3d(${(currentX - radius).toFixed(2)}px, ${(currentY - radius).toFixed(2)}px, 0)`;
  }

  function hide() {
    active = false;
    cursor.classList.remove('is-visible', 'is-expanded');
    if (root.classList.contains('has-custom-cursor')) root.classList.remove('has-custom-cursor');
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    previousTime = 0;
  }

  function syncEligibility() {
    eligible = finePointer.matches && !reducedMotion.matches &&
      !root.classList.contains('motion-paused') &&
      document.visibilityState !== 'hidden' &&
      !document.querySelector('dialog[open]') && !document.fullscreenElement;
    if (!eligible) hide();
  }

  function updateHover(target) {
    const element = target instanceof Element ? target : null;
    cursor.classList.toggle('is-expanded', Boolean(element?.closest(`${interactiveSelector}, ${imageSelector}`)));
  }

  function tick(now) {
    frameId = 0;
    if (!active || !eligible) return;
    const elapsed = previousTime ? Math.min(now - previousTime, 50) : 1000 / 60;
    previousTime = now;
    // The reference's 0.11 follow factor, normalized for display refresh rate.
    const blend = 1 - Math.pow(0.89, elapsed / (1000 / 60));
    currentX += (targetX - currentX) * blend;
    currentY += (targetY - currentY) * blend;
    if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
      currentX = targetX;
      currentY = targetY;
      paint();
      previousTime = 0;
      return;
    }
    paint();
    frameId = window.requestAnimationFrame(tick);
  }

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse' || !eligible) {
      hide();
      return;
    }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!active) {
      currentX = targetX;
      currentY = targetY;
      paint();
      active = true;
      cursor.classList.add('is-visible');
      root.classList.add('has-custom-cursor');
    }
    updateHover(event.target);
    if (!frameId) frameId = window.requestAnimationFrame(tick);
  }

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerover', (event) => {
    if (active) updateHover(event.target);
  }, { passive: true });
  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') hide();
  }, { passive: true });
  document.addEventListener('pointerleave', hide);
  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) hide();
  }, { passive: true });
  document.addEventListener('keydown', hide, true);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') hide();
    syncEligibility();
  });
  document.addEventListener('fullscreenchange', syncEligibility);
  finePointer.addEventListener('change', syncEligibility);
  reducedMotion.addEventListener('change', syncEligibility);

  new MutationObserver(syncEligibility).observe(root, { attributes: true, attributeFilter: ['class'] });
  new MutationObserver(syncEligibility).observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['open']
  });

  syncEligibility();
})();
