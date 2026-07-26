import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Home as HomeIcon, Mail as MailIcon, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Properties from './pages/Properties';
import Inquiries from './pages/Inquiries';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const DRAWER_WIDTH = 250;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Users', icon: <PeopleIcon />, path: '/users' },
    { label: 'Properties', icon: <HomeIcon />, path: '/properties' },
    { label: 'Inquiries', icon: <MailIcon />, path: '/inquiries' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* AppBar */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                🏠 Property Admin Panel
              </Typography>
              <IconButton color="inherit">
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                marginTop: '64px',
              },
            }}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginTop: '64px',
              marginLeft: drawerOpen ? DRAWER_WIDTH : 0,
              transition: 'margin-left 0.3s ease',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/inquiries" element={<Inquiries />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
