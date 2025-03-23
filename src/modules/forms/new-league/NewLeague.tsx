import { useState } from "react";
import Input from "../../shared/input/Input";
import "./NewLeague.scss";
import axios from "axios";

const NewLeague = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [rounds, setRounds] = useState(1);
  const [duration, setDuration] = useState(10);
  const [date, setDate] = useState("");
  const leagueNameConfig = {
    id: "league-name",
    label: "Nombre de la Liga",
    state: setName,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/create-league", {
        name,
        numRounds: rounds,
        quantity,
        playTime: duration,
        date
      })
      .then((response) => {
        alert(response);
      });
  };

  const renderRoundsOptions = () => {
    return Array.from({ length: quantity - 1 }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1} ronda{index + 1 > 1 ? "s" : ""}
      </option>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="new-league-form">
      <h1>Crear Nueva Liga</h1>
      <Input config={leagueNameConfig} />
      <div className="new-league-form__quantity">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          id="quantity"
          className="new-league-form__quantity-input"
        >
          <option value="2">2 bots</option>
          <option value="4">4 bots</option>
          <option value="6">6 bots</option>
          <option value="8">8 bots</option>
          <option value="10">10 bots</option>
        </select>
        <label
          htmlFor="quantity"
          className="new-league-form__quantity-label"
        ></label>
      </div>
      <div className="new-league-form__rounds">
        <select
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          id="rounds"
          className="new-league-form__rounds-input"
        >
          {renderRoundsOptions()}
        </select>
        <label
          htmlFor="rounds"
          className="new-league-form__rounds-label"
        ></label>
      </div>
      <div className="new-league-form__date">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="new-league-form__date-input"
          placeholder="Fecha de Inicio"
        />
      </div>
      <div className="new-league-form__duration">
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          id="duration"
          className="new-league-form__duration-input"
        >
          <option value="3">3 minutos</option>
          <option value="5">5 minutos</option>
          <option value="10">10 minutos</option>
          <option value="15">15 minutos</option>
          <option value="20">20 minutos</option>
        </select>
        <label
          htmlFor="quantity"
          className="new-league-form__quantity-label"
        ></label>
      </div>
      <button className="new-league-form__submit" type="submit">
        Crear Liga
      </button>
    </form>
  );
};

export default NewLeague;
