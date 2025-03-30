import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
  onView?: () => void; // 👈 Nuevo prop
}

export default function LeagueCard({ name, onView }: Props) {
  return (
    <Card
      sx={{
        width: 250,
        backgroundColor: "#1f2937",
        border: "2px solid cyan",
        borderRadius: 2,
        color: "white",
        p: 2,
        position: "relative", // necesario para posicionar el botón
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EmojiEventsIcon sx={{ fontSize: 20 }} /> {name}
        </Typography>
      </CardContent>

      <IconButton
        onClick={onView}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          color: "cyan",
          backgroundColor: "#0a0f1d",
          "&:hover": {
            backgroundColor: "rgba(0,255,255,0.1)",
          },
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </Card>
  );
}
