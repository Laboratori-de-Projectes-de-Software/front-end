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

    const [id, setId] = useState("");
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!id || !theme) {
            setError("Por favor, completa todos los campos");
            return;
        }
        setError("");
        console.log("ID:", id);
        console.log("Theme:", theme);
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
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
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
                <button type="button" onClick={handleLogin}>Crear Bot</button>
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
