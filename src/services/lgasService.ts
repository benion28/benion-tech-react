import api from './api';
import type { LGA } from '../store/slices/lgasSlice';

// Mock data for Nigerian Local Government Areas
const mockLGAs: LGA[] = [
  // Lagos State LGAs
  {
    id: '1',
    name: 'Ikeja',
    code: 'IK',
    stateId: '1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Lagos Island',
    code: 'LI',
    stateId: '1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Surulere',
    code: 'SU',
    stateId: '1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Abuja LGAs
  {
    id: '4',
    name: 'Abuja Municipal',
    code: 'AM',
    stateId: '2',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Gwagwalada',
    code: 'GW',
    stateId: '2',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Kano State LGAs
  {
    id: '6',
    name: 'Kano Municipal',
    code: 'KM',
    stateId: '3',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Fagge',
    code: 'FG',
    stateId: '3',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Rivers State LGAs
  {
    id: '8',
    name: 'Port Harcourt',
    code: 'PH',
    stateId: '4',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'Obio-Akpor',
    code: 'OA',
    stateId: '4',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Oyo State LGAs
  {
    id: '10',
    name: 'Ibadan North',
    code: 'IN',
    stateId: '5',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '11',
    name: 'Ibadan South-West',
    code: 'ISW',
    stateId: '5',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const getLGAs = async (stateId?: string): Promise<LGA[]> => {
  // Mock implementation for demo
  let filteredLGAs = mockLGAs.filter(lga => lga.isActive);
  
  if (stateId) {
    filteredLGAs = filteredLGAs.filter(lga => lga.stateId === stateId);
  }
  
  return filteredLGAs;
  
  // Real implementation would be:
  // const params = stateId ? { stateId } : {};
  // const response = await api.get('/lgas', { params });
  // return response.data;
};

export const getLGAById = async (id: string): Promise<LGA> => {
  // Mock implementation for demo
  const lga = mockLGAs.find(l => l.id === id);
  if (!lga) {
    throw new Error('LGA not found');
  }
  return lga;
  
  // Real implementation would be:
  // const response = await api.get(`/lgas/${id}`);
  // return response.data;
};

export const createLGA = async (lgaData: Omit<LGA, 'id' | 'createdAt' | 'updatedAt'>): Promise<LGA> => {
  // Mock implementation for demo
  const newLGA: LGA = {
    ...lgaData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockLGAs.push(newLGA);
  return newLGA;
  
  // Real implementation would be:
  // const response = await api.post('/lgas', lgaData);
  // return response.data;
};

export const updateLGA = async (id: string, data: Partial<LGA>): Promise<LGA> => {
  // Mock implementation for demo
  const index = mockLGAs.findIndex(l => l.id === id);
  if (index === -1) {
    throw new Error('LGA not found');
  }
  
  const updatedLGA = {
    ...mockLGAs[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockLGAs[index] = updatedLGA;
  return updatedLGA;
  
  // Real implementation would be:
  // const response = await api.put(`/lgas/${id}`, data);
  // return response.data;
};

export const deleteLGA = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = mockLGAs.findIndex(l => l.id === id);
  if (index === -1) {
    throw new Error('LGA not found');
  }
  mockLGAs.splice(index, 1);
  
  // Real implementation would be:
  // await api.delete(`/lgas/${id}`);
};