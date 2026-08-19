type Service = { id: string; icon: string; title: string; summary: string; items: string[] };
type Site = { expertises: { title: string; lede: string } };

const ICONS: Record<string, string> = {
  compass:
    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  target:
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
};

function icon(name: string): string {
  const body = ICONS[name] ?? ICONS.compass;
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

export function renderExpertises(site: Site, services: Service[]): string {
  return `
  <section id="expertises" class="bg-navy text-sand-50 py-20 md:py-32">
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow text-emerald2-200" data-reveal>Expertises</p>
        <h2 class="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tightish text-white md:text-5xl" data-reveal data-reveal-delay="80ms">${site.expertises.title}</h2>
        <p class="mt-5 max-w-prose2 text-base leading-relaxed text-sand-100/85 md:text-lg" data-reveal data-reveal-delay="160ms">${site.expertises.lede}</p>
      </div>

      <div class="mt-14 grid gap-5 md:grid-cols-2">
        ${services
          .map(
            (s, i) => `
          <article class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:bg-white/[0.06]" data-reveal data-reveal-delay="${i * 80}ms">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald2/15 text-emerald2-200">
                ${icon(s.icon)}
              </div>
              <h3 class="font-display text-2xl font-semibold text-white">${s.title}</h3>
            </div>
            <p class="mt-5 text-sm leading-relaxed text-sand-100/80">${s.summary}</p>
            <ul class="mt-6 space-y-2 text-sm text-sand-100/90">
              ${s.items
                .map(
                  (it) => `
                <li class="flex gap-3">
                  <svg class="mt-1 h-3 w-3 flex-none text-emerald2-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${it}</span>
                </li>`,
                )
                .join('')}
            </ul>
            <div class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald2/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}
