import { loginApi } from './login.api';

describe('Login api', () => {
  it('logins correctly', async () => {
    const result = await loginApi('wizeline', 'Rocks!');
    expect(result).toEqual({
      id: '123',
      name: 'Wizeline',
      avatarUrl:
        'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
    });
  });

  it('throws an error when login is not valid', async () => {
    await expect(loginApi('Wizeline', 'Rocks!')).rejects.toThrow(Error);
  });
});
