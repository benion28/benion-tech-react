import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as lgasService from '../../services/lgasService';

export interface LGA {
  id: string;
  name: string;
  code: string;
  stateId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LGAsState {
  lgas: LGA[];
  currentLGA: LGA | null;
  loading: boolean;
  error: string | null;
}

const initialState: LGAsState = {
  lgas: [],
  currentLGA: null,
  loading: false,
  error: null,
};

export const fetchLGAs = createAsyncThunk(
  'lgas/fetchLGAs',
  async (stateId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await lgasService.getLGAs(stateId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch LGAs');
    }
  }
);

export const fetchLGAById = createAsyncThunk(
  'lgas/fetchLGAById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await lgasService.getLGAById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch LGA');
    }
  }
);

export const createLGA = createAsyncThunk(
  'lgas/createLGA',
  async (lgaData: Omit<LGA, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await lgasService.createLGA(lgaData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create LGA');
    }
  }
);

export const updateLGA = createAsyncThunk(
  'lgas/updateLGA',
  async ({ id, data }: { id: string; data: Partial<LGA> }, { rejectWithValue }) => {
    try {
      const response = await lgasService.updateLGA(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update LGA');
    }
  }
);

export const deleteLGA = createAsyncThunk(
  'lgas/deleteLGA',
  async (id: string, { rejectWithValue }) => {
    try {
      await lgasService.deleteLGA(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete LGA');
    }
  }
);

const lgasSlice = createSlice({
  name: 'lgas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentLGA: (state) => {
      state.currentLGA = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch LGAs
      .addCase(fetchLGAs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLGAs.fulfilled, (state, action) => {
        state.loading = false;
        state.lgas = action.payload;
        state.error = null;
      })
      .addCase(fetchLGAs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch LGA By ID
      .addCase(fetchLGAById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLGAById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLGA = action.payload;
        state.error = null;
      })
      .addCase(fetchLGAById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create LGA
      .addCase(createLGA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLGA.fulfilled, (state, action) => {
        state.loading = false;
        state.lgas.push(action.payload);
        state.error = null;
      })
      .addCase(createLGA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update LGA
      .addCase(updateLGA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLGA.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lgas.findIndex(lga => lga.id === action.payload.id);
        if (index !== -1) {
          state.lgas[index] = action.payload;
        }
        if (state.currentLGA?.id === action.payload.id) {
          state.currentLGA = action.payload;
        }
        state.error = null;
      })
      .addCase(updateLGA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete LGA
      .addCase(deleteLGA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLGA.fulfilled, (state, action) => {
        state.loading = false;
        state.lgas = state.lgas.filter(lga => lga.id !== action.payload);
        if (state.currentLGA?.id === action.payload) {
          state.currentLGA = null;
        }
        state.error = null;
      })
      .addCase(deleteLGA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentLGA } = lgasSlice.actions;
export default lgasSlice.reducer;