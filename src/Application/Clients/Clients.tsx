import React from 'react';
import { FileText, GraduationCap, HeartPulse, MessageCircle, Scale, WashingMachine, Workflow } from 'lucide-react';
import SolutionsGrid, { solutions, type SolutionCard } from '../../components/sections/SolutionsGrid';
import PageHero from '../../components/ui/PageHero';
import SectionHeader from '../../components/ui/SectionHeader';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const clientProjects: SolutionCard[] = [
  ...solutions.map((solution) =>
    solution.name === 'Travo Buddy'
      ? { ...solution, details: 'Carpool industry app that connects riders and drivers and supports ride booking and scheduling.' }
      : solution
  ),
  { icon: HeartPulse, name: 'ECB App', by: 'An app developed for the healthcare sector.' },
  { icon: WashingMachine, name: 'Laundry App & Website', by: 'An app and website designed and developed for the retail laundry industry.' },
  { icon: MessageCircle, name: 'WhatsApp AI Agent', by: 'An e-commerce AI agent that lets users send and receive purchase requests through WhatsApp.' },
  { icon: Workflow, name: 'CRM Automation Solution', by: 'An AI-powered solution for automating CRM tasks and managing workflows.' },
  { icon: Scale, name: 'D2C Law Agent Web Application', by: 'A direct-to-consumer law agent web application for the legal industry.' },
  { icon: FileText, name: 'AI Document Summarizer Agent', by: 'An AI agent that automatically summarizes advanced research papers.' },
  { icon: GraduationCap, name: 'Training & Internship Program', by: 'A training and internship program focused on developing talent.' },
];

const Clients = () => {
  useDocumentTitle('Clients');
  return (
    <>
      <PageHero title="Clients" />
      <section className="page py-8 sm:py-10">
        <SectionHeader title="Solutions We've Built" intro="Real AI systems delivering measurable value for our clients." />
        <SolutionsGrid entries={clientProjects} />
      </section>
    </>
  );
};

export default Clients;
