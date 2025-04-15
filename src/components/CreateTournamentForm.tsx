import React, { useState, useEffect } from "react";
import { sendAuthedRequest } from "../utils/auth";

const url_create_league = "http://localhost:8080/league";
const url_get_bots = "http://localhost:8080/bots";

interface TournamentForm {
  name: string;
  rounds: string;
  bots: string;
  matches: string;
  matchTime: string;
  selectedBots: string[];
}

export const CreateTournamentForm = ({ className }: { className?: string }) => {
  const [form, setForm] = useState<TournamentForm>({
    name: "",
    rounds: "",
    bots: "",
    matches: "",
    matchTime: "",
    selectedBots: [],
  });

  const [showBotList, setShowBotList] = useState(false);
  const [botList, setBotList] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Obtener la lista de bots desde la API
  useEffect(() => {
    if (showBotList) {
      const fetchBots = async () => {
        try {
          const response = await fetch(url_get_bots);
          if (response.ok) {
            const bots = await response.json();
            setBotList(bots.map((bot: { id: number; name: string }) => bot.name));
          } else {
            console.error("Error al obtener los bots:", response.status);
          }
        } catch (err) {
          console.error("Error de red al obtener los bots:", err);
        }
      };
      fetchBots();
    }
  }, [showBotList]);

  const handleBotCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bots = e.target.value === "" ? "" : parseInt(e.target.value);
    const maxMatches = bots && bots > 1 ? (bots * (bots - 1)) / 2 : 1;
    setForm({
      ...form,
      bots: e.target.value,
      matches: Math.min(Number(form.matches) || 0, maxMatches).toString(),
      selectedBots: [], // Limpiar selección al cambiar cantidad
    });
  };

  const handleMatchTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const matchTime = e.target.value === "" ? "" : Math.min(parseInt(e.target.value) || 0, 15);
    setForm({ ...form, matchTime: matchTime.toString() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const leagueData = {
      name: form.name,
      rounds: parseInt(form.rounds),
      matchTime: parseInt(form.matchTime),
      bots: form.selectedBots,
    };

    try {
      const response = await fetch(url_create_league, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leagueData),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSuccess(`Liga creada con éxito: ${data.name}`);
        setError("");
        setForm({
          name: "",
          rounds: "",
          bots: "",
          matches: "",
          matchTime: "",
          selectedBots: [],
        });
        setShowBotList(false);
      } else {
        const errorData = await response.json();
        setError(`Error al crear la liga: ${errorData.message}`);
      }
    } catch (err) {
      setError("Error de red al crear la liga");
    }
  };

  const handleCancel = () => {
    setForm({ ...form, selectedBots: [] });
    setShowBotList(false);
  };

  const allParametersFilled =
    form.name && form.rounds && form.bots && form.matches && form.matchTime;

  const allBotsSelected =
    form.selectedBots.length === parseInt(form.bots || "0");

  return (
    <div className="w-full p-4 flex">
      {/* Formulario principal */}
      <div className="bg-slate-900 border border-gray-700 rounded-xl w-3/4 p-6 relative flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name input */}
          <InputField
            label="NAME"
            value={form.name}
            placeholder="Nombre del torneo"
            onChange={(val) => setForm({ ...form, name: val })}
            disabled={showBotList}
          />

          {/* Rounds input */}
          <InputField
            label="ROUNDS"
            type="number"
            value={form.rounds}
            placeholder="Número de jornadas"
            onChange={(val) => setForm({ ...form, rounds: val })}
            disabled={showBotList}
          />

          {/* Bots input */}
          <InputField
            label="BOTS"
            type="number"
            value={form.bots}
            placeholder="Número de bots"
            onChange={(val) => handleBotCountChange({ target: { value: val } } as any)}
            disabled={showBotList}
          />

          {/* Matches input */}
          <InputField
            label="MATCHES"
            type="number"
            value={form.matches}
            placeholder="Cantidad de partidos"
            onChange={(val) =>
              setForm({
                ...form,
                matches:
                  val === ""
                    ? ""
                    : Math.min(
                        parseInt(val),
                        (Number(form.bots) * (Number(form.bots) - 1)) / 2
                      ).toString(),
              })
            }
            disabled={showBotList}
          />

          {/* Match time input */}
          <InputField
            label="TIME"
            type="number"
            value={form.matchTime}
            placeholder="Tiempo por partido (minutos)"
            onChange={(val) => handleMatchTimeChange({ target: { value: val } } as any)}
            disabled={showBotList}
          />

          {/* Select Bots Button */}
          {allParametersFilled && (
            <button
              type="button"
              className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
              onClick={() => setShowBotList(true)}
            >
              Seleccionar Bots
            </button>
          )}

          {/* Submit Button */}
          {allBotsSelected && allParametersFilled && (
            <button
              type="submit"
              className="py-2.5 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold mt-2"
            >
              Crear Liga
            </button>
          )}

          {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>

      {/* Bot List Sidebar */}
      {showBotList && (
        <div className="w-1/4 bg-slate-800 border-l border-gray-700 p-4">
          <h2 className="text-white text-lg font-semibold mb-4">Seleccionar Bots</h2>
          <ul className="text-white">
            {botList.map((bot) => (
              <li key={bot}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={bot}
                    checked={form.selectedBots.includes(bot)}
                    onChange={(e) => {
                      const selected = e.target.checked
                        ? [...form.selectedBots, bot]
                        : form.selectedBots.filter((b) => b !== bot);
                      setForm({ ...form, selectedBots: selected });
                    }}
                  />
                  {bot}
                </label>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
const InputField = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  type?: string;
  disabled?: boolean;
}) => (
  <div className="relative">
    <input
      type={type}
      className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
      {label}
    </span>
  </div>
);

export default CreateTournamentForm;
