// Cart commands
Cypress.Commands.add("criarCarrinho", (produtos, token) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/carrinhos`,
    failOnStatusCode: false,
    headers: token ? { authorization: token } : {},
    body: { produtos },
  });
});

Cypress.Commands.add("listarCarrinhos", () => {
  return cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/carrinhos`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("buscarCarrinhoPorId", (id) => {
  return cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/carrinhos/${id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("concluirCompra", (token) => {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/carrinhos/concluir-compra`,
    failOnStatusCode: false,
    headers: token ? { authorization: token } : {},
  });
});

Cypress.Commands.add("cancelarCompra", (token) => {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/carrinhos/cancelar-compra`,
    failOnStatusCode: false,
    headers: token ? { authorization: token } : {},
  });
});

// English aliases (if needed)
Cypress.Commands.add("createCart", (products, token) =>
  cy.criarCarrinho(products, token)
);
Cypress.Commands.add("getCarts", () => cy.listarCarrinhos());
Cypress.Commands.add("getCartById", (id) => cy.buscarCarrinhoPorId(id));
Cypress.Commands.add("checkoutCart", (token) => cy.concluirCompra(token));
Cypress.Commands.add("cancelCart", (token) => cy.cancelarCompra(token));
