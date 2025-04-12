import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import './PortalLoginPage.css'; 

const PortalLoginPage = () => {
  const navigate = useNavigate(); 

  const handlePortalLogin = (portalName) => {
    navigate(`/login/${portalName}`);
  };

  return (
    <div className="portal-login-container">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Portal Login
          </Typography>

          <div className="portal-buttons">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => handlePortalLogin('bi')}
            >
              Login to BI Portal
            </Button>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => handlePortalLogin('cde')}
            >
              Login to CDE Portal
            </Button>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => handlePortalLogin('cati')}
            >
              Login to CATI Portal
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default PortalLoginPage;
