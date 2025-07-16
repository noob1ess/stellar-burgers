const API_URL = Cypress.env('BURGER_API_URL');

const mainSelector = '[data-sy="main"]';
const modalSelector = '[data-sy="modal"]';
const bunSelector = '[data-sy="bun"]';
const sauceSelector = '[data-sy="sauce"]';

beforeEach(() => {
  cy.intercept('GET', `${API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as(
    'getUser'
  );
  cy.visit('/');
  cy.wait('@getIngredients');
});

describe('проверяем функции приложения', function () {
  describe('работа модального окна ингредиента', function () {
    it('базовое открытие и закрытие окна', function () {
      cy.get(mainSelector).first().click();
      cy.get(modalSelector).should('exist');
      cy.get('[data-sy="closeModal_button"]').should('exist').click();
      cy.get(modalSelector).should('not.exist');
    });

    it('закрытие окна по клику на оверлей', function () {
      cy.get(mainSelector).first().click();
      cy.get(modalSelector)
        .should('exist')
        .then(($modal) => {
          const { left, top } = $modal[0].getBoundingClientRect();
          cy.get('[data-sy="modalOverlay"]').click(left - 10, top - 10, {
            force: true
          });
        });
      cy.get(modalSelector).should('not.exist');
    });

    it('закрытие окна по нажатию клавиши Escape', function () {
      cy.get(mainSelector).first().click();
      cy.get(modalSelector).should('exist');
      cy.get('body').type('{esc}');
      cy.get(modalSelector).should('not.exist');
    });
  });

  describe('процесс оформления заказа', function () {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'testRefreshToken');
      cy.setCookie('accessToken', 'testAccessToken');
    });

    afterEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
    });

    it('добавление булки и ингредиента', function () {
      cy.get(bunSelector).should('have.length.at.least', 1);
      cy.get(`${mainSelector}, ${sauceSelector}`).should('have.length.at.least', 1);
      cy.get(bunSelector).first().find('button').click();
      cy.get(`${mainSelector}, ${sauceSelector}`).first().find('button').click();
      cy.get('[data-sy="noBuns"]').should('not.exist');
      cy.get('[data-sy="noIngredients"]').should('not.exist');
    });

    it('оформление заказа', function () {
      cy.wait('@getUser');
      cy.intercept('POST', `${API_URL}/orders`, {
        fixture: 'createOrder.json'
      }).as('postOrder');
      cy.get(bunSelector).first().find('button').click();
      cy.get(`${mainSelector}, ${sauceSelector}`).first().find('button').click();
      cy.get('[data-sy="createOrder_button"]').click();
      cy.get(modalSelector ).should('exist');

      cy.wait('@postOrder').then((interception) => {
        const OrderNumberFromResponse =
          interception.response?.body.order.number;
        cy.get('[data-sy="order_number"]').should(
          'contain',
          OrderNumberFromResponse
        );
        cy.get('[data-sy="closeModal_button"]').should('exist').click();
        cy.get(modalSelector).should('not.exist');
      });
      cy.get('[data-sy="noBuns"]').should('exist');
      cy.get('[data-sy="noIngredients"]').should('exist');
    });
  });
});
