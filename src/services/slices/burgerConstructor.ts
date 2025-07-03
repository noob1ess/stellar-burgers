import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TIngredientUnique = TIngredient & { id: string };

type TBurgerState = {
  bun: Partial<TIngredient>;
  ingredients: TIngredientUnique[];
};

const burgerState: TBurgerState = {
  bun: {
    price: 0
  },
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: burgerState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; upper: boolean }>
    ) {
      const { index, upper } = action.payload;
      const items = state.ingredients;
      const fromIndex = index;
      const toIndex = upper ? index - 1 : index + 1;
      const [removed] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, removed);
    },
    clearIngredients(state) {
      state.bun = {
        price: 0
      };
      state.ingredients = [];
    }
  }
});

export default burgerConstructorSlice.reducer;
