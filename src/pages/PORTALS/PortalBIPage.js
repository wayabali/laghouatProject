import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './PortalLoginPage.css'; // Import CSS for styling

const PortalBIPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'biuser' && password === 'bi123') {
      navigate('/portal/bi-home'); // Redirect to BI portal home
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="portal-login-container">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            BI Portal Login
          </Typography>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PortalBIPage;
