import reducer, {
  userState,
  register,
  login,
  logout,
  fetchUser,
  upgradeUserData
} from '../slices/user';

const userMockData = {
  email: 'user@example.com',
  name: 'testUser',
};

const registerMockData = {
  email: 'user@example.com',
  name: 'testUser',
  password: 'password123'
};

const loginMockData = {
  email: 'user@example.com',
  name: 'testUser',
  password: 'password123'
};

describe('User Slice', () => {
  describe('Регистрация', () => {
    test('Заппрос регистрации pending', () => {
      const state = reducer(userState, register.pending('pending', registerMockData));
      expect(state.status).toBe('loading');
      expect(state.error).toBeUndefined();
    });
    test('Заппрос регистрации fulfilled', () => {
      const state = reducer(
        userState,
        register.fulfilled(userMockData, 'fulfilled', registerMockData)
      );
      expect(state.status).toBe('success');
      expect(state.data).toEqual(userMockData);
    });
    test('Заппрос регистрации rejected', () => {
      const state = reducer(
        userState,
        register.rejected(new Error('Ошибка регистрации'), '', registerMockData)
      );
      expect(state.status).toBe('failed');
      expect(state.error?.message).toEqual('Ошибка регистрации');
    });
  });

  describe('Авторизация', () => {
    test('Запрос авторизации pending', () => {
      const state = reducer(userState, login.pending('pending', loginMockData));
      expect(state.status).toBe('loading');
      expect(state.error).toBeUndefined();
    });
    test('Запрос авторизации fulfilled', () => {
      const state = reducer(
        userState,
        login.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
      expect(state.status).toBe('success');
      expect(state.data).toEqual(userMockData);
    });
    test('Запрос авторизации rejected', () => {
      const state = reducer(
        userState,
        login.rejected(new Error('Ошибка авторизации'), 'rejected', loginMockData)
      );
      expect(state.status).toBe('failed');
      expect(state.error?.message).toEqual('Ошибка авторизации');
    });
  });
  
  describe('Выход', () => {
    test('Запрос выхода fulfilled', () => {
      const state = reducer(
        userState,
        logout.fulfilled(undefined, 'fulfilled')
      );
      expect(state.status).toBe('success');
      expect(state.data).toEqual({ email: '', name: '' });
    });
  });

  describe('Проверка авторизован ли пользователь', () => {
    test('Запрос пользователя pending', () => {
      const state = reducer(userState, fetchUser.pending('pending'));
      expect(state.status).toBe('loading');
      expect(state.isAuthChecked).toBe(false);
    });
    test('Запрос пользователя fulfilled', () => {
      const state = reducer(
        userState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );
      expect(state.status).toBe('success');
      expect(state.isAuthChecked).toBe(true);
      expect(state.data).toEqual(userMockData);
    });
    test('Запрос пользователя rejected', () => {
      const state = reducer(userState, fetchUser.rejected(new Error('Ошибка'), 'rejected'));
      expect(state.status).toBe('failed');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Обновление данных пользователя', () => {
    test('Запрос на обновление данных fulfilled', () => {
      const updatedUserData = { ...userMockData, name: 'updatedUser' };
      const state = reducer(
        userState,
        upgradeUserData.fulfilled(updatedUserData, 'fulfilled', userMockData)
      );
      expect(state.status).toBe('success');
      expect(state.data).toEqual(updatedUserData);
    });
  });
});
