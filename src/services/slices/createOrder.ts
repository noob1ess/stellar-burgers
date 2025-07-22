import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

type TCreateOrder = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const createOrderState: TCreateOrder = {
  orderRequest: false,
  orderModalData: null
};

export const fetchCreateOrder = createAsyncThunk(
  'orders/create',
  orderBurgerApi
);

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: createOrderState,
  reducers: {
    closeOrderModal(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchCreateOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { closeOrderModal } = createOrderSlice.actions;

export default createOrderSlice.reducer;
