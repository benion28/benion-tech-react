import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as smsAuthService from '../../services/smsAuthService';
import { SMSUser } from '@/models/SMSUser';
import { secureStorage } from '@/services/secureStorage';

interface SMSAuthState {
  smsUser: SMSUser | null;
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SMSAuthState = {
  smsUser: null,
  refresh_token: secureStorage.getItem('smsUserRefreshToken'),
  access_token: secureStorage.getItem('smsUserAccessToken'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginSMSUser = createAsyncThunk(
  'auth/smsLogin',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await smsAuthService.smsLogin(credentials);
      console.log("SMS Login Response", response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { 
    username: string; 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
  }, { rejectWithValue }) => {
    try {
      const response = await smsAuthService.smsRegister(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await smsAuthService.logout();
      localStorage.removeItem('token');
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await smsAuthService.getCurrentSMSUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

const smsAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginSMSUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSMSUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.smsUser = action.payload.data;
        state.access_token = action.payload.data.access_token;
        state.refresh_token = action.payload.data.refresh_token;
        state.error = null;
      })
      .addCase(loginSMSUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.smsUser = null;
        state.refresh_token = null;
        state.access_token = null;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.smsUser = null;
        state.refresh_token = null;
        state.access_token = null;
        state.error = null;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.smsUser = action.payload;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.smsUser = null;
        state.access_token = null;
        state.refresh_token = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading } = smsAuthSlice.actions;
export default smsAuthSlice.reducer;