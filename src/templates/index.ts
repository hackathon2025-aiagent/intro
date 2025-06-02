// Base types for page templates
export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  onButtonClick: () => void;
}

export interface ContactItem {
  title: string;
  description: string;
  icon: string;
  action: string;
  onClick: () => void;
}

export interface PageTemplate {
  companyName: string;
  navigationItems: { label: string; path?: string; onClick?: () => void }[];
  heroTitle: string;
  heroSubtitle: string;
  servicesTitle: string;
  contactTitle: string;
  services: ServiceItem[];
  contacts: ContactItem[];
  footerText: string;
}

// Example Templates (for showcase/demo purposes)
export type { ExampleCompanyTemplateName } from './examples';
export {
  traditionalBusinessTemplate,
  startupTemplate,
  consultingTemplate,
  healthcareTemplate,
  exampleCompanyTemplates,
} from './examples';

// Job Templates (shared)
export type { JobDescription, JobDescriptionKey } from './jobs';
export {
  datevBusinessStrategist,
  growthMarketingManager,
  jobDescriptions,
} from './jobs'; 