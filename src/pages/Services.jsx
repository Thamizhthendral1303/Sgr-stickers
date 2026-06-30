import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, Card, CardContent, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";

// Icons
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PinIcon from "@mui/icons-material/Pin";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LightModeIcon from "@mui/icons-material/LightMode";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CableIcon from "@mui/icons-material/Cable";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

const servicesData = [
  {
    name: "Vehicle Name Stickers",
    icon: <StickyNote2Icon sx={{ fontSize: 40 }} />,
    description: "Personalized premium vinyl decals, fonts, and graphics custom designed for bikes and cars.",
    features: ["Custom vinyl lettering", "High-visibility reflective wraps", "Scratch-resistant materials", "Multi-font options"]
  },
  {
    name: "Number Plate Design & Fitting",
    icon: <PinIcon sx={{ fontSize: 40 }} />,
    description: "Stylish, government-compliant, and secure number plate framing and laser cutting.",
    features: ["High-Security Number Plates (HSRP)", "German styling fonts", "Laser-cut acrylic frames", "Secure pop-rivet installation"]
  },
  {
    name: "Vehicle Wrapping (Color Stickers)",
    icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
    description: "Premium full-body or partial vinyl wraps to alter vehicle color and shield factory paint.",
    features: ["Matte, gloss, and satin finishes", "Carbon fiber detailing", "Partial hood/roof accents", "Paint protection films (PPF)"]
  },
  {
    name: "LED Light Installation",
    icon: <LightModeIcon sx={{ fontSize: 40 }} />,
    description: "Custom atmospheric interior underglows, neon design strips, and auxiliary projector driving lights.",
    features: ["RGB Bluetooth underglows", "Auxiliary fog project lamps", "Custom sequential DRLs", "Headlight projector retrofitting"]
  },
  {
    name: "Horn Installation",
    icon: <VolumeUpIcon sx={{ fontSize: 40 }} />,
    description: "Premium dual-tone, heavy sound horns, air trumpets, and siren systems correctly wired.",
    features: ["Dual-tone trumpet systems", "Compact super-sound horns", "Separate fuse & relay wiring", "Waterproof horn layouts"]
  },
  {
    name: "Sound System Installation",
    icon: <LibraryMusicIcon sx={{ fontSize: 40 }} />,
    description: "Studio-grade subwoofers, visual display head units, amplifers, and door speakers setup.",
    features: ["Mone-channel and 4-channel amps", "Active/Passive subwoofers", "Android touchscreen consoles", "Specialist sound dampening panels"]
  },
  {
    name: "Vehicle Electrical Works",
    icon: <CableIcon sx={{ fontSize: 40 }} />,
    description: "Advanced diagnostic checking, custom wire harness creation, and short-circuit troubleshootings.",
    features: ["Insulated custom wiring wraps", "Short circuit isolation", "Auxiliary battery setups", "Fusebox troubleshooting"]
  },
  {
    name: "Vehicle Electronics Repair",
    icon: <ElectricalServicesIcon sx={{ fontSize: 40 }} />,
    description: "Expert diagnostics and board-level repairs of digital instrument clusters, consoles, and ECUs.",
    features: ["Digital speedometer servicing", "LED display repair", "Switch console replacements", "ECU connector repairs"]
  }
];

export const Services = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#0a0a0c" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              Our Expert Solutions
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Customization & Electronics Services
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              Upgrade the performance, audio quality, safety, and styling design of your vehicle with our specialized shop solutions.
            </Typography>
          </motion.div>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {servicesData.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      backgroundColor: index % 2 === 0 ? "#ff3e3e" : "#ff9100",
                      opacity: 0.8
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Icon Container */}
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "12px",
                        bgcolor: index % 2 === 0 ? "rgba(255, 62, 62, 0.08)" : "rgba(255, 145, 0, 0.08)",
                        color: index % 2 === 0 ? "#ff3e3e" : "#ff9100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                      }}
                    >
                      {service.icon}
                    </Box>

                    {/* Title */}
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: "'Outfit', sans-serif" }}>
                      {service.name}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" sx={{ color: "#a6adbb", mb: 3, lineHeight: 1.6, flexGrow: 1 }}>
                      {service.description}
                    </Typography>

                    {/* Features List */}
                    <Box sx={{ mb: 4 }}>
                      {service.features.map((feature, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: index % 2 === 0 ? "#ff3e3e" : "#ff9100" }} />
                          <Typography variant="caption" sx={{ color: "#ffffff", fontWeight: 500 }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Action Button */}
                    <Button
                      variant="outlined"
                      color={index % 2 === 0 ? "primary" : "secondary"}
                      component={Link}
                      to={`/quote?service=${encodeURIComponent(service.name)}`}
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 600,
                        py: 1,
                        borderColor: index % 2 === 0 ? "rgba(255, 62, 62, 0.3)" : "rgba(255, 145, 0, 0.3)",
                        "&:hover": {
                          borderColor: index % 2 === 0 ? "#ff3e3e" : "#ff9100",
                          bgcolor: index % 2 === 0 ? "rgba(255, 62, 62, 0.05)" : "rgba(255, 145, 0, 0.05)"
                        }
                      }}
                    >
                      Enquire for this
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
