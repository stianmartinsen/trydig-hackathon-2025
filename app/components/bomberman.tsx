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
    />
  );
}
