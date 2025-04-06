import { Card, CardContent, Typography, IconButton, Button, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
  onView?: () => void;
  onJoin?: () => void;
  isAllLeaguesSection?: boolean;
}

export default function LeagueCard({ name, status, onView, onJoin, isAllLeaguesSection }: Props) {
  return (
    <Card
      sx={{
        width: 260,
        minHeight: 150,
        backgroundColor: "#1f2937",
        border: "2px solid cyan",
        borderRadius: 3,
        color: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        boxShadow: "0 0 10px rgba(0,255,255,0.2)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 0 15px rgba(0,255,255,0.4)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            mb: 1,
            color: "cyan",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 20 }} /> {name}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color:
              status === "ACTIVE"
                ? "lime"
                : status === "FINISHED"
                ? "red"
                : "gold",
          }}
        >
          Estado:{" "}
          {status === "ACTIVE"
            ? "Activa"
            : status === "FINISHED"
            ? "Finalizada"
            : "Inactiva"}
        </Typography>
      </CardContent>

      {/* Zona de botones */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <IconButton
          onClick={onView}
          sx={{
            color: "cyan",
            backgroundColor: "#0a0f1d",
            "&:hover": {
              backgroundColor: "rgba(0,255,255,0.1)",
            },
          }}
        >
          <VisibilityIcon />
        </IconButton>

        {status === "INACTIVE" && isAllLeaguesSection && onJoin && (
          <Button
            onClick={onJoin}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "cyan",
              color: "cyan",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(0,255,255,0.1)",
                borderColor: "cyan",
              },
            }}
          >
            Apuntarse
          </Button>
        )}
      </Box>
    </Card>
  );
}
