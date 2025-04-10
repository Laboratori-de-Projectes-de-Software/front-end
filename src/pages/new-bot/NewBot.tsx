import { useState } from "react"
import "./NewBot.scss"
import { appApi } from "../../features/shared/index";
import { BotDTO } from "@interfaces/bot.interface";
import { useAuth } from "../../auth/AuthProvider";

const NewBot = () => {

    const [name, setName] = useState("");
    const [urlImagen, setUrlImagen] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const [description, setDescription] = useState("");
    const [postBot] = appApi.usePostBotMutation();
    const auth = useAuth();

    const submitForm = (e: any) => {
        e.preventDefault();
        console.log(auth?.getUser());
        postBot({
            name,
            description,
            urlImagen,
            endpoint,
            userId: auth!.getUser()!.userId,
        } as BotDTO).unwrap().then((response) => {
            console.log("Bot creado correctamente", response);
        });
    }

    return (
        <article className="bot-card">
            <div className="bot-form-container">

                <form className="bot-form" onSubmit={submitForm}>
                    <h3 className="section-title">Información del Bot</h3>

                    <div className="form-group">
                        <label htmlFor="bot-name">Nombre del Bot</label>
                        <input
                            type="text"
                            id="bot-name"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Asistente IA"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bot-description">Descripción</label>
                        <textarea
                            id="bot-description"
                            className="form-textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe lo que hace tu bot..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bot-image">URL de la imagen</label>
                        <input
                            type="url"
                            id="bot-image"
                            className="form-input"
                            value={urlImagen}
                            onChange={(e) => setUrlImagen(e.target.value)}
                            placeholder="https://ejemplo.com/imagen.png"
                        />
                        <div className="image-upload-section">
                            <div className="image-preview">
                                <img src={urlImagen || "/placeholder.svg?height=96&width=96"} alt="Vista previa" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bot-endpoint">Endpoint</label>
                        <input
                            type="url"
                            id="bot-endpoint"
                            className="form-input"
                            value={endpoint}
                            onChange={(e) => setEndpoint(e.target.value)}
                            placeholder="https://api.ejemplo.com/bot"
                        />
                        <p className="input-help">URL donde se procesarán las solicitudes del bot</p>
                    </div>

                    <div className="bot-preview-section">
                        <h3 className="section-title">Vista previa</h3>
                        <div className="bot-preview">
                            <div className="bot-preview-header">
                                <div className="bot-avatar">
                                    <img src={urlImagen || "/placeholder.svg?height=96&width=96"} alt="Bot" />
                                </div>
                                <div className="bot-info">
                                    <h3 className="bot-name">{name || "Nombre del Bot"}</h3>
                                    <p className="bot-description-preview">{description || "Descripción del bot..."}</p>
                                </div>
                                <div className="bot-status online"></div>
                            </div>
                            <div className="bot-preview-body">
                                <div className="endpoint-info">
                                    <span className="endpoint-label">Endpoint:</span>
                                    <code className="endpoint-value">{endpoint || "https://api.ejemplo.com/bot"}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="submit-button" type="submit">Crear Bot</button>
                    </div>
                </form>
            </div>
        </article>
    )
}

export default NewBot;