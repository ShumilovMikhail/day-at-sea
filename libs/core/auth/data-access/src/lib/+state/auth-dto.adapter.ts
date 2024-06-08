import { RegisterData, RegisterDataDTO } from './auth.models';

export interface AuthDTOAdapter {
  registerDataToDTO: (registerData: RegisterData) => RegisterDataDTO;
}

export const authDTOAdapter: AuthDTOAdapter = {
  registerDataToDTO: (registerData: RegisterData): RegisterDataDTO => ({
    login: registerData.login,
    password: registerData.password,
    email: registerData.email,
    full_name: registerData.fullName,
  }),
};
