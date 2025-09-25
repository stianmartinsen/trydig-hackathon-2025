import type {
  ApiConfig,
  CreateGameResponse,
  JoinGameParams,
  JoinGameResponse,
  GameStatusResponse,
} from "./types";

export class ApiClient {
  private baseURL = "https://try-maze-runner.up.railway.app/api/v1";
  private bearerToken?: string;
  private severPassword = "SjqjcN81Shq77nqwLL";

  constructor(config?: ApiConfig) {
    this.bearerToken = config?.bearerToken;
  }

  setBearerToken(token: string) {
    this.bearerToken = token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }

    return headers;
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async post(endpoint: string, body: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  }

  /* Game Management methods */
  async createGame(params: {
    size: number;
    distribution: number;
    timelimit: number;
  }): Promise<CreateGameResponse> {
    return this.post("/game/create", {
      ...params,
      key: this.severPassword,
    });
  }

  async startGame(gameID: string) {
    return this.get(`/game/${gameID}/start`);
  }

  async stopGame(gameID: string) {
    return this.get(`/game/${gameID}/stop`);
  }

  async resetGame(gameID: string) {
    return this.get(`/game/${gameID}/reset`);
  }

  async joinGame(params: JoinGameParams): Promise<JoinGameResponse> {
    return this.post(
      `/game/${params.gameID}/player/register/${params.password}`,
      {
        name: params.name,
        styles: {
          color: params.color,
        },
      }
    );
  }

  async getPlayerStatus(
    gameID: string,
    playerToken: string
  ): Promise<GameStatusResponse> {
    const originalToken = this.bearerToken;
    this.setBearerToken(playerToken);

    try {
      const response = await this.get(`/game/${gameID}/player/status`);
      return response;
    } finally {
      if (originalToken) {
        this.setBearerToken(originalToken);
      } else {
        this.bearerToken = undefined;
      }
    }
  }
}
