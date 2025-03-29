import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import React from "react";

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

  const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Elimina error al escribir
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    const newFieldErrors: Partial<FormData> = {};

    if (!formData.username.trim()) {
      errors.push("El nombre de usuario es obligatorio");
      newFieldErrors.username = "El nombre de usuario es obligatorio";
    }
    if (!formData.email.trim()) {
      errors.push("El correo electrónico es obligatorio");
      newFieldErrors.email = "El correo electrónico es obligatorio";
    }
    if (!formData.password) {
      errors.push("La contraseña es obligatoria");
      newFieldErrors.password = "La contraseña es obligatoria";
    }
    if (!formData.confirmPassword) {
      errors.push("La confirmación de contraseña es obligatoria");
      newFieldErrors.confirmPassword = "La confirmación de contraseña es obligatoria";
    }
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.push("Las contraseñas no coinciden");
      newFieldErrors.password = "Las contraseñas no coinciden";
      newFieldErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setFieldErrors(newFieldErrors);
      return;
    }

    // Si no hay errores
    setErrorMessages([]);
    setFieldErrors({});
    alert("Cuenta creada exitosamente");
    console.log("Registro exitoso", formData);
    navigate("/login");
  };

  return (
    <Box className="login-container">
      <Typography variant="h4" className="login-title">
        Registrarse
      </Typography>

      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!fieldErrors.username}
        />

        <TextField
          label="Correo electrónico"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!fieldErrors.email}
        />

        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!fieldErrors.password}
        />

        <TextField
          label="Confirmar contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!fieldErrors.confirmPassword}
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
