import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  CircularProgress,
  Alert
} from "@mui/material";

export default function LeagueRegisterForm({ onLeagueCreated }: { onLeagueCreated?: () => void }) {
  const [name, setName] = useState("");
  const [rounds, setRounds] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [availableBots, setAvailableBots] = useState<{id: string, name: string}[]>([]);
  const [loadingBots, setLoadingBots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar bots disponibles al montar el componente
  useEffect(() => {
    const fetchAvailableBots = async () => {
      setLoadingBots(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/v0/bot", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setAvailableBots(data.map((bot: { id: number; name: string }) => ({ id: bot.id.toString(), name: bot.name })));
        }
      } catch (error) {
        console.error("Error al cargar bots:", error);
      } finally {
        setLoadingBots(false);
      }
    };

    fetchAvailableBots();
  }, []);

  const handleBotSelection = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedBots(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    // Validaciones
    if (!name.trim() || !rounds || !matchTime) {
      setErrorMessage("Completa todos los campos requeridos");
      setIsSubmitting(false);
      return;
    }

    // if (selectedBots.length < 2) {
    //   setErrorMessage("Debes seleccionar al menos 2 bots");
    //   setIsSubmitting(false);
    //   return;
    // }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No se encontró el token de autenticación");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        rounds: parseInt(rounds),
        matchTime: parseInt(matchTime),
        bots: selectedBots
      };

      const response = await fetch("http://localhost:8080/api/v0/league", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Manejar respuesta vacía
      if (response.status === 204) {
        setSuccessMessage("Liga creada exitosamente");
        if (onLeagueCreated) onLeagueCreated();
        return;
      }

      // Intentar parsear JSON solo si hay contenido
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(
          data?.message || 
          `Error ${response.status}: ${response.statusText}`
        );
      }

      setSuccessMessage(data?.message || "Liga creada exitosamente");
      setName("");
      setRounds("");
      setMatchTime("");
      setSelectedBots([]);
      
      if (onLeagueCreated) {
        onLeagueCreated();
      }

    } catch (error: unknown) {
      let message = "Error inesperado al crear la liga";
    
      if (error instanceof Error) {
        console.error("Error al crear liga:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        message = error.message;
      } else {
        console.error("Error al crear liga:", error);
      }
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto',
      backgroundColor: "#111827",
      padding: 4,
      borderRadius: 2,
      boxShadow: "0 0 15px rgba(0,255,255,0.2)"
    }}>
      <Typography variant="h4" color="cyan" gutterBottom sx={{ mb: 3 }}>
        Registrar Nueva Liga
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
          label="Nombre de la Liga*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />
        
        <TextField
          label="Número de Rondas*"
          type="number"
          fullWidth
          margin="normal"
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
          inputProps={{ min: 1 }}
          required
          sx={{ mb: 2 }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />
        
        <TextField
          label="Duración del Enfrentamiento (minutos)*"
          type="number"
          fullWidth
          margin="normal"
          value={matchTime}
          onChange={(e) => setMatchTime(e.target.value)}
          inputProps={{ min: 1 }}
          required
          sx={{ mb: 2 }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "cyan" },
          }}
        />
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="bots-select-label" sx={{ color: "cyan" }}>
            Seleccionar Bots*
          </InputLabel>
          <Select
            labelId="bots-select-label"
            id="bots-select"
            multiple
            value={selectedBots}
            onChange={handleBotSelection}
            input={<OutlinedInput label="Seleccionar Bots*" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={availableBots.find(b => b.id === value)?.name || value} 
                    sx={{ 
                      backgroundColor: 'cyan', 
                      color: '#0a0f1d',
                      '& .MuiChip-deleteIcon': {
                        color: '#0a0f1d'
                      }
                    }}
                  />
                ))}
              </Box>
            )}
            disabled={loadingBots}
            // required
            sx={{
              color: "white",
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'cyan'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'cyan'
              }
            }}
          >
            {loadingBots ? (
              <MenuItem disabled>Cargando bots...</MenuItem>
            ) : (
              availableBots.map((bot) => (
                <MenuItem key={bot.id} value={bot.id}>
                  {bot.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={isSubmitting || loadingBots}
          sx={{
            mt: 2,
            backgroundColor: 'cyan',
            color: '#0a0f1d',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 255, 0.8)',
            },
            height: '48px',
            fontSize: '1rem'
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Crear Liga"
          )}
        </Button>
      </form>
    </Box>
  );
}