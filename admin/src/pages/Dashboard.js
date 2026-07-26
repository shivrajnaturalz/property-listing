import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentInquiries();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentInquiries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/inquiries');
      setRecentInquiries(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  if (!stats) return <Typography>Loading...</Typography>;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Properties',
        data: [12, 19, 8, 15, 20, 17],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { label: 'Total Users', value: stats.totalUsers, color: '#1976d2' },
          { label: 'Total Properties', value: stats.totalProperties, color: '#388e3c' },
          { label: 'Total Inquiries', value: stats.totalInquiries, color: '#f57c00' },
          { label: 'Pending Inquiries', value: stats.pendingInquiries, color: '#d32f2f' },
        ].map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Properties Added (Last 6 Months)
              </Typography>
              <Line data={chartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Recent Inquiries
              </Typography>
              {recentInquiries.map((inquiry, idx) => (
                <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {inquiry.property?.title || 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {inquiry.user?.fullName} - {inquiry.status}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
