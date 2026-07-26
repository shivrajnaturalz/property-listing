import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2" color="textSecondary">
              Find your dream property with ease.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography variant="body2">Browse Properties</Typography>
            <Typography variant="body2">Contact Us</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Support</Typography>
            <Typography variant="body2">Help Center</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Contact</Typography>
            <Typography variant="body2">Email: info@property.com</Typography>
            <Typography variant="body2">Phone: +1 234 567 8900</Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 3, borderTop: '1px solid #ddd', pt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 Property Listing. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
