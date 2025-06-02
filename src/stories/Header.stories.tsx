import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header, { NavigationItem } from './Header';

const defaultTheme = createTheme();

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive header component with navigation menu for company websites.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    companyName: {
      control: 'text',
      description: 'Company name displayed in the header',
    },
    navigationItems: {
      description: 'Array of navigation menu items with flexible click handlers',
      table: {
        type: { summary: 'NavigationItem[]' },
      },
    },
    showMobileMenu: {
      control: 'boolean',
      description: 'Whether to show mobile menu button on small screens',
    },
    onMobileMenuClick: {
      action: 'mobile-menu-clicked',
      description: 'Callback when mobile menu button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companyName: 'Your Company',
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'About', onClick: () => action('about-clicked')() },
      { label: 'Services', onClick: () => action('services-clicked')() },
      { label: 'Contact', path: '/contact' },
    ],
    showMobileMenu: true,
    onMobileMenuClick: action('mobile-menu-clicked'),
  },
};

export const TechCompany: Story = {
  args: {
    companyName: 'TechCorp Solutions',
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'Products', onClick: () => action('products-clicked')() },
      { label: 'Solutions', onClick: () => action('solutions-clicked')() },
      { label: 'Support', onClick: () => action('support-clicked')() },
      { label: 'Contact', path: '/contact' },
    ],
    showMobileMenu: true,
    onMobileMenuClick: action('mobile-menu-clicked'),
  },
};

export const MixedNavigation: Story = {
  args: {
    companyName: 'MicroWise AI',
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'Services', onClick: () => {
        // Scroll to services section
        const servicesElement = document.getElementById('services');
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: 'smooth' });
        }
        action('services-scroll-clicked')();
      }},
      { label: 'Contact', path: '/contact' },
      { label: 'GitHub', onClick: () => {
        window.open('https://github.com/microwiseai', '_blank');
        action('github-external-clicked')();
      }},
    ],
    showMobileMenu: true,
    onMobileMenuClick: action('mobile-menu-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🔗 **Mixed Navigation**: Demonstrates different navigation behaviors - page routes, scroll actions, and external links.',
      },
    },
  },
};

export const MinimalNavigation: Story = {
  args: {
    companyName: 'Minimal Corp',
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'About', onClick: () => action('about-clicked')() },
      { label: 'Contact', path: '/contact' },
    ],
    showMobileMenu: true,
    onMobileMenuClick: action('mobile-menu-clicked'),
  },
};

export const WithoutMobileMenu: Story = {
  args: {
    companyName: 'Desktop First',
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'About', onClick: () => action('about-clicked')() },
      { label: 'Services', onClick: () => action('services-clicked')() },
      { label: 'Portfolio', onClick: () => action('portfolio-clicked')() },
      { label: 'Contact', path: '/contact' },
    ],
    showMobileMenu: false,
  },
};
