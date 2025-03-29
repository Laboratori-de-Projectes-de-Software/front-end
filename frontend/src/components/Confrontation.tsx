import { Card, CardContent, Typography, Button } from "@mui/material";

interface Props {
  bot1: string;
  bot2: string;
  jornada: number;
}

export default function Confrontation({ bot1, bot2, jornada }: Props) {
  return (
    <Card className="enfrentamiento-card" sx={{ minWidth: 200, maxWidth: 250, textAlign: "center", flexShrink: 0 }}>
      <CardContent>
        <Typography variant="h6">Jornada {jornada}</Typography>
        <Typography>{bot1} VS {bot2}</Typography>
        <Button variant="contained" color="error" size="small" sx={{ mt: 1 }}>
          Ver debate
        </Button>
      </CardContent>
    </Card>
  );
}
