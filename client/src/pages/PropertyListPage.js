import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      const query = new URLSearchParams();
      if (filters.city) query.append('city', filters.city);
      if (filters.minPrice) query.append('minPrice', filters.minPrice);
      if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
      if (filters.propertyType) query.append('propertyType', filters.propertyType);

      const response = await axios.get(`http://localhost:5000/api/properties?${query}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Browse Properties
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="City"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Property Type"
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Properties Grid */}
      <Grid container spacing={3}>
        {properties.map((property) => (
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
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {property.location?.city}, {property.location?.state}
                </Typography>
                <Typography variant="h5" sx={{ color: '#1976d2', mb: 1, fontWeight: 'bold' }}>
                  ${property.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft
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

export default PropertyListPage;
