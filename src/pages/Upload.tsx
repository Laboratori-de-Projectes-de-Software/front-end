import { useState } from "react";
import style from "./Upload.module.css";
import logo from "../assets/img/logo.png";

export function Upload() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
    };

    const [botName, setBotName] = useState("");
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("");

    const handleUpload = async () => {
      if (!botName || !theme || !imagePreview) {
          setError("Por favor, completa todos los campos e incluye una imagen");
          return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/v0/bot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bot: {
                    name: botName,
                    description: theme,
                    urlImagen: imagePreview, // Base64
                    endpoint: "hola"
                }
            }),
        });
    
        const data = await response.json();
    
        if (response.status === 201 && data) {
            const {
                botId,
                name,
                description,
                urlImage,
                nWins,
                nLosses,
                nDraws
            } = data;
    
            console.log("Bot recibido del backend:", data);
    
            alert(`Bot "${name}" creado con ID: ${botId}`);
            
            // Opcional: mostrar imagen o estadísticas
            // limpiarFormulario();
    
        } else {
            setError("No se pudo crear el bot");
        }
    } catch (error) {
        setError("Error de conexión con el servidor");
        console.error(error);
    }
    };

  return (
    <div>
      <div className={style.background}>
        <div className={style.create}>
            <div className={style.homepage}>
                <img src={logo} alt="IA SuperLeague Logo" className={style.logo} />
                <a className={style.navlink} href={"Home"}>{"IA SUPERLEAGUE"}</a>
            </div>
            <h2>Create your Bot</h2>
            <form className={style.formContainer}>
                <div className={style.inputGroup}>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={botName} 
                        onChange={(e) => setBotName(e.target.value)} 
                        required 
                    />
                </div>
                <div className={style.inputGroup}>
                    <label>Tema:</label>
                    <input 
                        type="text" 
                        value={theme} 
                        onChange={(e) => setTheme(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p className={style.error}>{error}</p>}
                <button type="button" onClick={handleUpload}>Crear Bot</button>
            </form>
        </div>
        <div className={style.upload}>
            
            <div className={style.uploadBox}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            {!imagePreview && <div className={style.box}></div>}

  {imagePreview && (
    <div className={style.previewBox}>
      <img
        src={imagePreview}
        alt="Bot Preview"
        className={style.previewImage}
      />
    </div>
  )}
        </div>
      </div>
    </div>
  );
}
