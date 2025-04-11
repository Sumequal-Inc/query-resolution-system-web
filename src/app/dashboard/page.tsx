'use client';

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
  Chip,
  Paper,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const mockQueries = [
  { id: 1, department: 'Tech', subject: 'Laptop not starting', status: 'Open', system: 'Hardware' },
  { id: 2, department: 'HR', subject: 'Unable to access HRMS', status: 'Resolved', system: 'HRMS' },
  { id: 3, department: 'Sales', subject: 'CRM login issue', status: 'Open', system: 'Kaarya' },
  { id: 4, department: 'Tech', subject: 'Headset not working', status: 'Resolved', system: 'Hardware' },
];

const departments = ['Tech', 'HR', 'Sales', 'Marketing'];

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('Tech');

  const { logout, user, role } = useAuth(); // Auth context (optional)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const filteredQueries = mockQueries.filter((q) => q.department === selectedDept);

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>Admin Panel</Typography>
      </Toolbar>
      <Divider />
      <List>
        {departments.map((dept) => (
          <ListItem button key={dept} selected={dept === selectedDept} onClick={() => setSelectedDept(dept)}>
            <ListItemText primary={dept} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Topbar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Query Resolution System</Typography>
          </Box>
          <Box>
            <Avatar
              sx={{ cursor: 'pointer', bgcolor: 'primary.main' }}
              onClick={handleAvatarClick}
            >
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

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }} aria-label="dept folders">
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
        <Typography variant="h5" gutterBottom>{selectedDept} Department Queries</Typography>

        <Grid container spacing={3}>
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
      </Box>
    </Box>
  );
}
