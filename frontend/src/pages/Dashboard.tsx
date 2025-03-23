import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar sesión si la tienes (ej: localStorage.clear())
    navigate("/login");
  };

  const username = "admin"; 

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "240px",
          backgroundColor: "#0a0f1d",
          padding: "2rem 1rem",
          color: "cyan",
          boxShadow: "2px 0 10px rgba(0,255,255,0.2)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bienvenido, {username}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
          sx={{ mt: 2, borderColor: "cyan", color: "cyan" }}
        >
          Cerrar sesión
        </Button>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, padding: "2rem", background: "linear-gradient(to top, #0a0f1d, #1a2333)" }}>
        <Typography variant="h4" sx={{ color: "#0ff", mb: 2 }}>
          Tu panel de control
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          Aquí irán tus bots, ligas, estadísticas y más.
        </Typography>
      </Box>
    </Box>
  );
}
