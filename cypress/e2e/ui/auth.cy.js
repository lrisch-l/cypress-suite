import {
  fillRegisterForm,
  closeErrorMessage,
  expectRequiredFields,
} from "../../support/helpersUI/uiActions.js";
import {
  adminUser,
  invalidUser,
  generateUniqueEmail,
} from "../../support/helpersUI/testData.js";

describe("Serverest - Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Scenario 1 - Empty login fields @ui", () => {
    cy.login(); // No credentials
    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("Password é obrigatório").should("be.visible");
    closeErrorMessage();
    cy.screenshot("login-empty-fields");
  });

  it("Scenario 2 - Invalid login credentials @ui", () => {
    cy.login(invalidUser.email, invalidUser.password);
    cy.contains("Email e/ou senha inválidos").should("be.visible");
    closeErrorMessage();
    cy.screenshot("login-invalid-credentials");
  });
});

describe("Serverest - Registration", () => {
  beforeEach(() => {
    cy.visit("/cadastrarusuarios");
  });

  it("Scenario 1 - Register with empty fields @ui", () => {
    cy.get('[data-testid="cadastrar"]').click();
    expectRequiredFields(["Nome", "Email", "Password"]);
    closeErrorMessage();
    cy.screenshot("registration-empty-fields");
  });

  it("Scenario 2 - Successful admin registration @ui", () => {
    cy.task("nextEmailCount").then((count) => {
      const email = generateUniqueEmail(count);
      fillRegisterForm(
        adminUser.name,
        email,
        adminUser.password,
        adminUser.isAdmin
      );
      cy.contains("Cadastro realizado com sucesso").should("be.visible");
      cy.screenshot("registration-successful-admin");
    });
  });
});
