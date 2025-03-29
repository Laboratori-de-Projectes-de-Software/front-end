import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function BotRegisterForm() {
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar errores previos

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
      "user-id": username, // <- el backend espera un String como userId
    };

    console.log("Enviando payload:", payload);

    try {
      const response = await fetch("http://localhost:8080/bots/register", {
        method: "POST",
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
    
      if (response.status === 201) {
        alert(data?.message || "Bot registrado correctamente.");
        setName("");
        setEndpoint("");
        setDescription("");
      } else if (response.status === 409) {
        setErrorMessage("Ya existe un bot con ese endpoint.");
      } else if (response.status === 400) {
        setErrorMessage("Datos inválidos. Revisa los campos.");
      } else if (response.status === 401) {
        setErrorMessage("No autorizado. Inicia sesión nuevamente.");
      } else {
        setErrorMessage(data?.message || "Error inesperado al registrar el bot.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocurrió un error al enviar los datos.");
    }    
  };

  return (
    <Box>
      <Typography variant="h4" color="cyan" gutterBottom>
        Registrar Bot
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
        />

        <TextField
          label="Endpoint (opcional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
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
        />

        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Registrar Bot
        </Button>
      </form>
    </Box>
  );
}
