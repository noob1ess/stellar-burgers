import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// burgerConstructor
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectConstructorItems = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => ({
    bun,
    ingredients
  })
);

// createOrder
export const selectOrderRequest = (state: RootState) =>
  state.createOrder.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.createOrder.orderModalData;

// feed
export const selectFeedStatus = (state: RootState) => state.feed.status;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

// ingredients
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsStatus = (state: RootState) =>
  state.ingredients.status;

// ordersUser
export const selectUserOrders = (state: RootState) => state.orderUser.orders;
export const selectUserOrdersStatus = (state: RootState) =>
  state.orderUser.status;

// user
export const selectUserAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
