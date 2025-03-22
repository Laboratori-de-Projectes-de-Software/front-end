import { FC } from "react";
import { DateTime } from "luxon";
import "./league-element.scss";
import { Navigate } from "react-router-dom";


type Props = {
    id: number;
    name: string;
    date: DateTime;
    playTime: number;
    numRounds: number;
    playing: boolean;
}

const LeagueElement: FC<Props> = ({id, name, date, numRounds, playTime, playing}) => {

    console.log(id);

    const handleOnClick = () => {
        return <Navigate to={`/`} />;
    }

    return (
        <div className="league-element">
            <h2 className="league-element-name">{name}</h2>
            <div className="league-element-info">
                <h3 className="league-element-date">Fecha:</h3>
                <h3 className="league-element-date">{date.toISODate()}</h3>
            </div>
            <div className="league-element-info">
                <h3 className="league-element-num-rounds">Rondas:</h3>
                <h3 className="league-element-num-rounds">{numRounds}</h3>
            </div>
            <div className="league-element-info">
                <h3 className="league-element-play-time">Duración:</h3>
                <h3 className="league-element-play-time">{playTime}</h3>
            </div>
            <div className="league-element-info">
                <h3 className="league-element-playing">Estado:</h3>
                <h3 className={`league-element-playing${playing ? '-g' : '-r'}`}>{playing ? 'En juego' : 'Finalizado'}</h3>
            </div>
            <button onClick={handleOnClick} className="league-element-button">Ver más información</button>
        </div>
    );
}

export default LeagueElement;