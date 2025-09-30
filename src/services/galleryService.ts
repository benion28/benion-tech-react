import api from './api';
import type { MediaItem } from '../store/slices/gallerySlice';

export interface GetMediaItemsParams {
  page?: number;
  limit?: number;
  type?: string;
  folder?: string;
  search?: string;
}

export interface MediaItemsResponse {
  mediaItems: MediaItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface UploadMediaData {
  file: File;
  name?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
  folder?: string;
}

// Mock data for demonstration
const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'Project Screenshot 1',
    fileName: 'project-screenshot-1.png',
    url: 'https://via.placeholder.com/800x600',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    type: 'image',
    size: 2457600, // 2.4 MB
    mimeType: 'image/png',
    alt: 'Project screenshot showing the main dashboard',
    caption: 'Main dashboard view of the project',
    tags: ['screenshot', 'dashboard', 'ui'],
    folder: 'projects',
    uploadedBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Team Photo',
    fileName: 'team-photo.jpg',
    url: 'https://via.placeholder.com/1200x800',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    type: 'image',
    size: 1887437, // 1.8 MB
    mimeType: 'image/jpeg',
    alt: 'Team photo at the annual meeting',
    caption: 'Our amazing team at the 2024 annual meeting',
    tags: ['team', 'photo', 'meeting'],
    folder: 'team',
    uploadedBy: 'admin',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    name: 'Product Demo Video',
    fileName: 'product-demo.mp4',
    url: 'https://via.placeholder.com/1920x1080',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    type: 'video',
    size: 15993098, // 15.2 MB
    mimeType: 'video/mp4',
    alt: 'Product demonstration video',
    caption: 'Complete walkthrough of our latest product features',
    tags: ['demo', 'product', 'video'],
    folder: 'marketing',
    uploadedBy: 'marketing',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
  {
    id: '4',
    name: 'Company Logo',
    fileName: 'company-logo.svg',
    url: 'https://via.placeholder.com/400x400',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    type: 'image',
    size: 536871, // 524 KB
    mimeType: 'image/svg+xml',
    alt: 'Official company logo',
    caption: 'Primary company logo in SVG format',
    tags: ['logo', 'branding', 'company'],
    folder: 'branding',
    uploadedBy: 'design',
    createdAt: '2024-01-05T16:00:00Z',
    updatedAt: '2024-01-05T16:00:00Z',
  },
];

export const getMediaItems = async (params: GetMediaItemsParams = {}): Promise<MediaItemsResponse> => {
  // Mock implementation for demo
  const { page = 1, limit = 20, type, folder, search } = params;
  
  let filteredItems = [...mockMediaItems];
  
  if (type) {
    filteredItems = filteredItems.filter(item => item.type === type);
  }
  
  if (folder) {
    filteredItems = filteredItems.filter(item => item.folder === folder);
  }
  
  if (search) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  
  return {
    mediaItems: paginatedItems,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  };
  
  // Real implementation would be:
  // const response = await api.get('/media', { params });
  // return response.data;
};

export const getMediaItemById = async (id: string): Promise<MediaItem> => {
  // Mock implementation for demo
  const item = mockMediaItems.find(i => i.id === id);
  if (!item) {
    throw new Error('Media item not found');
  }
  return item;
  
  // Real implementation would be:
  // const response = await api.get(`/media/${id}`);
  // return response.data;
};

export const uploadMedia = async (fileData: UploadMediaData): Promise<MediaItem> => {
  // Mock implementation for demo
  const { file, name, alt, caption, tags = [], folder } = fileData;
  
  const newMediaItem: MediaItem = {
    id: Date.now().toString(),
    name: name || file.name,
    fileName: file.name,
    url: URL.createObjectURL(file), // In real app, this would be the uploaded file URL
    thumbnailUrl: URL.createObjectURL(file),
    type: file.type.startsWith('image/') ? 'image' : 
          file.type.startsWith('video/') ? 'video' : 
          file.type.startsWith('audio/') ? 'audio' : 'document',
    size: file.size,
    mimeType: file.type,
    alt,
    caption,
    tags,
    folder,
    uploadedBy: 'current-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockMediaItems.unshift(newMediaItem);
  return newMediaItem;
  
  // Real implementation would be:
  // const formData = new FormData();
  // formData.append('file', file);
  // if (name) formData.append('name', name);
  // if (alt) formData.append('alt', alt);
  // if (caption) formData.append('caption', caption);
  // if (tags.length) formData.append('tags', JSON.stringify(tags));
  // if (folder) formData.append('folder', folder);
  // 
  // const response = await api.post('/media/upload', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });
  // return response.data;
};

export const updateMediaItem = async (id: string, data: Partial<MediaItem>): Promise<MediaItem> => {
  // Mock implementation for demo
  const index = mockMediaItems.findIndex(i => i.id === id);
  if (index === -1) {
    throw new Error('Media item not found');
  }
  
  const updatedItem = {
    ...mockMediaItems[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockMediaItems[index] = updatedItem;
  return updatedItem;
  
  // Real implementation would be:
  // const response = await api.put(`/media/${id}`, data);
  // return response.data;
};

export const deleteMediaItem = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = mockMediaItems.findIndex(i => i.id === id);
  if (index === -1) {
    throw new Error('Media item not found');
  }
  mockMediaItems.splice(index, 1);
  
  // Real implementation would be:
  // await api.delete(`/media/${id}`);
};