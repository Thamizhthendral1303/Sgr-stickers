import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Reviews", path: "/reviews" },
  { label: "Contact", path: "/contact" }
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useAuth();
  const { settings } = useSettings();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="sticky" className="glass-nav" sx={{ top: 0, zIndex: 1100 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: { xs: 70, md: 80 } }}>
          {/* Logo */}
          <SportsMotorsportsIcon sx={{ display: "flex", mr: 1, color: "#ff3e3e", fontSize: 32 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              letterSpacing: ".05em",
              color: "#ffffff",
              textDecoration: "none",
              alignItems: "center"
            }}
          >
            {settings?.shopName || "SGR Stickers"}
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 3 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? "#ff3e3e" : "#a6adbb",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    px: 1.5,
                    py: 1,
                    position: "relative",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "transparent"
                    },
                    "&::after": isActive(link.path) ? {
                      content: '""',
                      position: "absolute",
                      bottom: 2,
                      left: "12%",
                      width: "76%",
                      height: "2px",
                      backgroundColor: "#ff3e3e",
                      borderRadius: "2px"
                    } : {}
                  }}
                >
                  {link.label}
                </Button>
              ))}
              {currentUser && (
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: "#ff9100",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    px: 1.5,
                    py: 1,
                    "&:hover": {
                      color: "#ffa733",
                      backgroundColor: "transparent"
                    }
                  }}
                >
                  Dashboard
                </Button>
              )}
            </Box>
          )}

          {/* Desktop Action Button */}
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/quote"
              sx={{
                fontWeight: 600,
                borderRadius: "20px",
                px: 3,
                fontSize: "0.9rem"
              }}
            >
              Get Quote
            </Button>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "#0d0e12",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              p: 2
            }
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive(link.path) ? "rgba(255, 62, 62, 0.08)" : "transparent",
                  color: isActive(link.path) ? "#ff3e3e" : "#a6adbb",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.03)"
                  }
                }}
              >
                <ListItemText primary={link.label} slotProps={{ primary: { fontWeight: 600 } }} />
              </ListItemButton>
            </ListItem>
          ))}

          {currentUser && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/admin") ? "rgba(255, 145, 0, 0.08)" : "transparent",
                  color: "#ff9100",
                  "&:hover": {
                    color: "#ffa733",
                    backgroundColor: "rgba(255,255,255,0.03)"
                  }
                }}
              >
                <ListItemText primary="Admin Dashboard" slotProps={{ primary: { fontWeight: 600 } }} />
              </ListItemButton>
            </ListItem>
          )}

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/quote"
            onClick={handleDrawerToggle}
            fullWidth
            sx={{
              fontWeight: 600,
              borderRadius: "20px",
              py: 1.2
            }}
          >
            Get Free Quote
          </Button>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
