import { useState } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton 
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles.css";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFieldErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    const newFieldErrors: Partial<FormData> = {};

    if (!formData.username.trim()) {
      errors.push("El nombre de usuario es obligatorio");
      newFieldErrors.username = "El nombre de usuario es obligatorio";
    }

    if (!formData.email.trim()) {
      errors.push("El correo electrónico es obligatorio");
      newFieldErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("El correo electrónico no es válido");
      newFieldErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password) {
      errors.push("La contraseña es obligatoria");
      newFieldErrors.password = "La contraseña es obligatoria";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.push("La contraseña debe contener mayúsculas, minúsculas y números");
      newFieldErrors.password = "Requisitos no cumplidos";
    } else if (formData.password.length < 8) {
      errors.push("La contraseña debe tener al menos 8 caracteres");
      newFieldErrors.password = "Muy corta";
    }

    if (!formData.confirmPassword) {
      errors.push("Confirma tu contraseña");
      newFieldErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      errors.push("Las contraseñas no coinciden");
      newFieldErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setFieldErrors(newFieldErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessages([]);

    try {
      console.log("Enviando datos de registro:", {
        user: formData.username,
        mail: formData.email,
        password: "***" // No registrar la contraseña real
      });

      const response = await fetch("http://localhost:8080/api/v0/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: formData.username,
          mail: formData.email,
          password: formData.password
        }),
      });

      // Manejar respuesta vacía
      if (response.status === 204) {
        navigate("/login", { state: { registered: true } });
        return;
      }

      // Intentar parsear JSON solo si hay contenido
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 
                          response.status === 409 ? "El usuario ya existe" :
                          response.status === 400 ? "Datos inválidos" :
                          `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // Registro exitoso
      navigate("/login", { 
        state: { 
          registered: true,
          username: formData.username 
        } 
      });

    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessages([
        error instanceof Error ? error.message : 
        "Error inesperado. Por favor intente nuevamente."
      ]);
    } finally {
      setIsSubmitting(false);
    }
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
          helperText={fieldErrors.username}
        />

        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />

        <TextField
          label="Contraseña"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="caption" display="block" sx={{ mt: -1, mb: 1 }}>
          La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número
        </Typography>

        <TextField
          label="Confirmar contraseña"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!fieldErrors.confirmPassword}
          helperText={fieldErrors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errorMessages.length > 0 && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {errorMessages.map((msg, i) => (
              <Alert key={i} severity="error" sx={{ mb: 1 }}>
                {msg}
              </Alert>
            ))}
          </Box>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Registrando...
            </>
          ) : "Registrarse"}
        </Button>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
            Inicia sesión
          </Link>
        </Typography>
      </form>
    </div>
  );
}