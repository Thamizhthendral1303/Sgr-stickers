import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { useSettings } from "../context/SettingsContext";
import { addEnquiry } from "../services/firestore";

export const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phoneNumber || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        vehicleType: "General Inquiry",
        serviceRequired: "Contact Form Message",
        status: "pending"
      };

      await addEnquiry(payload);
      toast.success("Message sent! SGR Stickers will call you shortly.");
      setFormData({ customerName: "", phoneNumber: "", message: "" });
    } catch (error) {
      console.error("Contact submit error:", error);
      toast.error("Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  // Extract contact links
  const phoneVal = settings?.phoneNumber || "";
  const cleanPhone = phoneVal.replace(/[^0-9+]/g, "");
  const whatsAppVal = settings?.whatsAppNumber || "";
  const cleanWhatsApp = whatsAppVal.replace(/[^0-9]/g, "");
  const { facebook, instagram, youtube } = settings?.socialLinks || {};

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
              Location & Hours
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Visit Our Custom Shop
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              Drop by for a consultation, explore custom vinyl wrap textures in person, or get premium audio components tuned.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5} sx={{ mb: 10 }}>
          {/* Left: Contact Info details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: "'Outfit', sans-serif" }}>
              Contact Details
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, mb: 5 }}>
              {/* Address */}
              {settings?.address && (
                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: "50%", bgcolor: "rgba(255, 62, 62, 0.08)", color: "#ff3e3e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Location Address</Typography>
                    <Typography variant="body2" sx={{ color: "#a6adbb", lineHeight: 1.6 }}>{settings.address}</Typography>
                  </Box>
                </Box>
              )}

              {/* Call */}
              {phoneVal && (
                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: "50%", bgcolor: "rgba(255, 62, 62, 0.08)", color: "#ff3e3e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Call Phone</Typography>
                    <Typography variant="body2" component="a" href={`tel:${cleanPhone}`} sx={{ color: "#a6adbb", textDecoration: "none", "&:hover": { color: "#ff3e3e" } }}>
                      {phoneVal}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* WhatsApp */}
              {whatsAppVal && (
                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: "50%", bgcolor: "rgba(37, 211, 102, 0.08)", color: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <WhatsAppIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>WhatsApp Chat</Typography>
                    <Typography variant="body2" component="a" href={`https://wa.me/${cleanWhatsApp}`} target="_blank" rel="noopener noreferrer" sx={{ color: "#a6adbb", textDecoration: "none", "&:hover": { color: "#25D366" } }}>
                      {whatsAppVal}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Hours */}
              {settings?.workingHours && (
                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: "50%", bgcolor: "rgba(255, 62, 62, 0.08)", color: "#ff3e3e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <AccessTimeIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Business Hours</Typography>
                    <Typography variant="body2" sx={{ color: "#a6adbb", lineHeight: 1.6 }}>{settings.workingHours}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Social Links */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Follow Us</Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {facebook && (
                <IconButton href={facebook} target="_blank" rel="noopener noreferrer" sx={{ border: "1px solid rgba(255,255,255,0.06)", color: "#a6adbb", "&:hover": { color: "#ff3e3e", borderColor: "rgba(255, 62, 62, 0.3)" } }}>
                  <FacebookIcon />
                </IconButton>
              )}
              {instagram && (
                <IconButton href={instagram} target="_blank" rel="noopener noreferrer" sx={{ border: "1px solid rgba(255,255,255,0.06)", color: "#a6adbb", "&:hover": { color: "#ff3e3e", borderColor: "rgba(255, 62, 62, 0.3)" } }}>
                  <InstagramIcon />
                </IconButton>
              )}
              {youtube && (
                <IconButton href={youtube} target="_blank" rel="noopener noreferrer" sx={{ border: "1px solid rgba(255,255,255,0.06)", color: "#a6adbb", "&:hover": { color: "#ff3e3e", borderColor: "rgba(255, 62, 62, 0.3)" } }}>
                  <YouTubeIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          {/* Right: Message Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ p: { xs: 3, sm: 5 }, bgcolor: "#121216", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontFamily: "'Outfit', sans-serif" }}>
                Send A Message
              </Typography>
              <Typography variant="body2" sx={{ color: "#a6adbb", mb: 4 }}>
                Have general questions? Write to us and our support team will respond to your queries.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Liam Smith"
                      disabled={submitting}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      disabled={submitting}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={5}
                      label="Inquiry Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type details of your question here..."
                      disabled={submitting}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={submitting}
                      sx={{ borderRadius: "25px", px: 5 }}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>

        {/* Google Map Section */}
        <Box sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.06)", height: 450, bgcolor: "#121216" }}>
          {/* Dynamic Google Maps embed based on address or nice styled mock placeholder map */}
          <iframe
            title="SGR Stickers Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d422.56806212810494!2d79.30738924800187!3d11.044261400000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baad3ebe5a70d5d%3A0xde368d633f59d21f!2s28V5%2BM3V%2C%20Sripuranthan%20North%2C%20Tamil%20Nadu%20621701!5e1!3m2!1sen!2sin!4v1782881540143!5m2!1sen!2sin"
            width="100%"
            height="100%"


            loading="lazy"

          />        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
