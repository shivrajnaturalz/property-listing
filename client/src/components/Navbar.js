import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(state => state.auth.user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            🏠 Property Listing
          </Button>
        </Box>
        <Button color="inherit" component={RouterLink} to="/properties">
          Browse Properties
        </Button>
        {user ? (
          <>
            <Button color="inherit" onClick={handleMenu}>
              {user.fullName}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem component={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem component={RouterLink} to="/saved">
                Saved Properties
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
