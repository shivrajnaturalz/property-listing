import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/inquiries');
      setInquiries(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setLoading(false);
    }
  };

  const handleRespond = async () => {
    try {
      await axios.put(`http://localhost:5000/api/inquiries/${selectedInquiry._id}`, {
        status: 'responded',
        response,
      });
      fetchInquiries();
      setOpenDialog(false);
      alert('Response sent successfully!');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Inquiry Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Property</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry._id}>
                <TableCell>{inquiry.property?.title}</TableCell>
                <TableCell>{inquiry.user?.fullName}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.message.substring(0, 30)}...</TableCell>
                <TableCell>
                  <Chip
                    label={inquiry.status}
                    color={inquiry.status === 'pending' ? 'warning' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      setOpenDialog(true);
                    }}
                  >
                    Respond
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Response Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Respond to Inquiry</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'textSecondary' }}>
            Property: {selectedInquiry?.property?.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'textSecondary' }}>
            From: {selectedInquiry?.user?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Message:</strong> {selectedInquiry?.message}
          </Typography>
          <TextField
            fullWidth
            label="Your Response"
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleRespond} variant="contained" color="primary">
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Inquiries;
