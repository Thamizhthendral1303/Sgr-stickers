import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import { useSettings } from "../context/SettingsContext";

export const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  // Parse social links
  const { facebook, instagram, youtube } = settings?.socialLinks || {};

  return (
    <Box
      sx={{
        backgroundColor: "#08080a",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        color: "#a6adbb",
        pt: 8,
        pb: 4,
        position: "relative"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Business Info Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <SportsMotorsportsIcon sx={{ color: "#ff3e3e", mr: 1, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "1.3rem",
                  letterSpacing: ".05em"
                }}
              >
                {settings?.shopName || "SGR Stickers"}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7 }}>
              SGR Stickers provides complete premium vehicle customization and electronics services for Bikes, Cars, Vans, and Autos. Upgrade your ride with our top-notch services.
            </Typography>
            
            {/* Social Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {facebook && (
                <IconButton
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#a6adbb",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    "&:hover": { color: "#ff3e3e", backgroundColor: "rgba(255, 62, 62, 0.05)", borderColor: "rgba(255, 62, 62, 0.2)" }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              )}
              {instagram && (
                <IconButton
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#a6adbb",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    "&:hover": { color: "#ff3e3e", backgroundColor: "rgba(255, 62, 62, 0.05)", borderColor: "rgba(255, 62, 62, 0.2)" }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              )}
              {youtube && (
                <IconButton
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#a6adbb",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    "&:hover": { color: "#ff3e3e", backgroundColor: "rgba(255, 62, 62, 0.05)", borderColor: "rgba(255, 62, 62, 0.2)" }
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, mb: 2.5, fontFamily: "'Outfit', sans-serif" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Home</Link>
              <Link to="/about" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>About Us</Link>
              <Link to="/services" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Services</Link>
              <Link to="/gallery" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Gallery</Link>
              <Link to="/reviews" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Customer Reviews</Link>
              <Link to="/quote" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = '#ff3e3e'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Request Quote</Link>
            </Box>
          </Grid>

          {/* Services Column */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, mb: 2.5, fontFamily: "'Outfit', sans-serif" }}>
              Our Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography variant="body2">Name Stickers</Typography>
              <Typography variant="body2">Number Plate Design</Typography>
              <Typography variant="body2">Vehicle Wrapping</Typography>
              <Typography variant="body2">LED Light Installation</Typography>
              <Typography variant="body2">Sound System Upgrades</Typography>
              <Typography variant="body2">Electrical Works</Typography>
            </Box>
          </Grid>

          {/* Contact Details Column */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, mb: 2.5, fontFamily: "'Outfit', sans-serif" }}>
              Store Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {settings?.address && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <LocationOnIcon sx={{ color: "#ff3e3e", fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {settings.address}
                  </Typography>
                </Box>
              )}
              {settings?.phoneNumber && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PhoneIcon sx={{ color: "#ff3e3e", fontSize: 20 }} />
                  <Typography variant="body2" component="a" href={`tel:${settings.phoneNumber.replace(/[^0-9+]/g, "")}`} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#ff3e3e" } }}>
                    {settings.phoneNumber}
                  </Typography>
                </Box>
              )}
              {settings?.whatsAppNumber && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <WhatsAppIcon sx={{ color: "#25D366", fontSize: 20 }} />
                  <Typography variant="body2" component="a" href={`https://wa.me/${settings.whatsAppNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#25D366" } }}>
                    WhatsApp Us
                  </Typography>
                </Box>
              )}
              {settings?.workingHours && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <AccessTimeIcon sx={{ color: "#ff3e3e", fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {settings.workingHours}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mb: 4 }} />

        {/* Footer Bottom */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
            &copy; {currentYear} {settings?.shopName || "SGR Stickers"}. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
            Designed for Performance & Style
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
