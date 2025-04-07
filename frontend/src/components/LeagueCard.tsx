import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

interface Props {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
  onView?: () => void;
  onJoin?: () => void;
  onStart?: (id: number) => void;
  onEdit?: (id: number) => void;
  isAllLeaguesSection?: boolean;
  isMyLeaguesSection?: boolean;
}

export default function LeagueCard({
  id,
  name,
  status,
  onView,
  onJoin,
  onStart,
  onEdit,
  isAllLeaguesSection,
  isMyLeaguesSection,
}: Props) {
  return (
    <Card
      sx={{
        width: 260,
        minHeight: 180,
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Tooltip title="Ver detalles">
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
        </Tooltip>

        {status === "INACTIVE" && isAllLeaguesSection && onJoin && (
          <Tooltip title="Apuntarse a la liga">
            <IconButton
              onClick={onJoin}
              sx={{
                color: "cyan",
                backgroundColor: "#0a0f1d",
                "&:hover": {
                  backgroundColor: "rgba(0,255,255,0.1)",
                },
              }}
            >
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
        )}


        {status === "INACTIVE" && isMyLeaguesSection && onStart && (
          <Tooltip title="Iniciar liga">
            <IconButton
              onClick={() => onStart(id)}
              sx={{
                color: "cyan",
                backgroundColor: "#0a0f1d",
                "&:hover": {
                  backgroundColor: "rgba(0,255,255,0.1)",
                },
              }}
            >
              <RocketLaunchIcon />
            </IconButton>
          </Tooltip>
        )}

        {isMyLeaguesSection && onEdit && (
          <Tooltip title="Editar liga">
            <IconButton
              onClick={() => onEdit(id)}
              sx={{
                color: "cyan",
                backgroundColor: "#0a0f1d",
                "&:hover": {
                  backgroundColor: "rgbargba(0,255,255,0.1)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}
