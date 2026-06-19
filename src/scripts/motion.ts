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
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');

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

        const original = el.textContent ?? '';
        const prefix = original.match(/^\+?/)?.[0] ?? '';
        const duration = 1500;
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${prefix}${Math.round(target * eased)}`;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = original;
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

  const wrap = document.querySelector('[data-parallax]') as HTMLElement;
  if (!wrap) return;

  const img = wrap.querySelector('.hero__image') as HTMLElement;
  if (!img) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `scale(1.02) translate(${x * 8}px, ${y * 8}px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
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
  initFaqAccordion();
}

initMotion();
