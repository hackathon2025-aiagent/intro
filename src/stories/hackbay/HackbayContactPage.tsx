import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  Chat as ChatIcon,
  Speed as SpeedIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import ContactForm, { ContactFormData, ContactFormConfig } from '../ContactForm';
import Header, { NavigationItem } from '../Header';

export interface HackbayContactPageProps {
  /** Theme name - handled by decorator */
  themeName?: string;
  /** Override company name */
  companyName?: string;
  /** Navigation callbacks */
  onProblemClick?: () => void;
  onPositionsClick?: () => void;
  onBackClick?: () => void;
  /** Custom API endpoint for form submission */
  apiEndpoint?: string;
  /** Callback when form is successfully submitted */
  onFormSuccess?: (data: ContactFormData) => void;
  /** Callback when form submission fails */
  onFormError?: (error: string) => void;
  /** Team email */
  teamEmail?: string;
  /** GitHub URL */
  githubUrl?: string;
}

const HackbayContactPage: React.FC<HackbayContactPageProps> = ({
  companyName = "TaskHub",
  onProblemClick,
  onPositionsClick,
  onBackClick,
  apiEndpoint = '/api/hackbay-contact',
  onFormSuccess,
  onFormError,
  teamEmail = 'hackbay@crimson206.dev',
  githubUrl = 'https://github.com/hackathon2025-aiagent',
}) => {
  const theme = useTheme();
  const [defaultPosition, setDefaultPosition] = useState<string>('');

  // Read position from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const position = urlParams.get('position');
    if (position) {
      setDefaultPosition(position);
    }
  }, []);

  const navigationItems: NavigationItem[] = [
    { 
      label: 'Problem', 
      onClick: onProblemClick || (() => console.log('Navigate to Problem page'))
    },
    { 
      label: 'Contact', 
      onClick: () => console.log('Current page - Contact')
    },
  ];

  const hackathonFormConfig: ContactFormConfig = {
    fields: {
      name: { 
        label: "Your Name", 
        required: true,
        helperText: "What should we call you?"
      },
      email: { 
        label: "Email Address", 
        required: false,
        helperText: "For follow-up discussions"
      },
      phone: { 
        label: "Phone Number (Recommended)", 
        required: false,
        helperText: "Faster communication via text/call",
        placeholder: "+1 (555) 123-4567"
      },
      skills: { 
        label: "Your Skills", 
        required: true,
        helperText: "e.g., React 3 years, Python CLI tools, Marketing campaigns",
        placeholder: "List your relevant skills and experience..."
      },
      inquiryType: {
        label: "Interested Position",
        defaultValue: defaultPosition,
        options: [
          { value: "python-cli", label: "Python CLI Developer" },
          { value: "typescript", label: "TypeScript Developer" },
          { value: "marketing", label: "Marketing & Business Developer" },
          { value: "general", label: "General Interest / Multiple Roles" }
        ]
      },
      subject: { 
        label: "Why Join Our Team?", 
        required: true,
        helperText: "What excites you about this project?",
        placeholder: "Tell us what motivates you to work on AI automation tools..."
      },
      message: { 
        label: "Additional Notes (Optional)", 
        required: false,
        helperText: "Anything else you'd like us to know?",
        placeholder: "Portfolio links, availability, questions, etc."
      }
    },
    showContactPreference: true,
    submitButtonText: "Join Our Team!",
    successMessage: "🎉 Application received! We'll reach out soon to discuss next steps.",
    errorMessage: "Oops! Something went wrong. Please try again or contact us directly."
  };

  const handleFormSuccess = (data: ContactFormData) => {
    console.log('Hackathon application submitted:', data);
    onFormSuccess?.(data);
  };

  const handleFormError = (error: string) => {
    console.error('Hackathon application error:', error);
    onFormError?.(error);
  };

  const quickFacts = [
    {
      icon: <SpeedIcon sx={{ color: theme.palette.primary.main }} />,
      title: "Fast Response",
      description: "We respond within hours during hackathon"
    },
    {
      icon: <GroupIcon sx={{ color: theme.palette.secondary.main }} />,
      title: "Immediate Start",
      description: "Join the team and start building right away"
    },
    {
      icon: <ChatIcon sx={{ color: theme.palette.success.main }} />,
      title: "Open Communication",
      description: "Direct access to team leads and project details"
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <Header 
        companyName={companyName}
        navigationItems={navigationItems}
        showMobileMenu={true}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Let's Build Together! 🚀
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 4, opacity: 0.9, maxWidth: '700px', mx: 'auto' }}
          >
            Ready to join a focused team building the future of AI automation? 
            Let's connect and see if we're a good match!
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip 
              label="HackBay 2025" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
            <Chip 
              label="Team Formation" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
            <Chip 
              label="2-Day Sprint" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Quick Facts */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            Why Contact Us?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {quickFacts.map((fact, index) => (
              <Paper 
                key={index}
                sx={{ 
                  p: 3, 
                  flex: 1,
                  textAlign: 'center',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {fact.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {fact.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {fact.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Contact Form */}
          <Box sx={{ flex: 2 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Join Our Team
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                Tell us about yourself and why you want to be part of our AI automation project. 
                We'll get back to you quickly!
              </Typography>
              <ContactForm
                config={hackathonFormConfig}
                apiEndpoint={apiEndpoint}
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </Paper>
          </Box>

          {/* Contact Information */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 4, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Get in Touch Directly
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Prefer to reach out directly? We're available on multiple channels 
                during the hackathon for immediate response.
              </Typography>

              {/* Direct Contact Methods */}
              <Box sx={{ mb: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    cursor: 'pointer',
                    '&:hover': { 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => window.open(`mailto:${teamEmail}`)}
                >
                  <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Email Team (Temporary)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {teamEmail}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      Active during hackathon period
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                    cursor: 'pointer',
                    '&:hover': { 
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => window.open(githubUrl, '_blank')}
                >
                  <GitHubIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Check Our Work
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      GitHub Projects & Code
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  }}
                >
                  <PhoneIcon sx={{ mr: 2, color: theme.palette.success.main }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Phone/Text Preferred
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Include your number in the form for fastest response
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Hackathon Timeline */}
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.warning.dark }}>
                  ⏰ Hackathon Timeline
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Team Formation:</strong> Next 24 hours
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Development:</strong> 2-day sprint
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Response Time:</strong> ASAP
                </Typography>
              </Paper>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HackbayContactPage; 