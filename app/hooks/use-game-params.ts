import { useSearchParams } from "react-router";

export function useGameParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const clearParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    gameID: searchParams.get("gameID"),
    playerId: searchParams.get("playerId"),
    token: searchParams.get("token"),
    teamName: searchParams.get("teamName"),
    playerColor: searchParams.get("playerColor"),
    clearParams,
  };
}
