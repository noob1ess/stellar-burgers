import reducer, { fetchFeed, feedState } from '../slices/feed';

const feedMockData = {
  success: true,
  orders: [
      {
        _id: '6875d2655a54df001b6de64d',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-07-15T04:00:37.493Z',
        updatedAt: '2025-07-15T04:00:38.278Z',
        number: 84395
      }  
    ],
    total: 1,
    totalToday: 1
  };

  describe('FeedSlice', () => {
    test('Запрос ленты заказов Pending', () => {
      const state = reducer(feedState, fetchFeed.pending('pending'));
      expect(state.status).toBe('loading');
    });

    test('Запрос ленты заказов Fulfilled', () => {
      const state = reducer(feedState, fetchFeed.fulfilled(feedMockData, 'fulfilled'));
      expect(state.status).toBe('success');
      expect(state.orders).toEqual(feedMockData.orders);
      expect(state.total).toBe(feedMockData.total);
      expect(state.totalToday).toBe(feedMockData.totalToday);
    });

    test('Запрос ленты заказов Rejected', () => {
      const state = reducer(feedState, fetchFeed.rejected(new Error('Error'), 'rejected'));
      expect(state.status).toBe('failed');
    });
  });
