import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:5000/api/users/${userId}`, user);
      alert('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            My Profile
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              disabled={!editing}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={user.phone || ''}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              disabled={!editing}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="User Type"
              value={user.userType}
              disabled
            />
          </Box>

          {editing ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
