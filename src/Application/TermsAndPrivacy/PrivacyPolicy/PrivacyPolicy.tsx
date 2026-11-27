import React from 'react';
import PageHero from '../../../components/ui/PageHero';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { privacySections } from './privacyContent';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy');
  return (
    <>
      <PageHero title="Privacy Policy" />
      <div className="page grid gap-5 py-7 sm:py-9 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-3 text-sm text-ink-500">
            {privacySections.map((s, i) => s.heading && (
              <li key={s.heading}>
                <a href={`#privacy-${i}`} className="transition hover:text-brand-700">{s.heading}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl space-y-8">
          {privacySections.map((s, i) => (
            <section key={i} id={`privacy-${i}`}>
              {s.heading && <h2 className="mb-4 text-2xl font-bold">{s.heading}</h2>}
              <p className="break-words leading-[1.8] text-ink-600">{s.body}</p>
            </section>
          ))}
        </article>
      </div>
    </>
  );
};

export default PrivacyPolicy;
