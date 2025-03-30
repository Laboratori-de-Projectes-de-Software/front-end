import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";




export default function LeagueRegisterForm() {
  const [name, setName] = useState("");
  const [numberMatch, setNumberMatch] = useState("");
  const [timeMatch, setTimeMatch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!name.trim() || !numberMatch || !timeMatch) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No se ha iniciado sesión.");
      return;
    }
  
    const payload = {
      name: name.trim(),
      number_match: parseInt(numberMatch),
      time_match: parseInt(timeMatch),
    };
  
    try {
      const response = await fetch("http://localhost:8080/leagues/create/league", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
  
      if (response.status === 201) {
        alert(data?.message || "Liga registrada correctamente.");
        navigate(0); 
      } else if (response.status === 409) {
        setErrorMessage("Ya existe una liga con ese nombre.");
      } else if (response.status === 400) {
        setErrorMessage("Datos inválidos.");
      } else if (response.status === 401) {
        setErrorMessage("No autorizado. Inicia sesión nuevamente.");
      } else {
        setErrorMessage(data?.message || "Error al registrar la liga.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocurrió un error al enviar los datos.");
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
          required
        />
        <TextField
          label="Número de Jornadas"
          type="number"
          fullWidth
          margin="normal"
          value={numberMatch}
          onChange={(e) => setNumberMatch(e.target.value)}
          required
        />
        <TextField
          label="Duración del Enfrentamiento (min)"
          type="number"
          fullWidth
          margin="normal"
          value={timeMatch}
          onChange={(e) => setTimeMatch(e.target.value)}
          required
        />
        {errorMessage && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Registrar Liga
        </Button>
      </form>
    </Box>
  );
}
