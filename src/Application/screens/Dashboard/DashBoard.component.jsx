import { ArrowRight, Bot, CheckCircle2, CloudCog, Code2, Compass, Database, Factory, GraduationCap, HeartPulse, Landmark, Plane, ShieldCheck, ShoppingCart, Smartphone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Cards from "../../../components/Cards/Cards.component";
import HeroCarousel from "../../../components/HeroCarousel/HeroCarousel";
import WorkflowVisual from "../../../components/WorkflowVisual/WorkflowVisual";
import Button from "../../../components/ui/Button";
import CountUp from "../../../components/ui/CountUp";
import Reveal from "../../../components/ui/Reveal";
import SectionHeader from "../../../components/ui/SectionHeader";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import mockData from "../../../Mockdata/MockData";
import carasoulData from "../../../Mockdata/CarasoulData";
import handshake from "../../../assets/optimized/handshake.webp";
import splitList from "../../../utils/splitList";
import SolutionsGrid, { solutions } from "../../../components/sections/SolutionsGrid";
import TechnologyHighlights from "../../../components/sections/TechnologyHighlights";

const serviceIcons = [Bot, Smartphone, CloudCog, Database, ShieldCheck];

const whatWeDo = [
  { icon: Compass, title: "AI Strategy & Consulting", desc: "Tailored roadmaps to integrate AI into your workflows effectively." },
  { icon: Code2, title: "Custom AI Development", desc: "From natural language processing to predictive analytics, we build solutions that fit your needs." },
  { icon: Sparkles, title: "GenAI-Powered Products", desc: "We develop domain-specific AI tools using the latest in generative AI and LLM technology." },
];

const industries = [
  { icon: Factory, title: "Vipra ERP", desc: "An enterprise resource planning solution that connects production, inventory, purchasing, and quality control for manufacturers." },
  { icon: GraduationCap, title: "EdTech", desc: "AI-powered learning platforms, adaptive assessments & student engagement systems." },
  { icon: HeartPulse, title: "Healthcare", desc: "Medical RAG systems, patient insights, diagnosis support & healthcare automation." },
  { icon: Landmark, title: "FinTech", desc: "Intelligent banking solutions, fraud detection & regulatory compliance systems." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Online stores, inventory management & customer experience solutions." },
  { icon: Plane, title: "Travel", desc: "Smart booking systems, AI travel agents & personalized journey experiences." },
];

const stats = [
  { value: mockData.length, label: "Service areas" },
  { value: industries.length, label: "Industries featured" },
  { value: solutions.length, label: "Solutions showcased" },
];

const [heroLead, ...heroRest] = carasoulData[0].content.split("\n").map((p) => p.trim()).filter(Boolean);

const DashBoard = () => {
  useDocumentTitle();
  return (
    <>
      {/* Hero */}
      <section className="home-hero relative isolate overflow-hidden">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="aurora aurora-a -z-10 right-[-8rem] top-[-6rem] h-[26rem] w-[26rem] sm:h-[34rem] sm:w-[34rem]" aria-hidden="true" />
        <div className="aurora aurora-b -z-10 bottom-[-12rem] left-[-10rem] h-[24rem] w-[24rem] opacity-40" aria-hidden="true" />
        <div className="page relative grid items-center gap-5 pb-8 pt-6 sm:pb-9 sm:pt-8 lg:grid-cols-[1.02fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="home-headline font-extrabold text-white">AI-Driven Solutions for a <span>Smarter Tomorrow</span></h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{heroLead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/Services" size="lg">
                Explore Services <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button to="/ContactUs" size="lg" variant="outlineLight">Contact us</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
            <div className="float-slow mx-auto max-w-lg lg:max-w-sm"><div className="workflow-frame"><WorkflowVisual /></div></div>
          </motion.div>
        </div>
      </section>

      <TechnologyHighlights />

      {/* Services */}
      <section className="page py-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader title="Our AI & Technology Services" intro="From AI development to cloud infrastructure — end-to-end solutions tailored to your business goals." />
          <Button to="/Services" variant="secondary" className="self-start md:self-auto">Explore Services</Button>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {mockData.map((data, i) => (
            <Reveal key={data.title} delay={(i % 3) * 0.07} className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 4 ? "md:col-span-2" : ""}`}>
              <Cards title={data.title} content={data.content} icon={serviceIcons[i]} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="page grid items-center gap-5 py-8 sm:py-10 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/70 via-transparent to-cyan-200/60 blur-xl" aria-hidden="true" />
              <img src={handshake} alt="A human hand and a digital hand shaking" loading="lazy" className="mx-auto aspect-square w-full max-w-md rounded-3xl object-cover shadow-lift ring-1 ring-white/60 lg:max-w-sm" />
            </div>
          </Reveal>
          <div>
            <SectionHeader title="About VIPRACUBE TECH" intro={heroRest[0]} />
            <h3 className="mt-5 text-xl font-bold">{carasoulData[1].title}</h3>
            <ul className="mt-6 space-y-3">
              {whatWeDo.map(({ icon: Icon, title, desc }, i) => (
                <li key={title}>
                  <Reveal delay={i * 0.08} className="card card-glow flex gap-5 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                    <span className="icon-tile h-11 w-11 rounded-xl"><Icon size={20} /></span>
                    <div>
                      <h3 className="text-lg font-bold">{title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-600">{desc}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="page py-8 sm:py-10">
        <SectionHeader center title="Industries We Serve" intro="Delivering specialized AI & technology solutions across diverse industries with deep domain expertise" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.07}>
              <div className="card card-hover card-glow group h-full p-4">
                <span className="icon-tile h-12 w-12 transition-transform duration-300 group-hover:scale-110"><Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Button to="/ContactUs" variant="secondary">Talk to us about your industry</Button>
        </div>
      </section>

      <section className="page pb-7 sm:pb-10">
        <div className="home-proof rounded-3xl border border-brand-100 p-4 sm:p-5">
          <SectionHeader title={carasoulData[2].title} />
          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {splitList(carasoulData[2].content).map((reason) => (
              <li key={reason} className="flex items-start gap-3 rounded-xl border border-white bg-white/80 p-4 font-medium text-ink-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="home-hero relative isolate overflow-hidden">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="aurora aurora-a -z-10 left-1/4 top-1/4 h-72 w-1/2 opacity-40" aria-hidden="true" />
        <div className="page py-8 sm:py-10">
          <SectionHeader light center title="Our Work at a Glance" />
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl border border-white/15 bg-white/[.06] px-4 py-4 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">
                <dt className="order-2 mt-2 font-semibold text-white">{s.label}</dt>
                <dd className="text-gradient order-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"><CountUp value={s.value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Training */}
      <section className="page pt-8 sm:pt-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader title="Train with the team that builds it" intro="Generative AI & Agentic AI course with internship in Pune." />
          <Button to="/internship" className="self-start md:self-auto">View Internship Program</Button>
        </div>
        <Reveal className="mt-5"><HeroCarousel /></Reveal>
      </section>

      {/* Solutions */}
      <section className="page py-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader title="Solutions We've Built" intro="Real AI systems delivering measurable value for our clients." />
          <Button to="/Products#our-delivery" variant="secondary" className="self-start md:self-auto">See Our Delivery</Button>
        </div>
        <SolutionsGrid showWebsiteAddress={false} />
      </section>
    </>
  );
};

export default DashBoard;
