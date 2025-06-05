import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HackbayMainPage from './stories/hackbay/HackbayMainPage';
import EmotionalProblemPage from './stories/hackbay/EmotionalProblemPage';
// import PositionsPage from './stories/hackbay/PositionsPage';
import HackbayContactPage from './stories/hackbay/HackbayContactPage';
import { getTheme, ThemeName } from './themes';

export interface HackBayAppProps {
  /** Theme for the entire hackbay app */
  themeName?: ThemeName;
}

const HackBayApp: React.FC<HackBayAppProps> = ({
  themeName = 'teal'
}) => {
  const theme = getTheme(themeName);

  const handleProblemClick = () => {
    window.location.href = '/problem';
  };

  // const handlePositionsClick = () => {
  //   window.location.href = '/positions';
  // };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleBackToMain = () => {
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Main hackbay landing page */}
        <Route 
          path="/" 
          element={
            <HackbayMainPage
              companyName="TaskHub"
              themeName={themeName}
              onProblemClick={handleProblemClick}
              // onPositionsClick={handlePositionsClick}
              onContactClick={handleContactClick}
            />
          } 
        />
        
        {/* Problem page */}
        <Route 
          path="/problem" 
          element={
            <EmotionalProblemPage
              themeName={themeName}
              onBackClick={handleBackToMain}
              onContactClick={handleContactClick}
              // onPositionsClick={handlePositionsClick}
            />
          } 
        />

        {/* Positions page - Hidden */}
        {/* <Route 
          path="/positions" 
          element={
            <PositionsPage
              themeName={themeName}
              companyName="TaskHub"
              onProblemClick={handleProblemClick}
              onContactClick={handleContactClick}
              onApplyClick={(position) => {
                console.log(`Application submitted for: ${position}`);
                // Redirect to contact page for job application
                window.location.href = `/contact?position=${encodeURIComponent(position)}`;
              }}
            />
          } 
        /> */}

        {/* Contact page */}
        <Route 
          path="/contact" 
          element={
            <HackbayContactPage
              themeName={themeName}
              companyName="TaskHub"
              onProblemClick={handleProblemClick}
              // onPositionsClick={handlePositionsClick}
              onFormSuccess={(data) => {
                console.log('Contact form submitted:', data);
                // Could trigger email notification here
              }}
              onFormError={(error) => {
                console.error('Contact form error:', error);
              }}
            />
          } 
        />
      </Routes>
    </ThemeProvider>
  );
};

export default HackBayApp;
