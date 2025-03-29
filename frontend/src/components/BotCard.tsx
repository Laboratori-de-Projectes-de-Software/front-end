import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AndroidIcon from "@mui/icons-material/Android";

interface Props {
  name: string;
  description: string;
  onEdit?: () => void;
}

export default function BotCard({ name, description, onEdit }: Props) {
  return (
    <Card
      sx={{
        width: 250,
        backgroundColor: "#1f2937",
        border: "2px solid cyan", // borde neón
        borderRadius: 2,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        position: "relative", // para colocar el botón de editar
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AndroidIcon sx={{ fontSize: 20 }} /> {name}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <IconButton
        onClick={onEdit}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "cyan",
          "&:hover": { color: "#00ffffaa" },
        }}
      >
        <EditIcon />
      </IconButton>
    </Card>
  );
}
