interface BaseLoginDataDTO {
  password: string;
}
export interface UsernameLoginDataDTO extends BaseLoginDataDTO {
  username: string;
}
export interface EmailLoginDataDTO extends BaseLoginDataDTO {
  email: string;
}

export interface LoginData {
  usernameOrEmail: string;
  password: string;
}
