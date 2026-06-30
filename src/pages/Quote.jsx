import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  LinearProgress,
  Card,
  CardContent
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { uploadFile } from "../services/storage";
import { addEnquiry } from "../services/firestore";

const vehicleTypes = [
  { value: "Bike", label: "Motorcycle / Bike" },
  { value: "Car", label: "Passenger Car" },
  { value: "Van", label: "Commercial Van / Truck" },
  { value: "Auto", label: "Three-Wheeler / Auto" }
];

const services = [
  "Vehicle Name Stickers",
  "Number Plate Design & Fitting",
  "Vehicle Wrapping (Color Stickers)",
  "LED Light Installation",
  "Horn Installation",
  "Sound System Installation",
  "Vehicle Electrical Works",
  "Vehicle Electronics Repair",
  "Other Custom Work"
];

export const Quote = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    vehicleType: "",
    serviceRequired: "",
    message: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill service from query param if available
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && services.includes(serviceParam)) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: serviceParam
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.customerName || !formData.phoneNumber || !formData.vehicleType || !formData.serviceRequired) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ""))) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    let referenceImageUrl = "";
    let referenceStoragePath = "";

    try {
      // 1. Upload reference image if selected
      if (selectedFile) {
        setIsUploading(true);
        const uploadResult = await uploadFile(selectedFile, "enquiries", (progress) => {
          setUploadProgress(Math.round(progress));
        });
        referenceImageUrl = uploadResult.url;
        referenceStoragePath = uploadResult.path;
        setIsUploading(false);
      }

      // 2. Save enquiry to Firestore
      const enquiryPayload = {
        ...formData,
        referenceImageUrl,
        referenceStoragePath,
        status: "pending"
      };

      await addEnquiry(enquiryPayload);
      
      toast.success("Quote request submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ py: 12, bgcolor: "#0a0a0c", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ border: "1px solid rgba(37, 211, 102, 0.2)", p: 4, textAlign: "center", bgcolor: "#121216" }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: "#25D366", mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                Thank You!
              </Typography>
              <Typography variant="body1" sx={{ color: "#a6adbb", mb: 4 }}>
                Your enquiry has been successfully logged. SGR Stickers will review your vehicle customization details and contact you via phone within 24 hours.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setSubmitted(false)} sx={{ borderRadius: "30px", px: 4 }}>
                Submit Another Enquiry
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#0a0a0c" }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              Get in Touch
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Request A Custom Quote
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              Provide details of your motorcycle, car, or audio layout. Attach reference graphics if you have a specific idea in mind.
            </Typography>
          </motion.div>
        </Box>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#121216", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Name */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Customer Name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      disabled={submitting}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      disabled={submitting}
                    />
                  </Grid>

                  {/* Vehicle Type */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      required
                      fullWidth
                      label="Vehicle Type"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      disabled={submitting}
                    >
                      {vehicleTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Service Required */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      required
                      fullWidth
                      label="Service Required"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      disabled={submitting}
                    >
                      {services.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Message details */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Customization Specifications"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe what you want (e.g. wrap color/finish, horn type, styling font details, LED placement ideas, etc.)"
                      disabled={submitting}
                    />
                  </Grid>

                  {/* File Upload */}
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        p: 3,
                        border: "2px dashed rgba(255, 255, 255, 0.1)",
                        borderRadius: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        bgcolor: "rgba(255, 255, 255, 0.01)",
                        "&:hover": {
                          borderColor: "#ff3e3e",
                          bgcolor: "rgba(255, 62, 62, 0.01)"
                        }
                      }}
                      component="label"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                        disabled={submitting}
                      />
                      <UploadFileIcon sx={{ fontSize: 40, color: "#a6adbb", mb: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedFile ? selectedFile.name : "Attach Reference Image (Optional)"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#a6adbb" }}>
                        JPG, PNG or WEBP. Max size 5MB.
                      </Typography>
                    </Box>

                    {isUploading && (
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="caption">Uploading file...</Typography>
                          <Typography variant="caption">{uploadProgress}%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                      </Box>
                    )}
                  </Grid>

                  {/* Submit button */}
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={submitting}
                      sx={{ py: 1.5, borderRadius: "25px", fontSize: "1.05rem" }}
                    >
                      {submitting ? "Submitting Quote Request..." : "Submit Quote Request"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Quote;
