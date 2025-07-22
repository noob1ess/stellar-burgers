import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

type TOrdersSlice = {
  orders: TOrder[];
  status: RequestStatus;
};

export const ordersState: TOrdersSlice = {
  orders: [],
  status: RequestStatus.Idle
};

export const fetchOrdersUser = createAsyncThunk(
  'orders/user',
  async () => await getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrdersUser.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOrdersUser.rejected, (state, action) => {
        state.orders = [];
        state.status = RequestStatus.Failed;
      });
  }
});

export default ordersSlice.reducer;
