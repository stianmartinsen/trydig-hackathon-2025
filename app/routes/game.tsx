import { useSearchParams } from "react-router";
import { Bomberman, EnemyPlayer } from "~/components/bomberman";
import { useGameState } from "~/hooks/use-game-state";
import { useGameParams } from "~/hooks/use-game-params";
import { PlayerCard } from "~/components/PlayerCard";
import { GameDebugCard } from "~/components/GameDebugCard";
import { ObjectType } from "~/sdk/types";

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

  // Calculate playable area bounds (non-out-of-bounds tiles)
  const getPlayableAreaBounds = () => {
    if (!maze) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

    let minX = maze.length,
      maxX = -1;
    let minY = maze[0]?.length || 0,
      maxY = -1;

    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[x].length; y++) {
        if (maze[x][y] !== 2) {
          // Not out of bounds
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }

    return { minX, minY, maxX, maxY };
  };

  // Helper function to find bomb at specific maze position
  const getBombAtMazePosition = (mazeX: number, mazeY: number) => {
    if (!gameState?.objects) return null;

    const bounds = getPlayableAreaBounds();

    return gameState.objects.find((obj) => {
      if (obj.type !== ObjectType.BOMB) return false;

      // Convert object coordinates (relative to playable area) to maze coordinates
      const objectMazeX = obj.pos.X + bounds.minX;
      const objectMazeY = obj.pos.Y + bounds.minY;

      return objectMazeX === mazeX && objectMazeY === mazeY;
    });
  };

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
            {!!maze && gameState && (
              <div className="flex flex-col">
                {maze.map((row, rowIndex) => (
                  <div
                    className="flex items-center justify-center"
                    key={rowIndex}
                  >
                    {row.map((cell, cellIndex) => {
                      const bomb = getBombAtMazePosition(cellIndex, rowIndex);
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

                          {gameState.claims[rowIndex][cellIndex] &&
                          gameState.claims[rowIndex][cellIndex] !== 0 ? (
                            <div className="size-full bg-red-500 opacity-50 absolute z-10" />
                          ) : null}

                          {/* Show the current player */}
                          {cell === 3 ? (
                            <Bomberman direction={lastPlayerDirection} />
                          ) : null}

                          {bomb && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                              <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-red-800 shadow-lg animate-pulse">
                                <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                  💣
                                </div>
                              </div>
                            </div>
                          )}
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
