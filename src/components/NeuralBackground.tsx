import React, { useEffect, useRef } from "react";
import "./NeuralBackground.css";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const numPoints = 60;
  const maxDistance = 130;
  const animationIdRef = useRef<number>(0);

  // Usamos un ref para las dimensiones para evitar rerenderizados
  const dimensionsRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: NodeJS.Timeout;

    // Función para inicializar los puntos con distribución uniforme
    const initPoints = (width: number, height: number) => {
      const velocityFactor = 0.12; // Aún más lento

      pointsRef.current = Array.from({ length: numPoints }, () => ({
        // Distribuir uniformemente por toda la pantalla
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * velocityFactor,
        vy: (Math.random() - 0.5) * velocityFactor,
      }));
    };

    // Función para redistribuir los puntos manteniendo sus velocidades
    const redistributePoints = (width: number, height: number) => {
      // Obtener el factor de escala
      const oldWidth = dimensionsRef.current.width;
      const oldHeight = dimensionsRef.current.height;

      // Actualizar cada punto proporcionalmente
      for (const point of pointsRef.current) {
        // Escalar sus posiciones proporcionalmente a las nuevas dimensiones
        point.x = (point.x / oldWidth) * width;
        point.y = (point.y / oldHeight) * height;

        // Asegurarse que ningún punto esté fuera de los límites
        if (point.x < 0) point.x = 5;
        if (point.x > width) point.x = width - 5;
        if (point.y < 0) point.y = 5;
        if (point.y > height) point.y = height - 5;
      }
    };

    // Función para ajustar el tamaño del canvas y redistribuir los puntos
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(() => {
        // Obtener dimensiones reales del viewport
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Actualizar canvas
        canvas.width = width;
        canvas.height = height;

        // Si ya tenemos puntos, redistribuirlos proporcionalmente
        if (pointsRef.current.length > 0) {
          redistributePoints(width, height);
        } else {
          initPoints(width, height);
        }

        // Actualizar dimensiones en el ref
        dimensionsRef.current = { width, height };
      }, 250);
    };

    // Función mejorada para detectar cambios de zoom
    const checkZoom = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (
        Math.abs(newWidth - dimensionsRef.current.width) > 50 ||
        Math.abs(newHeight - dimensionsRef.current.height) > 50
      ) {
        handleResize();
      }
    };

    // Función de animación
    const draw = () => {
      if (!canvas || !ctx) return;

      const { width, height } = dimensionsRef.current;

      // Comprobar zoom cada vez que dibujamos (más fluido)
      checkZoom();

      ctx.clearRect(0, 0, width, height);

      // Dibujar conexiones entre puntos
      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const dx = pointsRef.current[i].x - pointsRef.current[j].x;
          const dy = pointsRef.current[i].y - pointsRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(155, 235, 183, ${alpha * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pointsRef.current[i].x, pointsRef.current[i].y);
            ctx.lineTo(pointsRef.current[j].x, pointsRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Dibujar y actualizar puntos
      for (const p of pointsRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#1DB954";
        ctx.fill();

        // Actualizar posición (movimiento lento)
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en los bordes con pequeño margen
        if (p.x <= 2 || p.x >= width - 2) p.vx *= -1;
        if (p.y <= 2 || p.y >= height - 2) p.vy *= -1;
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    // Configuración inicial
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dimensionsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    initPoints(window.innerWidth, window.innerHeight);

    // Eventos
    window.addEventListener("resize", handleResize);

    // Iniciar animación
    animationIdRef.current = requestAnimationFrame(draw);

    // Limpieza
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <>
      <div className="gradient-layer"></div>
      <canvas ref={canvasRef} className="neural-layer" />
    </>
  );
};

export default NeuralBackground;
