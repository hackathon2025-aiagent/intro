import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Email as EmailIcon,
  Business as BusinessIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import ContactForm, { ContactFormData } from './ContactForm';

export interface ContactPageProps {
  /** Custom API endpoint for form submission */
  apiEndpoint?: string;
  /** Callback when form is successfully submitted */
  onFormSuccess?: (data: ContactFormData) => void;
  /** Callback when form submission fails */
  onFormError?: (error: string) => void;
  /** Company name to display */
  companyName?: string;
  /** Company email */
  companyEmail?: string;
  /** GitHub URL */
  githubUrl?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({
  apiEndpoint,
  onFormSuccess,
  onFormError,
  companyName = 'TaskHub',
  companyEmail = 'hackbay@crimson206.dev',
  githubUrl = 'https://github.com/hackathon2025-aiagent',
}) => {
  const theme = useTheme();

  const handleFormSuccess = (data: ContactFormData) => {
    console.log('Form submitted successfully:', data);
    onFormSuccess?.(data);
  };

  const handleFormError = (error: string) => {
    console.error('Form submission error:', error);
    onFormError?.(error);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 2 
            }}
          >
            Contact {companyName}
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Ready to transform your development workflow with transparent AI automation? 
            Let's discuss how we can help.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Send us a message
              </Typography>
              <ContactForm
                apiEndpoint={apiEndpoint}
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 4, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Get in touch
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  We're here to help you build better software with AI. 
                  Reach out for business inquiries, technical support, or partnerships.
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Direct Contact */}
              <Box sx={{ mb: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.primary.main }
                  }}
                  onClick={() => window.open(`mailto:${companyEmail}`)}
                >
                  <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {companyEmail}
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.primary.main }
                  }}
                  onClick={() => window.open(githubUrl, '_blank')}
                >
                  <GitHubIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Open Source
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Check our GitHub projects
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Business Hours */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Response Time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We typically respond within 24 hours during business days.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage; 