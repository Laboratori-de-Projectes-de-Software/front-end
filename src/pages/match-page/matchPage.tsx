import Match from "@modules/match/match";
import ErrorPage from "@modules/shared/error-page/error-page";
import { FC } from "react";


const MatchPage: FC = () => {

  const queryParams = new URLSearchParams(window.location.search);
  const matchId = queryParams.get("matchId");
  const leagueId = queryParams.get("leagueId");

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