/**
 * commands.js
 * ---------------------------------------------
 * Custom Cypress commands for Serverest UI automation.
 * Encapsulates reusable actions for login, logout, product search, and form validations.
 */

import "cypress-file-upload";
import {
  fillLoginForm,
  fillRegisterForm,
  closeErrorMessage,
  expectRequiredFields,
} from "./helpersUI/uiActions.js";

/**
 * Logs in through the UI using provided credentials.
 * If no credentials are passed, triggers validation errors.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 */
Cypress.Commands.add("login", (email = "", password = "") => {
  cy.visit("/login");
  fillLoginForm(email, password);
});

/**
 * Logs out from the authenticated area.
 */
Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="logout"]').should("be.visible").click();
});

/**
 * Searches for a product using the search bar.
 * @param {string} productCode - Product code to search.
 */
Cypress.Commands.add("searchProduct", (productCode) => {
  cy.get('[data-testid="pesquisar"]').clear().type(productCode);
  cy.get('[data-testid="botaoPesquisar"]').click();
});

/**
 * Validates login required error messages.
 */
Cypress.Commands.add("expectLoginRequiredErrors", () => {
  cy.contains("Email é obrigatório").should("be.visible");
  cy.contains("Password é obrigatório").should("be.visible");
  cy.closeErrorMessage();
});

/**
 * Closes all visible error messages.
 */
Cypress.Commands.add("closeErrorMessage", () => {
  closeErrorMessage();
});

/**
 * Validates required field messages for registration.
 * @param {string[]} fields - Array of field names to validate.
 */
Cypress.Commands.add("expectRequiredFields", (fields) => {
  expectRequiredFields(fields);
});

/**
 * Fills the registration form and submits it.
 * @param {string} name - User's name.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {boolean} isAdmin - Whether to check the admin checkbox.
 */
Cypress.Commands.add("fillRegisterForm", (name, email, password, isAdmin) => {
  fillRegisterForm(name, email, password, isAdmin);
});
