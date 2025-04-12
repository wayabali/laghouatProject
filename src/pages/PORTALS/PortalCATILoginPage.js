import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './PortalLoginPage.css'; 

const PortalCATILoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
          //TEST STATIC
    if (username === 'catiuser' && password === 'cati123') {
      navigate('/portal/cati-home'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="portal-login-container">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            CATI Portal Login
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

export default PortalCATILoginPage;
