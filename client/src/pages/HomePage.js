import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 8 }}>
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Find Your Dream Home
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Browse thousands of properties and find the perfect one for you
          </Typography>
          <Button
            component={RouterLink}
            to="/properties"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            Browse Properties
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: '1000+ Properties', desc: 'Browse from thousands of verified listings' },
            { title: 'Easy Search', desc: 'Advanced filters to find exactly what you need' },
            { title: 'Safe Transactions', desc: 'Secure booking and payment process' },
            { title: '24/7 Support', desc: 'Our team is always here to help you' },
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
