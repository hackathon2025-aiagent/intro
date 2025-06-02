import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HackbayContactPage from './HackbayContactPage';

const meta: Meta<typeof HackbayContactPage> = {
  title: 'Hackbay/ContactPage',
  component: HackbayContactPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'TaskHub team application contact page with specialized form for hackathon recruitment.',
      },
    },
  },
  argTypes: {
    themeName: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme for the page',
    },
    companyName: {
      control: 'text',
      description: 'Company name to display',
    },
    teamEmail: {
      control: 'text',
      description: 'Team contact email',
    },
    githubUrl: {
      control: 'text',
      description: 'GitHub repository URL',
    },
    apiEndpoint: {
      control: 'text',
      description: 'API endpoint for form submission',
    },
  },
  args: {
    onProblemClick: action('problem-clicked'),
    onPositionsClick: action('positions-clicked'),
    onFormSuccess: action('form-success'),
    onFormError: action('form-error'),
  },
};

export default meta;
type Story = StoryObj<typeof HackbayContactPage>;

export const Default: Story = {
  args: {
    themeName: 'light',
    companyName: 'TaskHub',
    teamEmail: 'hackbay@crimson206.dev',
    githubUrl: 'https://github.com/hackathon2025-aiagent',
    apiEndpoint: '/api/hackbay-contact',
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    themeName: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact page with dark theme.',
      },
    },
  },
};

export const Development: Story = {
  args: {
    ...Default.args,
    apiEndpoint: 'http://localhost:8000/api/hackbay-contact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact page configured for local development testing.',
      },
    },
  },
};

export const Production: Story = {
  args: {
    ...Default.args,
    apiEndpoint: 'https://taskhub.crimson206.dev/api/hackbay-contact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact page configured for production environment.',
      },
    },
  },
};

export const WithFormTest: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test form validation and submission behavior. Try submitting with missing required fields.',
      },
    },
  },
  play: async () => {
    console.log('Form testing story loaded. Try filling out and submitting the form to test API integration.');
  },
}; 