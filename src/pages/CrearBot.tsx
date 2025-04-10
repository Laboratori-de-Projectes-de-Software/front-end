import React, { useState, useRef, FormEvent } from 'react';
import { FiUpload } from "react-icons/fi";
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';

const CrearBot: React.FC = () => {
  const navigate = useNavigate();

  // States for image upload
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form input states for bot data
  const [nombreBot, setNombreBot] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Opens the file selector
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // If a file is selected, process it
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Reads the file and sets the image preview
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop events
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };

  // Submits form data to create a bot
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const userId = localStorage.getItem('userId') || '1';
    try {
      // Build form data matching the controller's parameters.
      const formData = new FormData();
      formData.append("nombre", nombreBot);
      formData.append("descripcion", descripcion);
      formData.append("foto", imagePreview || "");
      formData.append("API", apiKey);
      formData.append("id", userId);
      
      const response = await fetch(API + '/bot', {
        method: 'POST',
        body: formData
      });

      const message = await response.text();
      
      if (!response.ok) {
        throw new Error(`Error: ${message}`);
      }
      
      navigate('/mis-bots');
    } catch (err) {
      console.error('Error:', err);
      setError('Error al crear el bot. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <FaRobot size={24} className="me-2" style={{ display: 'flex' }} />
        <h3 className="fw-bold m-0">CREAR BOT</h3>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

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

          {/* Form Fields */}
          <div className="col-md-8 ps-4">
            <div className="mb-3">
              <label htmlFor="botNombre" className="form-label fw-bold">
                Nombre Bot
              </label>
              <input
                type="text"
                className="form-control"
                id="botNombre"
                placeholder="..."
                value={nombreBot}
                onChange={(e) => setNombreBot(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="botAPIKey" className="form-label fw-bold">
                API KEY
              </label>
              <input
                className="form-control"
                id="botAPIKey"
                placeholder="Ingrese su API KEY..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="botDescripcion" className="form-label fw-bold">
                Descripción Bot
              </label>
              <textarea
                className="form-control"
                id="botDescripcion"
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
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "25%" }}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Bot'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearBot;