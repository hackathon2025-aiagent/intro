import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage, { HomePageProps } from './HomePage';
import { NavigationItem } from './Header';
import { getTheme, ThemeName } from '../themes';
import {
  traditionalBusinessTemplate,
  startupTemplate,
  consultingTemplate,
  healthcareTemplate,
} from '../templates/examples/company';

// Template mapping for string keys
const templateMap = {
  'traditional-business': traditionalBusinessTemplate,
  'startup': startupTemplate,
  'consulting': consultingTemplate,
  'healthcare': healthcareTemplate,
} as const;

type TemplateKey = keyof typeof templateMap;

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible homepage template system with pre-built templates for different industries.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme from controls or default
      const themeName = (context.args.themeName as ThemeName) || 'indigo';
      const theme = getTheme(themeName);
      
      // Convert template string to object if needed
      let template = context.args.template;
      if (typeof template === 'string') {
        if (template === 'none') {
          template = undefined;
        } else {
          template = templateMap[template as TemplateKey];
        }
      }
      
      return (
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story args={{ ...context.args, template }} />
          </ThemeProvider>
        </BrowserRouter>
      );
    },
  ],
  argTypes: {
    template: {
      control: 'select',
      options: ['none', 'ai-automation', 'traditional-business', 'startup', 'consulting', 'healthcare'],
      description: 'Pre-built template to use',
    },
    themeName: {
      control: 'select',
      options: ['light', 'dark', 'green', 'purple', 'orange', 'indigo', 'teal'],
      description: 'Theme to apply',
    },
    companyName: {
      control: 'text',
      description: 'Company name (overrides template)',
    },
    heroTitle: {
      control: 'text',
      description: 'Hero title (overrides template)',
    },
    heroSubtitle: {
      control: 'text',
      description: 'Hero subtitle (overrides template)',
    },
    showMobileMenu: {
      control: 'boolean',
      description: 'Whether to show mobile menu button',
    },
    navigationItems: {
      description: 'Custom navigation items (overrides template navigation)',
      table: {
        type: { summary: 'NavigationItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template-based Stories
export const AIAutomationCompany: Story = {
  args: {
    template: 'ai-automation',
    themeName: 'indigo',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🤖 **AI Automation Company**: Template for AI development tools and consulting services.',
      },
    },
  },
};

export const TraditionalBusiness: Story = {
  args: {
    template: 'traditional-business',
    themeName: 'light',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🏢 **Traditional Business**: Template with standard corporate services.',
      },
    },
  },
};

export const StartupCompany: Story = {
  args: {
    template: 'startup',
    themeName: 'orange',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🚀 **Startup Company**: Template with growth-focused messaging.',
      },
    },
  },
};

export const ConsultingFirm: Story = {
  args: {
    template: 'consulting',
    themeName: 'purple',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '💼 **Consulting Firm**: Template with strategic planning services.',
      },
    },
  },
};

export const HealthcareTech: Story = {
  args: {
    template: 'healthcare',
    themeName: 'teal',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🏥 **Healthcare Technology**: Template with medical services.',
      },
    },
  },
};

// Interactive Builder
export const TemplateThemeBuilder: Story = {
  args: {
    template: 'ai-automation',
    themeName: 'indigo',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🎨 **Interactive Builder**: Choose any template and theme combination using the Controls panel!',
      },
    },
  },
};

// Manual Configuration
export const ManualConfiguration: Story = {
  args: {
    template: 'none',
    themeName: 'purple',
    companyName: 'Custom Company',
    heroTitle: 'Build Your Own',
    heroSubtitle: 'Create a completely custom homepage',
    showMobileMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🛠️ **Manual Configuration**: Custom homepage with individual property overrides.',
      },
    },
  },
};

// Custom Navigation Demo
export const CustomNavigation: Story = {
  args: {
    template: 'ai-automation',
    themeName: 'indigo',
    showMobileMenu: true,
    navigationItems: [
      { label: 'Home', path: '/' },
      { label: 'Services', onClick: () => {
        const servicesElement = document.getElementById('services');
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: 'smooth' });
        }
      }},
      { label: 'Contact', path: '/contact' },
      { label: 'GitHub', onClick: () => window.open('https://github.com/microwiseai', '_blank') },
      { label: 'Documentation', onClick: () => alert('Navigate to docs (custom action)') },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '🔗 **Custom Navigation**: Demonstrates flexible navigation with different behaviors - page routes, scroll actions, external links, and custom onClick handlers.',
      },
    },
  },
}; 