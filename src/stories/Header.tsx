import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export interface NavigationItem {
  /** Display label */
  label: string;
  /** Path to navigate to */
  path?: string;
  /** Custom click handler (overrides path navigation) */
  onClick?: () => void;
}

export interface HeaderProps {
  /** Company name to display */
  companyName?: string;
  /** Navigation menu items */
  navigationItems?: NavigationItem[];
  /** Whether to show mobile menu button */
  showMobileMenu?: boolean;
  /** Callback when mobile menu is clicked */
  onMobileMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  companyName = 'Your Company',
  navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' }
  ],
  showMobileMenu = true,
  onMobileMenuClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleNavigationClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    }
    // If there's a custom onClick, it handles the navigation
    // If there's only a path, React Router Link will handle it
  };

  const handleMobileMenuClick = () => {
    if (onMobileMenuClick) {
      onMobileMenuClick();
    }
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          {companyName}
        </Typography>
        
        {isMobile && showMobileMenu ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuClick}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navigationItems.map((item) => (
              <Button 
                key={item.label} 
                color="inherit"
                component={item.path && !item.onClick ? Link : 'button'}
                to={item.path && !item.onClick ? item.path : undefined}
                onClick={() => handleNavigationClick(item)}
                sx={{
                  bgcolor: item.path && location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'transparent'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 