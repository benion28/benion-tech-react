import api from './api';
import type { Post } from '../store/slices/postsSlice';

export interface GetPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'Learn the basics of React development...',
    excerpt: 'A comprehensive guide to React basics',
    featuredImage: 'https://via.placeholder.com/800x400',
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Frontend'],
    author: 'John Doe',
    status: 'published',
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    content: 'Explore advanced TypeScript concepts...',
    excerpt: 'Deep dive into TypeScript advanced patterns',
    featuredImage: 'https://via.placeholder.com/800x400',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    author: 'Jane Smith',
    status: 'published',
    publishedAt: '2024-01-14T14:30:00Z',
    createdAt: '2024-01-14T13:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    title: 'Building Modern UIs',
    content: 'Create beautiful user interfaces...',
    excerpt: 'Guide to modern UI development',
    featuredImage: 'https://via.placeholder.com/800x400',
    category: 'Design',
    tags: ['UI', 'UX', 'Design'],
    author: 'Mike Johnson',
    status: 'draft',
    createdAt: '2024-01-13T16:00:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
  },
];

export const getPosts = async (params: GetPostsParams = {}): Promise<PostsResponse> => {
  // Mock implementation for demo
  const { page = 1, limit = 10, category, status, search } = params;
  
  let filteredPosts = [...mockPosts];
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (status) {
    filteredPosts = filteredPosts.filter(post => post.status === status);
  }
  
  if (search) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  };
  
  // Real implementation would be:
  // const response = await api.get('/posts', { params });
  // return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  // Mock implementation for demo
  const post = mockPosts.find(p => p.id === id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
  
  // Real implementation would be:
  // const response = await api.get(`/posts/${id}`);
  // return response.data;
};

export const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
  // Mock implementation for demo
  const newPost: Post = {
    ...postData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockPosts.unshift(newPost);
  return newPost;
  
  // Real implementation would be:
  // const response = await api.post('/posts', postData);
  // return response.data;
};

export const updatePost = async (id: string, data: Partial<Post>): Promise<Post> => {
  // Mock implementation for demo
  const index = mockPosts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  
  const updatedPost = {
    ...mockPosts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockPosts[index] = updatedPost;
  return updatedPost;
  
  // Real implementation would be:
  // const response = await api.put(`/posts/${id}`, data);
  // return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  // Mock implementation for demo
  const index = mockPosts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  mockPosts.splice(index, 1);
  
  // Real implementation would be:
  // await api.delete(`/posts/${id}`);
};