import React, { useState } from "react";

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

    const handleBotCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bots = e.target.value === "" ? "" : parseInt(e.target.value);
        const maxMatches = bots && bots > 1 ? (bots * (bots - 1)) / 2 : 1;
        setForm({ ...form, bots: e.target.value, matches: Math.min(Number(form.matches) || 0, maxMatches).toString() });
    };

    const handleMatchTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const matchTime = e.target.value === "" ? "" : Math.min(parseInt(e.target.value) || 0, 15);
        setForm({ ...form, matchTime: matchTime.toString() });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
    };

    const handleSelectBots = (selectedBots: string[]) => {
        setForm({ ...form, selectedBots});
        setShowBotList(false);
    };

    const handleCancel = () => {
        setForm({ ...form, selectedBots: [] });
        setShowBotList(false);
    };

    const allParametersFilled =
    form.name &&
    form.rounds &&
    form.bots &&
    form.matches &&
    form.matchTime;

    const allBotsSelected = form.selectedBots.length === parseInt(form.bots || "0");

    return (
        <div className="w-full p-4 flex">
        {/* Formulario principal */}
        <div className="bg-slate-900 border border-gray-700 rounded-xl w-3/4 p-6 relative flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name input */}
            <div className="relative">
                <input
                type="text"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Nombre del torneo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={showBotList}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                NAME
                </span>
            </div>

            {/* Rounds input */}
            <div className="relative">
                <input
                type="number"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Número de jornadas"
                value={form.rounds}
                onChange={(e) => setForm({ ...form, rounds: e.target.value })}
                disabled={showBotList}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                ROUNDS
                </span>
            </div>

            {/* Bots input */}
            <div className="relative">
                <input
                type="number"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Número de bots"
                value={form.bots}
                onChange={handleBotCountChange}
                disabled={showBotList}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                BOTS
                </span>
            </div>

            {/* Matches input */}
            <div className="relative">
                <input
                type="number"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Cantidad de partidos"
                value={form.matches}
                onChange={(e) =>
                    setForm({
                    ...form,
                    matches: e.target.value === "" ? "" : Math.min(parseInt(e.target.value), (Number(form.bots) * (Number(form.bots) - 1)) / 2).toString(),
                    })
                }
                disabled={showBotList}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                MATCHES
                </span>
            </div>

            {/* Match time input */}
            <div className="relative">
                <input
                type="number"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Tiempo por partido (minutos)"
                value={form.matchTime}
                onChange={handleMatchTimeChange}
                disabled={showBotList}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                TIME
                </span>
            </div>

            {/* Select Bots Button */}
            {allParametersFilled && (
                <button
                type="button"
                className="py-2.5 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowBotList(true)}
                >
                Seleccionar Bots
                </button>
            )}

            {/* Submit button */}
            {allBotsSelected && allParametersFilled &&(
                <button
                type="submit"
                className="py-2.5 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 mt-2"
                >
                Crear Liga
                </button>
            )}
            </form>
        </div>

        {/* Bot List Sidebar */}
        {showBotList && (
            <div className="w-1/4 bg-slate-800 border-l border-gray-700 p-4">
            <h2 className="text-white text-lg font-semibold mb-4">Seleccionar Bots</h2>
            <ul className="text-white">
                {["Bot1", "Bot2", "Bot3"].map((bot) => (
                <li key={bot}>
                    <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        value={bot}
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

export default CreateTournamentForm;