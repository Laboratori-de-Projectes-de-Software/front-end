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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const errors: { username?: string; password?: string } = {};
    const messages: string[] = [];
  
    if (!username.trim()) {
      errors.username = "El nombre de usuario es obligatorio";
      messages.push(errors.username);
    }
  
    if (!password.trim()) {
      errors.password = "La contraseña es obligatoria";
      messages.push(errors.password);
    }
  
    if (messages.length > 0) {
      setFieldErrors(errors);
      setErrorMessages(messages);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/v0/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user: username,  // Changed from username to user
          password: password 
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
      
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("user", JSON.stringify({ username }));
      
        navigate("/dashboard");
        
      } else if (response.status === 401 || response.status === 404) {
        setFieldErrors({
          username: "Credenciales incorrectas",
          password: "Credenciales incorrectas",
        });
        setErrorMessages(["Nombre de usuario o contraseña incorrectos"]);
      } else {
        const errorData = await response.json();
        setErrorMessages([errorData.message || "Error inesperado. Intenta más tarde."]);
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrorMessages(["No se pudo conectar con el servidor."]);
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
          helperText={fieldErrors.username}
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
          helperText={fieldErrors.password}
        />

        {errorMessages.length > 0 && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {errorMessages.map((msg, i) => (
              <Typography key={i} color="error" sx={{ mb: 1 }}>
                {msg}
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