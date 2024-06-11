export interface UserDTO {
  id: number;
  login: string;
  full_name: string;
  email: string;
  password: string;
}

export interface UserEntity {
  id: number;
  login: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserError {
  code: string;
  message: string;
  traceId: string;
  payload: unknown;
}
