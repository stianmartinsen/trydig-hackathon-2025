interface GameDebugCardProps {
  gameState: any;
  lastPlayerDirection: string;
  gameParams: {
    gameID: string | null;
    playerId: string | null;
    token: string | null;
    teamName: string | null;
    playerColor: string | null;
  };
}

export function GameDebugCard({ gameState, lastPlayerDirection, gameParams }: GameDebugCardProps) {
  const { gameID, playerId, token, teamName, playerColor } = gameParams;

  return (
    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-3 text-purple-800 flex items-center">
        🐛 Debug State
      </h2>
      <div className="space-y-3 text-sm">
        {/* Connection Status */}
        <div>
          <p><strong className="text-purple-700">Connection:</strong></p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              gameID && token
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {gameID && token ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              gameState
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {gameState ? '📡 Receiving' : '⏳ Waiting'}
            </span>
          </div>
        </div>

        {/* Player Info */}
        <div className="pt-2 border-t border-purple-200">
          <p><strong className="text-purple-700">Player Info:</strong></p>
          <div className="bg-white p-2 rounded border text-xs font-mono space-y-1">
            <div>ID: <span className="text-blue-600">{playerId || 'N/A'}</span></div>
            <div>Team: <span className="text-green-600">{teamName || 'N/A'}</span></div>
            <div>Color: <span className="text-purple-600">{playerColor || 'N/A'}</span></div>
            <div>Direction: <span className="text-orange-600">{lastPlayerDirection || 'N/A'}</span></div>
          </div>
        </div>

        {/* Game State Summary */}
        {gameState && (
          <div className="pt-2 border-t border-purple-200">
            <p><strong className="text-purple-700">Game State:</strong></p>
            <div className="bg-white p-2 rounded border text-xs font-mono space-y-1">
              <div>Players: <span className="text-blue-600">{gameState.players?.length || 0}</span></div>
              <div>Maze: <span className="text-green-600">{gameState.maze ? `${gameState.maze.length}x${gameState.maze[0]?.length}` : 'N/A'}</span></div>
              <div>Status: <span className="text-purple-600">{gameState.status || 'Unknown'}</span></div>
              {gameState.round && <div>Round: <span className="text-orange-600">{gameState.round}</span></div>}
            </div>
          </div>
        )}

        {/* Raw Game State (collapsed by default) */}
        <details className="pt-2 border-t border-purple-200">
          <summary className="cursor-pointer text-purple-700 font-semibold hover:text-purple-900">
            🔍 Raw Game State
          </summary>
          <div className="bg-white p-2 rounded border text-xs font-mono max-h-40 overflow-y-auto mt-2">
            <pre className="text-gray-600">
              {gameState ? JSON.stringify(gameState, null, 2) : 'No game state available'}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}