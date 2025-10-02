/**
 * uiActions.js
 * ---------------------------------------------
 * UI helper functions for Cypress tests.
 * Used internally by custom commands to interact with forms and validate UI elements.
 */

/**
 * Fills the login form and submits it.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 */
export function fillLoginForm(email = "", password = "") {
  if (!email && !password) {
    cy.get("#email").click();
    cy.get("#password").click();
  } else {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
  }
  cy.get('[data-testid="entrar"]').click();
}

/**
 * Fills the registration form and submits it.
 * @param {string} name - User's name.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {boolean} admin - Whether to check the admin checkbox.
 */
export function fillRegisterForm(name, email, password, admin = false) {
  cy.get('[data-testid="nome"]').clear().type(name);
  cy.get('[data-testid="email"]').clear().type(email);
  cy.get('[data-testid="password"]').clear().type(password);
  if (admin) cy.get('[data-testid="checkbox"]').check();
  cy.get('[data-testid="cadastrar"]').click();
}

/**
 * Closes all visible error messages.
 */
export function closeErrorMessage() {
  cy.get(".alert-dismissible").each(($alert) => {
    cy.wrap($alert).find("button.btn-close-error-alert").click();
  });
}

/**
 * Validates required field messages.
 * @param {string[]} fields - Array of field names to validate.
 */
export function expectRequiredFields(fields) {
  fields.forEach((field) => {
    cy.contains(`${field} é obrigatório`).should("be.visible");
  });
}

/**
 * Fills the product form with name and description.
 * @param {string} name - Product name.
 * @param {string} description - Product description.
 */
export function fillProductForm(name, description) {
  cy.get('[data-testid="nome"]').clear().type(name);
  cy.get('[data-testid="descricao"]').clear().type(description);
}

/**
 * Uploads a product image using the file upload plugin.
 * @param {string} relativePath - Relative path to the image file.
 */
export function uploadProductImage(relativePath) {
  cy.get('[data-testid="imagem"]').attachFile(relativePath);
}

/**
 * Increases product quantity by clicking the increment button multiple times.
 * @param {number} times - Number of times to click the button.
 */
export function increaseProductQuantity(times = 1) {
  cy.get('button[data-testid="product-increase-quantity"]').then(($btn) => {
    for (let i = 0; i < times; i++) {
      cy.wrap($btn).click();
    }
  });
}
