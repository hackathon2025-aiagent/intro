import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import HackbayMainPage, { HackbayMainPageProps } from './HackbayMainPage';
import { getTheme, ThemeName } from '../../themes';

const meta: Meta<typeof HackbayMainPage> = {
  title: 'Hackbay/HackbayMainPage',
  component: HackbayMainPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '🏠 **Hackbay Main Page**: The complete landing page for TaskHub with integrated navigation to Problem, Positions, and Contact pages. Features a modern design with Header component integration and clear call-to-actions.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme from controls or default
      const themeName = (context.args.themeName as ThemeName) || 'indigo';
      const theme = getTheme(themeName);
      
      return (
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </BrowserRouter>
      );
    },
  ],
  argTypes: {
    themeName: {
      control: 'select',
      options: ['light', 'dark', 'green', 'purple', 'orange', 'indigo', 'teal'],
      description: 'Theme to apply',
    },
    companyName: {
      control: 'text',
      description: 'Company name in header',
    },
    onProblemClick: {
      description: 'Callback when Problem navigation is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onPositionsClick: {
      description: 'Callback when Positions navigation is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onContactClick: {
      description: 'Callback when Contact navigation is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
    onMobileMenuClick: action('Mobile menu clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🏠 **Default Landing Page**: The complete TaskHub landing page with all navigation working. Click any navigation item to see the actions in the Actions panel.',
      },
    },
  },
};

// Different Themes
export const DarkTheme: Story = {
  args: {
    themeName: 'dark',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🌑 **Dark Theme**: Perfect for developer-focused presentations and modern enterprise aesthetics.',
      },
    },
  },
};

export const OrangeTheme: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🧡 **Orange Theme**: Energetic and innovative feel perfect for hackathon presentations.',
      },
    },
  },
};

export const PurpleTheme: Story = {
  args: {
    themeName: 'purple',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '💜 **Purple Theme**: Creative and tech-forward theme for AI-focused presentations.',
      },
    },
  },
};

// Company Branding Variations
export const CustomCompany: Story = {
  args: {
    themeName: 'teal',
    companyName: 'AI Solutions Corp',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🏢 **Custom Branding**: Shows how the page adapts to different company names and branding.',
      },
    },
  },
};

export const StartupBranding: Story = {
  args: {
    themeName: 'green',
    companyName: 'AgentFlow',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🚀 **Startup Branding**: Fresh, growth-oriented branding for startup presentations.',
      },
    },
  },
};

// Interactive Demos
export const NavigationDemo: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: () => {
      alert('🎯 Would navigate to Problem Page\n\nThis would show:\n• Real developer pain points\n• AI rule conflicts\n• Context overload demos');
    },
    onPositionsClick: () => {
      alert('💼 Would navigate to Positions Page\n\nThis would show:\n• Open positions\n• Company culture\n• Application process');
    },
    onContactClick: () => {
      alert('📧 Would navigate to Contact Page\n\nThis would show:\n• Contact form\n• Team information\n• Office locations');
    },
    onMobileMenuClick: action('Mobile menu toggled'),
  },
  parameters: {
    docs: {
      description: {
        story: '🎯 **Interactive Navigation**: Click the navigation items to see what each page would contain. Perfect for demonstrating the full user journey.',
      },
    },
  },
};

// Hackathon-Specific Variations
export const HackathonPitch: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: () => {
      console.log('🎯 Navigating to dramatic problem presentation...');
      action('Problem page clicked - Hackathon Demo')();
    },
    onPositionsClick: () => {
      console.log('💼 Showing team building opportunities...');
      action('Positions page clicked - Join the team!')();
    },
    onContactClick: () => {
      console.log('📧 Opening contact for partnerships...');
      action('Contact page clicked - Partnerships')();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '🏆 **Hackathon Ready**: Optimized for competition presentations with engaging interactions and clear value proposition.',
      },
    },
  },
};

export const InvestorPresentation: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: () => {
      console.log('💰 Showing market problem and $50B opportunity...');
      action('Problem page clicked - Market Analysis')();
    },
    onPositionsClick: () => {
      console.log('🚀 Highlighting team expansion plans...');
      action('Positions page clicked - Scaling Team')();
    },
    onContactClick: () => {
      console.log('🤝 Opening investor relations contact...');
      action('Contact page clicked - Investment Inquiry')();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '💰 **Investor Focused**: Professional presentation emphasizing market opportunity and business scalability.',
      },
    },
  },
};

// Mobile-First Demo
export const MobileResponsive: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
    onMobileMenuClick: action('Mobile menu clicked - hamburger icon'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: '📱 **Mobile Responsive**: Shows how the page adapts to mobile devices with collapsible navigation.',
      },
    },
  },
};

// Problem-Focused Variant
export const ProblemFocused: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: () => {
      alert('🔥 Deep diving into the AI chaos!\n\n→ Real-time rule counter\n→ Developer panic animations\n→ Context overload demos');
      action('Navigate to Emotional Problem Page')();
    },
    onPositionsClick: action('Positions page clicked'),
    onContactClick: action('Contact page clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🎯 **Problem-Centric**: Emphasizes the problem navigation with enhanced feedback to show the dramatic problem presentation.',
      },
    },
  },
}; 