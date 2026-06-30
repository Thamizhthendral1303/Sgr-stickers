import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  LinearProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from "../services/firestore";
import { uploadFile } from "../services/storage";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = ["Bikes", "Cars", "Vans", "Auto", "LED Works", "Wrapping", "Sound Systems"];

export const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  
  // Form State
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [existingStoragePath, setExistingStoragePath] = useState("");

  const loadGallery = async () => {
    try {
      const data = await getGalleryItems("All");
      setItems(data);
    } catch (error) {
      console.error("Error loading gallery:", error);
      toast.error("Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentItemId(null);
    setForm({ title: "", category: "Bikes", description: "" });
    setSelectedFile(null);
    setUploadProgress(0);
    setExistingImageUrl("");
    setExistingStoragePath("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (item) => {
    setEditMode(true);
    setCurrentItemId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || ""
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setExistingImageUrl(item.imageUrl);
    setExistingStoragePath(item.imageStoragePath || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category) {
      toast.error("Title and Category are required.");
      return;
    }

    if (!editMode && !selectedFile) {
      toast.error("Please select an image file to upload.");
      return;
    }

    setUploading(true);
    let imageUrl = existingImageUrl;
    let imageStoragePath = existingStoragePath;

    try {
      // 1. If file selected, upload to storage
      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile, "gallery", (progress) => {
          setUploadProgress(Math.round(progress));
        });
        imageUrl = uploadResult.url;
        imageStoragePath = uploadResult.path;
      }

      // 2. Add or Edit Document
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        imageUrl,
        imageStoragePath
      };

      if (editMode) {
        await updateGalleryItem(currentItemId, payload);
        toast.success("Gallery item updated successfully!");
      } else {
        await addGalleryItem(payload);
        toast.success("Gallery item uploaded successfully!");
      }

      setOpenDialog(false);
      loadGallery();
    } catch (error) {
      console.error("Save gallery item error:", error);
      toast.error("Failed to save gallery item.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        await deleteGalleryItem(item.id, item.imageStoragePath || item.imageUrl);
        toast.success("Gallery item deleted.");
        loadGallery();
      } catch (error) {
        console.error("Delete gallery item error:", error);
        toast.error("Failed to delete gallery item.");
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading Gallery Manager..." />;

  return (
    <Box sx={{ py: 2 }}>
      {/* Top Header Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="body1" sx={{ color: "#a6adbb" }}>
          Manage and upload photos of your vehicle customization works.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: "25px", px: 3 }}
        >
          Add New Image
        </Button>
      </Box>

      {/* Grid of gallery cards */}
      {items.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, bgcolor: "#121216", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
          <Typography variant="body1" sx={{ color: "#a6adbb" }}>
            No gallery items upload yet. Click "Add New Image" to get started.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#121216" }}>
                <Box sx={{ position: "relative", pt: "66.6%" /* 3:2 Aspect Ratio */, bgcolor: "#000" }}>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="caption" sx={{ color: "#ff9100", fontWeight: 700, textTransform: "uppercase" }}>
                    {item.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 1, color: "#fff", display: "block" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a6adbb", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.description || "No description provided."}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(item)}
                    sx={{ color: "#ff9100" }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item)}
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

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editMode ? "Edit Gallery Item" : "Add Gallery Item"}
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            {/* Title */}
            <TextField
              required
              fullWidth
              label="Item Title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="e.g. Yamaha R15 Custom Carbon Wrap"
              disabled={uploading}
            />

            {/* Category selection */}
            <TextField
              select
              required
              fullWidth
              label="Vehicle Category"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              disabled={uploading}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            {/* Description */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Short Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Detail the wrap colors, custom materials or installation techniques used."
              disabled={uploading}
            />

            {/* File upload */}
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5, borderColor: "rgba(255,255,255,0.1)", color: "#a6adbb" }}
                disabled={uploading}
              >
                {selectedFile ? selectedFile.name : editMode ? "Change Image (Optional)" : "Select Image *"}
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
            </Box>

            {uploading && (
              <Box sx={{ width: "100%", mt: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption">Uploading image...</Typography>
                  <Typography variant="caption">{uploadProgress}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={uploading}>
              {uploading ? "Saving..." : editMode ? "Update" : "Upload"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default GalleryManager;
