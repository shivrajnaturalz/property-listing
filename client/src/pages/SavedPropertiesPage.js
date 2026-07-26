import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      // Fetch full property details for each saved property
      const propertyDetails = await Promise.all(
        response.data.savedProperties.map(propId =>
          axios.get(`http://localhost:5000/api/properties/${propId}`)
        )
      );
      setSavedProperties(propertyDetails.map(res => res.data));
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Saved Properties
      </Typography>

      <Grid container spacing={3}>
        {savedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={property.images?.[0] || 'https://via.placeholder.com/300x200'}
                alt={property.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {property.title}
                </Typography>
                <Typography variant="h5" sx={{ color: '#1976d2', mb: 1, fontWeight: 'bold' }}>
                  ${property.price.toLocaleString()}
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/property/${property._id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SavedPropertiesPage;
