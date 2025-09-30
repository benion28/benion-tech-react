import api from './api';
import type { State } from '../store/slices/statesSlice';

// Mock data for Nigerian states
const mockStates: State[] = [
  {
    id: '1',
    name: 'Lagos',
    code: 'LA',
    capital: 'Ikeja',
    country: 'Nigeria',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Abuja',
    code: 'FC',
    capital: 'Abuja',
    country: 'Nigeria',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Kano',
    code: 'KN',
    capital: 'Kano',
    country: 'Nigeria',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Rivers',
    code: 'RV',
    capital: 'Port Harcourt',
    country: 'Nigeria',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Oyo',
    code: 'OY',
    capital: 'Ibadan',
    country: 'Nigeria',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const getStates = async (): Promise<State[]> => {
  // Mock implementation for demo
  return mockStates.filter(state => state.isActive);
  
  // Real implementation would be:
  // const response = await api.get('/states');
  // return response.data;
};

export const getStateById = async (id: string): Promise<State> => {
  // Mock implementation for demo
  const state = mockStates.find(s => s.id === id);
  if (!state) {
    throw new Error('State not found');
  }
  return state;
  
  // Real implementation would be:
  // const response = await api.get(`/states/${id}`);
  // return response.data;
};

export const createState = async (stateData: Omit<State, 'id' | 'createdAt' | 'updatedAt'>): Promise<State> => {
  // Mock implementation for demo
  const newState: State = {
    ...stateData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockStates.push(newState);
  return newState;
  
  // Real implementation would be:
  // const response = await api.post('/states', stateData);
  // return response.data;
};

export const updateState = async (id: string, data: Partial<State>): Promise<State> => {
  // Mock implementation for demo
  const index = mockStates.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('State not found');
  }
  
  const updatedState = {
    ...mockStates[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockStates[index] = updatedState;
  return updatedState;
  
  // Real implementation would be:
  // const response = await api.put(`/states/${id}`, data);
  // return response.data;
};

export const deleteState = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = mockStates.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('State not found');
  }
  mockStates.splice(index, 1);
  
  // Real implementation would be:
  // await api.delete(`/states/${id}`);
};