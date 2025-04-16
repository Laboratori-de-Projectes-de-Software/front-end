import React from 'react';
import { useParams } from 'react-router-dom';

type LeagueParams = {
  userId: string;
};

const LeagueParam: React.FC = () => {
  const league = useParams<LeagueParams>();

  return (
    <div>
      <h1>Profile</h1>
      <p>Behold, user of ID: {league.userId}</p>
      {/* You can fetch user data based on userId here */}
    </div>
  );
};

export default LeagueParam;
