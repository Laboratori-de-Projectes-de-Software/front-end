import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

interface FormData {
  username: string;
  mail: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    mail: "",
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
    if (!formData.mail.trim()) {
      errors.push("El correo electrónico es obligatorio");
      newFieldErrors.mail = "El correo electrónico es obligatorio";
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
    // Envía la petición al backend
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        mail: formData.mail,
        password: formData.password,
      }),
    })
    .then((res) => {
      if (res.status === 201) {
        alert("Cuenta creada exitosamente 🎉");
        navigate("/login");
      } else if (res.status === 409) {
        setErrorMessages(["El nombre de usuario o email ya existe"]);
      } else if (res.status === 400) {
        setErrorMessages(["Datos inválidos. Revisa el formulario."]);
      } else {
        setErrorMessages(["Error inesperado. Intenta más tarde."]);
      }
    })
    .catch(() => {
      setErrorMessages(["No se pudo conectar con el servidor"]);
    });
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <Typography variant="h4" className="auth-title">
          Registrarse
        </Typography>
  
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
          fullWidth
          margin="normal"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          error={!!fieldErrors.mail}
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
            {errorMessages.map((msg, i) => (
              <Typography key={i} color="error" sx={{ mb: 1 }}>
                {msg}
              </Typography>
            ))}
          </Box>
        )}
  
        <Button type="submit" variant="contained" fullWidth className="login-button">
          Crear cuenta
        </Button>
  
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" style={{ color: "cyan", textDecoration: "none" }}>
            Inicia sesión
          </Link>
        </Typography>
      </form>
    </div>
  );  
}
