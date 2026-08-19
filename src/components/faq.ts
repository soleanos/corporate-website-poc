type Faq = { question: string; answer: string };
type Site = Record<string, unknown>;

export function renderFaq(_site: Site, items: Faq[]): string {
  return `
  <section class="bg-sand-100 py-20 md:py-28">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p class="eyebrow" data-reveal>Questions fréquentes</p>
          <h2 class="section-title mt-5" data-reveal data-reveal-delay="80ms">Tout ce qu'il faut savoir<br/>avant de nous écrire.</h2>
        </div>
        <div class="space-y-3">
          ${items
            .map(
              (f, i) => `
            <details class="group rounded-2xl border border-navy/10 bg-white p-6 transition-all open:shadow-soft" data-reveal data-reveal-delay="${i * 60}ms">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-navy">
                ${f.question}
                <svg class="h-5 w-5 flex-none text-emerald2-600 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </summary>
              <p class="mt-4 text-sm leading-relaxed text-navy-700">${f.answer}</p>
            </details>`,
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>`;
}
