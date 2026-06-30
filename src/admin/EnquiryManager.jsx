import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  InputAdornment
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

import { getEnquiries, markEnquiryAsContacted, deleteEnquiry } from "../services/firestore";
import LoadingSpinner from "../components/LoadingSpinner";

export const EnquiryManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewDialog, setViewDialog] = useState(false);
  const [activeEnquiry, setActiveEnquiry] = useState(null);

  const loadEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error loading enquiries:", error);
      toast.error("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  // Filter search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFiltered(enquiries);
    } else {
      const query = searchQuery.toLowerCase();
      const result = enquiries.filter(
        (e) =>
          e.customerName.toLowerCase().includes(query) ||
          e.phoneNumber.toLowerCase().includes(query) ||
          e.serviceRequired.toLowerCase().includes(query)
      );
      setFiltered(result);
    }
  }, [searchQuery, enquiries]);

  const handleMarkContacted = async (id) => {
    try {
      await markEnquiryAsContacted(id);
      toast.success("Enquiry marked as contacted.");
      
      // Update local state
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "contacted" } : e))
      );
      
      if (activeEnquiry && activeEnquiry.id === id) {
        setActiveEnquiry((prev) => ({ ...prev, status: "contacted" }));
      }
    } catch (error) {
      console.error("Mark contacted error:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (enquiry) => {
    if (window.confirm(`Are you sure you want to delete the enquiry from "${enquiry.customerName}"?`)) {
      try {
        await deleteEnquiry(enquiry.id, enquiry.referenceStoragePath);
        toast.success("Enquiry deleted successfully.");
        setViewDialog(false);
        loadEnquiries();
      } catch (error) {
        console.error("Delete enquiry error:", error);
        toast.error("Failed to delete enquiry.");
      }
    }
  };

  const handleOpenView = (enquiry) => {
    setActiveEnquiry(enquiry);
    setViewDialog(true);
  };

  const handleCloseView = () => {
    setViewDialog(false);
  };

  if (loading) return <LoadingSpinner message="Loading Enquiries Manager..." />;

  return (
    <Box sx={{ py: 2 }}>
      {/* Top filter tools */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 4 }}>
        <Typography variant="body1" sx={{ color: "#a6adbb" }}>
          View and process client quote requests, messages, and project references.
        </Typography>
        <TextField
          placeholder="Search name, phone, service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#a6adbb", fontSize: 20 }} />
                </InputAdornment>
              )
            }
          }}
          sx={{
            width: { xs: "100%", sm: 300 },
            "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "rgba(255,255,255,0.02)" }
          }}
        />
      </Box>

      {/* Table container */}
      <TableContainer component={Paper} sx={{ bgcolor: "#121216", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 3 }}>
        <Table aria-label="enquiries processing table">
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.01)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#ffffff" }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#a6adbb" }}>
                  No enquiries logged.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
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
                  <TableCell>
                    {row.createdDate ? new Date(row.createdDate).toLocaleDateString() : ""}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton onClick={() => handleOpenView(row)} sx={{ color: "#00b2ff" }} title="View details">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      {row.status !== "contacted" && (
                        <IconButton onClick={() => handleMarkContacted(row.id)} sx={{ color: "#25D366" }} title="Mark as Contacted">
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDelete(row)} sx={{ color: "#ff3e3e" }} title="Delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details View Dialog */}
      <Dialog open={viewDialog} onClose={handleCloseView} maxWidth="sm" fullWidth>
        {activeEnquiry && (
          <>
            <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              Enquiry from {activeEnquiry.customerName}
            </DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Contact Number</Typography>
                <Typography variant="body1" component="a" href={`tel:${activeEnquiry.phoneNumber}`} sx={{ display: "block", color: "#ff3e3e", textDecoration: "none", fontWeight: 600 }}>
                  {activeEnquiry.phoneNumber}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Vehicle Category</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{activeEnquiry.vehicleType}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Service Selected</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{activeEnquiry.serviceRequired}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Status</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      size="small"
                      label={activeEnquiry.status === "contacted" ? "Contacted" : "Pending"}
                      color={activeEnquiry.status === "contacted" ? "success" : "warning"}
                    />
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Customer Message Specifications</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.02)",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.05)",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6
                  }}
                >
                  {activeEnquiry.message || "No specific details provided."}
                </Typography>
              </Box>

              {activeEnquiry.referenceImageUrl && (
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Reference Image Attachment</Typography>
                  <Link href={activeEnquiry.referenceImageUrl} target="_blank" rel="noopener noreferrer">
                    <Box
                      component="img"
                      src={activeEnquiry.referenceImageUrl}
                      alt="Customer Reference"
                      sx={{
                        width: "100%",
                        maxHeight: 220,
                        objectFit: "contain",
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.06)",
                        bgcolor: "#000",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        "&:hover": { opacity: 0.8 }
                      }}
                    />
                  </Link>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <Button onClick={() => handleDelete(activeEnquiry)} sx={{ color: "#ff3e3e", marginRight: "auto" }}>
                Delete
              </Button>
              {activeEnquiry.status !== "contacted" && (
                <Button variant="contained" color="success" onClick={() => handleMarkContacted(activeEnquiry.id)}>
                  Mark Contacted
                </Button>
              )}
              <Button onClick={handleCloseView}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default EnquiryManager;
