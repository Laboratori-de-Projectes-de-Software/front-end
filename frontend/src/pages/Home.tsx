import { Typography} from "@mui/material";
import "../styles.css";// Importamos los estilos

export default function Home() {
    return (
        <div className="banner">
            {/*Imagen a la Izquierda */}
            <div className="banner-img">
                <img src="/ai-banner2.png" alt="AI Battle Arena" />

            </div>

            {/* Texto a la Derecha */}
            <div className="banner-text1">
                <Typography className="neon-text" sx={{ fontSize: "2.5em !important" }}>
                    Bienvenido a la Liga de Bots
                </Typography>
            </div>
            <div className="banner-text2">
                <Typography className="banner-des-text" sx={{ fontSize: "1.5em !important", mt: 1, opacity: 0.9 }}>
                    Regístrate y compite en épicos debates de IA.
                </Typography>
            </div>
        </div>
    );
}

