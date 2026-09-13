type Site = {
  brand: { name: string; tagline: string; baseline: string };
  contact: { email: string };
  footer: { legalLinks: { label: string; href: string }[]; copyright: string };
};

export function renderFooter(site: Site): string {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container-page py-14">
      <div class="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <img src="${import.meta.env.BASE_URL}logo.png" alt="" class="h-12 w-12 rounded-md object-contain" />
            <div>
              <div class="font-display text-lg font-semibold text-white">${site.brand.name}</div>
              <div class="text-[10px] uppercase tracking-[0.22em] text-emerald2-200">${site.brand.tagline}</div>
            </div>
          </div>
          <p class="mt-5 max-w-md text-sm leading-relaxed">${site.brand.baseline}</p>
        </div>

        <div class="text-sm">
          <a href="mailto:${site.contact.email}" class="text-white underline-offset-4 hover:underline">${site.contact.email}</a>
          <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            ${site.footer.legalLinks.map((l) => `<a href="${l.href}" class="hover:text-white">${l.label}</a>`).join('')}
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-sand-100/50 md:flex-row md:items-center">
        <p>${site.footer.copyright.replace('{year}', String(year))}</p>
        <p>Conçu avec sobriété — sans tracker, sans cookie tiers.</p>
      </div>
    </div>
  </footer>`;
}
