type NavItem = { label: string; href: string };
type Site = { brand: { name: string; tagline: string }; nav: NavItem[]; hero: { primaryCta: { label: string; href: string } } };

export function renderHeader(site: Site): string {
  return `
  <header class="site-header" data-site-header>
    <div class="container-page flex h-16 items-center justify-between md:h-20">
      <a href="#" class="flex items-center gap-3" aria-label="${site.brand.name} — accueil">
        <img src="/logo.png" alt="" class="h-12 w-12 rounded-md object-contain md:h-14 md:w-14" />
        <span class="leading-tight">
          <span class="block font-display text-lg font-semibold text-navy md:text-xl">${site.brand.name}</span>
          <span class="block text-[10px] uppercase tracking-[0.22em] text-emerald2-600 md:text-[11px]">${site.brand.tagline}</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
        ${site.nav
          .map(
            (n) => `<a href="${n.href}" class="rounded-full px-4 py-2 text-sm font-medium text-navy/80 transition hover:bg-navy/5 hover:text-navy">${n.label}</a>`,
          )
          .join('')}
        <a href="${site.hero.primaryCta.href}" class="btn btn-primary ml-2 text-sm">${site.hero.primaryCta.label}</a>
      </nav>

      <button
        data-burger
        aria-expanded="false"
        aria-controls="mobile-menu"
        aria-label="Ouvrir le menu"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
    </div>

    <div id="mobile-menu" data-mobile-menu class="hidden border-t border-navy/10 bg-white md:hidden">
      <div class="container-page flex flex-col gap-1 py-4">
        ${site.nav
          .map(
            (n) => `<a href="${n.href}" class="rounded-lg px-3 py-3 text-sm font-medium text-navy/85 hover:bg-navy/5">${n.label}</a>`,
          )
          .join('')}
        <a href="${site.hero.primaryCta.href}" class="btn btn-primary mt-2">${site.hero.primaryCta.label}</a>
      </div>
    </div>
  </header>`;
}
