import api from './api';
import type { User } from '../store/slices/usersSlice';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    username: 'benion',
    email: 'benion@example.com',
    firstName: 'Benion',
    lastName: 'Tech',
    role: 'admin',
    isActive: true,
    avatar: 'https://via.placeholder.com/150x150',
    phoneNumber: '+1234567890',
    address: '123 Main St, City, State',
    stateId: '1',
    lgaId: '1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    lastLoginAt: '2024-01-15T09:30:00Z',
  },
  {
    id: '2',
    username: 'guest',
    email: 'guest@example.com',
    firstName: 'Guest',
    lastName: 'User',
    role: 'user',
    isActive: true,
    avatar: 'https://via.placeholder.com/150x150',
    phoneNumber: '+0987654321',
    address: '456 Oak Ave, Town, State',
    stateId: '2',
    lgaId: '3',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    lastLoginAt: '2024-01-14T14:45:00Z',
  },
  {
    id: '3',
    username: 'editor',
    email: 'editor@example.com',
    firstName: 'Content',
    lastName: 'Editor',
    role: 'editor',
    isActive: true,
    avatar: 'https://via.placeholder.com/150x150',
    phoneNumber: '+1122334455',
    address: '789 Pine Rd, Village, State',
    stateId: '1',
    lgaId: '2',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T12:00:00Z',
    lastLoginAt: '2024-01-13T11:30:00Z',
  },
];

export const getUsers = async (params: GetUsersParams = {}): Promise<UsersResponse> => {
  // Mock implementation for demo
  const { page = 1, limit = 10, role, status, search } = params;
  
  let filteredUsers = [...mockUsers];
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (status) {
    const isActive = status === 'active';
    filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
  }
  
  if (search) {
    filteredUsers = filteredUsers.filter(user => 
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  };
  
  // Real implementation would be:
  // const response = await api.get('/users', { params });
  // return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  // Mock implementation for demo
  const user = mockUsers.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
  
  // Real implementation would be:
  // const response = await api.get(`/users/${id}`);
  // return response.data;
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  // Mock implementation for demo
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockUsers.unshift(newUser);
  return newUser;
  
  // Real implementation would be:
  // const response = await api.post('/users', userData);
  // return response.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  // Mock implementation for demo
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...mockUsers[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockUsers[index] = updatedUser;
  return updatedUser;
  
  // Real implementation would be:
  // const response = await api.put(`/users/${id}`, data);
  // return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  mockUsers.splice(index, 1);
  
  // Real implementation would be:
  // await api.delete(`/users/${id}`);
};