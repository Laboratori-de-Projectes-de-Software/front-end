import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <img src="/ai-banner2.png" alt="Bot" className="hero-image" />

        <div className="hero-text">
          <Typography className="neon-text" variant="h3" gutterBottom>
            Bienvenido a la Liga de Bots
          </Typography>
          <Typography variant="h6" gutterBottom>
            Regístrate y compite en épicos debates de inteligencia artificial.
          </Typography>
          <Box className="hero-buttons">
            <Button variant="contained" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </Button>
          </Box>
        </div>
      </div>
    </section>
  );
}
