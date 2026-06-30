import React, { Component } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#0a0a0c",
            color: "#ffffff",
            py: 8
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: "center",
                p: 5,
                borderRadius: 4,
                backgroundColor: "#121216",
                border: "1px solid rgba(255, 62, 62, 0.2)",
                boxShadow: "0 10px 40px rgba(255, 62, 62, 0.05)"
              }}
            >
              <ErrorIcon sx={{ fontSize: 70, color: "#ff3e3e", mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Something went wrong
              </Typography>
              <Typography variant="body1" sx={{ color: "#a6adbb", mb: 4 }}>
                We apologize for the inconvenience. An unexpected error occurred while loading this page.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
                <Button
                  variant="outlined"
                  onClick={this.handleReset}
                >
                  Go to Home
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
