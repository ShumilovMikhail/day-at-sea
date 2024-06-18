import { EmailLoginDataDTO, LoginData, UsernameLoginDataDTO } from '../types/login.models';
import { RegisterData, RegisterDataDTO } from '../types/register.models';

export interface AuthDTOAdapter {
  registerDataToDTO: (registerData: RegisterData) => RegisterDataDTO;
  loginDataToDTO: (loginData: LoginData) => UsernameLoginDataDTO | EmailLoginDataDTO;
}

const isEmail = (email: string) => {
  const pattern = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
};

export const authDTOAdapter: AuthDTOAdapter = {
  registerDataToDTO: (registerData: RegisterData): RegisterDataDTO => ({
    username: registerData.username,
    password: registerData.password,
    email: registerData.email,
    full_name: registerData.fullName,
  }),
  loginDataToDTO: (loginData: LoginData): UsernameLoginDataDTO | EmailLoginDataDTO => ({
    password: loginData.password,
    ...(isEmail(loginData.usernameOrEmail)
      ? { email: loginData.usernameOrEmail }
      : { username: loginData.usernameOrEmail }),
  }),
};
