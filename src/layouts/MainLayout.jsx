import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import ScrollToTop from "../components/ScrollToTop";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Scroll to Top on page change */}
      <ScrollToTop />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* WhatsApp & Call floating CTAs */}
      <FloatingActions />

      {/* Site Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
