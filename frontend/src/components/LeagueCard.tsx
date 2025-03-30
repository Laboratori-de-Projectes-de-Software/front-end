// src/components/LeagueCard.tsx
import { Card, CardContent, Typography} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  name: string;
}

export default function LeagueCard({ id, name }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/league/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 250,
        backgroundColor: "#1f2937",
        border: "2px solid cyan",
        borderRadius: 2,
        color: "white",
        p: 2,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 0 20px rgba(0,255,255,0.4)",
        },
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
    </Card>
  );
}
