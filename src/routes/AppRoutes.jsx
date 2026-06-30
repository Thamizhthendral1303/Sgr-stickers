import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded Public Pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Quote = lazy(() => import("../pages/Quote"));
const Reviews = lazy(() => import("../pages/Reviews"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Lazy-loaded Admin Pages
const AdminLogin = lazy(() => import("../admin/AdminLogin"));
const Overview = lazy(() => import("../admin/Overview"));
const GalleryManager = lazy(() => import("../admin/GalleryManager"));
const ServicesManager = lazy(() => import("../admin/ServicesManager"));
const EnquiryManager = lazy(() => import("../admin/EnquiryManager"));
const ReviewManager = lazy(() => import("../admin/ReviewManager"));
const SettingsManager = lazy(() => import("../admin/SettingsManager"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading SGR Stickers..." fullScreen />}>
      <Routes>
        {/* Public Routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="quote" element={<Quote />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login (Isolated route) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes under AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="enquiries" element={<EnquiryManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
