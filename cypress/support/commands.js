// ***********************************************
// This file defines custom Cypress commands.
// For more examples, visit:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-file-upload";
import { fillLoginForm } from "./helpersUI/uiActions.js";

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
 * Validates login required error messages.
 */
Cypress.Commands.add("expectLoginRequiredErrors", () => {
  cy.contains("Email é obrigatório").should("be.visible");
  cy.contains("Password é obrigatório").should("be.visible");
  closeErrorMessage();
});

/**
 * Registers a product using the UI form.
 * @param {string} name - Product name.
 * @param {string} description - Product description.
 * @param {string} price - Product price.
 * @param {string} quantity - Product quantity.
 * @param {string} imagePath - Path to the product image.
 */

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
 * Validates product details on the product detail page.
 * @param {string} name - Expected product name.
 * @param {string} price - Expected price text.
 * @param {string} quantity - Expected quantity text.
 * @param {string} description - Expected description text.
 */
Cypress.Commands.add(
  "selectProductFromSearch",
  (name, price, quantity, description) => {
    cy.get('[data-testid="product-detail-link"]').click();
    cy.get('[data-testid="product-detail-name"]').should("contain", name);
    cy.contains("Detalhes").should("be.visible");
    cy.contains(price).should("be.visible");
    cy.contains(quantity).should("be.visible");
    cy.contains(description).should("be.visible");
  }
);

/**
 * Adds a product to the list based on its name and price.
 * @param {string} productName - Product name to match.
 * @param {string} productPrice - Product price to match.
 */
Cypress.Commands.add("addProductToList", (productName, productPrice) => {
  cy.contains("h5", productName)
    .parents(".card")
    .within(() => {
      cy.contains("h6", productPrice).should("exist");
      cy.get('[data-testid="adicionarNaLista"]').first().click();
    });
});

/**
 * Increases product quantity by clicking the button multiple times within the correct card.
 * @param {string} productName - Product name to match.
 * @param {string} productPrice - Product price to match.
 * @param {number} times - Number of clicks.
 */
