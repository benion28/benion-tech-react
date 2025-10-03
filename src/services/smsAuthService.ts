import { RegisterData, User } from '@/models/User';
import api from './api';
import { Config } from './config';
import { secureStorage } from './secureStorage';
import { SMSAPIResponse, SMSLoginCredentials, SMSUser } from '@/models/SMSUser';
import { dummySMSUsersResponse } from '@/dummy/dummySMSUsers ';

const useMock = Config.MOCK_API;
export const usersUrl = `${Config.API_URL}/benion-sms`;
export const smsRequestBody = {
  meta: {
    action: "0",
    source: "web"
  },
  data: null
}

export const smsLogin = async (credentials: SMSLoginCredentials): Promise<SMSAPIResponse<SMSUser>> => {
  if (useMock) {
    // Mock implementation for demo - replace with real API call
    if (credentials.email === 'bernard.iorver28@gmail.com' && credentials.password === 'rice8828') {
      const foundUser: SMSUser = dummySMSUsersResponse.data.find(user => user.email === credentials.email && user.password === credentials.password);
      const mockResponse: SMSAPIResponse<SMSUser> = {
        meta: {
          status: "200",
          message: "Successful",
          success: true
        },
        data: {
          ...foundUser,
          ...{
            access_token: "mock-jwt-token-12345",
            refresh_token: "test-refresh-token"
          }
        }
      }
      return mockResponse;
    }
  }

  // Real implementation would be:
  smsRequestBody.data = credentials
  const response = await api.post<SMSAPIResponse<SMSUser>>(`${usersUrl}/api/auth/login`, smsRequestBody);
  const responseData = response.data;
  if (responseData.meta.success) {
    secureStorage.setItem('smsUserAccessToken', responseData.data.access_token);
    secureStorage.setItem('smsUserRefreshToken', responseData.data.refresh_token);
    secureStorage.setItem('smsUser', responseData.data);
    return responseData;
  }

  throw new Error('Invalid credentials');
};

export const smsRegister = async (userData: RegisterData): Promise<{ message: string }> => {
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

export const getCurrentSMSUser = async (): Promise<SMSUser> => {
  // Mock implementation for demo
  const token = secureStorage.getItem('smsUserAccessToken') || secureStorage.getItem('smsUserRefreshToken');
  if (!token) {
    throw new Error('No token found');
  }

  // Mock user based on token
  const mockUser = dummySMSUsersResponse.data.find(user => user.access_token === token || user.refresh_token === token)
  if (mockUser) return mockUser

  throw new Error('Invalid token');

  // Real implementation would be:
  // const response = await api.get('/auth/me');
  // return response.data;
};

export const forgotSMSPassword = async (email: string): Promise<{ message: string }> => {
  // Mock implementation for demo
  return { message: 'Password reset email sent' };

  // Real implementation would be:
  // const response = await api.post('/auth/forgot-password', { email });
  // return response.data;
};