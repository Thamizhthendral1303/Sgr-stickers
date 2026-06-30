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
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import {
  getServicesList,
  addService,
  updateService,
  deleteService
} from "../services/firestore";
import LoadingSpinner from "../components/LoadingSpinner";

export const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);

  const loadServices = async () => {
    try {
      const data = await getServicesList();
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentServiceId(null);
    setName("");
    setDescription("");
    setFeatureInput("");
    setFeatures([]);
    setOpenDialog(true);
  };

  const handleOpenEdit = (service) => {
    setEditMode(true);
    setCurrentServiceId(service.id);
    setName(service.name);
    setDescription(service.description);
    setFeatures(service.features || []);
    setFeatureInput("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Name and Description are required.");
      return;
    }

    try {
      const servicePayload = {
        name,
        description,
        features,
        icon: "build" // Default icon fallback
      };

      if (editMode) {
        await updateService(currentServiceId, servicePayload);
        toast.success("Service updated successfully!");
      } else {
        await addService(servicePayload);
        toast.success("Service added successfully!");
      }

      setOpenDialog(false);
      loadServices();
    } catch (error) {
      console.error("Save service error:", error);
      toast.error("Failed to save service.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        toast.success("Service deleted.");
        loadServices();
      } catch (error) {
        console.error("Delete service error:", error);
        toast.error("Failed to delete service.");
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading Services Manager..." />;

  return (
    <Box sx={{ py: 2 }}>
      {/* Top action header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="body1" sx={{ color: "#a6adbb" }}>
          Create and modify the customizations services list displayed on your website.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: "25px", px: 3 }}
        >
          Add New Service
        </Button>
      </Box>

      {/* Grid of services cards */}
      {services.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, bgcolor: "#121216", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
          <Typography variant="body1" sx={{ color: "#a6adbb" }}>
            No services listed yet. Click "Add New Service" to start listing.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {services.map((srv) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={srv.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#121216" }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 1.5, fontFamily: "'Outfit', sans-serif" }}>
                    {srv.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a6adbb", mb: 3, lineHeight: 1.6 }}>
                    {srv.description}
                  </Typography>
                  
                  {srv.features && srv.features.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
                        Sub-features:
                      </Typography>
                      {srv.features.map((feature, index) => (
                        <Typography key={index} variant="caption" display="block" sx={{ color: "#a6adbb", mb: 0.5 }}>
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ p: 2.5, justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(srv)}
                    sx={{ color: "#ff9100" }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(srv.id)}
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
          {editMode ? "Edit Service" : "Add Service"}
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            {/* Service Name */}
            <TextField
              required
              fullWidth
              label="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chrome Delete Trim Wrapping"
            />

            {/* Description */}
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a summary details about materials used and scope."
            />

            {/* Add Features */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
                Service Key Features:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Add feature"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="e.g. 3-Year warranty"
                />
                <Button variant="outlined" onClick={handleAddFeature}>
                  Add
                </Button>
              </Box>

              {features.length > 0 && (
                <List dense sx={{ bgcolor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  {features.map((feat, idx) => (
                    <ListItem
                      key={idx}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFeature(idx)}>
                          <DeleteIcon sx={{ fontSize: 20, color: "#ff3e3e" }} />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={feat} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ServicesManager;
