import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import HelpIcon from "@mui/icons-material/Help";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
        bgcolor: "#0a0a0c",
        color: "#ffffff"
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
            <HelpIcon sx={{ fontSize: 90, color: "#ff3e3e" }} />
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "5rem", md: "7rem" },
              lineHeight: 1,
              color: "#ff3e3e",
              fontFamily: "'Outfit', sans-serif",
              mb: 2
            }}
          >
            404
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: "#a6adbb", mb: 4 }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{
              borderRadius: "25px",
              px: 4,
              py: 1.2,
              fontWeight: 700
            }}
          >
            Back to Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound;
