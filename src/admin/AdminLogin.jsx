import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, currentUser, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin area
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/admin");
    }
  }, [currentUser, loading, navigate]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back, Administrator!");
      navigate("/admin");
    } catch (error) {
      console.error("Login failure:", error);
      toast.error(error.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#0a0a0c"
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              p: 3,
              bgcolor: "#121216",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5)"
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    bgcolor: "rgba(255, 62, 62, 0.08)",
                    color: "#ff3e3e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2
                  }}
                >
                  <LockOutlinedIcon />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                  Admin Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: "#a6adbb", mt: 0.5 }}>
                  Access the SGR Stickers control panel
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sgrstickers.com"
                    disabled={submitting}
                  />

                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitting}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{ py: 1.5, mt: 1, borderRadius: "25px" }}
                  >
                    {submitting ? "Signing In..." : "Sign In"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminLogin;
