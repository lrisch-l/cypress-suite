/**
 * auth.cy.js
 * ---------------------------------------------
 * UI tests for Serverest login and registration flows.
 * Covers validation of empty fields, invalid credentials, and successful admin registration.
 */

import { fillRegisterForm } from "../../support/helpersUI/uiActions.js";
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
    cy.expectLoginRequiredErrors(); // Validates required field messages
    cy.screenshot("login-empty-fields");
  });

  it("Scenario 2 - Invalid login credentials @ui", () => {
    cy.login(invalidUser.email, invalidUser.password); // Invalid credentials
    cy.contains("Email e/ou senha inválidos").should("be.visible");
    cy.closeErrorMessage(); // Closes alert
    cy.screenshot("login-invalid-credentials");
  });
});

describe("Serverest - Registration", () => {
  beforeEach(() => {
    cy.visit("/cadastrarusuarios");
  });

  it("Scenario 1 - Register with empty fields @ui", () => {
    cy.get('[data-testid="cadastrar"]').click(); // Submit empty form
    cy.expectRequiredFields(["Nome", "Email", "Password"]); // Validates required fields
    cy.closeErrorMessage();
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
