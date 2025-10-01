import { User } from '@/models/User';
import api from './api';
import { Config } from './config';
import { dummyUsers } from '@/dummy/dummyUsers';
import { usersUrl } from './authService';

const useMock = Config.MOCK_API;

export interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

export interface UsersResponse {
  users: User[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const getUsers = async (params: GetUsersParams = {}): Promise<UsersResponse> => {
  const { page = 1, limit = 10, role, status, search } = params;
  let filteredUsers = [...dummyUsers];
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  if (useMock) {
    // Mock implementation for demo
    let filteredUsers = [...dummyUsers];

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.data.role === role);
    }

    // if (status) {
    //   const isActive = status === 'active';
    //   filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    // }

    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.data.username.toLowerCase().includes(search.toLowerCase()) ||
        user.data.email.toLowerCase().includes(search.toLowerCase()) ||
        user.data.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.data.lastname.toLowerCase().includes(search.toLowerCase())
      );
    }

  }

  // Real implementation would be:
  const response = await api.get(`${usersUrl}/api/users`, { params });
  const responseData = response.data;

  if (responseData.success) {
    filteredUsers = responseData.data.allUsers.map(user => ({
      message: "Successfull",
      success: true,
      data: {
        ...user,
        token: "test-" + Math.random()
      }
    }));
    paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  }

  if (filteredUsers) {
    return {
      users: paginatedUsers.map(user => ({
        ...user.data,
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    };
  }

  throw new Error('Failed credentials'); 
};

export const getUserById = async (id: string): Promise<User> => {
  // Mock implementation for demo
  const user = dummyUsers.find(u => u.data._id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user.data;

  // Real implementation would be:
  // const response = await api.get(`${usersUrl}/api/delete-user/${id}`);
  // return response.data;
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  // Mock implementation for demo
  const newUser: User = {
    ...userData,
    _id: Date.now().toString(),
    date: new Date().toISOString()
  };
  dummyUsers.map(user => ({
    ...user.data,
  })).unshift(newUser);
  return newUser;

  // Real implementation would be:
  // const response = await api.post(`${usersUrl}/api/add-user`, userData);
  // return response.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  // Mock implementation for demo
  const index = dummyUsers.findIndex(u => u.data._id === id);
  if (index === -1) {
    throw new Error('User not found');
  }

  const updatedUser = {
    ...dummyUsers[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  dummyUsers[index] = updatedUser;
  return updatedUser.data;

  // Real implementation would be:
  // const response = await api.put(`${usersUrl}/api/edit-user/${id}`, data);
  // return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = dummyUsers.findIndex(u => u.data._id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  dummyUsers.splice(index, 1);

  // Real implementation would be:
  // await api.delete(`/users/${id}`);
};