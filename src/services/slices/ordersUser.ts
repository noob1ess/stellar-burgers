import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

type TOrdersSlice = {
  orders: TOrder[];
  status: RequestStatus;
};

const ordersState: TOrdersSlice = {
  orders: [],
  status: RequestStatus.Idle
};

export const fetchOrdersUser = createAsyncThunk(
  'orders/user',
  async () => await getOrdersApi()
);

const ordersSlice = createSlice({
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
      });
  }
});

export default ordersSlice.reducer;
