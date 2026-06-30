import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Rating,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";

import {
  getReviewsList,
  approveReview,
  deleteReview,
  addReview
} from "../services/firestore";
import LoadingSpinner from "../components/LoadingSpinner";

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

export const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0 = Pending, 1 = Approved

  // Add review form state
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    rating: 5,
    comment: "",
    vehicleType: "",
    serviceRequired: ""
  });

  const loadReviews = async () => {
    try {
      const data = await getReviewsList(false); // fetch all reviews
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
      toast.error("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Filter reviews by tab
  useEffect(() => {
    if (activeTab === 0) {
      setFiltered(reviews.filter((r) => r.approved === false));
    } else {
      setFiltered(reviews.filter((r) => r.approved === true));
    }
  }, [activeTab, reviews]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleApprove = async (id) => {
    try {
      await approveReview(id);
      toast.success("Review approved successfully!");
      loadReviews();
    } catch (error) {
      console.error("Approve review error:", error);
      toast.error("Failed to approve review.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        toast.success("Review deleted.");
        loadReviews();
      } catch (error) {
        console.error("Delete review error:", error);
        toast.error("Failed to delete review.");
      }
    }
  };

  const handleOpenAdd = () => {
    setForm({
      customerName: "",
      rating: 5,
      comment: "",
      vehicleType: "Car",
      serviceRequired: "Vehicle Wrapping"
    });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setForm((prev) => ({ ...prev, rating: newValue }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.comment) {
      toast.error("Name and Comment are required.");
      return;
    }

    try {
      const payload = {
        ...form,
        approved: true // Manual reviews added by admin are approved by default
      };

      await addReview(payload);
      toast.success("Review added successfully!");
      setOpenAdd(false);
      loadReviews();
    } catch (error) {
      console.error("Add review error:", error);
      toast.error("Failed to add review.");
    }
  };

  if (loading) return <LoadingSpinner message="Loading Reviews Manager..." />;

  return (
    <Box sx={{ py: 2 }}>
      {/* Action bar header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="body1" sx={{ color: "#a6adbb" }}>
          Moderate customer testimonials or manually log custom offline feedback.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: "25px", px: 3 }}
        >
          Add Manual Review
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          "& .MuiTabs-indicator": { backgroundColor: "#ff3e3e" },
          "& .MuiTab-root": { color: "#a6adbb", fontWeight: 600, "&.Mui-selected": { color: "#ff3e3e" } }
        }}
      >
        <Tab label={`Pending Approval (${reviews.filter((r) => !r.approved).length})`} />
        <Tab label={`Approved Reviews (${reviews.filter((r) => r.approved).length})`} />
      </Tabs>

      {/* Grid of reviews */}
      {filtered.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, bgcolor: "#121216", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
          <Typography variant="body1" sx={{ color: "#a6adbb" }}>
            No reviews found in this category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((rev) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rev.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#121216" }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
                        {rev.customerName}
                      </Typography>
                      {rev.vehicleType && (
                        <Typography variant="caption" sx={{ color: "#a6adbb" }}>
                          {rev.vehicleType} • {rev.serviceRequired || "General Styling"}
                        </Typography>
                      )}
                    </Box>
                    <Rating
                      value={rev.rating}
                      readOnly
                      size="small"
                      emptyIcon={<StarIcon style={{ opacity: 0.15 }} fontSize="inherit" />}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#e4e6eb", fontStyle: "italic", lineHeight: 1.6 }}>
                    "{rev.comment}"
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {rev.approved === false ? (
                    <Button
                      size="small"
                      startIcon={<CheckIcon />}
                      onClick={() => handleApprove(rev.id)}
                      sx={{ color: "#25D366" }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Box /> // spacer
                  )}
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(rev.id)}
                    sx={{ color: "#ff3e3e" }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Manual Review Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Log Offline Customer Review</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              required
              fullWidth
              label="Customer Name"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              placeholder="e.g. Samuel Green"
            />

            <Box>
              <Typography component="legend" sx={{ color: "#a6adbb", mb: 0.5, fontSize: "0.9rem" }}>
                Rating Stars
              </Typography>
              <Rating name="rating" value={form.rating} onChange={handleRatingChange} size="large" />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                select
                fullWidth
                label="Vehicle Type"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleInputChange}
              >
                {vehicleTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Service Obtained"
                name="serviceRequired"
                value={form.serviceRequired}
                onChange={handleInputChange}
              >
                {servicesList.map((srv) => (
                  <MenuItem key={srv} value={srv}>
                    {srv}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Review Comments"
              name="comment"
              value={form.comment}
              onChange={handleInputChange}
              placeholder="e.g. Excellent vinyl wrapping. Seamless bubbles-free styling done on my car roof!"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Review
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReviewManager;
