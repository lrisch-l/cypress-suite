// ***********************************************************
// This file is automatically processed and loaded before your test files.
// Use it to configure global behavior and import custom support utilities.
// For more details, visit:
// https://on.cypress.io/configuration
// ***********************************************************

// Import custom Cypress commands
import './commands';

// Register Mochawesome reporter to capture screenshots and logs
import 'cypress-mochawesome-reporter/register';

// Optional: Clear cookies and localStorage before each test
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});