import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, MenuItem, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'buyer',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Register
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          select
          label="User Type"
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          sx={{ mb: 2 }}
        >
          <MenuItem value="buyer">Buyer</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
        </TextField>
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mb: 2 }}>
          Register
        </Button>
      </Box>

      <Typography sx={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;
