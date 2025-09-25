import { useGameState } from "~/hooks/use-game-state";
import { useGameParams } from "~/hooks/use-game-params";
import { PlayerCard } from "~/components/PlayerCard";

export default function Game() {
  const { gameID, playerId, token, teamName, playerColor } = useGameParams();

  const gameState = useGameState({ gameID: gameID!, token: token! });

  if (!playerId || !gameID || !token || !playerColor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">Missing game parameters.</p>
      </div>
    );
  }

  console.log("gameState:", gameState);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Column 1: Overview Cards */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg mb-2">Your player details</h2>
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
                {gameState.players.map((player, index) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    index={index}
                    currentPlayerId={playerId}
                    currentPlayerColor={playerColor}
                  />
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
