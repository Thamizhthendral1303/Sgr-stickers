import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography, Card, CardContent, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Icons
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSettings } from "../context/SettingsContext";
import { getServicesList, getReviewsList, getGalleryItems } from "../services/firestore";

const motionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const motionItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Home = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const servicesList = await getServicesList();
        setServices(servicesList.slice(0, 4)); // Show top 4 services
        
        const reviewsList = await getReviewsList(true);
        setReviews(reviewsList.slice(0, 5)); // Show top 5 reviews
        
        const galleryItems = await getGalleryItems("All");
        setGallery(galleryItems.slice(0, 6)); // Show recent 6 gallery items
      } catch (err) {
        console.error("Error loading home page data:", err);
      }
    };
    loadHomeData();
  }, []);

  const heroBanners = settings?.heroBanner?.length > 0
    ? settings.heroBanner
    : [
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920"
      ];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* 1. HERO SECTION */}
      <Box sx={{ height: "100vh", width: "100%", position: "relative", bgcolor: "#000" }}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          style={{ height: "100%", width: "100%" }}
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.85)), url(${banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Container maxWidth="lg">
                  <Box sx={{ maxWidth: { xs: "100%", md: "700px" }, mt: -5 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 900,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          lineHeight: 1.1,
                          mb: 2
                        }}
                      >
                        DRIVEN BY <span style={{ color: "#ff3e3e" }}>STYLE</span>,<br />
                        CRAFTED FOR <span style={{ color: "#ff9100" }}>PERFORMANCE</span>
                      </Typography>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Typography variant="h5" sx={{ color: "#a6adbb", mb: 4, fontWeight: 400, maxWidth: "550px" }}>
                        Complete vehicle customization and professional electronics solutions for Cars, Bikes, Vans, and Autos. Upgrade your ride with the experts.
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      style={{ display: "flex", flexWrap: "wrap", gap: 16 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/quote"
                        sx={{ borderRadius: "30px", px: 4, py: 1.5, fontSize: "1rem" }}
                      >
                        Get Free Quote
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        component={Link}
                        to="/gallery"
                        sx={{ borderRadius: "30px", px: 4, py: 1.5, fontSize: "1rem", color: "#ffffff" }}
                      >
                        View Gallery
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        component={Link}
                        to="/contact"
                        sx={{ borderRadius: "30px", px: 4, py: 1.5, fontSize: "1rem" }}
                      >
                        Contact Us
                      </Button>
                    </motion.div>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 2. SERVICES PREVIEW SECTION */}
      <Box sx={{ py: 12, bgcolor: "#0a0a0c" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              What We Do
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Professional Customization Services
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              From customized graphics and number plates to premium electronics and sound installations, we provide unmatched craftsmanship.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.length > 0 ? (
              services.map((service, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            bgcolor: "rgba(255, 62, 62, 0.07)",
                            color: "#ff3e3e",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 3,
                            border: "1px solid rgba(255, 62, 62, 0.15)"
                          }}
                        >
                          {/* Fallback to simple box style if dynamic icons aren't available */}
                          <EmojiObjectsIcon sx={{ fontSize: 32 }} />
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                          {service.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#a6adbb", mb: 3 }}>
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            ) : (
              // Default Fallbacks
              ["Vehicle Wrapping", "LED Lights", "Sound Systems", "Custom Stickers"].map((name, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card sx={{ height: "100%", p: 1 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: 3 }}>
                      <Box sx={{ width: 60, height: 60, borderRadius: "50%", bgcolor: "rgba(255, 62, 62, 0.07)", color: "#ff3e3e", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", mb: 3, border: "1px solid rgba(255, 62, 62, 0.15)" }}>
                        <EmojiObjectsIcon sx={{ fontSize: 30 }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>{name}</Typography>
                      <Typography variant="body2" sx={{ color: "#a6adbb" }}>
                        Premium styling and fitting tailored perfectly for your vehicle's contours.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/services"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: "25px", px: 4 }}
            >
              View All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 3. FEATURED WORKS (GALLERY PREVIEW) */}
      <Box sx={{ py: 12, bgcolor: "#0f0f13", borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, mb: 8 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "#ff9100", fontWeight: 700, letterSpacing: "0.15em" }}>
                Our Portfolio
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, mt: 1 }}>
                Featured Customizations
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/gallery"
              sx={{ color: "#ffffff", mt: { xs: 2, md: 0 }, borderRadius: "25px", px: 4 }}
            >
              Explore Full Gallery
            </Button>
          </Box>

          <Grid container spacing={3}>
            {gallery.length > 0 ? (
              gallery.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 4,
                        overflow: "hidden",
                        height: 280,
                        border: "1px solid rgba(255,255,255,0.05)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
                      }}
                    >
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.title}
                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          p: 3,
                          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#ff9100", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {item.category}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff" }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))
            ) : (
              // Default images
              [
                "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
              ].map((img, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", height: 280, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Box component="img" src={img} alt="Featured design" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", p: 3, background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)" }}>
                      <Typography variant="caption" sx={{ color: "#ff9100", fontWeight: 700 }}>Custom wrapping</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>Premium Styling</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      {/* 4. WHY CHOOSE US */}
      <Box sx={{ py: 12, bgcolor: "#0a0a0c" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              Why SGR Stickers
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1 }}>
              Engineered For Perfection
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Premium Materials", text: "We use only industry-leading vinyls and custom automotive products to ensure high durability and premium styling.", icon: <ShieldIcon sx={{ fontSize: 40 }} /> },
              { title: "Expert Technicians", text: "Our staff is highly skilled in complex automotive electronics, wiring, speaker systems, and vinyl wrap applications.", icon: <StarIcon sx={{ fontSize: 40 }} /> },
              { title: "Quick Turnaround", text: "We value your time. We deliver professional customization work within committed time frames without compromising quality.", icon: <SpeedIcon sx={{ fontSize: 40 }} /> },
              { title: "Custom Solutions", text: "Whether it is custom name decals, custom plates, or unique console electronics, we turn your creative ideas into reality.", icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} /> }
            ].map((prop, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      bgcolor: "rgba(255, 255, 255, 0.01)",
                      border: "1px solid rgba(255, 255, 255, 0.03)",
                      textAlign: "center",
                      height: "100%",
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(255, 62, 62, 0.02)",
                        borderColor: "rgba(255, 62, 62, 0.15)"
                      }
                    }}
                  >
                    <Box sx={{ color: "#ff3e3e", mb: 2, display: "flex", justifyContent: "center" }}>{prop.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {prop.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#a6adbb", lineHeight: 1.6 }}>
                      {prop.text}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 5. REVIEWS CAROUSEL */}
      <Box sx={{ py: 12, bgcolor: "#0f0f13", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#ff9100", fontWeight: 700, letterSpacing: "0.15em" }}>
              Testimonials
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              What Our Customers Say
            </Typography>
          </Box>

          {reviews.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={30}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              style={{ paddingBottom: "50px" }}
            >
              {reviews.map((rev) => (
                <SwiperSlide key={rev.id}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      bgcolor: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      height: "100%",
                      minHeight: 220,
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Box sx={{ display: "flex", color: "#ff9100", mb: 2 }}>
                      {Array.from(new Array(rev.rating)).map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ color: "#ffffff", fontStyle: "italic", mb: 3, flexGrow: 1 }}>
                      "{rev.comment}"
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#ff3e3e" }}>
                        {rev.customerName}
                      </Typography>
                      {rev.vehicleType && (
                        <Typography variant="caption" sx={{ color: "#a6adbb" }}>
                          {rev.vehicleType} ({rev.serviceRequired})
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography variant="body1" sx={{ color: "#a6adbb", textAlign: "center" }}>
              No reviews available yet. Be the first to leave a review!
            </Typography>
          )}
        </Container>
      </Box>

      {/* 6. CALL TO ACTION SECTION */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(to right, #b30000, #ff3e3e, #ff9100)",
          textAlign: "center",
          color: "#ffffff"
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, textTransform: "uppercase" }}>
            Ready to Transform Your Vehicle?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
            Get custom stickers, wrapping, sound system tuning, or LED styling. Get a free custom price estimate now.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/quote"
            sx={{
              bgcolor: "#ffffff",
              color: "#ff3e3e",
              fontWeight: 700,
              fontSize: "1.1rem",
              borderRadius: "30px",
              px: 5,
              py: 1.8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "#f0f0f0",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
              }
            }}
          >
            Get Free Quote Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
