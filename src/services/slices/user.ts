import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { clearTokens, saveTokens } from '../../utils/tokens';

export interface TUserInitialState {
  isAuthChecked: boolean;
  data: TUser;
  status: RequestStatus;
  error?: SerializedError;
}

const userState: TUserInitialState = {
  isAuthChecked: false,
  data: {
    email: '',
    name: ''
  },
  status: RequestStatus.Idle
};

export const register = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    saveTokens(refreshToken, accessToken);

    return user;
  }
);

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    saveTokens(refreshToken, accessToken);

    return user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response.success) {
      return rejectWithValue(response);
    }

    clearTokens();
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();

    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

export const upgradeUserData = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/upgrade',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error;
      })
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = RequestStatus.Success;
        state.data = {
          email: '',
          name: ''
        };
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.isAuthChecked = true;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
      })
      .addCase(upgradeUserData.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      });
  }
});

export default userSlice.reducer;
