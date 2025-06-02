import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';

export interface ServiceItem {
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Service icon (React element or emoji string) */
  icon: React.ReactElement | string;
  /** Button text for this service */
  buttonText?: string;
  /** Callback when service button is clicked */
  onButtonClick?: () => void;
}

export interface ServicesSectionProps {
  /** Section title */
  title?: string;
  /** Array of service items */
  services: ServiceItem[];
  /** Container max width */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background color */
  backgroundColor?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = 'Our Services',
  services,
  maxWidth = 'lg',
  backgroundColor = 'transparent',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor, py: 8 }}>
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
        
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {typeof service.icon === 'string' ? (
                      <Typography variant="h2" component="div" sx={{ fontSize: '3rem' }}>
                        {service.icon}
                      </Typography>
                    ) : (
                      service.icon
                    )}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={service.onButtonClick}
                  >
                    {service.buttonText || 'Learn More'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection; 