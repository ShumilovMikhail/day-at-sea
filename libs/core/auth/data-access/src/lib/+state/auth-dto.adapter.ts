import {
  EmailLoginDataDTO,
  LoginData,
  LoginDataDTO,
} from '../types/login.models';
import { RegisterData, RegisterDataDTO } from '../types/register.models';

export interface AuthDTOAdapter {
  registerDataToDTO: (registerData: RegisterData) => RegisterDataDTO;
  loginDataToDTO: (loginData: LoginData) => LoginDataDTO | EmailLoginDataDTO;
}

const isEmail = (email: string) => {
  const pattern = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
};

export const authDTOAdapter: AuthDTOAdapter = {
  registerDataToDTO: (registerData: RegisterData): RegisterDataDTO => ({
    login: registerData.login,
    password: registerData.password,
    email: registerData.email,
    full_name: registerData.fullName,
  }),
  loginDataToDTO: (loginData: LoginData): LoginDataDTO | EmailLoginDataDTO => ({
    password: loginData.password,
    ...(isEmail(loginData.loginOrEmail)
      ? { email: loginData.loginOrEmail }
      : { login: loginData.loginOrEmail }),
  }),
};
