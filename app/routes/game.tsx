import { useSearchParams } from "react-router";
import { useGameState } from "~/hooks/use-game-state";

export default function Game() {
  const [searchParams] = useSearchParams();
  const gameID = searchParams.get("gameID");
  const playerId = searchParams.get("playerId");
  const token = searchParams.get("token");
  const teamName = searchParams.get("teamName");

  const gameState = useGameState({ gameID: gameID!, token: token! });

  console.log("gameState:", gameState);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Column 1: Overview Cards */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg mb-2">Player Details</h2>
            <p className="text-sm">
              <strong>Game ID:</strong> {gameID}
            </p>
            <p className="text-sm">
              <strong>Player ID:</strong> {playerId}
            </p>
            <p className="text-sm">
              <strong>Team Name:</strong> {teamName}
            </p>
          </div>

          {gameState?.players && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-3">Players Overview</h2>
              <div className="space-y-2">
                {gameState.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded border"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: player.styles.color || '#gray' }}
                      />
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <span className="text-xs text-gray-600">Team {player.team}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Game UI Area (spans 3 columns) */}
        <div className="col-span-3 bg-white rounded-lg shadow-md p-4">
          <div className="h-full flex items-center justify-center text-gray-500">
            Game UI Area
          </div>
        </div>
      </div>

      <audio autoPlay loop>
        <source src="/sounds/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
