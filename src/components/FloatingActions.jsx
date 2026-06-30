import React from "react";
import { Box, Tooltip, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSettings } from "../context/SettingsContext";
import { motion } from "framer-motion";

export const FloatingActions = () => {
  const { settings } = useSettings();
  const { phoneNumber, whatsAppNumber } = settings;

  // Clean numbers for links
  const cleanPhone = phoneNumber ? phoneNumber.replace(/[^0-9+]/g, "") : "";
  const cleanWhatsApp = whatsAppNumber ? whatsAppNumber.replace(/[^0-9]/g, "") : "";

  if (!cleanPhone && !cleanWhatsApp) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 20, sm: 30 },
        right: { xs: 20, sm: 30 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 999
      }}
    >
      {/* WhatsApp Button */}
      {cleanWhatsApp && (
        <Tooltip title="Chat on WhatsApp" placement="left" TransitionComponent={Zoom} arrow>
          <motion.a
            href={`https://wa.me/${cleanWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 56 },
                height: { xs: 50, sm: 56 },
                borderRadius: "50%",
                backgroundColor: "#25D366",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
                cursor: "pointer",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#20ba5a"
                }
              }}
            >
              <WhatsAppIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
            </Box>
          </motion.a>
        </Tooltip>
      )}

      {/* Call Now Button */}
      {cleanPhone && (
        <Tooltip title="Call Us Now" placement="left" TransitionComponent={Zoom} arrow>
          <motion.a
            href={`tel:${cleanPhone}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 56 },
                height: { xs: 50, sm: 56 },
                borderRadius: "50%",
                backgroundColor: "#ff3e3e",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(255, 62, 62, 0.4)",
                cursor: "pointer",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#d62828"
                }
              }}
            >
              <PhoneIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            </Box>
          </motion.a>
        </Tooltip>
      )}
    </Box>
  );
};

export default FloatingActions;
