import { Cpu, LucideIcon, Target } from 'lucide-react';

interface AboutUsItem {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const aboutUsData: AboutUsItem[] = [
  {
    title: 'About VIPRACUBE TECH',
    icon: Cpu,
    description: `VIPRACUBE TECH is the innovation arm of Vipracube Tech Solutions, focused on building next-generation AI products using advanced technologies like LangChain, NLP, ML, NL2SQL, and Generative AI. Our goal is to simplify complex workflows, automate decision-making, and bring intelligent solutions to healthcare, legal tech, travel, and more.`,
  },
  {
    title: 'Our Mission',
    icon: Target,
    description:
      'To empower businesses and individuals by building intelligent, scalable, and user-centric digital solutions that leverage the power of AI, modern software architecture, and innovative design.',
  },
];

export const whyChoose = {
  title: 'Why Choose VIPRACUBE TECH?',
  reasons: [
    {
      title: 'End-to-End Development',
      description: 'From idea to deployment, we deliver complete solutions across mobile, web, and cloud platforms.',
    },
    {
      title: 'Agile & Scalable Tech Stack',
      description: 'We leverage Java, Spring Boot, React, AWS, and modern databases to ensure performance, scalability, and security.',
    },
    {
      title: 'Domain Expertise',
      description: 'With a portfolio spanning healthcare, travel, legal tech, and matrimony, we understand diverse business needs.',
    },
    {
      title: 'Startup-Friendly, Enterprise-Ready',
      description: "Whether you're a startup or a growing business, our solutions are tailored to match your scale and vision.",
    },
  ],
};

export default aboutUsData;
