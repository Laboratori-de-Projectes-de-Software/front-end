import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles.css"; // Importamos los estilos

export default function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography component={Link} to="/" className="navbar-title">
          Liga de Bots
        </Typography>
        <IconButton component={Link} to="/login" className="navbar-icon">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
