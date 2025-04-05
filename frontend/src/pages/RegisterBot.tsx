import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, CircularProgress, Alert } from "@mui/material";

interface BotProps {
  botToEdit?: {
    id?: number;
    name: string;
    endpoint?: string;
    description: string;
  };
  onBotSaved?: () => void;
}

export default function BotRegisterForm({ botToEdit, onBotSaved }: BotProps) {
  const [name, setName] = useState(botToEdit?.name || "");
  const [endpoint, setEndpoint] = useState(botToEdit?.endpoint || "");
  const [description, setDescription] = useState(botToEdit?.description || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (botToEdit) {
      setName(botToEdit.name);
      setEndpoint(botToEdit.endpoint || "");
      setDescription(botToEdit.description);
    }
  }, [botToEdit]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    // Validaciones según el esquema BotDTO
    if (!name.trim()) {
      setErrorMessage("El nombre del bot es obligatorio");
      setIsSubmitting(false);
      return;
    }

    if (!description.trim()) {
      setErrorMessage("La descripción es obligatoria");
      setIsSubmitting(false);
      return;
    }

    if (!endpoint.trim()) {
      setErrorMessage("El endpoint es obligatorio según la API");
      setIsSubmitting(false);
      return;
    }

    if (endpoint.trim() && !isValidUrl(endpoint.trim())) {
      setErrorMessage("El endpoint debe ser una URL válida (comienza con http:// o https://)");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No se encontró el token de autenticación");
      setIsSubmitting(false);
      return;
    }

    try {
      // Estructura exacta según BotDTO
      const payload = {
        name: name.trim(),
        descripcion: description.trim(), // Note la 'c' en 'descripcion'
        endpoint: endpoint.trim(),
        urlImagen: "" // Campo requerido pero puede ser string vacío
      };

      const url = botToEdit?.id 
        ? `http://localhost:8080/api/v0/bot/${botToEdit.id}`
        : "http://localhost:8080/api/v0/bot";

      if (botToEdit?.id && isNaN(botToEdit.id)) {
        setErrorMessage("ID del bot no válido");
        setIsSubmitting(false);
        return;
      }
      ;

      const method = botToEdit?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = "Error al guardar el bot";
        
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
          
          // Manejo específico de códigos de error
          if (response.status === 400) {
            if (errorData.errors) {
              errorMsg += `: ${errorData.errors.join(", ")}`;
            } else {
              errorMsg = "Datos inválidos enviados al servidor";
            }
          } else if (response.status === 401) {
            errorMsg = "No autorizado - Token inválido o expirado";
          } else if (response.status === 409) {
            errorMsg = "Ya existe un bot con ese nombre";
          }
        } catch (parseError) {
          console.error("Error al parsear respuesta de error:", parseError);
        }
        
        throw new Error(errorMsg);
      }

      // Éxito
      const successMsg = botToEdit?.id 
        ? "Bot actualizado correctamente" 
        : "Bot registrado correctamente";
      
      setSuccessMessage(successMsg);
      
      // Resetear formulario solo si es un nuevo bot
      if (!botToEdit?.id) {
        setName("");
        setEndpoint("");
        setDescription("");
      }

      if (onBotSaved) {
        onBotSaved();
      }

    } catch (error: unknown) {
      console.error("Error completo:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Ocurrió un error inesperado al guardar el bot");
      } else {
        setErrorMessage("Ocurrió un error inesperado al guardar el bot");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: "#111827", 
      padding: 4, 
      borderRadius: 2,
      boxShadow: "0 0 15px rgba(0,255,255,0.2)",
      maxWidth: 600,
      margin: "0 auto"
    }}>
      <Typography variant="h4" color="cyan" gutterBottom sx={{ mb: 3 }}>
        {botToEdit?.id ? "Modificar Bot" : "Registrar Nuevo Bot"}
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Bot*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={!!botToEdit?.id}
          sx={{ 
            mb: 2,
            "& .MuiInputBase-input.Mui-disabled": {
              color: "white", // fuerza el color blanco en modo disabled
            }
          }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />


        <TextField
          label="Endpoint*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://tu-endpoint.com/api"
          required
          sx={{ 
            mb: 2,
            "& .MuiInputBase-input.Mui-disabled": {
              color: "white",
            }
          }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />


        <TextField
          label="Descripción*"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ mb: 3 }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={isSubmitting}
          sx={{
            mt: 2,
            backgroundColor: "cyan",
            color: "#0a0f1d",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 255, 0.8)",
            },
            height: "48px",
            fontSize: "1rem"
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            botToEdit?.id ? "Actualizar Bot" : "Registrar Bot"
          )}
        </Button>
      </form>
    </Box>
  );
}