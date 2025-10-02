/**
 * dashboard.cy.js
 * ---------------------------------------------
 * UI tests for authenticated user actions in Serverest dashboard.
 * Covers logout and product interaction flow including search, quantity adjustment, and cart addition.
 */

import { adminUser } from "../../support/helpersUI/testData.js";
import { increaseProductQuantity } from "../../support/helpersUI/uiActions.js";

describe("Serverest - Authenticated Area", () => {
  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password);
  });

  it("Scenario 1 - Logout after login @ui", () => {
    cy.logout(); // Ends session
    cy.screenshot("dashboard-01-logout");
  });

  it("Scenario 2 - Add product to list and cart @ui", () => {
    cy.url().should("include", "/home");

    const productCode = "16485";
    cy.searchProduct(productCode); // Search by code

    cy.get('a[data-testid="product-detail-link"]')
      .find('button[data-testid="adicionarNaLista"]')
      .click(); // Add to list

    increaseProductQuantity(3); // Increase quantity to 3

    cy.get('a[href="/carrinho"]')
      .find('button[data-testid="adicionar carrinho"]')
      .click(); // Add to cart

    cy.contains("Em construção aguarde").should("be.visible");
    cy.get('img.imagem[src*="trabalho"]').should("exist");
    cy.screenshot("dashboard-02-add-product-with-quantity");
  });
});
