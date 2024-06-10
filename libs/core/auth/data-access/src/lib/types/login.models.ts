interface BaseLoginDataDTO {
  password: string;
}
export interface LoginDataDTO extends BaseLoginDataDTO {
  login: string;
}
export interface EmailLoginDataDTO extends BaseLoginDataDTO {
  email: string;
}

export interface LoginData {
  loginOrEmail: string;
  password: string;
}
