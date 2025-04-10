import { useState } from "react"
import "./error-page.css"

interface ErrorPageProps {
  title?: string
  message?: string
  errorCode?: string | number
  onRetry?: () => void
  onGoBack?: () => void
}

export default function ErrorPage({
  title = "Ha ocurrido un error",
  message = "No hemos podido procesar tu solicitud en este momento.",
  errorCode = "500",
  onRetry = () => window.location.reload(),
  onGoBack = () => window.history.back(),
}: ErrorPageProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)

    // Simular un intento de reconexión
    setTimeout(() => {
      setIsRetrying(false)
      onRetry()
    }, 1500)
  }

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon-container">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="error-icon"
          >
            {/* Círculo de fondo */}
            <circle cx="60" cy="60" r="50" fill="#2A2A2A" />

            {/* Cara robot triste */}
            <rect x="30" y="35" width="60" height="45" rx="6" fill="#1E1E1E" className="robot-face" />

            {/* Ojos */}
            <circle cx="45" cy="55" r="6" fill="#EF4444" className="robot-eye left" />
            <circle cx="75" cy="55" r="6" fill="#EF4444" className="robot-eye right" />

            {/* Boca triste */}
            <path
              d="M45 75 Q60 65 75 75"
              stroke="#EF4444"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="robot-mouth"
            />

            {/* Antenas */}
            <line x1="45" y1="35" x2="40" y2="25" stroke="#EF4444" strokeWidth="3" className="robot-antenna" />
            <line x1="75" y1="35" x2="80" y2="25" stroke="#EF4444" strokeWidth="3" className="robot-antenna" />
            <circle cx="40" cy="25" r="4" fill="#EF4444" className="robot-antenna-dot" />
            <circle cx="80" cy="25" r="4" fill="#EF4444" className="robot-antenna-dot" />

            {/* Destellos de error */}
            <path d="M20 40 L15 35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
            <path d="M15 60 L10 60" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
            <path d="M20 80 L15 85" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
            <path d="M100 40 L105 35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
            <path d="M105 60 L110 60" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
            <path d="M100 80 L105 85" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="error-spark" />
          </svg>
        </div>

        <div className="error-info">
          <h1 className="error-title">{title}</h1>
          <p className="error-message">{message}</p>
          {errorCode && <div className="error-code">Error {errorCode}</div>}
        </div>

        <div className="error-actions">
          <button
            className={`error-button retry ${isRetrying ? "retrying" : ""}`}
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {isRetrying ? (
              <>
                <span className="spinner"></span>
                Reintentando...
              </>
            ) : (
              "Reintentar"
            )}
          </button>
          <button className="error-button back" onClick={onGoBack}>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}
