import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          Sorry, the page you're looking for doesn't exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
