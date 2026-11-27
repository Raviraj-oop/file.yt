import { MockData } from "../components/Cards/Cards.models";
import Image from '../assets/Images/Vipracube_AI_5.png'
import Image2 from '../assets/Images/Vipracube_AI_6.png'
import Image3 from '../assets/Images/Vipracube_AI_7.png'
import Image4 from '../assets/Images/Vipracube_AI_8.png'


const servicesData: MockData[] = [
    {
        image:Image,
      title: 'Generative AI Development',
      content: `We specialize in building cutting-edge GenAI applications using LLMs and multimodal AI.
      Custom LLM integrations (OpenAI, Claude, Gemini, Mistral),Retrieval-Augmented Generation (RAG),LangChain, LangGraph & vector database pipelines,AI chatbots, document Q&A, agents`
    },
    {
        image:Image2,
      title: 'App Development (Web & Mobile)',
      content: 'We build high-performance, scalable apps that users love.Native & cross-platform mobile apps (Android, iOS),Progressive Web Apps (PWA),Admin panels & dashboards,Business management systems,React.js, Next.js, Flutter, Node.js'
    },
    {
        image:Image3,
        title: 'Website & Platform Development',
        content: `Fast, responsive, and SEO-ready websites tailored to your brand.Corporate websites, landing pages, SaaS platforms,CMS integration (WordPress, Headless CMS),eCommerce with custom checkout and payment flows`
    },
    {
        image:Image4,
        title: 'Cloud & DevOps Consulting',
        content: `We deploy and manage scalable infrastructures so you don’t have to.AWS, Azure, and GCP deployments,CI/CD pipelines, Docker, Kubernetes,Serverless architecture, API gateways`
    },
    // Add more mock data objects as needed
  ];

  export default servicesData