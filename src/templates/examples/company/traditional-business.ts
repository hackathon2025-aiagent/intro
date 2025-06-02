import React from 'react';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { PageTemplate } from './index';

export const traditionalBusinessTemplate: PageTemplate = {
  companyName: 'Heritage Solutions Inc.',
  navigationItems: [
    { label: 'Home', path: '/' },
    { label: 'Services', onClick: () => {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { label: 'About', onClick: () => {
      console.log('About clicked - implement company history');
    }},
    { label: 'Contact', path: '/contact' },
  ],
  heroTitle: 'Trusted Business Solutions Since 1985',
  heroSubtitle: 'Delivering reliable, professional services with decades of experience and proven results.',
  servicesTitle: 'Our Professional Services',
  contactTitle: 'Get in Touch',
  services: [
    {
      title: 'Business Consulting',
      description: 'Strategic guidance and expert advice to help your business grow and succeed in today\'s competitive market.',
      icon: '💼'
    },
    {
      title: 'Financial Planning',
      description: 'Comprehensive financial strategies and planning services to secure your business\'s future.',
      icon: '📊'
    },
    {
      title: 'Legal Services',
      description: 'Professional legal support and compliance guidance for all your business needs.',
      icon: '⚖️'
    }
  ],
  contacts: [
    {
      title: 'Main Office',
      description: '123 Business Ave, Corporate City, CC 12345',
      icon: '🏢',
      action: 'Visit Us'
    },
    {
      title: 'Phone',
      description: '+1 (555) 123-4567',
      icon: '📞',
      action: 'Call Now'
    },
    {
      title: 'Email',
      description: 'info@heritagesolutions.com',
      icon: '✉️',
      action: 'Send Email'
    }
  ],
  footerText: 'Heritage Solutions Inc. - Your trusted business partner since 1985.'
}; 