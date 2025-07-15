import burgerConstructorSlice, { addIngredient, removeIngredient, moveIngredient } from '../slices/burgerConstructor';

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
    "__v": 0,
    "id": "testId-1"
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0,
    id: "testId-2"
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0,
    "id": "testId-3"
  }
];

const initialState = {
  bun: {
    price: 0
  },
  ingredients: []
};

describe('burgerConstructorSlice', () => {
  test('Добавление булки', () => {
    const state = initialState;
    const action = addIngredient(ingredientsMockData[0]);
    const newState = burgerConstructorSlice(state, action);
    expect(newState.bun).toEqual(ingredientsMockData[0]);
  });
  
  test('Добавление ингредиента', () => {
    const state = initialState;
    const action = addIngredient(ingredientsMockData[1]);
    const newState = burgerConstructorSlice(state, action);
    expect(newState.ingredients).toContainEqual(ingredientsMockData[1]);
  });

  test('Удаление ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [ingredientsMockData[1]]
    };
    const action = removeIngredient(ingredientsMockData[1].id);
    const newState = burgerConstructorSlice(state, action);
    expect(newState.ingredients).not.toContainEqual(ingredientsMockData[1]);
  });

  test('Перемещение ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [ingredientsMockData[1], ingredientsMockData[2]]
    };
    const action = moveIngredient({ index: 1, upper: true });
    const newState = burgerConstructorSlice(state, action);
    expect(newState.ingredients[0]).toEqual(ingredientsMockData[2]);
    expect(newState.ingredients[1]).toEqual(ingredientsMockData[1]);
  });
});
