import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

type TFeedSlice = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

export const feedState: TFeedSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const fetchFeed = createAsyncThunk('orders/getAll', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export default feedSlice.reducer;
