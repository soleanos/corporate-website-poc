type SiteConfig = { contact: { email: string }; contactSection: { successMessage: string; errorMessage: string } };

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function initContactForm(site: SiteConfig): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;
  const status = document.querySelector<HTMLParagraphElement>('#contact-status')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  const rawKey = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? '';
  // Considere la cle absente si vide, non definie, ou encore le placeholder par defaut.
  const accessKey = rawKey && rawKey !== 'YOUR_PUBLIC_ACCESS_KEY_HERE' ? rawKey : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'mt-4 text-sm text-navy/70';

    const data = new FormData(form);
    data.append('subject', `[FL2S] Nouveau message — ${data.get('name') ?? 'sans nom'}`);
    data.append('from_name', 'Formulaire FL2S');
    data.append('to', site.contact.email);

    // Fallback mailto si Web3Forms n'est pas configure
    if (!accessKey) {
      const body = encodeURIComponent(
        `Nom: ${data.get('name')}\nEntreprise: ${data.get('company')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
      );
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('Contact via fl2s-conseil.fr')}&body=${body}`;
      return;
    }

    data.append('access_key', accessKey);
    submit.disabled = true;
    submit.classList.add('opacity-60');
    const original = submit.textContent;
    submit.textContent = 'Envoi…';

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = (await res.json()) as { success: boolean };
      if (json.success) {
        form.reset();
        status.textContent = site.contactSection.successMessage;
        status.className = 'mt-4 text-sm font-medium text-emerald2-600';
      } else throw new Error('failed');
    } catch {
      status.textContent = site.contactSection.errorMessage;
      status.className = 'mt-4 text-sm font-medium text-red-600';
    } finally {
      submit.disabled = false;
      submit.classList.remove('opacity-60');
      submit.textContent = original;
    }
  });
}
