/**
 * dashboard.cy.js
 * ---------------------------------------------
 * UI tests for authenticated user actions in Serverest dashboard.
 * Covers logout and product interaction flow including search, quantity adjustment, and cart addition.
 */

import { adminUser, productSample } from "../../support/helpersUI/testData.js";
import {
  uploadProductImage,
  confirmProductExists,
} from "../../support/helpersUI/uiActions.js";

describe("Serverest - Authenticated Area", () => {
  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password);
  });

  it("Scenario 1 - Logout after login @ui", () => {
    cy.logout(); // Ends session
    cy.screenshot("dashboard-01-logout");
  });

  it("Should register a product and confirm its presence in the table @ui", () => {
    // Log in as admin user
    cy.login(adminUser.email, adminUser.password);

    // Navigate to product registration screen
    cy.get('[data-testid="cadastrarProdutos"]').click();

    // Fill in product fields
    cy.get('[data-testid="nome"]').clear().type(productSample.name);
    cy.get('[data-testid="preco"]').clear().type(productSample.price);
    cy.get('[data-testid="descricao"]').clear().type(productSample.description);
    cy.get('[data-testid="quantity"]').clear().type(productSample.quantity);

    // Upload product image
    uploadProductImage(productSample.imagePath);

    // Submit product registration
    cy.get('[data-testid="cadastarProdutos"]').click();

    // Navigate to product listing screen
    cy.get('[data-testid="listar-produtos"]').click();

    // Confirm that the product name appears in the table
    confirmProductExists(productSample.name);

    // Take a screenshot for visual confirmation
    cy.screenshot("product-listed-in-table");
  });
});
