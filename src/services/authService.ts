import { AuthResponse, LoginCredentials, RegisterData, User } from '@/models/User';
import api from './api';
import { dummyUsers } from '@/dummy/dummyUsers';
import { Config } from './config';
import { secureStorage } from './secureStorage';

const useMock = Config.MOCK_API;
export const usersUrl = `${Config.API_URL}/benion-users`;

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (useMock) {
    // Mock implementation for demo - replace with real API call
    if (credentials.username === 'benion' && credentials.password === 'rice8828') {
      const mockResponse: AuthResponse = dummyUsers.find(user => user.data.username === credentials.username && user.data.password === credentials.password);
      return mockResponse;
    }

    if (credentials.username === 'guest' && credentials.password === 'guest123') {
      const mockResponse: AuthResponse = dummyUsers.find(user => user.data.username === credentials.username && user.data.password === credentials.password);
      return mockResponse;
    }
  }
  
  // Real implementation would be:
  const response = await api.post<AuthResponse>(`${usersUrl}/api/login`, credentials);
  const responseData = response.data;
  if (responseData.success) {
    secureStorage.setItem('userToken', responseData.data.token);
    secureStorage.setItem('loginUser', responseData.data);
    return responseData;
  }

  throw new Error('Invalid credentials');
};

export const register = async (userData: RegisterData): Promise<{ message: string }> => {
  // Mock implementation for demo
  return { message: 'Registration successful' };

  // Real implementation would be:
  // const response = await api.post('/auth/register', userData);
  // return response.data;
};

export const logout = async (): Promise<void> => {
  // Mock implementation for demo
  return Promise.resolve();

  // Real implementation would be:
  // await api.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
  // Mock implementation for demo
  const token = secureStorage.getItem('userToken');
  if (!token) {
    throw new Error('No token found');
  }

  // Mock user based on token
  if (token === 'mock-jwt-token-12345') {
    return {
      _id: '1',
      username: 'benion',
      email: 'benion@example.com',
      firstname: 'Benion',
      lastname: 'Tech',
      role: 'admin',
      token: token,
    };
  }

  if (token === 'mock-jwt-token-guest') {
    return {
      _id: '2',
      username: 'guest',
      email: 'guest@example.com',
      firstname: 'Guest',
      lastname: 'User',
      role: 'user',
      token: token,
    };
  }

  throw new Error('Invalid token');

  // Real implementation would be:
  // const response = await api.get('/auth/me');
  // return response.data;
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  // Mock implementation for demo
  return { message: 'Password reset email sent' };

  // Real implementation would be:
  // const response = await api.post('/auth/forgot-password', { email });
  // return response.data;
};