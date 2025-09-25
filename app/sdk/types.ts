export interface ApiConfig {
  baseURL: string;
  bearerToken?: string;
}

export interface CreateGameResponse {
  id: number;
  password: string;
}

export interface JoinGameParams {
  gameID: string;
  password: string;
  name: string;
  color: string;
}

export interface JoinGameResponse {
  id: number;
  token: string;
  name: string;
}