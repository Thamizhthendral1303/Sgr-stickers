import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { getReviewsList, addReview } from "../services/firestore";

const vehicleTypes = ["Bike", "Car", "Van", "Auto"];
const servicesList = [
  "Name Stickers",
  "Number Plates",
  "Vehicle Wrapping",
  "LED Light Installation",
  "Horn Installation",
  "Sound Systems",
  "Electrical Works",
  "Electronics Repair"
];

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: "",
    rating: 5,
    comment: "",
    vehicleType: "",
    serviceRequired: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const list = await getReviewsList(true); // Fetch only approved reviews
      setReviews(list);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.comment || !formData.rating) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const reviewPayload = {
        ...formData,
        approved: false // requires admin verification
      };

      await addReview(reviewPayload);
      toast.success("Review submitted! It will appear once approved by admin.");
      
      // Clear form
      setFormData({
        customerName: "",
        rating: 5,
        comment: "",
        vehicleType: "",
        serviceRequired: ""
      });
    } catch (error) {
      console.error("Submit review error:", error);
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

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
              Client Feedback
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Customer Testimonials
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              See what vehicle owners think of our carbon stickers, high-power horns, LED styling work, and subwoofer tunes.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5}>
          {/* Left: Testimonial List */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: "'Outfit', sans-serif" }}>
              Recent Verified Reviews ({reviews.length})
            </Typography>
            
            {loading ? (
              <Typography variant="body1" sx={{ color: "#a6adbb" }}>Loading testimonials...</Typography>
            ) : reviews.length === 0 ? (
              <Box sx={{ p: 4, bgcolor: "#121216", borderRadius: 4, border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                <Typography variant="body1" sx={{ color: "#a6adbb" }}>
                  No approved reviews yet. Be the first to tell us about your customization experience!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {reviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#ffffff" }}>
                              {rev.customerName}
                            </Typography>
                            {rev.vehicleType && (
                              <Typography variant="caption" sx={{ color: "#a6adbb" }}>
                                {rev.vehicleType} • {rev.serviceRequired || "General styling"}
                              </Typography>
                            )}
                          </Box>
                          <Rating
                            value={rev.rating}
                            readOnly
                            emptyIcon={<StarIcon style={{ opacity: 0.15 }} fontSize="inherit" />}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: "#e4e6eb", fontStyle: "italic", lineHeight: 1.6 }}>
                          "{rev.comment}"
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            )}
          </Grid>

          {/* Right: Submit Review Form */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "sticky",
                top: 100,
                p: 4,
                bgcolor: "#121216",
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, fontFamily: "'Outfit', sans-serif" }}>
                Write a Review
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  {/* Name */}
                  <Grid size={{ xs: 12 }}>
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

                  {/* Rating selection */}
                  <Grid size={{ xs: 12 }}>
                    <Typography component="legend" sx={{ color: "#a6adbb", mb: 0.5, fontWeight: 500, fontSize: "0.9rem" }}>
                      Rating *
                    </Typography>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                      disabled={submitting}
                    />
                  </Grid>

                  {/* Vehicle Type */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Vehicle Type"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      disabled={submitting}
                    >
                      {vehicleTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Service Obtained */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Service Done"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      disabled={submitting}
                    >
                      {servicesList.map((srv) => (
                        <MenuItem key={srv} value={srv}>
                          {srv}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Comments */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Review Comments"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Share your experience working with SGR Stickers..."
                      disabled={submitting}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={submitting}
                      sx={{ py: 1.5, borderRadius: "25px" }}
                    >
                      {submitting ? "Submitting Review..." : "Submit Review"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Reviews;
