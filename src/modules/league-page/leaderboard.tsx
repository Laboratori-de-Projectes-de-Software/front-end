import { FC } from 'react';
import './leaderboard.scss';
import { ParticipationResponseDTO } from '@interfaces/participation.interface';

export type Props = {
  participation: ParticipationResponseDTO[] 
}

const Leaderboard: FC<Props> = ({ participation }) => {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="leaderboard-container-positions">
        {participation.map((item, index) => (
          <div key={index} className="leaderboard-position">
            <span className="leaderboard-position-rank">{index + 1}º <span>- </span></span>
            <span className="leaderboard-position-name">{item.name}</span>
            <span className="leaderboard-position-points">{item.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard;