import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles.css"; // Importamos los estilos

export default function Navbar() {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 🔹 Logo IA */}
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", fontSize: "1.8rem" }}>
          🤖 <span style={{ color: "cyan" }}>AI Battle Arena</span>
        </Typography>

        {/* 🔹 Botón de Login */}
        <IconButton component={Link} to="/login" sx={{ color: "cyan", fontSize: "1.8rem" }}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
