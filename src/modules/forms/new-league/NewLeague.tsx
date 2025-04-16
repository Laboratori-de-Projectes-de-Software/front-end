import { useState } from "react";
import "./NewLeague.scss";
import TextInput from "@modules/shared/input/text-input/text-input";
import { appApi } from "../../../features/shared/index";
import { useAuth } from "../../../auth/AuthProvider";

const NewLeague = () => {
  const [name, setName] = useState("");
  const [rounds, setRounds] = useState(1);
  const [duration, setDuration] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");
  const [postLeague] = appApi.usePostLeagueMutation();
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postLeague({
      name,
      urlImagen,
      rounds,
      matchTime: duration,
      bots: [],
      userId: auth!.getUser()!.userId,
    })
      .unwrap()
      .then((response) => {
        console.log("Liga creada:", response);
      })
      .catch((error) => {
        console.error("Error al crear la liga:", error);
      })

  };

  const renderRoundsOptions = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1} ronda{index + 1 > 1 ? "s" : ""}
      </option>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="new-league-form">
      <h1>Crear Nueva Liga</h1>
      <TextInput value={name} setValue={setName} text="Nombre de la liga" />
      <TextInput value={urlImagen} setValue={setUrlImagen} text="Url de la imagen" />
      {/* <div className="new-league-form__quantity">
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
      </div> */}
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
      <div className="new-league-form__duration">
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          id="duration"
          className="new-league-form__duration-input"
        >
          <option value="0" disabled>Minutos por mensaje</option>
          <option value="60">1 minuto</option>
          <option value="120">2 minutos</option>
          <option value="300">5 minutos</option>
          <option value="600">10 minutos</option>
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
