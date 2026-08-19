type Site = {
  approach: {
    title: string;
    lede: string;
    pillars: { title: string; body: string }[];
  };
};

export function renderApproach(site: Site): string {
  return `
  <section id="approche" class="py-20 md:py-32">
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow" data-reveal>Notre approche</p>
        <h2 class="section-title mt-5" data-reveal data-reveal-delay="80ms">${site.approach.title}</h2>
        <p class="section-lede" data-reveal data-reveal-delay="160ms">${site.approach.lede}</p>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${site.approach.pillars
          .map(
            (p, i) => `
          <article class="card" data-reveal data-reveal-delay="${i * 80}ms">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald2-50 text-emerald2-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 class="mt-5 font-display text-xl font-semibold text-navy">${p.title}</h3>
            <p class="mt-2 text-sm leading-relaxed text-navy-700">${p.body}</p>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}
