import { rootReducer } from '../store';

describe('rootReducer', () => {
  test('Возврат начального состояния', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    const expectedInitialState = {
      ingredients: {
        ingredients: [],
        status: 'idle'
      },
      burgerConstructor: {
        bun: {
          price: 0
        },
        ingredients: []
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        status: 'idle'
      },
      user: {
        isAuthChecked: false,
        data: {
          email: '',
          name: ''
        },
        status: 'idle'
      },
      orderUser: {
        orders: [],
        status: 'idle'
      },
      createOrder: {
        orderRequest: false,
        orderModalData: null
      }
    };
    expect(initialState).toEqual(expectedInitialState);
  });
});
