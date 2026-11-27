/**
 * Ved ERP content for the Products page.
 * Source: "Vipracube AI - ERP Introduction" deck (5 slides, ERP for plastic bag manufacturers).
 * The deck lists features only. Each challenge below is the problem a slide's feature is built to solve,
 * and every impact is an expected benefit, not a measured result. No figures are added.
 */
import {
  Boxes, Brain, Calculator, ChartColumn, ClipboardList, Cloud, Database, Factory, FileSpreadsheet, FlaskConical, Gauge,
  HardHat, Headset, Languages, Layers, LayoutGrid, LucideIcon, MapPin, PackageOpen, Ruler, Scale, ShieldCheck, Truck,
  UserCheck, Warehouse, Workflow, Wrench,
} from 'lucide-react';

export const erpIntro = {
  title: 'Capabilities',
  intro:
    'A Pune-based technology company building software and AI for Indian manufacturers. Our ERP is built for plastic bag manufacturers, around how their plants actually run.',
  summary:
    'One web-based ERP for planning, purchase, store, production, quality, maintenance and cost. Each department has its own login and screens, and all data sits in one cloud database, so the owner sees live numbers without registers or Excel sheets.',
};

export const erpOffers: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Factory, title: 'Manufacturing ERP', text: 'Built for plastic bag manufacturing plants' },
  { icon: Brain, title: 'AI and Automation', text: 'Live reports today; alerts and forecasting next' },
  { icon: Headset, title: 'Setup and Support', text: 'On-site rollout, staff training and support' },
];

export const erpWhy: { icon: LucideIcon; label: string }[] = [
  { icon: HardHat, label: 'Built for your plant' },
  { icon: MapPin, label: 'On-site visits' },
  { icon: Cloud, label: 'Cloud based' },
  { icon: Languages, label: 'English · Hindi · Marathi' },
];

export const erpJourney: { stage: string; moves: string[]; steps: { icon: LucideIcon; title: string; text: string }[] }[] = [
  {
    stage: 'Procure',
    moves: ['Indent', 'PO', 'Raw material in stock'],
    steps: [
      { icon: ClipboardList, title: 'Planning', text: 'Indent raised: material, grade, colour, quantity' },
      { icon: Warehouse, title: 'Store Check', text: 'Stock checked; shortage sent to Purchase' },
      { icon: Scale, title: 'Purchase', text: 'Vendor quotes compared, Owner approves, PO issued' },
      { icon: Truck, title: 'GRN', text: 'Material received against PO; stock updated' },
    ],
  },
  {
    stage: 'Produce',
    moves: ['Raw material', 'PP tapes', 'Woven fabric', 'Fabric roll'],
    steps: [
      { icon: PackageOpen, title: 'Issue', text: 'Store issues raw material to the Tape Plant' },
      { icon: Layers, title: 'Tape Plant', text: 'Extrusion: raw material into PP tapes (kg, denier, wastage)' },
      { icon: LayoutGrid, title: 'Loom', text: 'Circular looms weave tapes into fabric (metres, GSM)' },
      { icon: Ruler, title: 'Roll Down', text: 'Roll taken off loom: weight, metres, GSM checked' },
    ],
  },
];

export interface ErpChallenge {
  icon: LucideIcon;
  challenge: string;
  problem: string;
  solution: string;
  how: string[];
  impact: string;
  area: string;
  slide: number;
}

export const erpChallenges: ErpChallenge[] = [
  {
    icon: FileSpreadsheet,
    challenge: 'Records kept in registers and Excel sheets',
    problem: 'Each department keeps its own registers or spreadsheets, so the owner has to collect numbers by hand and cannot see what is happening right now.',
    solution: 'One system for the whole factory',
    how: ['One web-based ERP and one cloud database', '9 department logins, each with its own screens', 'Owner sees live numbers'],
    impact: 'Live, shared numbers instead of collecting registers and sheets.',
    area: 'Reporting and decision-making',
    slide: 3,
  },
  {
    icon: ClipboardList,
    challenge: 'Manual stock checks before buying',
    problem: 'Material needs are passed on informally, and someone has to check stock by hand to work out what is short.',
    solution: 'Material Planning and Store Planning',
    how: ['Indent with material, grade, colour, quantity and priority', 'Shortage vs. stock calculated automatically', 'Store forwards only the items to be bought; indent locks after 3 days'],
    impact: 'Fewer manual calculations and a clear record of every requirement.',
    area: 'Inventory management',
    slide: 4,
  },
  {
    icon: Scale,
    challenge: 'Comparing vendor quotes and getting approvals',
    problem: 'Quotes differ on price, freight, packing, discount, GST and payment terms, which makes them hard to compare and approvals hard to track.',
    solution: 'Order Evaluation and Purchase Orders',
    how: ['Quotes compared side by side, including payment terms, advance % and credit days', 'Owner approves or rejects with remarks', 'Ready-to-send PO PDF with taxes and terms, from the Vendor Master'],
    impact: 'Faster, recorded purchase decisions with less paperwork.',
    area: 'Operational workflows',
    slide: 4,
  },
  {
    icon: Truck,
    challenge: 'Stock records drifting after partial deliveries',
    problem: 'When only part of an order arrives, stock records can fall out of step with what is actually in the store.',
    solution: 'Goods Receipt (GRN)',
    how: ['Material received against a PO', 'Partial delivery: tick only the items received', 'Stock updates automatically'],
    impact: 'Stock figures that match what was actually received.',
    area: 'Data accuracy',
    slide: 4,
  },
  {
    icon: Boxes,
    challenge: 'Unclear where material goes and how much is wasted',
    problem: 'Without issue records, it is hard to know which department or machine used material, or how much became wastage.',
    solution: 'Store and Stock, Raw Material Tracking',
    how: ['Live stock by category, part code, grade and colour', 'Issue and allot to departments and machines', 'Returns to stock or booked as wastage; daily use reviewed by the Production Manager'],
    impact: 'Clear accountability for every kilogram of material.',
    area: 'Inventory management',
    slide: 4,
  },
  {
    icon: Factory,
    challenge: 'No shift-wise view of production',
    problem: 'Output, wastage and efficiency on the tape plant and looms are hard to compare across shifts, machines and operators.',
    solution: 'Production floor logs',
    how: ['Tape Plant: output (kg), denier, wastage %, running hours, breakdowns', 'Loom: operator, size, GSM, metres vs. required, efficiency %', 'Roll Down and Lamination: every roll and material entry recorded'],
    impact: 'Shift and machine performance visible every day.',
    area: 'Production efficiency',
    slide: 5,
  },
  {
    icon: FlaskConical,
    challenge: 'Quality tests recorded loosely',
    problem: 'Test results kept on paper are hard to find, compare or prove later.',
    solution: 'Quality Control reports',
    how: ['Tape Test, Belt Jumbo and Fabric Jumbo Testing', 'Physical Appearance and Fabric Width Inspection', 'Digital signature on fabric reports'],
    impact: 'Consistent, signed quality records that are easy to retrieve.',
    area: 'Quality control',
    slide: 5,
  },
  {
    icon: Wrench,
    challenge: 'Breakdowns and spare parts not tracked',
    problem: 'Downtime and spare-part use go unrecorded, so repeat problems and their cost stay hidden.',
    solution: 'Maintenance log',
    how: ['Every breakdown logged by department, machine, shift, type and time', 'Spare parts used and quantity recorded', 'Running vs. breakdown hours reported'],
    impact: 'A clear history of downtime for each machine.',
    area: 'Resource utilization',
    slide: 5,
  },
  {
    icon: Calculator,
    challenge: 'True cost per kg not known',
    problem: 'Labour, electricity, wastage and maintenance costs are spread across records, so the real cost of each kilogram produced is unclear.',
    solution: 'Cost Analyser',
    how: ['Labour + Light + Wastage + Maintenance = total cost per kg', 'Owner sets unit cost, labour rates and formulas', 'Shift cost analysis: Shift A vs. B'],
    impact: 'Cost per kg worked out from actual shift records.',
    area: 'Reporting and decision-making',
    slide: 5,
  },
  {
    icon: ShieldCheck,
    challenge: 'No controlled access or change history',
    problem: 'When everyone can see and edit everything, it is hard to know who changed what.',
    solution: 'Built into every screen',
    how: ['Secure login and role-based access', 'Audit trail', 'Search, filters and Excel / PDF export'],
    impact: 'Each person sees their own work, and every change is traceable.',
    area: 'Data accuracy',
    slide: 3,
  },
];

export const erpEfficiency: { icon: LucideIcon; area: string; how: string }[] = [
  { icon: Gauge, area: 'Production efficiency', how: 'Shift-wise output, wastage % and loom efficiency % per machine and operator.' },
  { icon: Warehouse, area: 'Inventory management', how: 'Automatic shortage check, live stock, and issue, return and wastage records.' },
  { icon: FlaskConical, area: 'Quality control', how: 'Five QC reports with digital signature on fabric reports.' },
  { icon: Wrench, area: 'Resource utilization', how: 'Running vs. breakdown hours, breakdown log and spare parts used.' },
  { icon: Workflow, area: 'Operational workflows', how: 'Planning → Store → Purchase → GRN → Production → QC → Cost, in one system.' },
  { icon: ChartColumn, area: 'Reporting and decision-making', how: 'Cost per kg, Shift A vs. B, yesterday per machine, monthly reports, purchase and PO summary.' },
  { icon: Database, area: 'Data accuracy', how: 'One cloud database, automatic stock updates on GRN and an audit trail.' },
  { icon: UserCheck, area: 'Employee productivity', how: 'Each department works in its own screens, without separate registers or Excel sheets.' },
];
