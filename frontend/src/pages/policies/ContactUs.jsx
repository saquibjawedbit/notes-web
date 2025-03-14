import React from 'react';
import { Container, Typography, Box, Link, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={3} sx={{ 
          p: 6, 
          borderRadius: 4,
          background: 'linear-gradient(145deg, #111111 0%, #1c1c1c 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          color: '#f3f3f3'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 4
                }}
              >
                Contact Us
              </Typography>
            </motion.div>
            
            <Typography variant="body1" paragraph sx={{ mb: 4, color: '#d6d3d1' }}>
              Have questions or feedback? We'd love to hear from you. Please send your queries to:
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2, 
                mb: 4,
                p: 3,
                bgcolor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: 2
              }}>
                <EmailIcon sx={{ color: '#f59e0b', fontSize: 32 }} />
                <Link 
                  href="mailto:HR@hrsciencequest.com" 
                  underline="none"
                  sx={{ 
                    color: '#f59e0b',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#d97706'
                    }
                  }}
                >
                  HR@hrsciencequest.com
                </Link>
              </Box>
            </motion.div>
            
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              We typically respond within 24-48 business hours.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ContactUs;
