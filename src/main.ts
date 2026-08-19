import './style.css';
import site from '@content/site.json';
import services from '@content/services.json';
import team from '@content/team.json';
import faq from '@content/faq.json';

import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderApproach } from './components/approach';
import { renderExpertises } from './components/expertises';
import { renderTeam } from './components/team';
import { renderFaq } from './components/faq';
import { renderContact } from './components/contact';
import { renderFooter } from './components/footer';
import { initReveal } from './lib/reveal';
import { initContactForm } from './lib/form';

const app = document.getElementById('app')!;

// Filter out documentation-only entries (objects whose name starts with "_").
// Lets non-tech editors keep helper notes (key "_doc") at the top of JSON arrays.
const teamMembers = (team as Array<Record<string, unknown>>).filter(
  (m) => typeof m.name === 'string' && m.name && !m.name.toString().startsWith('_'),
) as Parameters<typeof renderTeam>[1];

app.innerHTML = `
  ${renderHeader(site)}
  <main id="main">
    ${renderHero(site)}
    ${renderApproach(site)}
    ${renderExpertises(site, services)}
    ${renderTeam(site, teamMembers)}
    ${renderFaq(site, faq)}
    ${renderContact(site)}
  </main>
  ${renderFooter(site)}
`;

initReveal();
initContactForm(site);

// Mobile menu toggle (kept tiny, no framework)
const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
burger?.addEventListener('click', () => {
  const open = menu?.classList.toggle('hidden') === false;
  burger.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll<HTMLAnchorElement>('[data-mobile-menu] a').forEach((a) =>
  a.addEventListener('click', () => menu?.classList.add('hidden')),
);

// Header scroll-state : shadow plus marquee une fois passe le pli de page.
const header = document.querySelector<HTMLElement>('[data-site-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
