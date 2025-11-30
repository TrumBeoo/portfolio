import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,

} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';



const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { playNavSound, playButtonSound } = useSound();

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/projects' },
    { name: 'Contact', to: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Trịnh Xuân Trung
        </Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <RouterLink to={item.to} style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton 
                onClick={playNavSound}
                sx={{ 
                  textAlign: 'center',
                  bgcolor: location.pathname === item.to ? 'primary.main' : 'transparent',
                  '&:hover': { bgcolor: location.pathname === item.to ? 'primary.dark' : 'action.hover' },
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  sx={{ 
                    color: location.pathname === item.to ? 'white' : 'inherit',
                    fontWeight: location.pathname === item.to ? 700 : 400,
                  }}
                />
              </ListItemButton>
            </RouterLink>
          </ListItem>
        ))}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon />}
            href="/assets/cv.pdf"
            download
            onClick={playButtonSound}
          >
            Download CV
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
        }}
      >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Logo */}
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  sx={{
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: 'linear-gradient(45deg, #2563eb, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Trịnh Xuân Trung
                </Typography>
              </RouterLink>

              {/* Desktop Menu */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  <RouterLink key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={playNavSound}
                      sx={{
                        color: location.pathname === item.to ? 'primary.main' : 'white',
                        fontWeight: location.pathname === item.to ? 700 : 500,
                        '&:hover': { color: 'primary.main' },
                        borderBottom: location.pathname === item.to ? '2px solid' : 'none',
                        borderColor: 'primary.main',
                      }}
                    >
                      {item.name}
                    </Button>
                  </RouterLink>
                ))}
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  href="/assets/cv.pdf"
                  download
                  onClick={playButtonSound}
                  sx={{ ml: 2 }}
                >
                  Download CV
                </Button>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
export default Navbar;