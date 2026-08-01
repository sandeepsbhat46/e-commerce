import { createTheme } from "@mui/material/styles";

// Palette approximates the existing Tailwind design tokens in styles.css
// (indigo primary, slate secondary) so MUI components feel consistent.
export const theme = createTheme({
  palette: {
    primary: { main: "#6366f1", contrastText: "#ffffff" },
    secondary: { main: "#0f172a", contrastText: "#ffffff" },
    error: { main: "#dc2626" },
    success: { main: "#16a34a" },
    warning: { main: "#d97706" },
    background: { default: "#ffffff" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
  },
});
