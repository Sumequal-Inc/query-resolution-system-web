'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
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

export default function SignupPage() {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignup = () => {
    if (!username.trim()) return setError('Username is required');
    if (!password) return setError('Password is required');
    if (password !== confirmPassword) return setError('Passwords do not match');

    setError('');
    signup(username.trim(), password, role);
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* LEFT: Branding */}
      <Grid
        item
        xs={0}
        sm={6}
        sx={{
          backgroundColor: '#f0f4f8',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <AdbIcon sx={{ fontSize: 100, color: 'primary.main' }} />
        <Typography variant="h5" mt={2} color="primary">
          Join Our AI-Powered Query System
        </Typography>
        <Typography variant="body1" textAlign="center" mt={1} color="text.secondary">
          Sign up to get access to smart support.
        </Typography>
      </Grid>

      {/* RIGHT: Signup Form */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, px: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Sign up to access your dashboard
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
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Button variant="contained" onClick={handleSignup} sx={{ py: 1.5 }}>
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
