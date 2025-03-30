import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface BotProps {
  botToEdit?: {
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

  useEffect(() => {
    if (botToEdit) {
      setName(botToEdit.name);
      setEndpoint(botToEdit.endpoint || "");
      setDescription(botToEdit.description);
    }
  }, [botToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !description.trim()) {
      setErrorMessage("El nombre y la descripción son obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.username;

    if (!token || !username) {
      setErrorMessage("Sesión no válida. Inicia sesión nuevamente.");
      return;
    }

    const payload = {
      name: name.trim(),
      endpoint: endpoint.trim() || null,
      description: description.trim(),
      "user-id": username,
    };

    try {
      const url = botToEdit
        ? `http://localhost:8080/bots/${botToEdit.name}`
        : "http://localhost:8080/bots/register";

      const method = botToEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = null;
      if (text) {
        data = JSON.parse(text);
      }

      if (response.ok) {
        alert(
          data?.message ||
            (botToEdit ? "Bot modificado correctamente." : "Bot registrado correctamente.")
        );
        setName("");
        setEndpoint("");
        setDescription("");
        if (onBotSaved) onBotSaved();
      } else {
        setErrorMessage(data?.message || "Error al guardar el bot.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="cyan" gutterBottom>
        {botToEdit ? "Modificar Bot" : "Registrar Bot"}
      </Typography>

      <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre del Bot"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={!!botToEdit}
        InputLabelProps={{
          style: { color: "cyan" },
        }}
        inputProps={{
          style: {
            color: "white",
            WebkitTextFillColor: "white", // ¡esto es lo que arregla el color en deshabilitado!
          },
        }}
      />


        <TextField
          label="Endpoint (opcional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />

        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />

        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          {botToEdit ? "Modificar Bot" : "Registrar Bot"}
        </Button>
      </form>
    </Box>
  );
}
