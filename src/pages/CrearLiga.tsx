import React, {useState, useRef, FormEvent, useEffect} from 'react';
import { FiUpload, FiClock } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import {useNavigate, useSearchParams} from 'react-router-dom';
import { API_LEAGUE } from '../config';
import {getLeague, updateLeague} from "../services/apiCalls.ts";
import Alert from 'react-bootstrap/Alert';

const CrearLiga: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [editing, setEditing] = useState<boolean>(searchParams.get("editing") === "true");
    const [leagueEditing, setLeagueEditing] = useState();

    // States
    const [minutes, setMinutes] = useState("5");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    // Form input states
    const [nombreLiga, setNombreLiga] = useState("");
    const [numParticipantes, setNumParticipantes] = useState(2);
    const [descripcion, setDescripcion] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(editing){
            const fetchLeague = async () => {
                const res = await getLeague(searchParams.get("leagueId"), {});
                setLeagueEditing(res.data);
            };
            fetchLeague();
        }
    }, []);

    useEffect(() => {
        if(leagueEditing){
            setNombreLiga(leagueEditing.name)
            setImagePreview(leagueEditing.urlImagen)
            setMinutes(leagueEditing.matchTime / 60)
            setNumParticipantes(leagueEditing.rounds + 1)
        }
    }, [leagueEditing]);

    useEffect(() => {
        if(showSuccessAlert){
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 4000)
        }
    }, [showSuccessAlert]);

    // Open file selector
    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Process selected file and create a preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if(file.type.startsWith('image/')) {
                processFile(file);
            }
        }
    };

    // Submit the form and create a league
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem('userId') || '1';
        const numJornadas = numParticipantes - 1;

        if(editing){
            console.log(minutes)
            const response = await updateLeague(
                leagueEditing.leagueId,
                {
                    "name": nombreLiga,
                    "urlImagen": imagePreview ? String(imagePreview) : "",
                    "rounds": numJornadas,
                    "matchTime": minutes,
                    "bots": Array.from({ length: numParticipantes }, (_, i) => i),
                    "creador": parseInt(userId)
                }
            );
            if(response.data) setShowSuccessAlert(true);
            setLoading(false);
        }else{
            try {
                const formData = new FormData();
                formData.append("nombreLiga", nombreLiga);
                formData.append("urlImagen", imagePreview ? String(imagePreview) : "");
                formData.append("numJornadas", String(numJornadas));
                formData.append("matchTime", minutes);
                formData.append("numBots", String(numParticipantes));
                formData.append("id", userId);

                const response = await fetch(API_LEAGUE, {
                    method: 'POST',
                    body: formData
                });

                const message = await response.text();

                if (!response.ok) {
                    throw new Error(`Error: ${message}`);
                }
                navigate('/mis-ligas');
            } catch (err) {
                console.error('Error:', err);
                setError(`Error al ${editing ? "editar" : "crear"} la liga. Por favor, intente de nuevo.`);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <FaTrophy size={24} className="me-2" style={{ display: 'flex' }} />
                <h3 className="fw-bold m-0">CREAR LIGA</h3>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {showSuccessAlert && <Alert variant={"success"}>La liga se ha editado correctamente</Alert>}

            <form className="p-3" onSubmit={handleSubmit}>
                <div className="row">
                    {/* Image Upload Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center justify-content-center mt-5 pe-5">
                        <div
                            className="rounded d-flex flex-column align-items-center justify-content-center"
                            style={{
                                width: "250px",
                                height: "250px",
                                backgroundColor: "#f8f9fa",
                                border: `1px solid ${isDraggingOver ? '#0d6efd' : '#6c757d'}`,
                                borderRadius: "0.375rem",
                                overflow: "hidden",
                                position: "relative",
                                transition: "border-color 0.2s ease-in-out"
                            }}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <div
                                    className="d-flex flex-column align-items-center justify-content-center h-100"
                                    style={{ paddingTop: "30px" }}
                                >
                                    <FiUpload size={64} />
                                    <p className="mt-5">Arrastra una imagen</p>
                                </div>
                            )}
                        </div>

                        <p className="my-2 text-muted fw-bold">o</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            className="btn bg-transparent border-secondary mt-1"
                            style={{ color: "#000" }}
                            onClick={handleFileButtonClick}
                        >
                            Selecciona un archivo
                        </button>
                    </div>

                    {/* Form Fields Section */}
                    <div className="col-md-8 ps-4">
                        <div className="mb-3">
                            <label htmlFor="ligaNombre" className="form-label fw-bold">
                                Nombre Liga
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ligaNombre"
                                placeholder="..."
                                value={nombreLiga}
                                onChange={(e) => setNombreLiga(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="ligaParticipantes" className="form-label fw-bold">
                                    Número participantes
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ligaParticipantes"
                                    min="2"
                                    value={numParticipantes}
                                    onChange={(e) => setNumParticipantes(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="ligaTiempo" className="form-label fw-bold">
                                    Tiempo enfrentamientos
                                </label>
                                <div className="position-relative">
                                    <select
                                        className="form-select"
                                        id="ligaTiempo"
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            backgroundImage: "none",
                                            paddingRight: "2.5rem"
                                        }}
                                        required
                                    >
                                        {Array.from({ length: 20 }, (_, i) => i + 1).map((min) => (
                                            <option key={min} value={min}>
                                                {min}:00
                                            </option>
                                        ))}
                                    </select>
                                    <div
                                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <FiClock size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ligaDescripcion" className="form-label fw-bold">
                                Descripción Liga
                            </label>
                            <textarea
                                className="form-control"
                                id="ligaDescripcion"
                                rows={6}
                                placeholder="..."
                                style={{ resize: "none" }}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    {
                        editing ?
                            <button
                                type="submit"
                                className="btn btn-success"
                                style={{width: "25%"}}
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            :
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{width: "25%"}}
                                disabled={loading}
                            >
                                {loading ? 'Creando...' : 'Crear Liga'}
                            </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default CrearLiga;