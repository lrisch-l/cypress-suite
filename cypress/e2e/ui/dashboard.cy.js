import { adminUser } from "../../support/helpersUI/testData.js";

describe("Serverest - Authenticated Area", () => {
  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password);
  });

  it("Scenario 1 - Logout after login @ui", () => {
    cy.logout();
    cy.screenshot("dashboard-01-logout");
  });

  it("Scenario 2 - Add product to list @ui", () => {
    cy.url().should("include", "/home");

    const productCode = "16485";

    cy.searchProduct(productCode);

    cy.get('a[data-testid="product-detail-link"]')
      .find('button[data-testid="adicionarNaLista"]')
      .should("be.visible")
      .click();

    cy.get('button[data-testid="product-increase-quantity"]')
      .should("be.visible")
      .then(($btn) => {
        for (let i = 0; i < 3; i++) {
          cy.wrap($btn).click();
        }
      });

    cy.get('a[href="/carrinho"]')
      .find('button[data-testid="adicionar carrinho"]')
      .should("be.visible")
      .click();

    cy.contains("Em construção aguarde").should("be.visible");
    cy.get('img.imagem[src*="trabalho"]').should("exist");

    cy.screenshot("dashboard-02-add-product-with-quantity");
  });
});
