import React, { useEffect, useState } from 'react';

const TodasLasLigas = () => {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/League')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => setLigas(data))
      .catch((error) => console.error('Error al obtener las ligas:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">HOME</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ligas.map((liga) => (
          <div
            key={liga.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="https://via.placeholder.com/300x150.png?text=Liga"
              alt="Imagen de la liga"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{liga.nombreLiga}</h2>
              <p className="text-gray-600 mb-1">Estado: {liga.estado}</p>
              <p className="text-gray-500 text-sm">
                Jornada actual: {liga.jornadaActual} / {liga.numJornadas}
              </p>
              <p className="text-gray-500 text-sm">Nº de Bots: {liga.numBots}</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Ver Liga
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodasLasLigas;
