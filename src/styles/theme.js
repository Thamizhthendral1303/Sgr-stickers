import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff3e3e", // Electric Red
      light: "#ff6666",
      dark: "#b30000",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#ff9100", // Cyber Orange
      light: "#ffa733",
      dark: "#b26500",
      contrastText: "#000000"
    },
    background: {
      default: "#0a0a0c", // Deep Carbon Black
      paper: "#121216",   // Slate Carbon Gray
      card: "rgba(22, 22, 28, 0.7)"
    },
    text: {
      primary: "#ffffff",
      secondary: "#a6adbb",
      disabled: "#666666"
    },
    divider: "rgba(255, 255, 255, 0.08)"
  },
  typography: {
    fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      "@media (max-width:600px)": {
        fontSize: "2.5rem"
      }
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.01em",
      "@media (max-width:600px)": {
        fontSize: "2rem"
      }
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.6rem"
      }
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem"
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem"
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem"
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.03em"
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(255, 62, 62, 0.3)"
          }
        },
        containedSecondary: {
          "&:hover": {
            boxShadow: "0 8px 20px rgba(255, 145, 0, 0.3)"
          }
        },
        outlined: {
          borderWidth: "1.5px",
          borderColor: "rgba(255, 255, 255, 0.15)",
          color: "#ffffff",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: "#ffffff",
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 8px 20px rgba(255, 255, 255, 0.05)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121216",
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))",
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-5px)",
            border: "1px solid rgba(255, 62, 62, 0.3)",
            boxShadow: "0 15px 35px rgba(255, 62, 62, 0.1)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)"
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.05)"
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10, 10, 12, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "none"
        }
      }
    }
  }
});

export default theme;
