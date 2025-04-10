import { FC } from 'react';
import './leaguePage.scss';
import League from '../../modules/league-page/league';
import { useParams } from 'react-router-dom';

const LeaguePage: FC = () => {

  const { id } = useParams();

  if (!id) {
    return <div className="error">League ID is required</div>;
  }

  return (
    <League leagueId={Number(id)}/>
  );
}

export default LeaguePage;