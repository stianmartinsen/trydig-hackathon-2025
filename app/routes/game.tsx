import { useSearchParams } from "react-router";
import { useGameState } from "~/hooks/use-game-state";

export default function Game() {
  const [searchParams] = useSearchParams();
  const gameID = searchParams.get("gameID");
  const playerId = searchParams.get("playerId");
  const token = searchParams.get("token");
  const teamName = searchParams.get("teamName");

  const gameState = useGameState({ gameID: gameID!, token: token! });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Game Player Dashboard
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Player Details</h2>
            <p>
              <strong>Game ID:</strong> {gameID}
            </p>
            <p>
              <strong>Player ID:</strong> {playerId}
            </p>
            <p>
              <strong>Token:</strong> {token}
            </p>
            <p>
              <strong>Team Name:</strong> {teamName}
            </p>
          </div>

          <audio autoPlay loop>
            <source src="/sounds/music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}
