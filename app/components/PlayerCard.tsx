interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    team: number;
  };
  index: number;
  currentPlayerId?: string;
  currentPlayerColor?: string;
}

const playerColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];

const getPlayerColor = (
  player: PlayerCardProps["player"],
  index: number,
  currentPlayerId?: string,
  currentPlayerColor?: string
) => {
  if (player.id === parseInt(currentPlayerId || "0")) {
    return currentPlayerColor || "#FF0000";
  }
  return playerColors[index % playerColors.length];
};

export function PlayerCard({
  player,
  index,
  currentPlayerId,
  currentPlayerColor,
}: PlayerCardProps) {
  return (
    <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded border">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{
            backgroundColor: getPlayerColor(
              player,
              index,
              currentPlayerId,
              currentPlayerColor
            ),
          }}
        />
        <span className="font-medium text-sm">{`Player ${player.id}`}</span>
      </div>
      <span className="text-xs text-gray-600">Team {player.team}</span>
    </div>
  );
}
