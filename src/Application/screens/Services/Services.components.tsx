import React from 'react';
import { Bot, BrainCircuit, Check, CloudCog, Database, FileQuestion, Globe, Search, Smartphone, Workflow } from 'lucide-react';
import servicesData from '../../../Mockdata/Services';
import { aiServices, platformServices, ServiceDetail } from '../../../Mockdata/Brochure';
import Reveal from '../../../components/ui/Reveal';
import splitList from '../../../utils/splitList';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const meta = [
  { id: 'ai-solution', icon: BrainCircuit },
  { id: 'mobile-apps', icon: Smartphone },
  { id: 'web-design', icon: Globe },
  { id: 'cloud-devops', icon: CloudCog },
];

/** The copy is "Intro sentence. item,item,item" with commas inside brackets left alone. */
const splitContent = (content: string) => {
  const text = content.replace(/\s+/g, ' ').trim();
  const at = text.search(/\.\s?(?=[A-Z])/);
  return {
    intro: text.slice(0, at + 1),
    items: splitList(text.slice(at + 1)),
  };
};

const existing: ServiceDetail[] = servicesData.map((item, i) => ({ ...meta[i], title: item.title, ...splitContent(item.content) }));
/* The Generative AI services come first, then apps, websites and cloud, then data and security. */
const allServices = [existing[0], ...aiServices, ...existing.slice(1), ...platformServices];
const generativeFeatureIcons = [BrainCircuit, Search, Workflow, Database, Bot, FileQuestion, Bot];

const Services = (): React.JSX.Element => {
  useDocumentTitle('Services');
  return (
    <div className="page space-y-4 py-6 sm:py-8">
      {/* The page's main heading for search engines and screen readers; the visible hero block was removed on request. */}
      <h1 className="sr-only">Our AI & Technology Services</h1>
      {allServices.map(({ id, icon: Icon, title, intro, items }) => {
        const isGenerativeAI = id === 'ai-solution';
        return (
          <section key={id} id={id} className={`service-panel card-glow grid min-w-0 gap-5 rounded-3xl border border-ink-200 p-4 shadow-soft transition duration-300 hover:shadow-lift sm:p-5 ${isGenerativeAI ? '' : 'lg:grid-cols-[1fr_1.15fr] lg:gap-6'}`}>
            <Reveal>
              <span className="icon-tile h-11 w-11">
                <Icon size={26} strokeWidth={1.7} />
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600 sm:text-lg">{intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              {isGenerativeAI ? (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((feature, index) => {
                    const FeatureIcon = generativeFeatureIcons[index] ?? Icon;
                    return (
                      <li key={feature} className="card flex min-w-0 items-center gap-2.5 p-3 md:flex-col md:items-start md:p-4">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                          <FeatureIcon size={19} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="text-[15px] font-semibold leading-snug text-ink-800">{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="card divide-y divide-ink-200 px-4 sm:px-4">
                  {items.map((t) => (
                    <li key={t} className="flex items-start gap-3 py-2.5 text-base font-medium text-ink-800">
                      <Check size={20} className="mt-0.5 shrink-0 text-brand-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </section>
        );
      })}
    </div>
  );
};

export default Services;
