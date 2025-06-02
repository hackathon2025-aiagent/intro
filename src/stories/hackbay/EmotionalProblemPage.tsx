import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
  useTheme,
  alpha,
  Fade,
  keyframes,
} from '@mui/material';
import {
  SentimentVeryDissatisfied,
  Warning,
  PsychologyAlt,
  Help,
  AccessTime,
  BugReport,
  Error,
} from '@mui/icons-material';
import Header, { NavigationItem } from '../Header';

export interface EmotionalProblemPageProps {
  /** Theme name - handled by decorator */
  themeName?: string;
  /** Override page title */
  pageTitle?: string;
  /** Override subtitle */
  pageSubtitle?: string;
  /** Override company name */
  companyName?: string;
  /** Navigation callbacks */
  onProblemClick?: () => void;
  onPositionsClick?: () => void;
  onContactClick?: () => void;
  onBackClick?: () => void;
}

// Keyframes for animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const panic = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-2deg); }
  50% { transform: scale(1.05) rotate(2deg); }
  75% { transform: scale(1.1) rotate(-1deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const spiral = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 1; }
  50% { transform: rotate(180deg) scale(1.2); opacity: 0.7; }
  100% { transform: rotate(360deg) scale(1); opacity: 1; }
`;

const EmotionalProblemPage: React.FC<EmotionalProblemPageProps> = ({
  pageTitle = "The Developer's Nightmare",
  pageSubtitle = "When adding more rules makes your AI agent dumber... and you know it's happening but can't stop",
  companyName = "TaskHub",
  onProblemClick,
  onPositionsClick,
  onContactClick,
  onBackClick,
}) => {
  const theme = useTheme();
  const [showPanic, setShowPanic] = useState(false);
  const [ruleCount, setRuleCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setShowPanic(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRuleCount(prev => (prev >= 50 ? 3 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const navigationItems: NavigationItem[] = [
    { 
      label: 'Problem', 
      onClick: onProblemClick || (() => console.log('Current page - Problem'))
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

  return (
    <Box sx={{ flexGrow: 1, bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <Header 
        companyName={companyName}
        navigationItems={navigationItems}
        showMobileMenu={true}
      />

      {/* Dramatic Hero Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.error.main, 0.05),
          py: 8,
          borderBottom: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              textAlign: 'center', 
              mb: 3,
              fontWeight: 'bold',
              color: theme.palette.error.main,
              animation: showPanic ? `${shake} 0.5s ease-in-out infinite` : 'none',
            }}
          >
            {pageTitle}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              textAlign: 'center', 
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}
          >
            {pageSubtitle}
          </Typography>

          {/* Floating anxious emojis */}
          <Box sx={{ position: 'absolute', top: '20%', left: '10%', fontSize: '2rem', animation: `${spiral} 3s ease-in-out infinite` }}>
            😰
          </Box>
          <Box sx={{ position: 'absolute', top: '60%', right: '15%', fontSize: '1.5rem', animation: `${spiral} 4s ease-in-out infinite reverse` }}>
            😫
          </Box>
        </Container>
      </Box>

      {/* The Developer's Dilemma */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
          The Developer's Internal Monologue
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Thought Bubble 1 */}
          <Box sx={{ flex: 1 }}>
            <Card 
              sx={{ 
                height: '100%',
                border: `2px solid ${theme.palette.warning.main}`,
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                animation: showPanic ? `${panic} 2s ease-in-out infinite` : 'none',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <SentimentVeryDissatisfied sx={{ fontSize: 40, color: theme.palette.warning.main }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.warning.main }}>
                    "We need more compliance rules!"
                  </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  The manager wants DATEV compliance, security scanning, and documentation standards all at once...
                </Typography>

                <Box sx={{ 
                  p: 2, 
                  bgcolor: alpha(theme.palette.grey[500], 0.1), 
                  borderRadius: 1,
                  border: `1px dashed ${theme.palette.warning.main}`,
                }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                    💭 "I'll just add this one more rule... What could go wrong?"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Thought Bubble 2 */}
          <Box sx={{ flex: 1 }}>
            <Card 
              sx={{ 
                height: '100%',
                border: `2px solid ${theme.palette.error.main}`,
                bgcolor: alpha(theme.palette.error.main, 0.05),
                animation: showPanic ? `${shake} 1s ease-in-out infinite` : 'none',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Help sx={{ fontSize: 40, color: theme.palette.error.main }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.error.main }}>
                    "Wait... is my AI getting dumber?"
                  </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Each new rule makes the AI more confused. It's like adding ingredients to soup until it tastes like nothing.
                </Typography>

                <Box sx={{ 
                  p: 2, 
                  bgcolor: alpha(theme.palette.error.main, 0.1), 
                  borderRadius: 1,
                  border: `2px solid ${theme.palette.error.main}`,
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.error.main }}>
                    😱 "OH NO! I'm creating a monster!"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* The Spiral of Despair */}
      <Box sx={{ bgcolor: alpha(theme.palette.grey[900], 0.05), py: 6 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              fontWeight: 'bold',
              color: theme.palette.error.main,
            }}
          >
            The Vicious Cycle
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: alpha(theme.palette.info.main, 0.05),
                border: `1px solid ${theme.palette.info.main}`,
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.info.main }}>
                  Step 1: Hope
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>😊</Typography>
                <Typography variant="body2">
                  "This new rule will fix everything!"
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                border: `1px solid ${theme.palette.warning.main}`,
                animation: `${panic} 1.5s ease-in-out infinite`,
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.warning.main }}>
                  Step 2: Doubt
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>🤔</Typography>
                <Typography variant="body2">
                  "Hmm, the AI seems confused now..."
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: alpha(theme.palette.error.main, 0.05),
                border: `2px solid ${theme.palette.error.main}`,
                animation: `${shake} 0.5s ease-in-out infinite`,
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.main }}>
                  Step 3: Panic
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>😱</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  "I'VE MADE IT WORSE!"
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Endless Loop Arrow */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: theme.palette.error.main,
                animation: `${spiral} 2s linear infinite`,
              }}
            >
              ↻
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic', color: theme.palette.text.secondary }}>
              *Adds another rule to fix the problem*
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Real-time Rule Counter Demo */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          Watch the AI Get Dumber in Real-Time
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ 
              p: 3, 
              bgcolor: theme.palette.grey[50],
              border: `1px solid ${theme.palette.grey[300]}`,
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Current Rules: {ruleCount}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                {Array.from({ length: Math.min(ruleCount, 15) }, (_, i) => (
                  <Chip 
                    key={i}
                    label={`Rule ${i + 1}`} 
                    size="small" 
                    sx={{ 
                      fontSize: '0.7rem',
                      bgcolor: ruleCount > 10 ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.success.main, 0.1),
                      color: ruleCount > 10 ? theme.palette.error.main : theme.palette.success.main,
                    }} 
                  />
                ))}
                {ruleCount > 15 && (
                  <Chip 
                    label={`+${ruleCount - 15} more...`}
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.error.main, 0.2),
                      color: theme.palette.error.main,
                      animation: `${shake} 0.3s ease-in-out infinite`,
                    }}
                  />
                )}
              </Box>
              
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                AI Confusion Level: {Math.min(Math.round((ruleCount / 50) * 100), 100)}%
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ 
              p: 3,
              bgcolor: ruleCount > 20 ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.success.main, 0.05),
              border: `2px solid ${ruleCount > 20 ? theme.palette.error.main : theme.palette.success.main}`,
              animation: ruleCount > 30 ? `${panic} 1s ease-in-out infinite` : 'none',
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                AI Response Quality:
              </Typography>
              
              {ruleCount <= 5 && (
                <Typography variant="body1" sx={{ color: theme.palette.success.main }}>
                  😊 "Great! I understand exactly what you need."
                </Typography>
              )}
              
              {ruleCount > 5 && ruleCount <= 15 && (
                <Typography variant="body1" sx={{ color: theme.palette.warning.main }}>
                  🤔 "Um... let me think about which rule applies here..."
                </Typography>
              )}
              
              {ruleCount > 15 && ruleCount <= 30 && (
                <Typography variant="body1" sx={{ color: theme.palette.error.main }}>
                  😵‍💫 "I'm confused... Do you want DATEV compliance OR security scanning OR...?"
                </Typography>
              )}
              
              {ruleCount > 30 && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.error.main,
                    fontWeight: 'bold',
                    animation: `${shake} 0.2s ease-in-out infinite`,
                  }}
                >
                  🤯 "ERROR: RULE CONFLICT OVERLOAD. BRAIN.EXE HAS STOPPED WORKING."
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* The Revelation */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 6 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            The Moment of Clarity
          </Typography>
          
          <Fade in={showPanic} timeout={3000}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center',
              bgcolor: alpha(theme.palette.success.main, 0.05),
              border: `2px solid ${theme.palette.success.main}`,
            }}>
              <Typography variant="h4" sx={{ mb: 3 }}>💡</Typography>
              <Typography variant="h5" sx={{ mb: 3, color: theme.palette.success.main, fontWeight: 'bold' }}>
                "What if I could have SPECIALIZED AI agents instead?"
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: '600px', mx: 'auto' }}>
                One expert for compliance, one for security, one for docs. Each focused, each brilliant at their job.
                No more context overload. No more confused AI.
              </Typography>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default EmotionalProblemPage; 