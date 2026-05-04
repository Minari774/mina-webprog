import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 260;
const darkSurface = '#27272a';
const borderColor = '#3f3f46';
const accent = '#f97316';

const dashboardLinks = [
  { label: 'Overview', to: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Reports', to: '/dashboard/reports', icon: <BarChartIcon /> },
  { label: 'Users', to: '/dashboard/users', icon: <GroupIcon /> },
];

const DashLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#18181b', color: '#f9fafb' }}>
      <Toolbar sx={{ px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: accent, color: '#111827' }}>
            <MovieIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>
              M Movies
            </Typography>
            <Typography variant="caption" sx={{ color: '#a1a1aa' }}>
              Admin Dashboard
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor }} />

      <List sx={{ px: 1.5, py: 2 }}>
        {dashboardLinks.map((link) => (
          <ListItem key={link.to} disablePadding sx={{ mb: 0.75 }}>
            <ListItemButton
              component={NavLink}
              to={link.to}
              end={link.to === '/dashboard'}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                color: '#d1d5db',
                '&.active': {
                  bgcolor: accent,
                  color: '#ffffff',
                  '& .MuiListItemIcon-root': { color: '#ffffff' },
                },
                '&:hover': {
                  bgcolor: 'rgba(249,115,22,0.18)',
                  color: '#fff',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#d1d5db', minWidth: 42 }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor }} />

      <List sx={{ px: 1.5, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/"
            sx={{
              borderRadius: 2,
              color: '#d1d5db',
              '&:hover': { bgcolor: darkSurface, color: '#fff' },
            }}
          >
            <ListItemIcon sx={{ color: '#d1d5db', minWidth: 42 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Site" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#18181b' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#18181b',
          color: '#ffffff',
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
            aria-label="Open dashboard navigation"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h6" fontWeight={800}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa' }}>
              Summary, reports, and user records
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: 220,
              '& .MuiOutlinedInput-root': {
                bgcolor: darkSurface,
                borderRadius: 1,
                color: '#ffffff',
                '& fieldset': { borderColor },
                '&:hover fieldset': { borderColor: accent },
                '&.Mui-focused fieldset': { borderColor: accent },
              },
              '& .MuiInputBase-input::placeholder': { color: '#a1a1aa', opacity: 1 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#a1a1aa' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{
              borderColor: accent,
              color: accent,
              fontWeight: 800,
              '&:hover': { borderColor: '#fb923c', bgcolor: 'rgba(249,115,22,0.12)' },
            }}
          >
            Logout
          </Button>
          <Avatar sx={{ display: { xs: 'none', md: 'flex' }, bgcolor: accent }}>A</Avatar>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, sm: 3 },
          mt: 9,
          color: '#ffffff',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
