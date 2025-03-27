import "react";

export default function BotCard({
  liga,
  fecha,
  participantes,
  nombre_ganador,
  img_ganador,
  puntos_ganador,
}: {
  liga: string;
  fecha: string;
  participantes: number;
  nombre_ganador: string;
  img_ganador: string;
  puntos_ganador: number;
}) {
  return (
    <div className="flex flex-col text-center justify-between rounded-2xl bg-zinc-700 text-white shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300" >
      <div className="bg-zinc-800 py-2 font-semibold text-lg">{liga}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
        Ganador
        </div>
          <div className="flex flex-col items-center">
            <img
              src={img_ganador}
              alt={nombre_ganador}
              className="rounded-full object-cover w-24 h-24 shadow-lg"
            />
            <p className="mt-2 font-medium">{nombre_ganador}</p>
            <p className="text-sm text-green-400">{puntos_ganador} pts</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            <span className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Fecha
            </span>
            <span className="text-lg">{fecha}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Participantes
            </span>
            <span className="text-lg">{participantes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
