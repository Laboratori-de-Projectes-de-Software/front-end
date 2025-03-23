import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Esto permite crear enlaces
import "../styles.css";

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#0a0f1d" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", fontSize: "1.8rem", color: "cyan" }}
        >
          🤖 <span style={{ color: "cyan" }}>AI Battle Arena</span>
        </Typography>

        {/* Botón de Login */}
        <IconButton component={Link} to="/login" sx={{ color: "cyan", fontSize: "1.8rem" }}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
