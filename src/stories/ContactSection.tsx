import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';

export interface ContactItem {
  /** Contact title */
  title: string;
  /** Contact description */
  description: string;
  /** Contact icon (React element or emoji string) */
  icon: React.ReactElement | string;
  /** Action button text */
  action?: string;
  /** Callback when contact item is clicked */
  onClick?: () => void;
}

export interface ContactSectionProps {
  /** Section title */
  title?: string;
  /** Array of contact items */
  contacts: ContactItem[];
  /** Background color */
  backgroundColor?: string;
  /** Container max width */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = 'Contact Us',
  contacts,
  backgroundColor = 'grey.100',
  maxWidth = 'md',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: backgroundColor, py: 8 }}>
      <Container maxWidth={maxWidth}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {title}
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {contacts.map((contact, index) => (
            <Grid 
              key={index} 
              size={{ xs: 12, sm: 4 }} 
              sx={{ 
                textAlign: 'center',
                cursor: contact.onClick ? 'pointer' : 'default',
                '&:hover': contact.onClick ? {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s',
                } : {},
              }}
              onClick={contact.onClick}
            >
              <Box sx={{ mb: 2 }}>
                {typeof contact.icon === 'string' ? (
                  <Typography variant="h2" component="div" sx={{ fontSize: '3rem' }}>
                    {contact.icon}
                  </Typography>
                ) : (
                  contact.icon
                )}
              </Box>
              <Typography variant="h6" gutterBottom>
                {contact.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {contact.description}
              </Typography>
              {contact.action && (
                <Typography variant="button" color="primary" sx={{ mt: 1, display: 'block' }}>
                  {contact.action}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection; 