'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Alert,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = () => {
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setError('');
    login(username.trim(), role);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
          
          {/* Left Side (Illustration) */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f4f8',
              p: 4,
              flexDirection: 'column',
            }}
          >
            <AdbIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            <Typography variant="h5" mt={2} color="primary">
              AI-Powered Query System
            </Typography>
            <Typography variant="body1" textAlign="center" mt={1} color="text.secondary">
              Smart Support for Tech, HR, Sales, and more.
            </Typography>
          </Grid>

          {/* Right Side (Form) */}
          <Grid item xs={12} sm={6} sx={{ p: { xs: 4, sm: 6 } }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Please login to access your dashboard
              </Typography>

              <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  select
                  label="Role"
                  fullWidth
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </TextField>

                <Button variant="contained" onClick={handleLogin} sx={{ py: 1.5 }}>
                  Login
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
