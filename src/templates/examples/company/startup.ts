import React from 'react';
import {
  Rocket as RocketIcon,
  TrendingUp as GrowthIcon,
  Lightbulb as InnovationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { PageTemplate } from './index';

export const startupTemplate: PageTemplate = {
  companyName: 'InnovateTech',
  navigationItems: [
    { label: 'Home', path: '/' },
    { label: 'Product', onClick: () => {
      // Scroll to services section (products)
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { label: 'Team', onClick: () => {
      console.log('Team clicked - implement team section');
    }},
    { label: 'Investors', onClick: () => {
      console.log('Investors clicked - implement investor relations');
    }},
    { label: 'Contact', path: '/contact' },
  ],
  heroTitle: 'Disrupting the Future with Innovation',
  heroSubtitle: 'We\'re building tomorrow\'s technology today. Join us on our mission to revolutionize the industry.',
  servicesTitle: 'What We\'re Building',
  contactTitle: 'Join Our Journey',
  services: [
    {
      title: 'MVP Development',
      description: 'Rapid prototyping and minimum viable product development to validate your ideas quickly.',
      icon: '🚀'
    },
    {
      title: 'Scalable Architecture',
      description: 'Building robust, scalable systems that grow with your startup from day one.',
      icon: '🏗️'
    },
    {
      title: 'Growth Hacking',
      description: 'Data-driven growth strategies and marketing automation to accelerate your user acquisition.',
      icon: '📈'
    }
  ],
  contacts: [
    {
      title: 'Investors',
      description: 'Interested in our Series A? Let\'s talk.',
      icon: '💰',
      action: 'View Deck'
    },
    {
      title: 'Talent',
      description: 'Join our team of innovators and builders.',
      icon: '🌟',
      action: 'See Openings'
    },
    {
      title: 'Partners',
      description: 'Let\'s build something amazing together.',
      icon: '🤝',
      action: 'Partner With Us'
    }
  ],
  footerText: 'InnovateTech - Building the future, one line of code at a time.'
}; 