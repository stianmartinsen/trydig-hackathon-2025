import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("assets", "routes/assets.tsx"),
  route("join", "routes/join.tsx"),
  route("start", "routes/start.tsx"),
  route("host", "routes/host.tsx"),
  route("game", "routes/game.tsx"),
] satisfies RouteConfig;
