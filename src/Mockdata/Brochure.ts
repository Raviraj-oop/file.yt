/** Company details from the Vipracube brochure (pages 2 to 4) that the website did not have. */
import {
  Bot, CalendarDays, Car, ClipboardCheck, Cog, Database, Factory, FileText, Flag, GraduationCap, HeartHandshake, HeartPulse,
  Lightbulb, LucideIcon, MessageCircle, PencilRuler, Scale, Search, ShieldCheck, Truck, WashingMachine, Workflow,
} from 'lucide-react';

export interface Milestone {
  date: string;
  icon: LucideIcon;
  text: string;
}

export const journey: { year: string; milestones: Milestone[] }[] = [
  {
    year: '2023',
    milestones: [{ date: 'October 2023', icon: Flag, text: 'Our startup was founded with a vision to fulfill AI technology-related requirements.' }],
  },
  {
    year: '2024',
    milestones: [
      { date: 'March 2024', icon: Car, text: 'Successfully launched an innovative app designed for the carpool industry.' },
      { date: 'July 2024', icon: HeartPulse, text: 'Developed the ECB app tailored for the healthcare sector.' },
      { date: 'December 2024', icon: WashingMachine, text: 'Designed and developed the Laundry App & Website for the retailing industry.' },
    ],
  },
  {
    year: '2025',
    milestones: [
      { date: 'March 2025', icon: MessageCircle, text: 'Developed an e-commerce WhatsApp AI agent to send and receive product purchases through WhatsApp.' },
      { date: 'June 2025', icon: Workflow, text: 'Built an intelligent AI-powered solution for CRM automation and workflow management.' },
      { date: 'October 2025', icon: Scale, text: 'Developed a D2C-based law agent web application, live in the legal industry.' },
    ],
  },
  {
    year: '2026',
    milestones: [
      { date: 'February 2026', icon: FileText, text: 'Created an intelligent and automated document summarizer agent for advanced research papers.' },
      { date: 'May 2026', icon: GraduationCap, text: 'Started a training & internship program focused on nurturing talent.' },
    ],
  },
];

export interface ServiceDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  items: string[];
}

export const aiServices: ServiceDetail[] = [
  {
    id: 'ai-automation',
    icon: Workflow,
    title: 'AI Automation Solutions',
    intro: 'Smarter automation solutions that save time, reduce errors, and improve efficiency for sustainable work and drive business growth.',
    items: ['Business process automation', 'Smart workflow automation', 'AI-powered decision support', 'Data processing & reporting automation', 'AI integration services'],
  },
  {
    id: 'ai-agents',
    icon: Bot,
    title: 'AI Agent Development',
    intro: 'Intelligent AI agents & chatbots that handle support, automate tasks, and improve customer experience 24/7.',
    items: ['WhatsApp AI agents', 'Custom AI agent creation', 'CRM automation agents', 'Lead generation agents', 'Task & reminder automation', 'Custom AI assistant solutions'],
  },
];

export const platformServices: ServiceDetail[] = [
  {
    id: 'data-databases',
    icon: Database,
    title: 'Data & Databases',
    intro: 'Reliable and efficient data solutions that ensure accuracy, integrity, and performance.',
    items: ['Database design & development', 'Data management & optimization', 'Data migration & integration', 'Backup & disaster recovery', 'Data analytics & reporting'],
  },
  {
    id: 'security-compliance',
    icon: ShieldCheck,
    title: 'Security & Compliance',
    intro: 'Enterprise-grade security and compliance solutions to protect your data and ensure regulatory standards.',
    items: ['Web & application security', 'Data encryption & protection', 'Security audit & vulnerability assessment', 'GDPR, HIPAA & ISO compliance', 'Access control & user management'],
  },
];

export interface Delivery {
  name: string;
  industry: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  solution: string;
  link?: string;
  /** A page or section on this website, used instead of an external link. */
  to?: string;
}

/* Names and links match the "Solutions We've Built" section on the home page. */
export const deliveries: Delivery[] = [
  {
    name: 'Travo Buddy',
    industry: 'Carpool industry',
    icon: Car,
    description: 'A smart carpooling solution that connects riders and drivers seamlessly for safe, reliable, and convenient travel.',
    features: ['Carpool mobile application', 'Ride booking & scheduling system', 'Real-time location tracking', 'Driver & passenger management', 'Route optimization solutions', 'WhatsApp booking automation', 'Admin dashboard & analytics'],
    solution: 'Complete digital solutions that ensure efficient operations, seamless management, and better user experience.',
    link: 'https://www.travobuddy.com',
  },
  {
    name: 'R2R Healthcare',
    industry: 'Healthcare sector',
    icon: HeartPulse,
    description: 'An advanced healthcare platform designed to improve patient care, streamline operations, and enhance hospital efficiency.',
    features: ['Healthcare management system', 'Patient appointment solutions', 'AI healthcare assistant', 'Medical record management', 'Hospital CRM solutions', 'Telemedicine platform', 'Workflow automation system'],
    solution: 'Smart healthcare solutions that enable better patient care, streamline workflows, and improve operational efficiency.',
  },
  {
    name: 'Utkarsha Vivah',
    industry: 'Matrimony industry',
    icon: HeartHandshake,
    description: 'A trusted matrimony platform that helps people find the perfect match with smart and secure technology.',
    features: ['Matrimony website & mobile app', 'User profile management', 'AI match recommendation system', 'Secure chat & communication', 'Membership & subscription system', 'Admin management dashboard', 'Analytics & user insights'],
    solution: 'Secure and user-friendly solutions that bring the right people together with trust, privacy, and smart matching technology.',
    link: 'https://www.utkarshavivah.com',
  },
  {
    /* From the Vipracube "ERP Introduction" deck (slides 1, 3, 4 and 5). */
    name: 'Vipra ERP',
    industry: 'Plastic bag manufacturing',
    icon: Factory,
    description: 'One web-based ERP for planning, purchase, store, production, quality, maintenance and cost, built around how plastic bag plants actually run.',
    features: ['Material planning & indents', 'Store & live stock management', 'Vendor quotes, approvals & purchase orders', 'Goods receipt (GRN) with partial delivery', 'Shift-wise tape plant, loom & roll-down logs', 'Quality control & maintenance records', 'Cost per kg & analytics reports'],
    solution: 'Each department works in its own screens on one cloud database, so the owner sees live numbers without registers or Excel sheets.',
    to: '/Products#ved-erp',
  },
];

export const processSteps: { title: string; icon: LucideIcon; text: string }[] = [
  { title: 'Ideation', icon: Lightbulb, text: 'Defining project goals, objectives, and creative directions is the first step in our process.' },
  { title: 'Research', icon: Search, text: 'Gathering insights and data through market research and competitor analysis is crucial to inform our project strategy.' },
  { title: 'Planning', icon: CalendarDays, text: 'We meticulously plan each project with a well-structured timeline and milestones.' },
  { title: 'Design', icon: PencilRuler, text: 'We create a rough draft of our ideas using industry-standard software tools like CorelDRAW, Adobe Photoshop, Blender and KeyShot.' },
  { title: 'Implementation', icon: Cog, text: 'We get down to crafting the stunning designs of your dreams.' },
  { title: 'Quality Assurance', icon: ShieldCheck, text: 'We go through a QA phase and any issues or errors identified during testing are promptly addressed.' },
  { title: 'Review & Approval', icon: ClipboardCheck, text: 'Your feedback guides our revisions, ensuring the project aligns with your vision.' },
  { title: 'Delivery', icon: Truck, text: 'We deliver the final product. The handover is smooth, ensuring you receive the project in its entirety.' },
];
