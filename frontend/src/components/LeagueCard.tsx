// src/components/LeagueCard.tsx
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    name: string;
    username: string;
    createdAt: string;
}

export default function LeagueCard({ name, username, createdAt }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Creador: {username}</Typography>
        <Typography variant="body2">Fecha: {createdAt}</Typography>
      </CardContent>
    </Card>
  );
}
