import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

import { useSettings } from "../context/SettingsContext";
import { uploadFile } from "../services/storage";

export const SettingsManager = () => {
  const { settings, updateSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    shopName: "",
    phoneNumber: "",
    whatsAppNumber: "",
    address: "",
    workingHours: "",
    facebook: "",
    instagram: "",
    youtube: ""
  });
  
  const [heroBanner, setHeroBanner] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sync state with settings context
  useEffect(() => {
    if (settings) {
      setFormData({
        shopName: settings.shopName || "SGR Stickers",
        phoneNumber: settings.phoneNumber || "",
        whatsAppNumber: settings.whatsAppNumber || "",
        address: settings.address || "",
        workingHours: settings.workingHours || "",
        facebook: settings.socialLinks?.facebook || "",
        instagram: settings.socialLinks?.instagram || "",
        youtube: settings.socialLinks?.youtube || ""
      });
      setHeroBanner(settings.heroBanner || []);
    }
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setUploadProgress(0);

      try {
        const result = await uploadFile(file, "banners", (progress) => {
          setUploadProgress(Math.round(progress));
        });

        const updatedBanners = [...heroBanner, result.url];
        setHeroBanner(updatedBanners);
        toast.success("Banner image uploaded. Click Save Settings to persist.");
      } catch (error) {
        console.error("Banner upload error:", error);
        toast.error("Failed to upload banner image.");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleRemoveBanner = (index) => {
    setHeroBanner(heroBanner.filter((_, idx) => idx !== index));
    toast.info("Banner queued for removal. Remember to save changes.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        shopName: formData.shopName,
        phoneNumber: formData.phoneNumber,
        whatsAppNumber: formData.whatsAppNumber,
        address: formData.address,
        workingHours: formData.workingHours,
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube
        },
        heroBanner
      };

      await updateSettings(payload);
      toast.success("Settings updated successfully!");
      refreshSettings(); // reload context settings
    } catch (error) {
      console.error("Save settings error:", error);
      toast.error("Failed to update site settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left: Contact Info details */}
          {/* Left Column: Business Details details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)", mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Outfit', sans-serif" }}>
                  Store Profile Configuration
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      label="Shop Name"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      disabled={saving}
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
                      placeholder="e.g. +91 98765 43210"
                      disabled={saving}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="WhatsApp Number"
                      name="whatsAppNumber"
                      value={formData.whatsAppNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      disabled={saving}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={3}
                      label="Store Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      required
                      fullWidth
                      label="Working Hours Summary"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      placeholder="e.g. Mon - Sat: 9 AM - 8 PM"
                      disabled={saving}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Outfit', sans-serif" }}>
                  Social Links
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Facebook URL"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Instagram URL"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="YouTube Channel URL"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Hero Banner Image Slider */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)", mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Outfit', sans-serif" }}>
                  Hero Slider Images
                </Typography>
                <Typography variant="body2" sx={{ color: "#a6adbb", mb: 3 }}>
                  Upload high-resolution action photos to slide in the homepage background banner.
                </Typography>

                {/* Upload Trigger */}
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  disabled={uploading || saving}
                  sx={{ py: 1.5, borderColor: "rgba(255,255,255,0.1)", color: "#a6adbb", mb: 4 }}
                >
                  Upload New Banner
                  <input type="file" accept="image/*" hidden onChange={handleBannerUpload} />
                </Button>

                {uploading && (
                  <Box sx={{ width: "100%", mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="caption">Uploading file...</Typography>
                      <Typography variant="caption">{uploadProgress}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                  </Box>
                )}

                {/* List of current Banners */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "#fff" }}>
                  Active Slider Queue ({heroBanner.length}):
                </Typography>

                {heroBanner.length === 0 ? (
                  <Typography variant="body2" sx={{ color: "#a6adbb", fontStyle: "italic" }}>
                    No custom banners. Falling back to default Unsplash stock images.
                  </Typography>
                ) : (
                  <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {heroBanner.map((url, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.01)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: 2,
                          p: 1.5
                        }}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBanner(idx)} disabled={saving}>
                            <DeleteIcon sx={{ color: "#ff3e3e" }} />
                          </IconButton>
                        }
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={`Slider ${idx}`}
                          sx={{ width: 80, height: 50, objectFit: "cover", borderRadius: 1, mr: 2, border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                        <ListItemText
                          primary={`Slide ${idx + 1}`}
                          secondary={url}
                          slotProps={{
                            primary: { fontWeight: 600, fontSize: "0.9rem" },
                            secondary: { sx: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "150px", fontSize: "0.75rem" } }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<SaveIcon />}
              disabled={saving}
              sx={{ py: 1.8, borderRadius: "25px" }}
            >
              {saving ? "Saving Changes..." : "Save Settings"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SettingsManager;
