import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';

import Header, { NavigationItem } from './Header';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import { PageTemplate } from '../templates/index';
import { ThemeName } from '../themes';

export interface HomePageProps {
  /** Template to use for content (PageTemplate object or string key) */
  template?: PageTemplate | string;
  /** Theme name */
  themeName?: ThemeName;
  /** Whether to show mobile menu button */
  showMobileMenu?: boolean;
  /** Navigation items for header */
  navigationItems?: NavigationItem[];
  /** Hero section button callbacks */
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  /** Header navigation callbacks */
  onMobileMenuClick?: () => void;
  /** Override company name */
  companyName?: string;
  /** Override hero title */
  heroTitle?: string;
  /** Override hero subtitle */
  heroSubtitle?: string;
  /** Override services title */
  servicesTitle?: string;
  /** Override contact title */
  contactTitle?: string;
  /** Override footer text */
  footerText?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  template,
  themeName, // Accept but ignore (handled by decorator)
  showMobileMenu = true,
  navigationItems,
  onPrimaryClick,
  onSecondaryClick,
  onMobileMenuClick,
  companyName,
  heroTitle,
  heroSubtitle,
  servicesTitle,
  contactTitle,
  footerText,
}) => {
  const theme = useTheme();

  // Handle template (should be PageTemplate object by the time it gets here)
  const templateObj = (typeof template === 'object' ? template : undefined) as PageTemplate | undefined;

  // Use template or fallback to default values
  const config = {
    companyName: companyName || templateObj?.companyName || 'AI Automation Co.',
    navigationItems: navigationItems || templateObj?.navigationItems || [
      { label: 'Home', path: '/' },
      { label: 'Contact', path: '/contact' }
    ],
    heroTitle: heroTitle || templateObj?.heroTitle || 'AI-Powered Development Automation',
    heroSubtitle: heroSubtitle || templateObj?.heroSubtitle || 'We build tools that bridge human developers and AI agents for transparent, scalable automation',
    servicesTitle: servicesTitle || templateObj?.servicesTitle || 'Our Solutions',
    contactTitle: contactTitle || templateObj?.contactTitle || 'Get In Touch',
    services: templateObj?.services || [
      {
        title: 'AI Development Tools',
        description: 'Open-source libraries and tools that both humans and AI agents can use for micro-module development',
        icon: '🤖',
        buttonText: 'Explore Tools',
        onButtonClick: () => console.log('AI Development Tools clicked'),
      },
      {
        title: 'Custom Automation',
        description: 'Tailored AI agent solutions for your specific development workflows and business requirements',
        icon: '⚙️',
        buttonText: 'Request Custom',
        onButtonClick: () => console.log('Custom Automation clicked'),
      },
      {
        title: 'Integration Consulting',
        description: 'Expert guidance on adopting AI tools gradually while maintaining transparency and control',
        icon: '🔧',
        buttonText: 'Learn More',
        onButtonClick: () => console.log('Integration Consulting clicked'),
      },
    ],
    contacts: templateObj?.contacts || [
      {
        title: 'Contact Form',
        description: 'Send us a message through our contact form',
        icon: '📧',
        action: 'Go to Contact',
        onClick: () => {
          // Using React Router navigation
          window.location.href = '/contact';
        },
      },
      {
        title: 'Email',
        description: 'hackbay@crimson206.dev',
        icon: '📧',
        action: 'Send Email',
        onClick: () => window.open('mailto:hackbay@crimson206.dev'),
      },
      {
        title: 'GitHub',
        description: 'Check out our hackathon projects',
        icon: '🐙',
        action: 'Visit GitHub',
        onClick: () => window.open('https://github.com/hackathon2025-aiagent'),
      },
    ],
    footerText: footerText || templateObj?.footerText || 'Building the future of transparent AI automation.',
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Header 
        companyName={config.companyName}
        showMobileMenu={showMobileMenu}
        navigationItems={config.navigationItems}
        onMobileMenuClick={onMobileMenuClick}
      />

      {/* Hero Section */}
      <HeroSection
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        onPrimaryClick={onPrimaryClick || (() => console.log('Start Building clicked'))}
        onSecondaryClick={onSecondaryClick || (() => console.log('View Examples clicked'))}
      />

      {/* Services Section */}
      {config.services.length > 0 && (
        <Box id="services">
          <ServicesSection
            title={config.servicesTitle}
            services={config.services}
          />
        </Box>
      )}

      {/* Contact Section */}
      {config.contacts.length > 0 && (
        <ContactSection
          title={config.contactTitle}
          contacts={config.contacts}
        />
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: theme.palette.grey[900],
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">
            © 2024 {config.companyName}. {config.footerText}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;