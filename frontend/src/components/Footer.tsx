import { Typography, Box } from "@mui/material";
import "../styles.css"; // Importamos los estilos

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2">© 2025 Liga de Bots. Todos los derechos reservados.</Typography>
    </Box>
  );
}
