import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function BotRegisterForm() {
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !endpoint || !description) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          endpoint,
          description,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        alert(data.message);
        setName("");
        setEndpoint("");
        setDescription("");
      } else if (response.status === 409) {
        alert("Ya existe un bot con ese endpoint.");
      } else if (response.status === 400) {
        alert("Datos inválidos. Revisa los campos.");
      } else if (response.status === 401) {
        alert("No autorizado. Inicia sesión de nuevo.");
      } else {
        alert("Error inesperado al registrar el bot.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar los datos.");
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
        />
        <TextField
          label="Endpoint"
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
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Registrar Bot
        </Button>
      </form>
    </Box>
  );
}
