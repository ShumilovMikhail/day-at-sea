import { authDTOAdapter } from '../lib/+state/auth-dto.adapter';

describe('authDTOAdapter', () => {
  it('registerDataToDTO: should transform RegisterData to RegisterDataDTO', () => {
    const mockData = {
      username: 'username',
      email: 'email',
      fullName: 'fullname',
      password: 'password',
    };
    expect(authDTOAdapter.registerDataToDTO(mockData)).toEqual({
      username: 'username',
      email: 'email',
      full_name: 'fullname',
      password: 'password',
    });
  });

  it('loginDataToDTO: should transform LoginData to UsernameLoginDataDTO if the user has entered a username', () => {
    const mockData = {
      usernameOrEmail: 'username',
      password: 'password',
    };
    expect(authDTOAdapter.loginDataToDTO(mockData)).toEqual({
      username: 'username',
      password: 'password',
    });
  });

  it('loginDataToDTO: should transform LoginData to EmailLoginDataDTO if the user has entered a email', () => {
    const mockData = {
      usernameOrEmail: 'email@gmail.com',
      password: 'password',
    };
    expect(authDTOAdapter.loginDataToDTO(mockData)).toEqual({
      email: 'email@gmail.com',
      password: 'password',
    });
  });
});
