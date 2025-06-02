import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export interface HeroSectionProps {
  /** Main hero title */
  title?: string;
  /** Hero subtitle/description */
  subtitle?: string;
  /** Primary button text */
  primaryButtonText?: string;
  /** Secondary button text */
  secondaryButtonText?: string;
  /** Callback when primary button is clicked */
  onPrimaryClick?: () => void;
  /** Callback when secondary button is clicked */
  onSecondaryClick?: () => void;
  /** Custom background gradient colors */
  gradientColors?: {
    start: string;
    end: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Welcome to Our Company',
  subtitle = 'We provide innovative solutions for your business needs',
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
  gradientColors,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const defaultGradient = {
    start: theme.palette.primary.main,
    end: theme.palette.primary.dark,
  };

  const gradient = gradientColors || defaultGradient;

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)`,
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="p"
          sx={{ mb: 4, opacity: 0.9 }}
        >
          {subtitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handlePrimaryClick}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            {primaryButtonText}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleSecondaryClick}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {secondaryButtonText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 