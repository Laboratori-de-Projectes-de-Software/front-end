import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newFieldErrors: { username?: string; password?: string } = {};
    const messages: string[] = [];

    if (!username.trim()) {
      newFieldErrors.username = "El nombre de usuario es obligatorio";
      messages.push("El nombre de usuario es obligatorio");
    }

    if (!password) {
      newFieldErrors.password = "La contraseña es obligatoria";
      messages.push("La contraseña es obligatoria");
    }

    if (messages.length > 0) {
      setFieldErrors(newFieldErrors);
      setErrorMessages(messages);
      return;
    }

    // Validación temporal para ejemplo
    if (username === "admin" && password === "admin") {
      setFieldErrors({});
      setErrorMessages([]);
      navigate("/");
    } else {
      setFieldErrors({
        username: "Credenciales incorrectas",
        password: "Credenciales incorrectas",
      });
      setErrorMessages(["Nombre de usuario o contraseña incorrectos"]);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <Typography variant="h4" className="auth-title">
          Iniciar sesión
        </Typography>
  
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!fieldErrors.username}
        />
  
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!fieldErrors.password}
        />
  
        {errorMessages.length > 0 && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {errorMessages.map((message, index) => (
              <Typography
                key={index}
                color="error"
                sx={{ marginBottom: "0.5rem", display: "block" }}
              >
                {message}
              </Typography>
            ))}
          </Box>
        )}
  
        <Button type="submit" variant="contained" fullWidth className="login-button">
          Iniciar sesión
        </Button>
  
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" style={{ color: "cyan", textDecoration: "none" }}>
            Regístrate
          </Link>
        </Typography>
      </form>
    </div>
  );  
}
