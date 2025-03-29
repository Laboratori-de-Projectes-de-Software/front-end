import {IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 🔹 Sección de Bots */}
      <section className="home-section">
        <div className="section-header">
          <h2>Registro de Bots</h2>
          <IconButton onClick={() => navigate("/RegisterBot")} style={{ color: "cyan" }}>
            <EditIcon />
          </IconButton>
        </div>
      </section>

      {/* 🔹 Sección de Ligas */}
      <section className="home-section">
        <div className="section-header">
          <h2>Registro de Ligas</h2>
          <IconButton onClick={() => navigate("/RegisterLiga")} style={{ color: "cyan" }}>
            <EditIcon />
          </IconButton>
        </div>
      </section>
    </div>
  );
}
