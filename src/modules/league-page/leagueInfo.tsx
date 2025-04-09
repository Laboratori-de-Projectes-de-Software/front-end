import { FC } from 'react';
import './leagueInfo.scss';
import { LeagueResponseDTO } from '@interfaces/league.interface';

type Props = {
  league: LeagueResponseDTO
}

const LeagueInfo: FC<Props> = ({ league }) => {

  let claseEstado;

  if (league.state === 'pendiente') {
    claseEstado =  "p";
  } else if (league.state === 'en curso') {
    claseEstado = "e";
  } else if (league.state === 'finalizado') {
    claseEstado = "f";
  }


  return (
    <div className="league-info-container">
      <div className="league-info-container-top">
        <h2 className="league-info-title">{league.name}</h2>
        <img src={league.urlImagen} alt="League image" />
      </div>
      <div className="league-info-container-bottom">
        <h3 className="league-info-state">Estado: <span className={claseEstado}>{league.state}</span></h3>
        <h3 className="league-info-rounds">Nº de rondas: {league.rounds}</h3>
        <h3 className="league-info-match-time">Tiempo máximo de juego: {league.matchTime}</h3>
      </div>
    </div>
  );
};

export default LeagueInfo;