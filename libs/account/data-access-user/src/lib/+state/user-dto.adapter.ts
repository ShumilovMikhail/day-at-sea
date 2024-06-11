import { UserDTO, UserEntity } from '../types/user.models';

export interface UserDTOAdapter {
  userDTOToEntity: (userDTO: UserDTO) => UserEntity;
}

export const userDTOAdapter: UserDTOAdapter = {
  userDTOToEntity: (userDTO: UserDTO): UserEntity => {
    return {
      id: userDTO.id,
      login: userDTO.login,
      email: userDTO.email,
      fullName: userDTO.full_name,
      password: userDTO.password,
    };
  },
};
