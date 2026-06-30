import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogContent,
  CardMedia,
  CircularProgress,
  InputAdornment
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getGalleryItems } from "../services/firestore";
import { GallerySkeleton } from "../components/SkeletonLoader";

const categories = [
  "All",
  "Bikes",
  "Cars",
  "Vans",
  "Auto",
  "LED Works",
  "Wrapping",
  "Sound Systems"
];

export const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Load items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const items = await getGalleryItems("All");
        setGalleryItems(items);
        setFilteredItems(items);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = galleryItems;

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(
        (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }

    setFilteredItems(result);
  }, [activeCategory, searchQuery, galleryItems]);

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction) => {
    if (lightboxIndex === null) return;
    let nextIndex = lightboxIndex + direction;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    setLightboxIndex(nextIndex);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#0a0a0c" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" sx={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: "0.15em" }}>
              Our Custom Works
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              Work Showcase Gallery
            </Typography>
            <Typography variant="body1" sx={{ color: "#a6adbb", maxWidth: "600px", mx: "auto" }}>
              Explore actual transformation projects delivered by SGR Stickers for motorcycles, sports cars, auto-rickshaws, and high-performance sound setups.
            </Typography>
          </motion.div>
        </Box>

        {/* Filters Toolbar */}
        <Grid container spacing={3} sx={{ mb: 6, alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#ff3e3e"
                },
                "& .MuiTab-root": {
                  color: "#a6adbb",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  "&.Mui-selected": {
                    color: "#ff3e3e"
                  }
                }
              }}
            >
              {categories.map((cat) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </Tabs>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search gallery works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#a6adbb" }} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  bgcolor: "rgba(255, 255, 255, 0.02)"
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Gallery Image Grid */}
        {loading ? (
          <GallerySkeleton count={8} />
        ) : filteredItems.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "#a6adbb" }}>
              No portfolio items found matching your filters.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    onClick={() => openLightbox(index)}
                    sx={{
                      position: "relative",
                      borderRadius: 4,
                      overflow: "hidden",
                      height: 260,
                      cursor: "pointer",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      "&:hover img": {
                        transform: "scale(1.08)"
                      },
                      "&:hover .overlay": {
                        opacity: 1
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      }}
                    />

                    {/* Dark gradient overlay showing on hover */}
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(10, 10, 12, 0.8)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 3
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#ff3e3e",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em"
                        }}
                      >
                        {item.category}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "#ffffff", mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" sx={{ color: "#a6adbb", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Lightbox Dialog Overlay */}
        <Dialog
          open={lightboxIndex !== null}
          onClose={closeLightbox}
          maxWidth="lg"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                bgcolor: "transparent",
                boxShadow: "none",
                overflow: "hidden"
              }
            }
          }}
        >
          {currentItem && (
            <Box sx={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Close Button */}
              <IconButton
                onClick={closeLightbox}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "#ffffff",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "rgba(255, 62, 62, 0.8)" },
                  zIndex: 10
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Navigation Left */}
              <IconButton
                onClick={() => navigateLightbox(-1)}
                sx={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#ffffff",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "#ff3e3e" },
                  zIndex: 10
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              {/* Lightbox Image */}
              <Box
                component="img"
                src={currentItem.imageUrl}
                alt={currentItem.title}
                sx={{
                  maxHeight: "75vh",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: 4,
                  bgcolor: "#000",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              />

              {/* Navigation Right */}
              <IconButton
                onClick={() => navigateLightbox(1)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#ffffff",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "#ff3e3e" },
                  zIndex: 10
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              {/* Lightbox Bottom Info */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                  mt: 2,
                  p: 3,
                  bgcolor: "#121216",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center"
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#ff9100",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  {currentItem.category}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffffff", mt: 0.5, mb: 1 }}>
                  {currentItem.title}
                </Typography>
                {currentItem.description && (
                  <Typography variant="body1" sx={{ color: "#a6adbb" }}>
                    {currentItem.description}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;
