import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
  };
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Mock implementation for demo - replace with real API call
  if (credentials.username === 'benion' && credentials.password === 'rice8828') {
    const mockResponse: AuthResponse = {
      user: {
        id: '1',
        username: 'benion',
        email: 'benion@example.com',
        firstName: 'Benion',
        lastName: 'Tech',
        role: 'admin',
        isActive: true,
      },
      token: 'mock-jwt-token-12345',
    };
    return mockResponse;
  }
  
  if (credentials.username === 'guest' && credentials.password === 'guest123') {
    const mockResponse: AuthResponse = {
      user: {
        id: '2',
        username: 'guest',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
        role: 'user',
        isActive: true,
      },
      token: 'mock-jwt-token-guest',
    };
    return mockResponse;
  }

  throw new Error('Invalid credentials');
  
  // Real implementation would be:
  // const response = await api.post('/auth/login', credentials);
  // return response.data;
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

export const getCurrentUser = async () => {
  // Mock implementation for demo
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  // Mock user based on token
  if (token === 'mock-jwt-token-12345') {
    return {
      id: '1',
      username: 'benion',
      email: 'benion@example.com',
      firstName: 'Benion',
      lastName: 'Tech',
      role: 'admin',
      isActive: true,
    };
  }
  
  if (token === 'mock-jwt-token-guest') {
    return {
      id: '2',
      username: 'guest',
      email: 'guest@example.com',
      firstName: 'Guest',
      lastName: 'User',
      role: 'user',
      isActive: true,
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