import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Usamos el hook useNavigate de react-router-dom

  // Manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validar las credenciales o realizar una llamada a una API
    if (username === "admin" && password === "admin") {
      // Si las credenciales son correctas, redirige a la página principal
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Box className="login-container">
      <Typography variant="h4" className="login-title">
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth className="login-button">
          Iniciar sesión
        </Button>

        {/* Enlace para el registro */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <span>¿No tienes una cuenta? </span>
          <Link to="/register" style={{ color: "cyan", textDecoration: "none" }}>
            Regístrate
          </Link>
        </div>
      </form>
    </Box>
  );
}
