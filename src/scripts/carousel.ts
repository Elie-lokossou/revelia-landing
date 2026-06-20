function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initCarousel(): void {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]') as HTMLElement;
  const slides = carousel.querySelectorAll('[data-carousel-slide]');
  const dotsContainer = carousel.querySelector('[data-carousel-dots]') as HTMLElement;
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `testimonials-dots__dot${i === 0 ? ' testimonials-dots__dot--active' : ''}`;
    dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = dotsContainer?.querySelectorAll('.testimonials-dots__dot');

  function goTo(index: number): void {
    current = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== current));
      slide.classList.toggle('is-active', i === current);
    });

    dots?.forEach((dot, i) => {
      dot.classList.toggle('testimonials-dots__dot--active', i === current);
    });
  }

  goTo(0);

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    resetAutoplay();
  });

  function startAutoplay(): void {
    if (prefersReducedMotion()) return;
    autoplayTimer = setInterval(() => goTo(current + 1), 6000);
  }

  function resetAutoplay(): void {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  }

  carousel.addEventListener('mouseenter', () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  });

  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

initCarousel();
