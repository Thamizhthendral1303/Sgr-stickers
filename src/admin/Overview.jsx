import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getGalleryItems, getEnquiries, getReviewsList } from "../services/firestore";
import LoadingSpinner from "../components/LoadingSpinner";

export const Overview = () => {
  const [stats, setStats] = useState({
    galleryCount: 0,
    enquiryCount: 0,
    reviewCount: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const gallery = await getGalleryItems("All");
        const enquiries = await getEnquiries();
        const reviews = await getReviewsList(false); // get both approved and pending reviews

        setStats({
          galleryCount: gallery.length,
          enquiryCount: enquiries.length,
          reviewCount: reviews.length
        });
        setRecentEnquiries(enquiries.slice(0, 5)); // recent 5 enquiries
      } catch (error) {
        console.error("Dashboard stats load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <LoadingSpinner message="Generating Dashboard Statistics..." />;

  const statCards = [
    {
      title: "Gallery Items",
      count: stats.galleryCount,
      icon: <PhotoLibraryIcon sx={{ fontSize: 36 }} />,
      color: "#ff3e3e",
      path: "/admin/gallery"
    },
    {
      title: "Customer Enquiries",
      count: stats.enquiryCount,
      icon: <QuestionAnswerIcon sx={{ fontSize: 36 }} />,
      color: "#ff9100",
      path: "/admin/enquiries"
    },
    {
      title: "Customer Reviews",
      count: stats.reviewCount,
      icon: <RateReviewIcon sx={{ fontSize: 36 }} />,
      color: "#00b2ff",
      path: "/admin/reviews"
    }
  ];

  return (
    <Box sx={{ py: 2 }}>
      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
            <Card
              sx={{
                bgcolor: "#121216",
                border: `1px solid rgba(255,255,255,0.05)`,
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: card.color,
                  boxShadow: `0 10px 25px rgba(0, 0, 0, 0.4)`
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#a6adbb", fontWeight: 600, uppercase: true, letterSpacing: "0.05em" }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, fontFamily: "'Outfit', sans-serif" }}>
                      {card.count}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.color,
                      bgcolor: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                <Button
                  component={Link}
                  to={card.path}
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, color: card.color, p: 0, "&:hover": { background: "none" } }}
                >
                  Manage items
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Enquiries Table */}
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Outfit', sans-serif" }}>
        Recent Quotes & Enquiries
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 3 }}>
        <Table aria-label="recent enquiries table">
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.01)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Vehicle Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }} align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentEnquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: "#a6adbb" }}>
                  No recent enquiries logged.
                </TableCell>
              </TableRow>
            ) : (
              recentEnquiries.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{row.customerName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.vehicleType}</TableCell>
                  <TableCell>{row.serviceRequired}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={row.status === "contacted" ? "Contacted" : "Pending"}
                      color={row.status === "contacted" ? "success" : "warning"}
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.createdDate ? new Date(row.createdDate).toLocaleDateString() : ""}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Overview;
