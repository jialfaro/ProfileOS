(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA || { cases: [], experience: [], credentials: [] };
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function diagram(index, id) {
    const titleId = `visual-${id}`;
    const shared = `<style>.v-line{fill:none;stroke:#8e7766;stroke-width:1.5}.v-faint{fill:none;stroke:#4b3b32;stroke-width:1}.v-box{fill:#211b18;stroke:#655044;stroke-width:1}.v-label{fill:#eee3d8;font:500 14px Inter,Arial,sans-serif}.v-small{fill:#bca899;font:12px Inter,Arial,sans-serif;letter-spacing:1px}.v-accent{fill:#ff925b}.v-accent-text{fill:#18100b;font:600 15px Inter,Arial,sans-serif}.v-dot{fill:#ffc198}</style>`;
    const variants = [
      {
        title: 'Esquema conceptual de gobierno de APIs: canales, API Management y servicios.',
        markup: `<rect width="640" height="400" fill="#241a14"/><path d="M0 335 640 65M0 400 640 130M0 270 640 0" stroke="#3e2b20" stroke-width="1"/><g class="v-faint"><path d="M130 110v50h380v-50M320 160v40M320 255v45M140 300h360M140 300v30M320 300v30M500 300v30"/></g><g text-anchor="middle"><rect class="v-box" x="65" y="70" width="130" height="44" rx="22"/><rect class="v-box" x="255" y="70" width="130" height="44" rx="22"/><rect class="v-box" x="445" y="70" width="130" height="44" rx="22"/><text class="v-label" x="130" y="98">Canales</text><text class="v-label" x="320" y="98">Aplicaciones</text><text class="v-label" x="510" y="98">Partners</text><rect class="v-accent" x="135" y="200" width="370" height="56" rx="4"/><text class="v-accent-text" x="320" y="234">API Management</text><rect class="v-box" x="80" y="328" width="120" height="40" rx="4"/><rect class="v-box" x="260" y="328" width="120" height="40" rx="4"/><rect class="v-box" x="440" y="328" width="120" height="40" rx="4"/><text class="v-label" x="140" y="354">Servicios</text><text class="v-label" x="320" y="354">Eventos</text><text class="v-label" x="500" y="354">Core</text></g><text class="v-small" x="34" y="35">GOBIERNO · SEGURIDAD · CICLO DE VIDA</text><circle class="v-dot" cx="320" cy="180" r="4"/><circle class="v-dot" cx="410" cy="300" r="4"/>`
      },
      {
        title: 'Esquema conceptual de eventos: pagos, cuentas y onboarding conectados con un bus de eventos y Mambu.',
        markup: `<rect width="640" height="400" fill="#1d201e"/><g stroke="#344139" fill="none"><circle cx="320" cy="205" r="205"/><circle cx="320" cy="205" r="150"/><circle cx="320" cy="205" r="95"/></g><path class="v-line" d="M80 211h480M140 211v-76M320 211v-76M500 211v-76M320 211v91"/><path d="M80 211h480" stroke="#e9ab77" stroke-width="3"/><g text-anchor="middle"><rect x="82" y="86" width="116" height="50" rx="4" fill="#2a322c" stroke="#6a7d6d"/><rect x="262" y="86" width="116" height="50" rx="4" fill="#2a322c" stroke="#6a7d6d"/><rect x="442" y="86" width="116" height="50" rx="4" fill="#2a322c" stroke="#6a7d6d"/><text class="v-label" x="140" y="117">Pagos</text><text class="v-label" x="320" y="117">Cuentas</text><text class="v-label" x="500" y="117">Onboarding</text><text class="v-small" x="320" y="247">BUS DE EVENTOS</text><rect x="232" y="302" width="176" height="54" rx="4" fill="#e9ab77"/><text class="v-accent-text" x="320" y="335">Core Mambu</text></g><g fill="#e9ab77" stroke="#1d201e" stroke-width="5"><circle cx="140" cy="211" r="8"/><circle cx="230" cy="211" r="6"/><circle cx="320" cy="211" r="8"/><circle cx="410" cy="211" r="6"/><circle cx="500" cy="211" r="8"/></g><text class="v-small" x="34" y="35">DOMINIOS CONECTADOS POR EVENTOS</text>`
      },
      {
        title: 'Esquema conceptual de arquitectura por dominios: canales, BFF, servicios y contratos de integración.',
        markup: `<rect width="640" height="400" fill="#241c20"/><g class="v-faint"><path d="M0 100h640M0 200h640M0 300h640M120 0v400M220 0v400M320 0v400M420 0v400M520 0v400"/></g><g fill="none" stroke="#b7869a" stroke-width="1.5"><path d="M320 94v60M320 207v64M270 188 160 271M370 188l110 83"/><path d="M160 313v25h320v-25" stroke-dasharray="4 5"/></g><g text-anchor="middle"><rect x="235" y="52" width="170" height="42" rx="21" fill="#382730" stroke="#876374"/><text class="v-label" x="320" y="79">Canales digitales</text><rect x="246" y="153" width="148" height="54" rx="4" fill="#ddadbf"/><text class="v-accent-text" x="320" y="186">BFF</text><rect x="82" y="270" width="156" height="44" rx="4" fill="#382730" stroke="#876374"/><rect x="262" y="270" width="116" height="44" rx="4" fill="#382730" stroke="#876374"/><rect x="402" y="270" width="156" height="44" rx="4" fill="#382730" stroke="#876374"/><text class="v-label" x="160" y="298">Dominio A</text><text class="v-label" x="320" y="298">Dominio B</text><text class="v-label" x="480" y="298">Dominio C</text><text class="v-small" x="320" y="371">CONTRATOS · ESTÁNDARES · OBSERVABILIDAD</text></g><g fill="#f0cbdb"><circle cx="320" cy="123" r="4"/><circle cx="214" cy="232" r="4"/><circle cx="426" cy="232" r="4"/></g><text class="v-small" x="34" y="30">UNA ARQUITECTURA COMPARTIDA</text>`
      },
      {
        title: 'Esquema conceptual de cloud híbrida: plataformas educativas conectadas con AWS y Azure mediante APIs y eventos.',
        markup: `<rect width="640" height="400" fill="#182127"/><g fill="none" stroke="#33464f" stroke-width="1"><ellipse cx="320" cy="210" rx="270" ry="110"/><ellipse cx="320" cy="210" rx="210" ry="160"/><path d="M320 45v310M70 210h500"/></g><g fill="none" stroke="#83b5c8" stroke-width="1.5"><path d="M170 168v73h300v-73M320 242v70"/><path d="M230 125h180" stroke-dasharray="5 5"/></g><g text-anchor="middle"><path d="M107 165c-22 0-34-13-34-32 0-19 15-32 34-32 8-25 28-39 51-34 19 3 33 16 37 34 22-4 42 10 42 31 0 20-15 33-36 33z" fill="#283e48" stroke="#6f9eaf"/><path d="M437 165c-22 0-34-13-34-32 0-19 15-32 34-32 8-25 28-39 51-34 19 3 33 16 37 34 22-4 42 10 42 31 0 20-15 33-36 33z" fill="#283e48" stroke="#6f9eaf"/><text x="155" y="137" fill="#e1edf1" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="600">AWS</text><text x="485" y="137" fill="#e1edf1" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="600">Azure</text><rect x="224" y="215" width="192" height="52" rx="4" fill="#aad1dd"/><text class="v-accent-text" x="320" y="247">APIs &amp; eventos</text><rect x="211" y="312" width="218" height="44" rx="22" fill="#283e48" stroke="#6f9eaf"/><text class="v-label" x="320" y="340">Plataformas educativas</text></g><g fill="#ceeaf2"><circle cx="170" cy="208" r="4"/><circle cx="470" cy="208" r="4"/><circle cx="320" cy="289" r="4"/></g><text class="v-small" x="34" y="35">CLOUD HÍBRIDA · INTEGRACIÓN</text>`
      }
    ];
    const variant = variants[index % variants.length];
    return `<svg viewBox="0 0 640 400" role="img" aria-labelledby="${titleId}" xmlns="http://www.w3.org/2000/svg"><title id="${titleId}">${variant.title}</title>${shared}${variant.markup}</svg>`;
  }

  const casesContainer = $('#cases');
  if (casesContainer) {
    casesContainer.innerHTML = data.cases.map((item, index) => `
      <article class="case-card reveal" data-category="${escapeHTML(item.category)}">
        <div class="case-visual">${diagram(index, item.id)}</div>
        <div class="case-info">
          <div class="case-meta"><span>${escapeHTML(item.company)}</span><span>${escapeHTML(item.period)}</span></div>
          <h3 class="case-title">${escapeHTML(item.title)}</h3>
          <p class="case-summary">${escapeHTML(item.summary)}</p>
          <button type="button" class="case-open case-link" data-case="${escapeHTML(item.id)}" aria-label="Ver experiencia: ${escapeHTML(item.title)}">Ver experiencia <span aria-hidden="true">↗</span></button>
        </div>
      </article>`).join('');
  }

  const timeline = $('#timeline');
  if (timeline) {
    timeline.innerHTML = data.experience.map((item) => `
      <details class="timeline-row reveal">
        <summary class="timeline-summary"><div class="timeline-company"><h3>${escapeHTML(item.company)}</h3><p>${escapeHTML(item.role)}</p></div><time>${escapeHTML(item.period)}</time><span class="timeline-plus" aria-hidden="true">+</span></summary>
        <p class="timeline-description">${escapeHTML(item.description)}</p>
      </details>`).join('');
  }

  const credentials = $('#credentials');
  if (credentials) {
    credentials.innerHTML = data.credentials.map((item) => `
      <article class="credential"><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.issuer)} · ${escapeHTML(item.year)} · ${escapeHTML(item.type)}</p><p class="credential-description">${escapeHTML(item.description)}</p></article>`).join('');
  }

  const filterStatus = $('#filter-status');
  $$('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      $$('[data-filter]').forEach((other) => {
        const selected = other === button;
        other.classList.toggle('active', selected);
        other.setAttribute('aria-pressed', String(selected));
      });
      let count = 0;
      $$('.case-card').forEach((card) => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) count += 1;
      });
      if (filterStatus) filterStatus.textContent = `${count} ${count === 1 ? 'experiencia disponible' : 'experiencias disponibles'}: ${button.textContent.trim()}.`;
    });
  });

  const dialog = $('#case-dialog');
  const dialogContent = $('#dialog-content');
  const menuToggle = $('.menu-toggle');
  let menuOpen = false;
  let dialogTrigger = null;
  let scrollStyles = null;

  function syncScrollLock() {
    const locked = menuOpen || Boolean(dialog?.open);
    if (locked && scrollStyles === null) {
      scrollStyles = { body: document.body.style.overflow, root: document.documentElement.style.overflow };
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else if (!locked && scrollStyles !== null) {
      document.body.style.overflow = scrollStyles.body;
      document.documentElement.style.overflow = scrollStyles.root;
      scrollStyles = null;
    }
  }

  function setMenu(open, restoreFocus = false) {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (!open && restoreFocus) menuToggle.focus({ preventScroll: true });
    }
    syncScrollLock();
  }

  menuToggle?.addEventListener('click', () => setMenu(!menuOpen));
  $$('#navigation a, .brand').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      event.preventDefault();
      setMenu(false, true);
    }
  });
  const desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', (event) => { if (event.matches) setMenu(false); });

  if (dialog && dialogContent) {
    const closeDialog = () => { if (dialog.open) dialog.close(); };
    $$('.case-open').forEach((button) => {
      button.addEventListener('click', () => {
        const item = data.cases.find((entry) => entry.id === button.dataset.case);
        if (!item) return;
        dialogTrigger = button;
        dialogContent.innerHTML = `<p class="dialog-company">${escapeHTML(item.company)}</p><h2 id="dialog-title">${escapeHTML(item.title)}</h2><p class="dialog-period">${escapeHTML(item.period)}</p><p class="dialog-summary">${escapeHTML(item.summary)}</p><section class="dialog-section"><h3>Contexto</h3><p>${escapeHTML(item.challenge)}</p></section><section class="dialog-section"><h3>Mi contribución</h3><ul>${item.contribution.map((text) => `<li>${escapeHTML(text)}</li>`).join('')}</ul></section><section class="dialog-section"><h3>Tecnologías y enfoque</h3><div class="dialog-tech">${item.technologies.map((text) => `<span>${escapeHTML(text)}</span>`).join('')}</div></section>`;
        dialog.showModal();
        dialog.scrollTop = 0;
        syncScrollLock();
        $('.close-dialog', dialog)?.focus({ preventScroll: true });
      });
    });
    $('.close-dialog', dialog)?.addEventListener('click', closeDialog);
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
    });
    dialog.addEventListener('close', () => {
      syncScrollLock();
      if (dialogTrigger?.isConnected && !dialogTrigger.closest('[hidden]')) dialogTrigger.focus({ preventScroll: true });
      dialogTrigger = null;
    });
  }

  const copyButton = $('.copy-email');
  const copyStatus = $('.copy-status');
  let copyTimeout;
  async function copyEmail() {
    const email = 'jaimealfarosalazar@gmail.com';
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (_) { /* The selection fallback can still work when clipboard permission is unavailable. */ }
    }
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.readOnly = true;
      textarea.setAttribute('aria-label', 'Correo electrónico para copiar');
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(textarea);
      textarea.select();
      textarea.setSelectionRange(0, email.length);
      try { copied = document.execCommand('copy') === true; } catch (_) { copied = false; }
      textarea.remove();
      copyButton?.focus({ preventScroll: true });
    }
    if (copyStatus) copyStatus.textContent = copied ? 'Correo copiado.' : `No se pudo copiar. Selecciona el correo: ${email}`;
    if (copyButton) copyButton.textContent = copied ? 'Copiado ✓' : 'Reintentar copia';
    window.clearTimeout(copyTimeout);
    if (copied) {
      copyTimeout = window.setTimeout(() => {
        if (copyButton) copyButton.textContent = 'Copiar correo';
        if (copyStatus) copyStatus.textContent = '';
      }, 3500);
    }
  }
  copyButton?.addEventListener('click', copyEmail);

  const systemReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionToggles = $$('.motion-toggle');
  let locallyPaused = false;
  try { locallyPaused = window.localStorage.getItem('alexis-motion-paused') === 'true'; } catch (_) { /* Preferences remain available for this visit. */ }
  const activeAnimations = new Set();
  const motionAllowed = () => !systemReducedMotion.matches && !locallyPaused;
  const hero = $('.hero');
  const heroArt = $('.hero-art');
  let heroHeight = hero?.offsetHeight || 1;
  let framePending = false;

  function updateHero() {
    framePending = false;
    if (!heroArt) return;
    if (!motionAllowed() || !desktop.matches) {
      heroArt.style.removeProperty('transform');
      return;
    }
    const progress = Math.min(1, Math.max(0, window.scrollY / heroHeight));
    heroArt.style.transform = `translate3d(0, ${Math.round(progress * 28)}px, 0) scale(${1 + progress * 0.025})`;
  }
  function scheduleHero() {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateHero);
    }
  }
  function syncMotion() {
    const paused = !motionAllowed();
    document.documentElement.classList.toggle('motion-paused', paused);
    motionToggles.forEach((motionToggle) => {
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.disabled = systemReducedMotion.matches;
      motionToggle.textContent = systemReducedMotion.matches ? 'Movimiento reducido' : locallyPaused ? 'Activar movimiento' : 'Pausar movimiento';
      motionToggle.title = systemReducedMotion.matches ? 'Se respeta la preferencia de movimiento reducido de tu dispositivo.' : '';
    });
    if (paused) {
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations.clear();
    }
    scheduleHero();
  }
  motionToggles.forEach((motionToggle) => motionToggle.addEventListener('click', () => {
    if (systemReducedMotion.matches) return;
    locallyPaused = !locallyPaused;
    try { window.localStorage.setItem('alexis-motion-paused', String(locallyPaused)); } catch (_) { /* Keep the setting in memory. */ }
    syncMotion();
  }));
  systemReducedMotion.addEventListener('change', syncMotion);
  window.addEventListener('scroll', () => { if (motionAllowed() && window.scrollY <= heroHeight * 1.2) scheduleHero(); }, { passive: true });
  window.addEventListener('resize', () => {
    heroHeight = hero?.offsetHeight || 1;
    scheduleHero();
  }, { passive: true });
  syncMotion();

  const revealElements = $$('.reveal, .enter');
  const easeOut = getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim() || 'cubic-bezier(0.23, 1, 0.32, 1)';
  function reveal(element, delay = 0) {
    if (element.classList.contains('is-visible')) return;
    element.classList.add('is-visible');
    if (!motionAllowed() || typeof element.animate !== 'function' || document.visibilityState === 'hidden') return;
    const animation = element.animate([
      { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ], { duration: 500, delay, easing: easeOut, fill: 'backwards' });
    activeAnimations.add(animation);
    animation.addEventListener('finish', () => activeAnimations.delete(animation), { once: true });
    animation.addEventListener('cancel', () => activeAnimations.delete(animation), { once: true });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target, Math.min(stagger, 3) * 50);
        stagger += 1;
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }
})();
