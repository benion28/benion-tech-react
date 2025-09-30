import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as galleryService from '../../services/galleryService';

export interface MediaItem {
  id: string;
  name: string;
  fileName: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'document' | 'audio';
  size: number;
  mimeType: string;
  alt?: string;
  caption?: string;
  tags: string[];
  folder?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryState {
  mediaItems: MediaItem[];
  currentItem: MediaItem | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters: {
    type: string;
    folder: string;
    search: string;
  };
}

const initialState: GalleryState = {
  mediaItems: [],
  currentItem: null,
  loading: false,
  uploading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },
  filters: {
    type: '',
    folder: '',
    search: '',
  },
};

export const fetchMediaItems = createAsyncThunk(
  'gallery/fetchMediaItems',
  async (params: { page?: number; limit?: number; type?: string; folder?: string; search?: string }, { rejectWithValue }) => {
    try {
      const response = await galleryService.getMediaItems(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch media items');
    }
  }
);

export const fetchMediaItemById = createAsyncThunk(
  'gallery/fetchMediaItemById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await galleryService.getMediaItemById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch media item');
    }
  }
);

export const uploadMediaItem = createAsyncThunk(
  'gallery/uploadMediaItem',
  async (fileData: { file: File; name?: string; alt?: string; caption?: string; tags?: string[]; folder?: string }, { rejectWithValue }) => {
    try {
      const response = await galleryService.uploadMedia(fileData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload media');
    }
  }
);

export const updateMediaItem = createAsyncThunk(
  'gallery/updateMediaItem',
  async ({ id, data }: { id: string; data: Partial<MediaItem> }, { rejectWithValue }) => {
    try {
      const response = await galleryService.updateMediaItem(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update media item');
    }
  }
);

export const deleteMediaItem = createAsyncThunk(
  'gallery/deleteMediaItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await galleryService.deleteMediaItem(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete media item');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<GalleryState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Media Items
      .addCase(fetchMediaItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaItems.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaItems = action.payload.mediaItems;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchMediaItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Media Item By ID
      .addCase(fetchMediaItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(fetchMediaItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload Media Item
      .addCase(uploadMediaItem.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadMediaItem.fulfilled, (state, action) => {
        state.uploading = false;
        state.mediaItems.unshift(action.payload);
        state.error = null;
      })
      .addCase(uploadMediaItem.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      })
      // Update Media Item
      .addCase(updateMediaItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMediaItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mediaItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.mediaItems[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
        state.error = null;
      })
      .addCase(updateMediaItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Media Item
      .addCase(deleteMediaItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMediaItem.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaItems = state.mediaItems.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
        state.error = null;
      })
      .addCase(deleteMediaItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilters, clearCurrentItem } = gallerySlice.actions;
export default gallerySlice.reducer;