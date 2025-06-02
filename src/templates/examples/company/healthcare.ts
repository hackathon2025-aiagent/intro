import React from 'react';
import {
  LocalHospital as MedicalIcon,
  Science as ResearchIcon,
  HealthAndSafety as CareIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { PageTemplate } from './index';

export const healthcareTemplate: PageTemplate = {
  companyName: 'MedCare Solutions',
  navigationItems: [
    { label: 'Home', path: '/' },
    { label: 'Services', onClick: () => {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { label: 'Providers', onClick: () => {
      console.log('Providers clicked - implement provider portal');
    }},
    { label: 'Patients', onClick: () => {
      console.log('Patients clicked - implement patient portal');
    }},
    { label: 'Contact', path: '/contact' },
  ],
  heroTitle: 'Compassionate Healthcare Technology',
  heroSubtitle: 'Improving patient outcomes through innovative healthcare solutions and personalized care.',
  servicesTitle: 'Our Healthcare Services',
  contactTitle: 'Connect With Our Care Team',
  services: [
    {
      title: 'Telemedicine Platform',
      description: 'Connect with healthcare providers remotely through our secure, HIPAA-compliant platform.',
      icon: '🏥'
    },
    {
      title: 'Patient Management',
      description: 'Comprehensive patient record management and care coordination systems.',
      icon: '📋'
    },
    {
      title: 'Health Analytics',
      description: 'Advanced analytics and insights to improve patient outcomes and operational efficiency.',
      icon: '📊'
    }
  ],
  contacts: [
    {
      title: 'Patient Support',
      description: '24/7 support for all your healthcare needs',
      icon: '🩺',
      action: 'Get Help'
    },
    {
      title: 'Provider Portal',
      description: 'Healthcare professional access',
      icon: '👨‍⚕️',
      action: 'Login'
    },
    {
      title: 'Emergency',
      description: 'Urgent medical assistance',
      icon: '🚨',
      action: 'Call 911'
    }
  ],
  footerText: 'MedCare Solutions - Your health, our priority.'
}; 