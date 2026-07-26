import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Rating,
} from '@mui/material';
import axios from 'axios';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [inquiry, setInquiry] = useState({ message: '', phone: '', email: '' });

  useEffect(() => {
    fetchProperty();
    fetchReviews();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/property/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleInquiry = async () => {
    try {
      await axios.post('http://localhost:5000/api/inquiries', {
        property: id,
        user: localStorage.getItem('userId'),
        ...inquiry,
      });
      alert('Inquiry sent successfully!');
      setInquiry({ message: '', phone: '', email: '' });
    } catch (error) {
      console.error('Error sending inquiry:', error);
    }
  };

  if (!property) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Property Images */}
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src={property.images?.[0] || 'https://via.placeholder.com/600x400'}
            alt={property.title}
            sx={{ width: '100%', borderRadius: 1, mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {property.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            {property.description}
          </Typography>

          {/* Reviews */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
            Reviews
          </Typography>
          {reviews.map((review) => (
            <Card key={review._id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{review.user.fullName}</Typography>
                  <Rating value={review.rating} readOnly />
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Property Details & Contact */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                ${property.price.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Type:</strong> {property.propertyType}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Location:</strong> {property.location?.address}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Area:</strong> {property.area} sqft
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Owner:</strong> {property.owner.fullName}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Interested in this property?
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={inquiry.email}
                onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={inquiry.phone}
                onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={inquiry.message}
                onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button fullWidth variant="contained" color="primary" onClick={handleInquiry}>
                Send Inquiry
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetailPage;
