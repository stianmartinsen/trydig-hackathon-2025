export function Bomberman({
  direction,
}: {
  direction: "up" | "down" | "left" | "right";
}) {
  const imageMap = {
    up: "/assets/Bomberman/Back/Bman_B_f00.png",
    down: "/assets/Bomberman/Front/Bman_F_f00.png",
    left: "/assets/Bomberman/Side/Bman_F_f00.png",
    right: "/assets/Bomberman/Side/Bman_F_f00.png",
  };

  return (
    <img
      src={imageMap[direction]}
      style={{
        transform: `scaleX(${direction === "left" ? -1 : 1})`,
      }}
      className="relative z-50"
    />
  );
}

export function EnemyPlayer({ playerColor }: { playerColor?: string }) {
  return (
    <div
      className="size-full bg-blue-500 opacity-70 absolute z-40 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: playerColor || "#3b82f6",
      }}
    >
      <span className="text-white text-xs font-bold">E</span>
    </div>
  );
}
