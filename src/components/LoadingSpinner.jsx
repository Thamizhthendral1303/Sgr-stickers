import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingSpinner = ({ message = "Loading...", fullScreen = false }) => {
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    ...(fullScreen
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0a0a0c",
          zIndex: 9999
        }
      : {
          width: "100%",
          minHeight: "200px"
        })
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: "rgba(255, 255, 255, 0.05)",
          }}
          size={60}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: "#ff3e3e",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .MuiCircularProgress-circle`]: {
              strokeLinecap: "round",
            },
          }}
          size={60}
          thickness={4}
        />
      </Box>
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: "#a6adbb",
            fontWeight: 500,
            letterSpacing: "0.05em",
            animation: "pulse 1.5s infinite ease-in-out",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.6 },
              "50%": { opacity: 1 }
            }
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
