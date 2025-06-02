import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContactPage from './ContactPage';

const meta: Meta<typeof ContactPage> = {
  title: 'Pages/ContactPage',
  component: ContactPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Contact page for MicroWise AI with contact form and company information.',
      },
    },
  },
  argTypes: {
    companyName: {
      control: 'text',
      description: 'Company name to display in the header',
    },
    companyEmail: {
      control: 'text',
      description: 'Company email address for contact',
    },
    githubUrl: {
      control: 'text',
      description: 'GitHub URL for open source projects',
    },
    apiEndpoint: {
      control: 'text',
      description: 'API endpoint for form submission',
    },
  },
  args: {
    onFormSuccess: action('form-success'),
    onFormError: action('form-error'),
  },
};

export default meta;
type Story = StoryObj<typeof ContactPage>;

export const Default: Story = {
  args: {
    companyName: 'MicroWise AI',
    companyEmail: 'info@microwiseai.com',
    githubUrl: 'https://github.com/microwiseai',
    apiEndpoint: '/api/contact',
  },
};

export const CustomCompany: Story = {
  args: {
    companyName: 'Custom AI Solutions',
    companyEmail: 'hello@customai.com',
    githubUrl: 'https://github.com/customai',
    apiEndpoint: '/api/custom-contact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact page with custom company information.',
      },
    },
  },
};

export const DevelopmentMode: Story = {
  args: {
    companyName: 'MicroWise AI',
    companyEmail: 'info@microwiseai.com',
    githubUrl: 'https://github.com/microwiseai',
    apiEndpoint: 'http://localhost:8787/api/contact', // Back to 8787 to match running server
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact page configured for local development with Cloudflare Workers.',
      },
    },
  },
};

export const WithFormValidation: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try submitting the form without required fields to see validation in action.',
      },
    },
  },
  play: async () => {
    // This story is for testing form validation manually
    console.log('Try submitting the form without filling required fields to see validation.');
  },
}; 