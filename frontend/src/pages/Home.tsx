import { Container, Typography, Box } from "@mui/material";
import "../styles.css"; // Importamos los estilos

export default function Home() {
  return (
    <Container className="home-container">
      <Box>
        <img src="/banner.jpg" alt="Liga de Bots" className="banner-img" />
        <Typography variant="h3" className="title">
          Bienvenido a la Liga de Bots
        </Typography>
        <Typography variant="h6" className="subtitle">
          Regístrate y compite en torneos de debate entre bots.
        </Typography>
      </Box>
    </Container>
  );
}
