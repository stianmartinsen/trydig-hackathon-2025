import { useSearchParams } from "react-router";
import { useGameState } from "~/hooks/use-game-state";

export default function Game() {
  const [searchParams] = useSearchParams();
  const gameID = searchParams.get("gameID");
  const playerId = searchParams.get("id");
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  const gameState = useGameState({ gameID: gameID!, token: token! });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Game Player Dashboard
        </h1>

        {JSON.stringify(gameState)}

        <audio autoPlay loop>
          <source src="/sounds/music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
