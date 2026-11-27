import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Instagram, Linkedin, MapPin, Phone } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

const socials = [
  { href: 'https://www.instagram.com/vipracube', label: 'Instagram', icon: Instagram },
  { href: 'https://www.linkedin.com/company/vipracube-tech-solutions/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.vipracubeai.com', label: 'Website', icon: Globe },
];

const services = ['Cloud Solutions', 'Digital Transformation', 'Data & Analytics', 'Cybersecurity', 'AI & Machine Learning', 'Mobile Development'];
const industries = ['Banking & Finance', 'Healthcare', 'Manufacturing', 'Retail & E-commerce', 'Education', 'Government'];

const linkCls = 'transition hover:text-white';
const strongLink = 'font-medium text-white transition hover:text-brand-300';

const Column = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold !text-white">{title}</h3>
    <ul className="mt-4 space-y-2.5 text-[15px] text-white/60">{children}</ul>
  </div>
);

const Footer = () => (
  <div className="home-hero text-white">
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute -top-40 left-1/2 h-80 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-brand-600/40 blur-[110px]" aria-hidden="true" />
      <Reveal className="page relative flex flex-col items-start justify-between gap-4 py-7 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight !text-white sm:text-3xl">Discuss your project with us</h2>
          <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
            Talk to our team about AI strategy, product development, or integrating AI into your existing workflows.
          </p>
        </div>
        <Button to="/ContactUs" variant="light" size="lg">
          Contact Us <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </Reveal>
    </section>

    <footer className="page py-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_.8fr]">
        <div>
          <BrandLogo light />
          <p className="mt-4 font-semibold text-white">Connect. Collaborate. <span className="text-orange-400">Grow Together.</span></p>
          <address className="mt-6 space-y-3 text-[15px] not-italic leading-relaxed text-white/60">
            <p className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0" />
              <span>Nisarg Plaza, Bhumkar Chowk, to, Hinjawadi Rd, Bhumkar Nagar, Wakad, Pune, Maharashtra 411057</span>
            </p>
            <a href="tel:+919960923965" className={`flex gap-3 ${linkCls}`}>
              <Phone size={18} className="mt-0.5 shrink-0" />
              +91 9960923965
            </a>
          </address>
          <p className="mt-7 text-sm font-semibold">Connect with us</p>
          <div className="mt-3 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <Column title="Services">
          {services.map((s) => (
            <li key={s}>
              <Link to="/Services" className={linkCls}>{s}</Link>
            </li>
          ))}
          <li>
            <Link to="/Services" className={strongLink}>View All Services</Link>
          </li>
        </Column>
        <Column title="Industries">
          {industries.map((s) => (
            <li key={s}>
              <Link to="/#industries" className={linkCls}>{s}</Link>
            </li>
          ))}
          <li>
            <Link to="/#industries" className={strongLink}>View All Industries</Link>
          </li>
        </Column>
        <Column title="Company">
          <li><Link to="/AboutUs" className={linkCls}>About Us</Link></li>
          <li><Link to="/ContactUs" className={linkCls}>Contact Us</Link></li>
          <li><Link to="/Services" className={linkCls}>Services</Link></li>
          <li><Link to="/Gallery" className={linkCls}>Gallery</Link></li>
        </Column>
      </div>
      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-4 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 VIPRACUBE TECH Limited. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          <Link to="/PrivacyPolicy" className={linkCls}>Privacy Policy</Link>
          <Link to="/TermsConditions" className={linkCls}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
