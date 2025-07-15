 import reducer, { closeOrderModal, createOrderState, fetchCreateOrder } from "../slices/createOrder";

 const orderMockData = {
    "ingredients": [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0940",
      "643d69a5c3f7b9001cfa093d"
  ],
    "_id": "6875d1e45a54df001b6de64c",
    "status": "done",
    "name": "Флюоресцентный метеоритный бургер",
    "createdAt": "2025-07-15T03:58:28.670Z",
    "updatedAt": "2025-07-15T03:58:29.395Z",
    "number": 84394
};

describe('createOrderSlice', () => {
  test('Запрос на создание заказа pending', () => {
    const state = reducer(createOrderState, fetchCreateOrder.pending('', orderMockData.ingredients));
    expect(state.orderRequest).toBe(true);
  });

  test('Запрос на создание заказа fulfilled', () => {
    const state = reducer(createOrderState, fetchCreateOrder.fulfilled({order: orderMockData, name: 'test', success: true}, 'fulfilled', orderMockData.ingredients));
    expect(state.orderModalData).toEqual(orderMockData);
  });

  test('Запрос на создание заказа rejected', () => {
    const state = reducer(createOrderState, fetchCreateOrder.rejected(new Error('Ошибка'), '', orderMockData.ingredients));
    expect(state.orderRequest).toBe(false);
  });

  test('Заказ оформлен и очистка его данных', () => {
    const state = reducer(createOrderState, closeOrderModal());
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});
