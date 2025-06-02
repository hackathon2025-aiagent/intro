import React from 'react';
import {
  Psychology as StrategyIcon,
  Analytics as AnalyticsIcon,
  Groups as TeamIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { PageTemplate } from './index';

export const consultingTemplate: PageTemplate = {
  companyName: 'Strategic Advisors',
  navigationItems: [
    { label: 'Home', path: '/' },
    { label: 'Services', onClick: () => {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { label: 'Case Studies', onClick: () => {
      console.log('Case Studies clicked - implement case studies page');
    }},
    { label: 'Team', onClick: () => {
      console.log('Team clicked - implement team page');
    }},
    { label: 'Contact', path: '/contact' },
  ],
  heroTitle: 'Expert Consulting for Strategic Growth',
  heroSubtitle: 'Transform your business with data-driven insights and proven methodologies from industry experts.',
  servicesTitle: 'Our Consulting Services',
  contactTitle: 'Start Your Transformation',
  services: [
    {
      title: 'Strategy Consulting',
      description: 'Develop winning strategies with comprehensive market analysis and competitive intelligence.',
      icon: '🎯'
    },
    {
      title: 'Digital Transformation',
      description: 'Modernize your operations with cutting-edge technology and digital-first processes.',
      icon: '💻'
    },
    {
      title: 'Change Management',
      description: 'Navigate organizational change with proven frameworks and stakeholder engagement.',
      icon: '🔄'
    }
  ],
  contacts: [
    {
      title: 'Free Consultation',
      description: 'Schedule a 30-minute strategy session',
      icon: '📅',
      action: 'Book Now'
    },
    {
      title: 'Case Studies',
      description: 'See how we\'ve helped other companies',
      icon: '📊',
      action: 'View Results'
    },
    {
      title: 'Expert Team',
      description: 'Meet our senior consultants',
      icon: '👥',
      action: 'Meet Team'
    }
  ],
  footerText: 'Strategic Advisors - Your partners in sustainable growth.'
};
