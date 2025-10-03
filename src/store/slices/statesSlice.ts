import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as statesService from '../../services/statesService';

export interface State {
  id: string;
  name: string;
  code: string;
  capital: string;
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface StatesState {
  states: State[];
  currentState: State | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatesState = {
  states: [],
  currentState: null,
  loading: false,
  error: null,
};

export const fetchStates = createAsyncThunk(
  'states/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await statesService.getStates();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch states');
    }
  }
);

export const fetchStateById = createAsyncThunk(
  'states/fetchStateById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await statesService.getStateById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch state');
    }
  }
);

export const createState = createAsyncThunk(
  'states/createState',
  async (stateData: Omit<State, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await statesService.createState(stateData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create state');
    }
  }
);

export const updateState = createAsyncThunk(
  'states/updateState',
  async ({ id, data }: { id: string; data: Partial<State> }, { rejectWithValue }) => {
    try {
      const response = await statesService.updateState(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update state');
    }
  }
);

export const deleteState = createAsyncThunk(
  'states/deleteState',
  async (id: string, { rejectWithValue }) => {
    try {
      await statesService.deleteState(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete state');
    }
  }
);

const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentState: (state) => {
      state.currentState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
        state.error = null;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch State By ID
      .addCase(fetchStateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStateById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentState = action.payload;
        state.error = null;
      })
      .addCase(fetchStateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create State
      .addCase(createState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.loading = false;
        state.states.push(action.payload);
        state.error = null;
      })
      .addCase(createState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update State
      .addCase(updateState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.states.findIndex(state => state.id === action.payload.id);
        if (index !== -1) {
          state.states[index] = action.payload;
        }
        if (state.currentState?.id === action.payload.id) {
          state.currentState = action.payload;
        }
        state.error = null;
      })
      .addCase(updateState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete State
      .addCase(deleteState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.loading = false;
        state.states = state.states.filter(state => state.id !== action.payload);
        if (state.currentState?.id === action.payload) {
          state.currentState = null;
        }
        state.error = null;
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentState } = statesSlice.actions;
export default statesSlice.reducer;