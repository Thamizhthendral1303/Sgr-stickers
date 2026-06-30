import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StarsIcon from "@mui/icons-material/Stars";

export const About = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#0a0a0c" }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              Who We Are
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1 }}>
              About SGR Stickers
            </Typography>
          </motion.div>
        </Box>

        {/* Intro Grid */}
        <Grid container spacing={6} sx={{ mb: 12, alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#ffffff" }}>
                Crafting Custom Vehicle Identities Since 2018
              </Typography>
              <Typography variant="body1" sx={{ color: "#a6adbb", mb: 3, lineHeight: 1.8 }}>
                At SGR Stickers, vehicle customization is not just a job—it's an art. We specialize in providing end-to-end design, styling, and electrical solutions to give your vehicle a distinct personal identity.
              </Typography>
              <Typography variant="body1" sx={{ color: "#a6adbb", mb: 4, lineHeight: 1.8 }}>
                Whether you ride a superbike, drive a premium sedan, handle a commercial delivery van, or pilot an auto-rickshaw, we provide tailored styling wraps, name decals, custom number plates, and high-performance electronic installations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/quote"
                sx={{ borderRadius: "25px", px: 4 }}
              >
                Request Consultation
              </Button>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800"
                  alt="Styling vinyl wrap installation"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Dynamic Statistics Panel */}
        <Box
          sx={{
            py: 6,
            px: 4,
            borderRadius: 6,
            bgcolor: "rgba(22, 22, 28, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            mb: 12
          }}
        >
          <Grid container spacing={4} sx={{ textAlign: "center", justifyContent: "center" }}>
            {[
              { num: "8+", label: "Years Experience" },
              { num: "5,000+", label: "Vehicles Customized" },
              { num: "100%", label: "Satisfaction Rate" },
              { num: "15+", label: "Expert Designers" }
            ].map((stat, i) => (
             <Grid size={{ xs: 6, md: 3 }} key={i}>
                <Typography variant="h3" sx={{ color: "#ff3e3e", fontWeight: 900, mb: 1 }}>
                  {stat.num}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#a6adbb",
                    fontWeight: 500,
                    textTransform: "uppercase"
                  }}
                >
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission and Vision Grid */}
        <Grid container spacing={4} sx={{ mb: 12 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: 6,
                  bgcolor: "#121216",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  height: "100%"
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#ff3e3e" }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: "#a6adbb", lineHeight: 1.8 }}>
                  To deliver elite-class styling, detailing, and custom electronic installations for vehicles by combining superior products, expert handcraft, and cutting-edge design concepts. We seek to bring our clients' custom vision to life with extreme precision and longevity.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: 6,
                  bgcolor: "#121216",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  height: "100%"
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#ff9100" }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: "#a6adbb", lineHeight: 1.8 }}>
                  To become the ultimate nationwide brand and household name for vehicle custom wraps, personalized decaling, and specialist electronics upgrades. We aim to inspire automotive enthusiasts by setting new benchmarks in quality, visual layouts, and execution.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Why Choose Us Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 800, mb: 8 }}>
            Core Customization Pillars
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: "Precision Fitting", text: "Every vinyl corner and light strip is measured down to the millimeter to match your specific vehicle's factory layout.", icon: <BuildIcon /> },
              { title: "Premium Quality Vinyls", text: "We use only premium wrap materials designed to protect your factory paint from scratches, UV rays, and environmental wear.", icon: <WorkspacePremiumIcon /> },
              { title: "Smart Electrical Wiring", text: "All sound systems, horns, and LED lights are wired through insulated harnesses to maintain absolute battery safety.", icon: <StarsIcon /> }
            ].map((pillar, i) => (
             <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    bgcolor: "rgba(22, 22, 28, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.03)",
                    display: "flex",
                    gap: 3
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 3,
                      bgcolor: "rgba(255, 62, 62, 0.1)",
                      color: "#ff3e3e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {pillar.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#a6adbb", lineHeight: 1.6 }}>
                      {pillar.text}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
