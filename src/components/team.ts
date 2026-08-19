type Member = { name: string; role: string; bio: string; linkedin?: string; photo?: string };
type Site = { trust: { title: string; lede: string } };

function initials(n: string): string {
  return n
    .split(' ')
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function renderTeam(site: Site, members: Member[]): string {
  return `
  <section id="equipe" class="py-20 md:py-32">
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow" data-reveal>L'équipe</p>
        <h2 class="section-title mt-5" data-reveal data-reveal-delay="80ms">${site.trust.title}</h2>
        <p class="section-lede" data-reveal data-reveal-delay="160ms">${site.trust.lede}</p>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${members
          .map(
            (m, i) => `
          <article class="card" data-reveal data-reveal-delay="${i * 80}ms">
            <div class="flex items-center gap-4">
              ${
                m.photo
                  ? `<img src="${m.photo}" alt="${m.name}" class="h-14 w-14 rounded-full object-cover" />`
                  : `<div class="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">${initials(m.name)}</div>`
              }
              <div>
                <h3 class="font-display text-lg font-semibold text-navy">${m.name}</h3>
                <p class="text-xs uppercase tracking-wider text-emerald2-600">${m.role}</p>
              </div>
            </div>
            <p class="mt-5 text-sm leading-relaxed text-navy-700">${m.bio}</p>
            ${
              m.linkedin
                ? `<a href="${m.linkedin}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald2-600 hover:underline">LinkedIn →</a>`
                : ''
            }
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}
