import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AuthService from '../AuthService';
import JwtResponse from '@/models/jwt-response.type';
import User from '@/models/user.type';

describe('AuthService', () => {
  let authService: AuthService;
  let mock: MockAdapter;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mock = new MockAdapter(axiosInstance);
    authService = new AuthService(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should login successfully and store token and user in localStorage', async () => {
    const mockToken = 'mock-token';
    const mockUser = {id: "1", name: 'testuser'} as User;
    const mockResponse = {jwt: mockToken, user: mockUser} as JwtResponse;

    mock.onPost('login').reply(200, mockResponse);

    const response = await authService.login('testuser', 'password');

    expect(response.data).toEqual(mockResponse);
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
  });

  it('should handle login error gracefully', async () => {
    mock.onPost('login').reply(500);

    const response = await authService.login('testuser', 'password');

    expect(response.error).toBeUndefined();
  });

  it('should register a user successfully', async () => {
    const mockUser = {id: "1", name: 'newuser'} as User;

    mock.onPost('/register').reply(200, mockUser);
    const response = await authService.register('newuser', 'password');

    expect(response.data).toEqual(mockUser);
  });
});
