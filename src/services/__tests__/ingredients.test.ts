import reducer, { fetchIngredients, ingredientsState } from '../slices/ingredients'

const ingredientsMockData = [
  {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093d",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
  }
];

describe('IngredientsSlice', () => {
  test('Запрос ингредиентов Pending', () => {
    const state = reducer(ingredientsState, fetchIngredients.pending('pending'));
    expect(state.status).toBe('loading');
  });

  test('Запрос ингредиентов Fulfilled', () => {
    const state = reducer(ingredientsState, fetchIngredients.fulfilled(ingredientsMockData, 'fulfilled'));
    expect(state.status).toBe('success');
    expect(state.ingredients).toEqual(ingredientsMockData);
  });

  test('Запрос ингредиентов Rejected', () => {
    const state = reducer(ingredientsState, fetchIngredients.rejected(new Error('Error'), 'rejected'));
    expect(state.status).toBe('failed');
  });
});
