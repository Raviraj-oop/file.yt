import React, { useState } from 'react';
import {
  BadgeCheck, Bot, BrainCircuit, Briefcase, Check, Clock, FileText, FolderSearch, GraduationCap, Handshake,
  LayoutList, Linkedin, Mail, MapPin, MonitorPlay, Phone, Rocket, Star, Target, Trophy, Users, Workflow, Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import internHero from '../../assets/optimized/intern-hero.webp';
import internApply from '../../assets/optimized/intern-apply.webp';
import courseMap from '../../assets/optimized/course-map.webp';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import Accordion from '../../components/ui/Accordion';
import Button from '../../components/ui/Button';
import CountUp from '../../components/ui/CountUp';
import Reveal from '../../components/ui/Reveal';
import SectionHeader from '../../components/ui/SectionHeader';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import SyllabusModal from './SyllabusModal';
import {
  careerPaths, certifications, faqs, formBenefits, placementFeatures, reviews, syllabus, tracks, whyVipracubeAI,
} from './internshipData';

/** These sections were switched off on the original page. Set one to true to publish it. */
const SHOW = { syllabus: false, testimonials: false, videos: false, faqs: false, syllabusDownload: false };

const heroStats = [
  { label: 'LIVE Training', value: '100%' },
  { label: 'Placement Success', value: '95%' },
  { label: 'Hiring Partners', value: '100%' },
];

const heroInfo = [
  { icon: Clock, title: 'Duration', desc: '12 Weeks (3 Months)' },
  { icon: GraduationCap, title: 'Eligibility', desc: 'Freshers, Graduates, Working Professionals (Any Background)' },
  { icon: MonitorPlay, title: 'Mode', desc: 'Live Online Sessions + 2 Years LMS Access' },
];

const placementIcons = [Users, Linkedin, FileText, Target, LayoutList, Trophy, Star, Handshake];
const careerIcons = [BrainCircuit, Zap, FolderSearch, Bot, Rocket, Workflow];

const videos = [
  { title: 'Why Choose Us', videoId: 'kW_8velUyng', desc: "India's Most Practical IT Training Institute" },
  { title: 'Victory Talks', videoId: 'McTMXGgBHZ8', desc: 'Real Student Victory Stories' },
  { title: 'Before vs After Training', videoId: 'tqFO3tog3-8', desc: 'Real Student Transformations' },
];

const contacts = [
  { icon: Phone, text: '+91 9960923965', href: 'tel:+919960923965' },
  { icon: Mail, text: 'vipracube.129476@gmail.com', href: 'mailto:vipracube.129476@gmail.com' },
  { icon: MapPin, text: 'Nisarg Plaza, Bhumkar Chowk, to, Hinjawadi Rd, Bhumkar Nagar, Wakad, Pune, Maharashtra 411057' },
];

const InternshipProgram: React.FC = () => {
  useDocumentTitle('Internship Program');
  const [syllabusFormOpen, setSyllabusFormOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section id="about-course" className="inner-hero relative isolate overflow-hidden">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="page relative grid grid-cols-1 items-center gap-5 pb-8 pt-7 sm:pt-8 md:grid-cols-[1.25fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-semibold text-brand-700">Become a Certified Professional</p>
            <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Generative AI &amp; Agentic AI Course with Internship in Pune
            </h1>
            <p className="mt-3 font-display text-xl font-semibold text-ink-500">VipraCube Training Program</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              Master Data Science → Deep Learning → Generative AI → RAG → AI Agents → MLOps and build 11 real portfolio
              projects to become job-ready.
            </p>
            <dl className="mt-5 grid max-w-xl grid-cols-3 divide-x divide-ink-200 border-y border-ink-200 py-3">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col px-3 first:pl-0 sm:px-6">
                  <dt className="order-2 mt-1 text-sm text-ink-500">{s.label}</dt>
                  <dd className="order-1 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl"><CountUp value={s.value} /></dd>
                </div>
              ))}
            </dl>
            <ul className="mt-7 space-y-4">
              {heroInfo.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <Icon size={21} className="mt-0.5 shrink-0 text-brand-600" />
                  <p><span className="font-semibold text-ink-900">{title}:</span> {desc}</p>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#cbc" size="lg">Start Your Application</Button>
              {SHOW.syllabusDownload && (
                <Button size="lg" variant="secondary" onClick={() => setSyllabusFormOpen(true)}>Download Syllabus</Button>
              )}
            </div>
          </motion.div>
          <motion.img
            src={internHero}
            alt="A team working around a digital display"
            className="mx-auto aspect-[4/3] w-full max-w-sm rounded-3xl object-cover shadow-lift"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          />
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="page py-7">
          <h2 className="text-center text-2xl font-bold">Why VIPRACUBE TECH?</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyVipracubeAI.map((item) => (
              <li key={item} className="card card-hover card-glow flex items-center gap-3 p-4 font-semibold text-ink-900">
                <BadgeCheck size={22} className="shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page pt-8"><Reveal><HeroCarousel /></Reveal></section>

      {/* Overview */}
      <section className="page grid grid-cols-1 items-center gap-7 py-8 sm:py-10 lg:grid-cols-2">
        <div>
          <SectionHeader title="Program Overview" intro="5 Major Tracks" />
          <ol className="relative mt-5 space-y-8 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-ink-200">
            {tracks.map((track, i) => (
              <li key={track}>
                <Reveal delay={i * 0.06} className="relative flex items-center gap-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-display font-bold text-white ring-8 ring-white">{i + 1}</span>
                  <span className="text-lg font-semibold text-ink-900">{track}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal>
          <img src={courseMap} alt="Course at a glance: a roadmap of modules from Python basics to project submission" loading="lazy" className="w-full rounded-3xl shadow-lift" />
        </Reveal>
      </section>

      {SHOW.syllabus && (
        <section className="page pb-8">
          <SectionHeader title="Generative AI & Agentic AI Specialization" intro="Course Syllabus" />
          <div className="mt-5">
            <Accordion
              items={syllabus.map((s) => ({
                id: s.id,
                title: s.title,
                body: (
                  <>
                    <ul className="space-y-2">
                      {s.items.map((t) => (
                        <li key={t} className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-brand-600" />{t}</li>
                      ))}
                    </ul>
                    {s.capstone && <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-ink-900"><strong>Mini Capstone:</strong> {s.capstone}</p>}
                  </>
                ),
              }))}
            />
          </div>
        </section>
      )}

      {/* Placement */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="page py-8 sm:py-10">
          <SectionHeader center title="Placement Support (2.5 Months)" />
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {placementFeatures.map((f, i) => {
              const Icon = placementIcons[i] || Briefcase;
              return (
                <Reveal key={f.title} delay={(i % 4) * 0.05}>
                  <div className="card card-hover card-glow group h-full p-4">
                    <span className="icon-tile h-11 w-11 rounded-xl transition-transform duration-300 group-hover:scale-105"><Icon size={21} strokeWidth={1.8} /></span>
                    <h3 className="mt-5 font-sans font-semibold leading-snug">{f.title}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="page py-8 sm:py-10">
        <SectionHeader center title="Career Paths You Can Target" />
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {careerPaths.map((c, i) => {
            const Icon = careerIcons[i] || Briefcase;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <div className="card group flex h-full flex-col gap-4 p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-600 hover:bg-brand-600 hover:shadow-lift sm:flex-row sm:items-center sm:p-4">
                  <Icon size={26} className="shrink-0 text-brand-600 transition group-hover:text-white" />
                  <h3 className="text-lg font-bold transition group-hover:text-white">{c.title}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {SHOW.testimonials && (
        <section className="page pb-8">
          <SectionHeader center title="What Our Students Say About Our Courses" />
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="card p-4">
                <div className="flex gap-1 text-amber-500" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} fill={n <= r.rating ? 'currentColor' : 'none'} />)}
                </div>
                <blockquote className="mt-4 leading-relaxed text-ink-600">{r.text}</blockquote>
                <figcaption className="mt-5 font-semibold text-ink-900">{r.name} <span className="block text-sm font-normal text-ink-500">{r.time}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {SHOW.videos && (
        <section className="page pb-8">
          <SectionHeader center title="Our Learners Got Assured Placement. So Can You!" />
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {videos.map((v) => (
              <div key={v.videoId} className="card overflow-hidden">
                <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${v.videoId}`} title={v.title} allowFullScreen loading="lazy" />
                <div className="p-4"><h3 className="font-bold">{v.title}</h3><p className="mt-1 text-sm text-ink-500">{v.desc}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certification */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute -bottom-40 left-1/2 h-80 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-brand-600/40 blur-[110px]" aria-hidden="true" />
        <div className="page relative py-8 sm:py-10">
          <SectionHeader
            light
            center
            title="Your Professional Certification"
            intro={
              <>
                You will receive an official <strong className="text-white">VIPRACUBE TECH Course Completion Certificate</strong> after
                successfully completing all modules and projects. This certificate validates your expertise in:
              </>
            }
          />
          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {certifications.map((c) => (
              <li key={c} className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-semibold text-white">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application */}
      <section id="cbc" className="page grid grid-cols-1 items-center gap-7 py-8 sm:py-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeader title="Start Your Application – Limited Seats Left" intro="Contact us to receive:" />
          <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {formBenefits.map((b) => (
              <li key={b} className="flex items-center gap-3 font-medium text-ink-900">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white"><Check size={14} strokeWidth={3} /></span>
                {b}
              </li>
            ))}
          </ul>
          <div className="card mt-5 p-4 sm:p-5">
            <h3 className="text-lg font-bold">Contact Us for Enrollment &amp; Queries</h3>
            <ul className="mt-5 space-y-4">
              {contacts.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex gap-4">
                  <Icon size={19} className="mt-0.5 shrink-0 text-brand-600" />
                  {href ? <a href={href} className="min-w-0 [overflow-wrap:anywhere] font-medium text-ink-900 transition hover:text-brand-700">{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="tel:+919960923965">Call now</Button>
              <Button href="mailto:vipracube.129476@gmail.com" variant="secondary">Send an email</Button>
            </div>
          </div>
        </div>
        <Reveal>
          <img src={internApply} alt="A learner surrounded by AI dashboards" loading="lazy" className="mx-auto aspect-[4/3] w-full max-w-sm rounded-3xl object-cover shadow-lift" />
        </Reveal>
      </section>

      {SHOW.faqs && (
        <section id="faqs" className="page pb-8">
          <SectionHeader center title="Frequently Asked Questions (FAQs)" />
          <div className="mx-auto mt-5 max-w-3xl">
            <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
          </div>
        </section>
      )}

      <SyllabusModal open={syllabusFormOpen} onClose={() => setSyllabusFormOpen(false)} />
    </>
  );
};

export default InternshipProgram;
