import { animate, inView, stagger } from 'motion';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const REVEAL_SELECTORS = [
  '.section-header',
  '.feature-card-modern',
  '.team-card-modern',
  '.info-card',
  '.about-grid-modern > *',
  '.who-we-are-grid > *',
  '.team-header',
  '.gallery-section .gallery-item',
  '.big-numbers .cell',
  '.trust-strip-row > *',
  '.final-cta-inner > *',
  '[data-motion="reveal"]',
].join(', ');

function init() {
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS).forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.willChange = 'opacity, transform';
  });

  const heroTargets = [
    '.hero-eyebrow',
    '.hero-title',
    '.hero-subtitle',
    '.hero-desc',
    '.hero-cta-group',
    '.micro-trust',
  ]
    .map((s) => document.querySelector<HTMLElement>(s))
    .filter((el): el is HTMLElement => Boolean(el));

  heroTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
  });

  if (reduceMotion) {
    [...heroTargets, ...document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS)].forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  if (heroTargets.length > 0) {
    animate(
      heroTargets,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 0.7, delay: stagger(0.12), easing: [0.22, 1, 0.36, 1] },
    );
  }

  inView(REVEAL_SELECTORS, (info) => {
    animate(
      info.target,
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.6, easing: [0.22, 1, 0.36, 1] },
    );
    return () => {};
  }, { amount: 0.15 });

  document.querySelectorAll<HTMLElement>('.feature-card-modern, .team-card-modern').forEach((card) => {
    card.addEventListener('pointerenter', () => {
      animate(card, { transform: 'translateY(-6px)' }, { duration: 0.25, easing: 'ease-out' });
    });
    card.addEventListener('pointerleave', () => {
      animate(card, { transform: 'translateY(0px)' }, { duration: 0.25, easing: 'ease-out' });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
