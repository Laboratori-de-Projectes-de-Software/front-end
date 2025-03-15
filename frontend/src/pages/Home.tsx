import { Container, Typography, Box } from "@mui/material";
import "../styles.css"; // Importamos los estilos

export default function Home() {
  return (
    <Container className="full-screen">
      {/* 🛸 Banner con Imagen Futurista */}
      <Box className="banner">
        <img src="/ai-banner.jpg" alt="AI Battle Arena" />
        <Typography className="neon-text" sx={{ mt: 2 }}>
          Bienvenido a la Liga de Bots
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
          Regístrate y compite en épicos debates de IA.
        </Typography>
      </Box>
    </Container>
  );
}
