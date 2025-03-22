import { useState } from "react";

type Team = {
  id: number;
  abbreviation: string;
  leaguerank: string;
};

const BaseballButton = () => {
  const [error, setError] = useState<string | null>(null);
  const [topTeam, setTopTeam] = useState<string | null>(null);

  const fetchTopTeam = async () => {
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `https://yoked-backend-production.up.railway.app/api/standings`
        //`https://api.sportsdata.io/v3/mlb/scores/json/Standings/2024?key=2c332a81a36e484da7dda38c11a5e098`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Team[] = await response.json();

      const team = data.find((team) => team.leaguerank === '1');

      if (team) {
        setTopTeam(team.abbreviation);
      } else {
        setError("No top team found");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <button onClick={fetchTopTeam}>Get Top Team</button>
      {topTeam !== null && <p>Top Team: {topTeam}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default BaseballButton;
