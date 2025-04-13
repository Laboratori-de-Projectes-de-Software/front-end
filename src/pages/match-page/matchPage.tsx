import Match from "@modules/match/match";
import ErrorPage from "@modules/shared/error-page/error-page";
import { FC } from "react";
import { useParams } from "react-router-dom";


const MatchPage: FC = () => {

  const { leagueId, matchId } = useParams();

  if (!matchId || isNaN(Number(matchId))) {
    return <ErrorPage message="Ha ocurrido un error al recuperar el partido"/>;
  }

  if (!leagueId || isNaN(Number(leagueId))) {
    return <ErrorPage message="Ha ocurrido un error al recuperar el partido la liga"/>;
  }

  return (
    <div className="match-page">
      <Match 
        leagueId={Number(leagueId)}
        matchId={Number(matchId)}
      />
    </div>
  )
}

export default MatchPage;