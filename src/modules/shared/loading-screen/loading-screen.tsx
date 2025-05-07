import { FC } from "react"
import "./loading-screen.scss"

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen : FC<LoadingScreenProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-animation">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            className="loading-svg"
          >
            {/* Círculo exterior */}
            <circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="8" fill="none" className="loading-circle-bg" />

            {/* Círculo animado */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#4f46e5"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="loading-circle"
            />

            {/* Elementos del robot */}
            <rect x="40" y="40" width="40" height="30" rx="4" fill="#222" className="robot-head" />
            <circle cx="50" cy="50" r="5" fill="#4f46e5" className="robot-eye left" />
            <circle cx="70" cy="50" r="5" fill="#4f46e5" className="robot-eye right" />
            <rect x="45" y="65" width="30" height="5" rx="2" fill="#4f46e5" className="robot-mouth" />

            {/* Antenas */}
            <line x1="50" y1="40" x2="45" y2="30" stroke="#4f46e5" strokeWidth="2" className="robot-antenna" />
            <line x1="70" y1="40" x2="75" y2="30" stroke="#4f46e5" strokeWidth="2" className="robot-antenna" />
            <circle cx="45" cy="30" r="3" fill="#4f46e5" className="robot-antenna-dot" />
            <circle cx="75" cy="30" r="3" fill="#4f46e5" className="robot-antenna-dot" />
          </svg>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  )
}

export default LoadingScreen;