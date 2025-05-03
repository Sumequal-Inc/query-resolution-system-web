'use client';

import {
  AppBar, Avatar, Box, Button, CircularProgress, CssBaseline, Dialog,
  DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid, IconButton,
  List, ListItem, ListItemText, Menu, MenuItem, Paper, Stack, TextField,
  Toolbar, Typography, Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

type Query = {
  id: number;
  department: string;
  subject: string;
  status: string;
  system: string;
};

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ department: '', subject: '', system: '' });

  const { logout, user, role } = useAuth(); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Fetch queries
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get('/api/queries'); // Replace with real API
        setQueries(res.data);
        setSelectedDept(res.data?.[0]?.department || null);
      } catch (err) {
        console.error('Error fetching queries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  // Extract unique departments
  const departments = [...new Set(queries.map((q) => q.department))];

  const filteredQueries = selectedDept
    ? queries.filter((q) => q.department === selectedDept)
    : queries;

  const handleSubmitQuery = async () => {
    try {
      const res = await axios.post('/api/queries', { ...formData, status: 'Open' }); // API call
      setQueries([...queries, res.data]);
      setOpenForm(false);
      setFormData({ department: '', subject: '', system: '' });
    } catch (err) {
      console.error('Failed to submit query:', err);
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>Departments</Typography>
      </Toolbar>
      <Divider />
      <List>
        {departments.map((dept) => (
          <ListItem
            button
            key={dept}
            selected={dept === selectedDept}
            onClick={() => setSelectedDept(dept)}
          >
            <ListItemText primary={dept} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Query Resolution System</Typography>
          </Box>
          <Box>
            <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main' }} onClick={handleAvatarClick}>
              {user?.[0]?.toUpperCase() || 'A'}
            </Avatar>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              <MenuItem disabled>{user} ({role})</MenuItem>
              <Divider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 240 } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: 240 } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, mt: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{selectedDept || 'All'} Department Queries</Typography>
          <Button variant="contained" onClick={() => setOpenForm(true)}>+ New Query</Button>
        </Box>

        {loading ? (
          <Box mt={4}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={3} mt={1}>
            {filteredQueries.map((query) => (
              <Grid item xs={12} md={6} key={query.id}>
                <Paper elevation={4} sx={{ p: 3 }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight={600}>{query.subject}</Typography>
                    <Typography variant="body2" color="text.secondary">System: {query.system}</Typography>
                    <Chip
                      label={query.status}
                      color={query.status === 'Resolved' ? 'success' : 'warning'}
                      variant="outlined"
                      size="small"
                      sx={{ width: 'fit-content' }}
                    />
                    <Button size="small" sx={{ mt: 1 }} variant="text">View / Resolve</Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* New Query Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>New Query</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              fullWidth
            />
            <TextField
              label="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              fullWidth
            />
            <TextField
              label="System"
              value={formData.system}
              onChange={(e) => setFormData({ ...formData, system: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitQuery} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
