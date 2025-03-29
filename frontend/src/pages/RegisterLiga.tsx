import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function LeagueRegisterForm() {
  const [name, setName] = useState("");
  const [numberMatch, setNumberMatch] = useState("");
  const [timeMatch, setTimeMatch] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !numberMatch || !timeMatch) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const payload = {
      name,
      number_match: Number(numberMatch),
      time_match: Number(timeMatch),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/leagues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Liga registrada correctamente.");
        setName("");
        setNumberMatch("");
        setTimeMatch("");
      } else if (response.status === 409) {
        alert("Ya existe una liga con ese nombre.");
      } else {
        alert("Error al registrar la liga.");
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="cyan" gutterBottom>
        Registrar Liga
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Liga"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Número de Jornadas"
          type="number"
          fullWidth
          margin="normal"
          value={numberMatch}
          onChange={(e) => setNumberMatch(e.target.value)}
        />
        <TextField
          label="Duración del Enfrentamiento (min)"
          type="number"
          fullWidth
          margin="normal"
          value={timeMatch}
          onChange={(e) => setTimeMatch(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Registrar Liga
        </Button>
      </form>
    </Box>
  );
}