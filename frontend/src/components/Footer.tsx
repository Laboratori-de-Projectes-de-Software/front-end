import { Typography, Box } from "@mui/material";
import "../styles.css"; // Importamos los estilos

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2">
        🤖 AI Battle Arena - © 2025 Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
