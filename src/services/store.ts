import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients';
import burgerContructorReducer from './slices/burgerConstructor';
import feedReducer from './slices/feed';
import usersReducer from './slices/user';
import ordersUserReducer from './slices/ordersUser';
import createOrderReducer from './slices/createOrder';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerContructorReducer,
  feed: feedReducer,
  user: usersReducer,
  orderUser: ordersUserReducer,
  createOrder: createOrderReducer
}); // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
