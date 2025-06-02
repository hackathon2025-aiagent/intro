import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmotionalProblemPage, { EmotionalProblemPageProps } from './EmotionalProblemPage';
import { getTheme, ThemeName } from '../../themes';

const meta: Meta<typeof EmotionalProblemPage> = {
  title: 'Pages/EmotionalProblemPage',
  component: EmotionalProblemPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '😱 **Emotional Problem Page**: A dramatic, animated presentation that captures the real emotional journey developers go through when AI rules spiral out of control. Perfect for connecting with audiences on a visceral level during hackathon demos.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme from controls or default
      const themeName = (context.args.themeName as ThemeName) || 'indigo';
      const theme = getTheme(themeName);
      
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
  argTypes: {
    themeName: {
      control: 'select',
      options: ['light', 'dark', 'green', 'purple', 'orange', 'indigo', 'teal'],
      description: 'Theme to apply',
    },
    pageTitle: {
      control: 'text',
      description: 'Main page title',
    },
    pageSubtitle: {
      control: 'text',
      description: 'Page subtitle/description',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story - The Full Emotional Journey
export const DeveloperNightmare: Story = {
  args: {
    themeName: 'indigo',
  },
  parameters: {
    docs: {
      description: {
        story: '😱 **The Full Nightmare**: Experience the complete emotional rollercoaster of a developer realizing their AI is getting dumber with each rule they add. Features real-time animations and rule counter.',
      },
    },
  },
};

// Different Emotional Themes
export const DarkModeDesesperation: Story = {
  args: {
    themeName: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: '🌑 **Dark Mode Desperation**: Perfect for late-night development sessions. The dark theme amplifies the sense of dread and panic.',
      },
    },
  },
};

export const RedAlertPanic: Story = {
  args: {
    themeName: 'orange', // Orange has red tones that work well for panic
    pageTitle: "SYSTEM OVERLOAD",
    pageSubtitle: "When your AI agent becomes a compliance monster that devours logic and spits out confusion",
  },
  parameters: {
    docs: {
      description: {
        story: '🚨 **Red Alert Mode**: Maximum panic energy with urgent colors and catastrophic language. Great for emphasizing the crisis moment.',
      },
    },
  },
};

export const CorporateHell: Story = {
  args: {
    themeName: 'purple',
    pageTitle: "The Corporate Compliance Trap",
    pageSubtitle: "Your manager keeps asking for 'just one more rule' until your AI assistant becomes a bureaucratic nightmare",
  },
  parameters: {
    docs: {
      description: {
        story: '💼 **Corporate Hell**: Emphasizes the business/corporate pressure that leads to the problem. Perfect for B2B presentations.',
      },
    },
  },
};

// Industry-Specific Variations
export const SecurityTeamTerror: Story = {
  args: {
    themeName: 'dark',
    pageTitle: "The Security Team's Worst Fear",
    pageSubtitle: "When adding security rules makes your threat detection AI dumber, attackers win",
  },
  parameters: {
    docs: {
      description: {
        story: '🛡️ **Security Focus**: Tailored for cybersecurity audiences. Emphasizes the life-or-death nature of security decisions.',
      },
    },
  },
};

export const ComplianceCluster: Story = {
  args: {
    themeName: 'teal',
    pageTitle: "Compliance Requirements Gone Wild",
    pageSubtitle: "GDPR + HIPAA + SOX + PCI + DATEV = One very confused AI agent",
  },
  parameters: {
    docs: {
      description: {
        story: '📋 **Compliance Horror**: For heavily regulated industries. Shows how compliance requirements can conflict and confuse AI.',
      },
    },
  },
};

export const StartupChaos: Story = {
  args: {
    themeName: 'orange',
    pageTitle: "The Startup's AI Growth Nightmare",
    pageSubtitle: "We thought adding more features to our AI would make it better... we were so wrong",
  },
  parameters: {
    docs: {
      description: {
        story: '🚀 **Startup Chaos**: Captures the startup mentality of "move fast and break things" applied to AI configuration.',
      },
    },
  },
};

// Intensity Levels
export const MildConcern: Story = {
  args: {
    themeName: 'green',
    pageTitle: "Something Doesn't Feel Right...",
    pageSubtitle: "Your AI used to be so helpful. Now it asks clarifying questions about everything.",
  },
  parameters: {
    docs: {
      description: {
        story: '🤔 **Mild Concern**: A gentler introduction to the problem. Good for audiences new to AI development challenges.',
      },
    },
  },
};

export const FullPanic: Story = {
  args: {
    themeName: 'orange',
    pageTitle: "EVERYTHING IS ON FIRE! 🔥",
    pageSubtitle: "Your AI just asked you what programming language you want to use... for a SQL query. IT'S LOST ITS MIND!",
  },
  parameters: {
    docs: {
      description: {
        story: '🔥 **Maximum Panic**: Turn it up to 11! For dramatic presentations where you want to shock the audience.',
      },
    },
  },
};

// Developer Persona Specific
export const JuniorDevPanic: Story = {
  args: {
    themeName: 'purple',
    pageTitle: "Junior Dev's First AI Project",
    pageSubtitle: "I thought more rules meant better AI... my mentor is going to kill me",
  },
  parameters: {
    docs: {
      description: {
        story: '👶 **Junior Developer**: Captures the inexperience and fear of making mistakes early in career.',
      },
    },
  },
};

export const SeniorDevBurnout: Story = {
  args: {
    themeName: 'dark',
    pageTitle: "Senior Dev's 3 AM Realization",
    pageSubtitle: "20 years of experience and I still fell into the context overload trap... I need coffee",
  },
  parameters: {
    docs: {
      description: {
        story: '☕ **Senior Developer**: Shows that even experienced developers struggle with this. Relatability for senior audiences.',
      },
    },
  },
};

// Event-Specific Versions
export const HackathonDemo: Story = {
  args: {
    themeName: 'orange',
    pageTitle: "Why Your Last AI Project Failed",
    pageSubtitle: "And how to build specialized agents that actually work",
  },
  parameters: {
    docs: {
      description: {
        story: '🏆 **Hackathon Ready**: Perfect for competition presentations. Direct, impactful, solution-oriented.',
      },
    },
  },
};

export const InvestorPitch: Story = {
  args: {
    themeName: 'indigo',
    pageTitle: "The $50B AI Productivity Problem",
    pageSubtitle: "Companies spend millions on AI tools that get dumber with each customization",
  },
  parameters: {
    docs: {
      description: {
        story: '💰 **Investor Pitch**: Money-focused angle with market size implications. Professional but impactful.',
      },
    },
  },
};

// Interactive Demo
export const WatchItHappen: Story = {
  args: {
    themeName: 'indigo',
    pageTitle: "Watch AI Intelligence Degrade in Real-Time",
    pageSubtitle: "See the rule counter and AI responses change as complexity increases",
  },
  parameters: {
    docs: {
      description: {
        story: '📊 **Interactive Demo**: Emphasizes the real-time rule counter and AI response simulation. Great for live demos.',
      },
    },
  },
}; 