import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import PositionsPage, { PositionsPageProps } from './PositionsPage';
import { getTheme, ThemeName } from '../../themes';

const meta: Meta<typeof PositionsPage> = {
  title: 'Hackbay/PositionsPage',
  component: PositionsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '💼 **Positions Page**: Complete hackathon team recruitment page with 3 position cards (Python CLI, TypeScript, Marketing). Features expandable details, team culture overview, and immediate application process.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme from controls or default
      const themeName = (context.args.themeName as ThemeName) || 'orange';
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
    onApplyClick: {
      description: 'Callback when any Apply button is clicked',
      table: {
        type: { summary: '(position: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked for position'),
  },
  parameters: {
    docs: {
      description: {
        story: '💼 **Default Recruitment Page**: Complete view of all 3 positions with expandable details. Perfect for hackathon team building presentations.',
      },
    },
  },
};

// Interactive Application Demo
export const InteractiveApplication: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: action('Navigate to Problem page'),
    onContactClick: action('Navigate to Contact page'),
    onApplyClick: (position: string) => {
      const positionNames = {
        'python-cli': 'Python CLI Developer',
        'typescript': 'TypeScript Developer',
        'marketing': 'Marketing & Business Developer',
        'any': 'General Interest'
      };
      
      const positionName = positionNames[position as keyof typeof positionNames] || position;
      
      alert(`🎯 Application Submitted for: ${positionName}\n\n` +
            `Next Steps:\n` +
            `• Portfolio review on-site\n` +
            `• Technical discussion\n` +
            `• Immediate team integration\n\n` +
            `Bring your relevant work examples!`);
      
      action(`Applied for: ${positionName}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '🎯 **Interactive Applications**: Click any "Apply Now" button to see the realistic application flow for hackathon recruitment.',
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
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🌑 **Dark Theme**: Professional dark theme perfect for developer-focused hackathon presentations.',
      },
    },
  },
};

export const IndigoTheme: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '💙 **Indigo Theme**: Corporate-friendly theme for formal hackathon presentations.',
      },
    },
  },
};

export const PurpleTheme: Story = {
  args: {
    themeName: 'purple',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '💜 **Purple Theme**: Creative theme for innovation-focused hackathon teams.',
      },
    },
  },
};

// Position-Specific Focus
export const PythonDeveloperFocus: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: (position: string) => {
      if (position === 'python-cli') {
        alert('🐍 Python CLI Developer Application\n\n' +
              'Perfect match! We need:\n' +
              '• CLI tool development experience\n' +
              '• Python packaging expertise\n' +
              '• Cursor AI usage\n\n' +
              'Show us your pip packages and CLI tools!');
      } else {
        alert(`Applied for: ${position}`);
      }
      action(`Applied for: ${position}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '🐍 **Python Developer Focused**: Demonstrates targeted recruitment for Python CLI developers with specific feedback.',
      },
    },
  },
};

export const TypeScriptDeveloperFocus: Story = {
  args: {
    themeName: 'teal',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: (position: string) => {
      if (position === 'typescript') {
        alert('⚛️ TypeScript Developer Application\n\n' +
              'Great choice! We need:\n' +
              '• React/Vue frontend skills\n' +
              '• Cloudflare Functions experience\n' +
              '• Rapid prototyping ability\n\n' +
              'Show us your web apps and serverless projects!');
      } else {
        alert(`Applied for: ${position}`);
      }
      action(`Applied for: ${position}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '⚛️ **TypeScript Developer Focused**: Targeted for frontend/fullstack developers with specific skill requirements.',
      },
    },
  },
};

export const MarketingFocus: Story = {
  args: {
    themeName: 'green',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: (position: string) => {
      if (position === 'marketing') {
        alert('📢 Marketing & Business Developer Application\n\n' +
              'Excellent! We need:\n' +
              '• Pitch presentation skills\n' +
              '• Developer market understanding\n' +
              '• Go-to-market strategy\n\n' +
              'Show us your pitch decks and marketing wins!');
      } else {
        alert(`Applied for: ${position}`);
      }
      action(`Applied for: ${position}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '📢 **Marketing Focused**: Targeted for business development and marketing professionals with pitch experience.',
      },
    },
  },
};

// Company Branding Variations
export const StartupBranding: Story = {
  args: {
    themeName: 'orange',
    companyName: 'AgentFlow',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🚀 **Startup Branding**: Shows how the page adapts to different company names for various startup teams.',
      },
    },
  },
};

export const CorporateBranding: Story = {
  args: {
    themeName: 'indigo',
    companyName: 'AI Solutions Corp',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: '🏢 **Corporate Branding**: Professional corporate styling for enterprise-focused hackathon teams.',
      },
    },
  },
};

// Mobile Experience
export const MobileView: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: action('Apply clicked'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: '📱 **Mobile Optimized**: Shows how position cards stack on mobile devices for on-the-go hackathon participants.',
      },
    },
  },
};

// Hackathon Scenarios
export const UrgentRecruitment: Story = {
  args: {
    themeName: 'orange',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: (position: string) => {
      alert('🚨 URGENT: Team Formation Deadline in 2 Hours!\n\n' +
            `Position: ${position}\n\n` +
            'We need to finalize our team today.\n' +
            'Can you start immediately?\n\n' +
            'Come to our booth NOW for instant interview!');
      action(`URGENT application: ${position}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '🚨 **Urgent Recruitment**: Simulates last-minute team formation scenarios common in hackathons.',
      },
    },
  },
};

export const TeamComplete: Story = {
  args: {
    themeName: 'green',
    companyName: 'TaskHub',
    onProblemClick: action('Problem page clicked'),
    onContactClick: action('Contact page clicked'),
    onApplyClick: (position: string) => {
      if (position === 'python-cli') {
        alert('❌ Position Filled\n\nOur Python CLI Developer position has been filled.\n\nBut we still need TypeScript and Marketing developers!');
      } else {
        alert('✅ Position Still Available\n\nGreat timing! This position is still open.\n\nCome to our booth for immediate interview!');
      }
      action(`Application attempt: ${position}`)();
    },
  },
  parameters: {
    docs: {
      description: {
        story: '✅ **Partial Team Formation**: Shows realistic scenario where some positions are filled during hackathon recruitment.',
      },
    },
  },
}; 