import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

// Definimos los tipos para los campos del formulario
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Usamos el hook useNavigate de react-router-dom

  // Manejo del cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // Validar campos vacíos
    if (!formData.username.trim()) {
        errors.push("El nombre de usuario es obligatorio");
    }
    if (!formData.email.trim()) {
        errors.push("El correo electrónico es obligatorio");
    }
    if (!formData.password) {
        errors.push("La contraseña es obligatoria");
    }
    if (!formData.confirmPassword) {
        errors.push("La confirmación de contraseña es obligatoria");
    }
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
        errors.push("Las contraseñas no coinciden");
    }

    if (errors.length > 0) {
        setErrorMessages(errors);
        return;
    }

    // Si no hay errores, continuar con el registro
    console.log("Registro exitoso", formData);
    alert("Cuenta creada exitosamente");
    navigate("/login");
    };

    // Modificar la parte del renderizado de errores en el return:
    {errorMessages.map((message, index) => (
    <Typography key={index} color="error" style={{ marginTop: "0.5rem" }}>
        {message}
    </Typography>
    ))}

  return (
    <Box className="login-container">
      <Typography variant="h4" className="login-title">
        Registrarse
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Campo de nombre de usuario */}
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        {/* Campo de correo electrónico */}
        <TextField
          label="Correo electrónico"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Campo de contraseña */}
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Campo de confirmación de contraseña */}
        <TextField
          label="Confirmar contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {/* Renderizado de errores*/}
        {errorMessages.length > 0 && (
        <Box sx={{ mt: 2, mb: 2 }}>
          {errorMessages.map((message, index) => (
            <Typography 
              key={index} 
              color="error" 
              sx={{ 
                marginBottom: '0.5rem',
                display: 'block'
              }}
            >
              {message}
            </Typography>
          ))}
        </Box>
      )}

        {/* Botón de registro */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="login-button"
          style={{ marginTop: "1rem" }}
        >
          Crear Cuenta
        </Button>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <span>¿Ya tienes una cuenta? </span>
        <Link to="/login" style={{ color: "cyan", textDecoration: "none" }}>
          Inicia sesión
        </Link>
      </div>
      </form>
    </Box>
  );
}
