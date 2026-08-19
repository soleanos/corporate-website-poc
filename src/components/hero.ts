type Site = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  brand: { baseline: string };
};

export function renderHero(site: Site): string {
  const titleHtml = site.hero.title
    .split('\n')
    .map((line, i) =>
      i === 0
        ? `<span class="block">${line}</span>`
        : `<span class="block text-emerald2-600">${line}</span>`,
    )
    .join('');

  return `
  <section class="hero-section relative flex flex-col justify-center overflow-hidden">
    <div class="absolute inset-0 -z-10 hero-grid"></div>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-sand-50 md:h-40"></div>
    <div class="container-page relative">
      <div class="max-w-3xl">
        <p class="eyebrow" data-reveal>${site.hero.eyebrow}</p>
        <h1 class="hero-title mt-5 font-display font-semibold tracking-tightish text-navy md:mt-6" data-reveal data-reveal-delay="80ms">
          ${titleHtml}
        </h1>
        <p class="hero-subtitle mt-5 max-w-prose2 text-navy-700 md:mt-7" data-reveal data-reveal-delay="160ms">
          ${site.hero.subtitle}
        </p>
        <div class="mt-7 flex flex-wrap items-center gap-3 md:mt-9" data-reveal data-reveal-delay="240ms">
          <a href="${site.hero.primaryCta.href}" class="btn btn-primary">
            ${site.hero.primaryCta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="${site.hero.secondaryCta.href}" class="btn btn-secondary">${site.hero.secondaryCta.label}</a>
        </div>
      </div>
    </div>

    <a href="#approche" class="hero-scroll-cue" aria-label="Découvrir notre approche">
      <span>Découvrir</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </a>
  </section>`;
}
