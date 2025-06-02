import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  alpha,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Psychology,
  Work,
  ContactMail,
  Rocket,
  Code,
  Speed,
  Group,
} from '@mui/icons-material';
import Header, { NavigationItem } from '../Header';

export interface HackbayMainPageProps {
  /** Theme name - handled by decorator */
  themeName?: string;
  /** Override company name */
  companyName?: string;
  /** Navigation callbacks */
  onProblemClick?: () => void;
  onPositionsClick?: () => void;
  onContactClick?: () => void;
  onMobileMenuClick?: () => void;
}

const HackbayMainPage: React.FC<HackbayMainPageProps> = ({
  companyName = "TaskHub",
  onProblemClick,
  onPositionsClick,
  onContactClick,
  onMobileMenuClick,
}) => {
  const theme = useTheme();

  const navigationItems: NavigationItem[] = [
    { 
      label: 'Problem', 
      onClick: onProblemClick || (() => console.log('Navigate to Problem page'))
    },
    { 
      label: 'Positions', 
      onClick: onPositionsClick || (() => console.log('Navigate to Positions page'))
    },
    { 
      label: 'Contact', 
      onClick: onContactClick || (() => console.log('Navigate to Contact page'))
    },
  ];

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "AI-Powered Development",
      description: "Task-specific AI agents that understand your enterprise context",
      action: "See the Problem",
      onClick: onProblemClick,
    },
    {
      icon: <Code sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      title: "CLI Integration",
      description: "Simple commands to load, export, and manage AI configurations",
      action: "Learn More",
      onClick: () => console.log('CLI Integration clicked'),
    },
    {
      icon: <Speed sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      title: "Instant Setup",
      description: "From 30 minutes to 30 seconds - get specialized AI instantly",
      action: "Quick Start",
      onClick: () => console.log('Quick Start clicked'),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <Header 
        companyName={companyName}
        navigationItems={navigationItems}
        showMobileMenu={true}
        onMobileMenuClick={onMobileMenuClick}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            Task-Specific AI Agents
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 4, opacity: 0.9, maxWidth: '800px', mx: 'auto' }}
          >
            Stop fighting with confused AI. Create specialized agents that excel at specific enterprise tasks.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={onProblemClick}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              See the Problem
            </Button>
            <Tooltip 
              title="Coming Soon 🚀" 
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }
                }
              }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                  px: 4,
                  py: 1.5,
                }}
              >
                Watch Demo
              </Button>
            </Tooltip>
          </Box>
        </Container>
      </Box>

      {/* Problem Preview Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          The Problem We're Solving
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Every enterprise faces the same AI dilemma: the more rules you add, the dumber your AI gets.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Paper 
              sx={{ 
                p: 4, 
                bgcolor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, color: theme.palette.error.main, fontWeight: 'bold' }}>
                Current Reality
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1">❌ 30+ minutes to find compliance rules</Typography>
                <Typography variant="body1">❌ AI gets confused with multiple contexts</Typography>
                <Typography variant="body1">❌ Rules conflict and cancel each other</Typography>
                <Typography variant="body1">❌ Developers avoid AI assistance</Typography>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper 
              sx={{ 
                p: 4, 
                bgcolor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, color: theme.palette.success.main, fontWeight: 'bold' }}>
                Our Solution
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1">✅ Specialized AI for each task</Typography>
                <Typography variant="body1">✅ 30-second context switching</Typography>
                <Typography variant="body1">✅ No rule conflicts</Typography>
                <Typography variant="body1">✅ Developers love using AI</Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onProblemClick}
            sx={{ px: 4, py: 1.5 }}
          >
            Deep Dive into the Problem
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.grey[500], 0.03), py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            How It Works
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: 1 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                      variant="outlined" 
                      onClick={feature.onClick}
                      sx={{ px: 3 }}
                    >
                      {feature.action}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Demo Command Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          Get Started in Seconds
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper 
            sx={{ 
              p: 4, 
              bgcolor: theme.palette.grey[900], 
              color: theme.palette.common.white,
              fontFamily: 'monospace',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: theme.palette.grey[400] }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27ca3f' }} />
              <Typography variant="caption" sx={{ ml: 2 }}>Terminal</Typography>
            </Box>
            
            <Box sx={{ '& .command': { color: theme.palette.primary.light }, '& .output': { color: theme.palette.success.light } }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Box component="span" sx={{ color: theme.palette.primary.light }}>$</Box>
                <Box component="span" className="command" sx={{ ml: 1 }}>npm install -g taskhub</Box>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <Box component="span" sx={{ color: theme.palette.primary.light }}>$</Box>
                <Box component="span" className="command" sx={{ ml: 1 }}>taskhub load datev-compliance</Box>
              </Typography>
              <Typography variant="body1" className="output" sx={{ mb: 1 }}>
                ✅ Loaded DATEV compliance expert
              </Typography>
              <Typography variant="body1" className="output">
                🚀 AI is now a compliance specialist
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Ready to try it? We're looking for early adopters.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onPositionsClick}
            startIcon={<Work />}
            sx={{ px: 4, py: 1.5 }}
          >
            Join Our Team
          </Button>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            Ready to Build the Future?
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Join us in creating specialized AI agents that actually understand enterprise context.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={onContactClick}
              startIcon={<ContactMail />}
              sx={{ px: 4, py: 1.5 }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={onPositionsClick}
              startIcon={<Group />}
              sx={{ px: 4, py: 1.5 }}
            >
              View Positions
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HackbayMainPage; 