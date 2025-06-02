import React from 'react';
import { NavigationItem } from '../../../stories/Header';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactElement | string;
}

export interface ContactItem {
  title: string;
  description: string;
  icon: React.ReactElement | string;
  action?: string;
  onClick?: () => void;
}

export interface PageTemplate {
  companyName: string;
  navigationItems?: NavigationItem[];
  heroTitle: string;
  heroSubtitle: string;
  servicesTitle: string;
  contactTitle: string;
  services: ServiceItem[];
  contacts: ContactItem[];
  footerText: string;
}

// Export all example templates
export { traditionalBusinessTemplate } from './traditional-business';
export { startupTemplate } from './startup';
export { consultingTemplate } from './consulting';
export { healthcareTemplate } from './healthcare';

// Export template mapping for easy access
export const exampleCompanyTemplates = {
  'traditional-business': () => import('./traditional-business').then(m => m.traditionalBusinessTemplate),
  'startup': () => import('./startup').then(m => m.startupTemplate),
  'consulting': () => import('./consulting').then(m => m.consultingTemplate),
  'healthcare': () => import('./healthcare').then(m => m.healthcareTemplate),
} as const;

export type ExampleCompanyTemplateName = keyof typeof exampleCompanyTemplates; 