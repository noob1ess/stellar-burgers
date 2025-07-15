import reducer from '../slices/ordersUser';

const ordersUserMockData = [
  {
    _id: '6865bc405a54df001b6db45c',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-07-02T23:09:52.572Z',
    updatedAt: '2025-07-02T23:09:53.285Z',
    number: 83362
  },
  {
    _id: '686674fb5a54df001b6db7aa',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный метеоритный бургер',
    createdAt: '2025-07-03T12:18:03.347Z',
    updatedAt: '2025-07-03T12:18:04.174Z',
    number: 83431
  }
];

describe('OrdersUserSlice', () => {
  test('Запрос OrdersUser Pending', () => {
    const state = reducer(undefined, { type: 'orders/user/pending' });
    expect(state.status).toBe('loading');
  });

  test('Запрос OrdersUser Fulfilled', () => {
    const state = reducer(undefined, { type: 'orders/user/fulfilled', payload: ordersUserMockData });
    expect(state.status).toBe('success');
    expect(state.orders).toEqual(ordersUserMockData);
  });

  test('Запрос OrdersUser Rejected', () => {
    const state = reducer(undefined, { type: 'orders/user/rejected', error: new Error('Error') });
    expect(state.status).toBe('failed');
    expect(state.orders).toEqual([]);
  });
});
