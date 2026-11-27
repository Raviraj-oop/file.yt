import React from 'react';
import { Code2, Layers, Network, Rocket } from 'lucide-react';
import team from '../../assets/optimized/gallery-6.webp';
import aboutUsData, { whyChoose } from '../../Mockdata/AboutUs';
import Button from '../../components/ui/Button';
import JourneyTimeline from '../../components/sections/JourneyTimeline';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import SectionHeader from '../../components/ui/SectionHeader';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const reasonIcons = [Code2, Layers, Network, Rocket];

const AboutUs = (): React.JSX.Element => {
  useDocumentTitle('About us');
  return (
    <>
      <PageHero
        title="Vipracube Tech Solutions"
        intro="Vipracube Tech Solutions, founded in October 2023, is a Pune-based tech company specializing in AI-powered applications, mobile and web development, and scalable cloud solutions. We empower businesses and startups with smart, efficient, and future-ready digital products."
      >
        <Button to="/ContactUs" size="lg">Contact us</Button>
        <Button to="/Gallery" size="lg" variant="secondary">See the gallery</Button>
      </PageHero>

      <section className="page py-8 sm:py-10">
        <Reveal>
          <img src={team} alt="The Vipracube team on stage at a company event" className="mx-auto h-auto w-full max-w-4xl rounded-3xl shadow-lift" />
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {aboutUsData.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="card card-hover card-glow group h-full p-4">
                <span className="icon-tile h-11 w-11 transition-transform duration-300 group-hover:scale-105"><Icon size={22} strokeWidth={1.7} /></span>
                <h2 className="mt-4 text-xl font-bold sm:text-2xl">{title}</h2>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <JourneyTimeline />

      <section className="inner-hero border-t border-ink-200">
        <div className="page py-8 sm:py-10">
          <SectionHeader title={whyChoose.title} />
          <div className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {whyChoose.reasons.map(({ title, description }, i) => {
              const Icon = reasonIcons[i];
              return (
                <Reveal key={title} delay={(i % 2) * 0.08} className="flex gap-5">
                  <span className="icon-tile h-12 w-12">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-600">{description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
