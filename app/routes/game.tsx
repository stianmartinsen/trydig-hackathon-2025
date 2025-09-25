import { useSearchParams } from "react-router";
import { Bomberman } from "~/components/bomberman";
import { useGameState } from "~/hooks/use-game-state";
import { useGameParams } from "~/hooks/use-game-params";
import { PlayerCard } from "~/components/PlayerCard";
import { GameDebugCard } from "~/components/GameDebugCard";

export default function Game() {
  const { gameID, playerId, token, teamName, playerColor } = useGameParams();

  const { gameState, lastPlayerDirection } = useGameState({
    gameID: gameID!,
    token: token!,
  });

  const maze = gameState?.maze;

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
          <GameDebugCard
            gameState={gameState}
            lastPlayerDirection={lastPlayerDirection}
            gameParams={{ gameID, playerId, token, teamName, playerColor }}
          />

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
            {!!maze && (
              <div className="flex flex-col">
                {maze[0]?.map((_, rowIndex) => (
                  <div
                    className="flex items-center justify-center"
                    key={maze[0].length - 1 - rowIndex}
                  >
                    {maze.map((row, cellIndex) => {
                      const cell = row[maze[0].length - 1 - rowIndex];
                      return (
                        <div
                          className="size-16 [&>img]:size-full [&>img]:absolute bg-black relative"
                          key={cellIndex}
                        >
                          {cell === 0 || cell === 3 ? (
                            <img src="/assets/Blocks/BackgroundTile.png" />
                          ) : null}

                          {cell === 1 ? (
                            <img src="/assets/Blocks/SolidBlock.png" />
                          ) : null}

                          {cell === 3 ? (
                            <Bomberman direction={lastPlayerDirection} />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
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
