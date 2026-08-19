type Site = {
  contactSection: { title: string; lede: string };
  contact: { email: string; phone?: string; address?: string };
};

export function renderContact(site: Site): string {
  return `
  <section id="contact" class="bg-navy text-sand-50 py-20 md:py-32">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p class="eyebrow text-emerald2-200" data-reveal>Contact</p>
          <h2 class="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tightish text-white md:text-5xl" data-reveal data-reveal-delay="80ms">${site.contactSection.title}</h2>
          <p class="mt-5 max-w-prose2 text-base leading-relaxed text-sand-100/85 md:text-lg" data-reveal data-reveal-delay="160ms">${site.contactSection.lede}</p>

          <dl class="mt-10 space-y-5 text-sm">
            <div>
              <dt class="text-xs uppercase tracking-wider text-emerald2-200">Email</dt>
              <dd class="mt-1"><a href="mailto:${site.contact.email}" class="text-white underline-offset-4 hover:underline">${site.contact.email}</a></dd>
            </div>
            ${
              site.contact.phone
                ? `<div>
                    <dt class="text-xs uppercase tracking-wider text-emerald2-200">Téléphone</dt>
                    <dd class="mt-1 text-white">${site.contact.phone}</dd>
                  </div>`
                : ''
            }
            ${
              site.contact.address
                ? `<div>
                    <dt class="text-xs uppercase tracking-wider text-emerald2-200">Adresse</dt>
                    <dd class="mt-1 text-white">${site.contact.address}</dd>
                  </div>`
                : ''
            }
          </dl>
        </div>

        <form id="contact-form" class="rounded-2xl border border-white/10 bg-white p-6 text-navy md:p-8" data-reveal data-reveal-delay="120ms" novalidate>
          <input type="hidden" name="botcheck" />
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="name" class="label">Nom</label>
              <input id="name" name="name" type="text" required autocomplete="name" class="field" />
            </div>
            <div>
              <label for="company" class="label">Entreprise</label>
              <input id="company" name="company" type="text" autocomplete="organization" class="field" />
            </div>
          </div>
          <div class="mt-4">
            <label for="email" class="label">Email</label>
            <input id="email" name="email" type="email" required autocomplete="email" class="field" />
          </div>
          <div class="mt-4">
            <label for="message" class="label">Votre projet en quelques lignes</label>
            <textarea id="message" name="message" rows="5" required class="field resize-y"></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-6 w-full sm:w-auto">
            Envoyer le message
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
          <p id="contact-status" class="mt-4 text-sm text-navy/70" role="status" aria-live="polite"></p>
          <p class="mt-3 text-xs text-navy/50">En envoyant ce message, vous acceptez que vos coordonnées soient utilisées pour vous recontacter. Aucune donnée n'est revendue.</p>
        </form>
      </div>
    </div>
  </section>`;
}
