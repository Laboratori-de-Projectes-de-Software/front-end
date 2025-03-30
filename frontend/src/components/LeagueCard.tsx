// src/components/LeagueCard.tsx
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  name: string;
  creator: string; 
}

export default function LeagueCard({ name, creator}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        {creator && <Typography variant="body2">Creador: {creator}</Typography>}
      </CardContent>
    </Card>
  );
}
