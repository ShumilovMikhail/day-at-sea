export type Token = string;

export interface AuthResponse {
  authToken: Token;
}

export interface AuthError {
  code: string;
  message: string;
  traceId: string;
  payload: unknown;
}
