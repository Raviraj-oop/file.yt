import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { deliveries } from '../../Mockdata/Brochure';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/** The products already delivered, with their features. */
const DeliverySection = ({ hiddenLinks = [] }: { hiddenLinks?: readonly string[] }) => (
  <section id="our-delivery" className="border-t border-ink-200 bg-ink-50">
    <div className="page py-8 sm:py-10">
      <SectionHeader title="Our Delivery" />
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {deliveries.map(({ name, industry, icon: Icon, description, features, solution, link, to }, i) => (
          <Reveal key={name} delay={i * 0.08} className="h-full">
            <article className="card card-hover card-glow flex h-full flex-col p-4">
              <div className="flex items-center gap-4">
                <span className="icon-tile h-11 w-11"><Icon size={22} strokeWidth={1.7} /></span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tight">{name}</h3>
                  <p className="text-[15px] font-medium text-brand-700">{industry}</p>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-ink-600">{description}</p>
              <ul className="mb-4 mt-4 space-y-2 border-t border-ink-200 pt-4">
                {features.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] font-medium text-ink-800">
                    <Check size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto rounded-2xl bg-brand-50 p-4">
                <h4 className="font-bold">Solutions We Provide</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">{solution}</p>
              </div>
              {to && !hiddenLinks.includes(to) && (
                <Link to={to} className="group mt-4 inline-flex items-center gap-1.5 self-start rounded font-semibold text-brand-700 transition hover:text-brand-900">
                  See {name} details
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              )}
              {link && !hiddenLinks.includes(link) && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-1.5 self-start rounded font-semibold text-brand-700 transition hover:text-brand-900">
                  Visit {name}
                  <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default DeliverySection;
