import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
  Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import BuildIcon from "@mui/icons-material/Build";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "../context/AuthContext";
import ScrollToTop from "../components/ScrollToTop";

const drawerWidth = 260;

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/admin" },
  { text: "Gallery Manager", icon: <PhotoLibraryIcon />, path: "/admin/gallery" },
  { text: "Services Manager", icon: <BuildIcon />, path: "/admin/services" },
  { text: "Enquiry Manager", icon: <QuestionAnswerIcon />, path: "/admin/enquiries" },
  { text: "Review Manager", icon: <RateReviewIcon />, path: "/admin/reviews" },
  { text: "Site Settings", icon: <SettingsIcon />, path: "/admin/settings" }
];

export const AdminLayout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#121216" }}>
      <Toolbar sx={{ px: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 800, color: "#ff3e3e", letterSpacing: "0.05em" }}>
          SGR ADMIN
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
      <List sx={{ px: 1, py: 2, flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? "rgba(255, 62, 62, 0.08)" : "transparent",
                  color: active ? "#ff3e3e" : "#a6adbb",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    color: "#ffffff"
                  },
                  "& .MuiListItemIcon-root": {
                    color: active ? "#ff3e3e" : "#a6adbb"
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} slotProps={{ primary: { fontWeight: 600, fontSize: "0.95rem" } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
          sx={{ borderColor: "rgba(255,255,255,0.1)", color: "#a6adbb" }}
        >
          View Live Site
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0c" }}>
      <ScrollToTop />
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: "#0d0e12",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "none"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || "Dashboard"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#a6adbb", display: { xs: "none", sm: "block" } }}>
            Logged in as: <strong>{currentUser?.email}</strong>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: { sx: { width: drawerWidth } }
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" }
          }}
        >
          {drawerContent}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, borderRight: "1px solid rgba(255, 255, 255, 0.06)" }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1, p: 0 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
