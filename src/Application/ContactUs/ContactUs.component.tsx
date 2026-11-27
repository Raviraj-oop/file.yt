import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import illustration from '../../assets/optimized/contact.webp';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const address = 'Nisarg Plaza, Bhumkar Chowk, to, Hinjawadi Rd, Bhumkar Nagar, Wakad, Pune, Maharashtra 411057';
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Nisarg Plaza, Bhumkar Chowk, Wakad, Pune 411057')}`;

const channels = [
  { icon: Phone, label: 'Phone', lines: [{ text: '+91-9960923965', href: 'tel:+919960923965' }] },
  {
    icon: Mail,
    label: 'Email',
    lines: [
      { text: 'admin@vipracube.com', href: 'mailto:admin@vipracube.com' },
      { text: 'vipracube.129476@gmail.com', href: 'mailto:vipracube.129476@gmail.com' },
    ],
  },
  { icon: MapPin, label: 'Address', lines: [{ text: address, href: mapLink }] },
];

const ContactPage = (): React.ReactElement => {
  useDocumentTitle('Contact us');
  return (
    <>
      <PageHero
        title="Contact VIPRACUBE TECH"
        intro="Vipracube Tech Solutions is a forward-thinking technology company specializing in AI-powered software solutions, mobile & web app development, and custom platform development. We help startups, enterprises, and domain experts turn innovative ideas into robust digital products."
      >
        <Button href="mailto:admin@vipracube.com" size="lg">
          <Mail size={18} /> Email us
        </Button>
        <Button href="tel:+919960923965" size="lg" variant="secondary">
          <Phone size={18} /> Call us
        </Button>
      </PageHero>
      <section className="page grid grid-cols-1 items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact Information</h2>
          <ul className="mt-6 space-y-3">
            {channels.map(({ icon: Icon, label, lines }) => (
              <li key={label} className="card card-hover card-glow flex gap-4 p-4">
                <span className="icon-tile h-10 w-10">
                  <Icon size={21} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold !text-ink-500">{label}</h3>
                  {lines.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group mt-1 block [overflow-wrap:anywhere] text-[17px] font-medium text-ink-900 transition hover:text-brand-700"
                    >
                      {l.text}
                      {l.href.startsWith('http') && <ArrowUpRight size={16} className="ml-1 inline text-ink-400 group-hover:text-brand-600" />}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <img src={illustration} alt="" className="inner-hero mx-auto h-auto w-full max-w-xs rounded-3xl border border-ink-200 p-4 shadow-lift sm:p-4" />
        </Reveal>
      </section>
    </>
  );
};

export default ContactPage;
