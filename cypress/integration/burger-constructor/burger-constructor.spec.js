describe('Тест для функциональности страницы «Конструктор»', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('должно открывать модальное окно ингридиента', function() {
    cy.get('[class^=burger-ingredients_ingredients-item_').first().as('ingredients-item');
    cy.get('@ingredients-item').find('[class^=ingredients-element_ingredient_]').as('ingredient');
    cy.get('@ingredient').click();
  });

  it('должно проверить модальное окно ингридиента и закрыть его', function() {
    cy.get('[class^=modal_modal_').as('modal');
    cy.get('@modal').contains('Краторная булка N-200i');
    cy.get('@modal').contains('Калории,ккал');
    cy.get('@modal').contains('420');
    cy.get('@modal').find('[class^=modal_exit_]').as('exit');
    cy.get('@exit').click();
  });

  it('должно переносить булку в конструктор', function () {
    cy.get('[class^=burger-constructor_list_]').should('not.exist');
    cy.contains('Краторная булка').trigger('dragstart');
    cy.get('[class^=empty-burger-ingredients_container_]').trigger('drop');
    cy.get('[class^=burger-constructor_list_]').contains('Краторная булка');
  });

  it('должно переносить соус в конструктор', function () {
    cy.get('[class^=burger-constructor_list_]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[class^=burger-constructor_list_]').trigger('drop');
    cy.get('[class^=burger-constructor_list_]').contains('Соус Spicy-X');
  });

  it('должно перевести на страницу авторизации', function() {
    cy.contains('Оформить заказ').click();
  });

  it('должно авторизовать', function() {
    cy.get('input[name="email"]').type('p@yandex.ru');
    cy.get('input[name="password"]').type('123456');
    cy.contains('Войти').click();
  });

  it('должно открывать модальное окно с данными о заказе', function() {
    cy.contains('Оформить заказ').click();
    cy.contains('идентификатор заказа', { timeout: 18000 });
  });

  it('должно закрывать модальное окно с данными о заказе', function() {
    cy.get('[class^=modal_modal_').as('modal');
    cy.get('@modal').find('[class^=modal_exit_]').as('exit');
    cy.get('@exit').click();
  });
});
