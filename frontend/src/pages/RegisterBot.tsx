import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import React from "react";

export default function BotRegisterForm() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !team || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("team", team);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/bots", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Bot registrado correctamente.");
        setName("");
        setTeam("");
        setImage(null);
      } else {
        alert("Error al registrar el bot.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <Box className="login-container">
        <Typography variant="h4" className="login-title">
          Registrar Bot
        </Typography>
        <form onSubmit={handleSubmit} className= "login-form">
          <TextField
            label="Nombre del Bot"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Equipo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
          >
            Registrar Bot
          </Button>
        </form>
      </Box>
  );
}
