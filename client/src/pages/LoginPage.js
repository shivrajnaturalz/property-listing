import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Login
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
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
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mb: 2 }}>
          Login
        </Button>
      </Box>

      <Typography sx={{ textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register">
          Register
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
