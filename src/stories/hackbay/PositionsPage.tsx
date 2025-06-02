import React from 'react';
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
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  Code,
  Web,
  Campaign,
  CheckCircle,
  Star,
  Speed,
  Group,
  ExpandMore,
  GitHub,
  Terminal,
  Lightbulb,
} from '@mui/icons-material';
import Header, { NavigationItem } from '../Header';

export interface PositionsPageProps {
  /** Theme name - handled by decorator */
  themeName?: string;
  /** Override company name */
  companyName?: string;
  /** Navigation callbacks */
  onBackClick?: () => void;
  onProblemClick?: () => void;
  onContactClick?: () => void;
  onApplyClick?: (position: string) => void;
}

const PositionsPage: React.FC<PositionsPageProps> = ({
  companyName = "TaskHub",
  onBackClick,
  onProblemClick,
  onContactClick,
  onApplyClick,
}) => {
  const theme = useTheme();

  const navigationItems: NavigationItem[] = [
    { 
      label: 'Problem', 
      onClick: onProblemClick || (() => console.log('Navigate to Problem page'))
    },
    { 
      label: 'Positions', 
      onClick: () => console.log('Current page - Positions')
    },
    { 
      label: 'Contact', 
      onClick: onContactClick || (() => console.log('Navigate to Contact page'))
    },
  ];

  const positions = [
    {
      id: 'python-cli',
      title: 'Python CLI Developer',
      subtitle: '1 position available',
      icon: <Terminal sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      description: 'Develop production-ready Python CLI application using Cleo framework',
      keyResponsibilities: [
        'Develop production-ready Python CLI application using Cleo framework',
        'Implement cross-platform file system operations and configuration management',
        'Handle PyPI packaging and distribution',
        'Integrate with AI tools and APIs'
      ],
      requiredSkills: [
        'Production CLI Tools: Experience shipping pip-installable CLI tools',
        'System Integration: appdirs, pathlib, environment PATH management',
        'Python Packaging: setup.py/pyproject.toml with entry_points',
        'Cursor AI: Active experience using Cursor AI for development'
      ],
      niceToHave: [
        'AI Agent usage history (Cursor AI requests count, etc.)',
        'Any Python packages you\'ve published',
        'Previous CLI tools or developer utilities'
      ],
      color: theme.palette.primary.main,
    },
    {
      id: 'typescript',
      title: 'TypeScript Developer',
      subtitle: '1 position available',
      icon: <Web sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      description: 'Build web platform for content discovery and distribution',
      keyResponsibilities: [
        'Build web platform for content discovery and distribution',
        'Implement file upload/download functionality with search capabilities',
        'Create Cloudflare Pages Functions for API endpoints',
        'Set up GitHub-based authentication system',
        'Configure search engine (Meilisearch) integration',
        'Export production-ready static build for Cloudflare Pages deployment'
      ],
      requiredSkills: [
        'Frontend Development: React/Vue/Vanilla JS for static site generation',
        'Cloudflare Functions: Serverless API development experience',
        'Database: MongoDB integration and basic text search',
        'File Operations: Upload/download with metadata management',
        'Rapid Prototyping: 2-day MVP development capability'
      ],
      niceToHave: [
        'Authentication: OAuth integration (GitHub preferred)',
        'Search Integration: MongoDB text search, Meilisearch, or similar',
        'Previous Cloudflare Pages/Workers experience',
        'Understanding of developer tools ecosystem',
        'CLI tool integration experience'
      ],
      color: theme.palette.secondary.main,
    },
    {
      id: 'marketing',
      title: 'Marketing & Business Developer',
      subtitle: '1 position available',
      icon: <Campaign sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      description: 'Create compelling pitch presentation and demo script',
      keyResponsibilities: [
        'Create compelling pitch presentation and demo script',
        'Develop go-to-market strategy and initial customer acquisition plan',
        'Prepare post-hackathon business materials (Fiverr gigs, landing pages)',
        'Handle competitive analysis and positioning'
      ],
      requiredSkills: [
        'Presentation: Strong public speaking and demo skills',
        'Business Strategy: Market analysis and customer development',
        'Content Creation: Pitch decks, marketing materials',
        'Developer Market: Understanding of developer tools space'
      ],
      niceToHave: [
        'Previous hackathon pitch experience',
        'Developer tools marketing experience',
        'Content creation portfolio',
        'Public speaking track record'
      ],
      color: theme.palette.success.main,
    },
  ];

  const teamCulture = [
    {
      title: 'Cursor AI First',
      description: 'All development done with AI assistance',
      icon: <Lightbulb />
    },
    {
      title: 'Fast Execution',
      description: '2-day sprint mentality',
      icon: <Speed />
    },
    {
      title: 'Independent Work',
      description: 'Parallel development on separate components',
      icon: <Group />
    },
    {
      title: 'Results-Oriented',
      description: 'Focus on working demos, not perfect code',
      icon: <CheckCircle />
    },
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
            Join Our Team
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 4, opacity: 0.9, maxWidth: '700px', mx: 'auto' }}
          >
            Build the future of AI automation tools. High-impact roles in a focused team.
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.8, fontStyle: 'italic' }}
          >
            HackBay 2025 • Immediate positions available
          </Typography>
        </Container>
      </Box>

      {/* Project Overview */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper 
          sx={{ 
            p: 4, 
            mb: 6,
            bgcolor: alpha(theme.palette.primary.main, 0.02),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
            🎯 Advanced AI Agent Development Framework
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', textAlign: 'center', color: theme.palette.text.secondary }}>
            We're developing an innovative CLI tool that provides developers with a robust, extensible foundation 
            for evolving AI Agent practices. Our framework enables progressive and accumulatable advancement in 
            AI-assisted development.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Chip 
              label="CLI-based framework" 
              sx={{ mr: 1, mb: 1 }} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label="Community knowledge sharing" 
              sx={{ mr: 1, mb: 1 }} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label="2-day sprint" 
              sx={{ mr: 1, mb: 1 }} 
              color="secondary" 
              variant="outlined" 
            />
          </Box>
        </Paper>
      </Container>

      {/* Positions Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
          Open Positions
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
          {positions.map((position) => (
            <Box key={position.id} sx={{ flex: 1 }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `2px solid ${alpha(position.color, 0.2)}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                    borderColor: position.color,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {position.icon}
                    <Typography variant="h5" component="h3" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                      {position.title}
                    </Typography>
                    <Chip 
                      label={position.subtitle} 
                      size="small" 
                      sx={{ bgcolor: alpha(position.color, 0.1), color: position.color }}
                    />
                  </Box>

                  <Typography 
                    variant="body1" 
                    sx={{ mb: 3, color: theme.palette.text.secondary, textAlign: 'center' }}
                  >
                    {position.description}
                  </Typography>

                  <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Key Responsibilities
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {position.keyResponsibilities.map((responsibility, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircle sx={{ fontSize: 16, color: position.color }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={responsibility}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Required Skills
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {position.requiredSkills.map((skill, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <Star sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={skill}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Nice to Have
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {position.niceToHave.map((item, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircle sx={{ fontSize: 16, color: theme.palette.grey[400] }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item}
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', p: 3, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => onApplyClick ? onApplyClick(position.id) : console.log(`Apply for ${position.title}`)}
                    sx={{ 
                      bgcolor: position.color,
                      '&:hover': {
                        bgcolor: alpha(position.color, 0.8),
                      },
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                    }}
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Team Culture */}
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
            ⚡ Team Culture & Requirements
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 6 }}>
            {teamCulture.map((item, index) => (
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
                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {item.description}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
              Selection Process
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  🚀 Immediate
                </Typography>
                <Typography variant="body2">Decision made on-site during recruitment</Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  💼 Portfolio Review
                </Typography>
                <Typography variant="body2">Live demonstration of relevant experience</Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  🧠 Technical Discussion
                </Typography>
                <Typography variant="body2">Brief assessment of problem-solving approach</Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

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
            🎪 Why Join Us?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 6 }}>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                🔬 Cutting-edge AI Tools
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Work on the latest AI automation technologies
              </Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                🎯 High-Impact Role
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Small, focused team with significant influence
              </Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                🚀 Future Opportunities
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Potential for continued collaboration post-hackathon
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            Apply Now: Approach us directly at the event with your portfolio and relevant experience examples.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => onApplyClick ? onApplyClick('any') : console.log('General application')}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              I'm Interested!
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={onContactClick}
              sx={{ px: 4, py: 1.5 }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PositionsPage; 