import { createTheme } from "@mui/material";

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#9A6AFF",
      },
      secondary: {
        main: "#FF6B6B",
      },
      background: {
        default: mode === "dark" ? "#1E2029" : "#FFFFFF",
        paper: mode === "dark" ? "#232530" : "#F5F5F5",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#000000",
        secondary: mode === "dark" ? "#AAB0C6" : "#6B7280",
      },
      divider: mode === "dark" ? "#373C4A" : "#E0E0E0",
    },
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
};
