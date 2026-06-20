function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initHeaderScroll(): void {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveal(): void {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger, .block-black');

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

function initCountUp(): void {
  const elements = document.querySelectorAll('[data-countup]');
  if (elements.length === 0 || prefersReducedMotion()) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.countup ?? '0', 10);
        if (isNaN(target)) {
          observer.unobserve(el);
          return;
        }

        const suffix = el.dataset.countupSuffix ?? '';
        const prefix = el.dataset.countupPrefix ?? el.textContent?.match(/^\+?/)?.[0] ?? '';
        const duration = 1500;
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = `${prefix}${target}${suffix}`;
        };

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initParallax(): void {
  if (prefersReducedMotion()) return;

  const wrap = document.querySelector('[data-parallax]') as HTMLElement | null;
  if (!wrap) return;

  const img = wrap.querySelector('.hero__image') as HTMLElement | null;
  if (!img) return;

  let mouseX = 0;
  let mouseY = 0;
  let scrollOffset = 0;

  const applyTransform = (): void => {
    img.style.transform = `scale(1.02) translate(${mouseX * 8}px, ${mouseY * 8 + scrollOffset}px)`;
  };

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    applyTransform();
  });

  wrap.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    applyTransform();
  });

  const onScroll = (): void => {
    const rect = wrap.getBoundingClientRect();
    const visible = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
    scrollOffset = (visible - 0.5) * 16;
    applyTransform();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initSectionGradients(): void {
  if (prefersReducedMotion()) return;

  const sections = document.querySelectorAll('[data-section-bg]');
  if (sections.length === 0) return;

  const update = (): void => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight * 0.8)));
      const shift = `${Math.round(progress * 18)}%`;
      section.querySelectorAll('.quiz__bg, .situations__bg, .about__bg, .offers__bg, .contact__bg').forEach((bg) => {
        (bg as HTMLElement).style.setProperty('--bg-shift', shift);
      });
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initFaqAccordion(): void {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!(item as HTMLDetailsElement).open) return;
      items.forEach((other) => {
        if (other !== item) (other as HTMLDetailsElement).open = false;
      });
    });
  });
}

function initMotion(): void {
  initHeaderScroll();
  initScrollReveal();
  initCountUp();
  initParallax();
  initSectionGradients();
  initFaqAccordion();
}

initMotion();
