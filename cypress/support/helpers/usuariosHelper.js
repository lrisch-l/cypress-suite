// User commands (originals in Portuguese)
Cypress.Commands.add("cadastrarUsuario", (usuario) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/usuarios`,
    failOnStatusCode: false,
    body: usuario,
  });
});

Cypress.Commands.add("buscarUsuarios", (params = {}) => {
  return cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/usuarios`,
    qs: params,
  });
});

Cypress.Commands.add("buscarUsuarioPorId", (_id) => {
  return cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/usuarios/${_id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("atualizarUsuario", (_id, dados) => {
  return cy.request({
    method: "PUT",
    url: `${Cypress.env("apiUrl")}/usuarios/${_id}`,
    failOnStatusCode: false,
    body: dados,
  });
});

Cypress.Commands.add("deletarUsuario", (_id) => {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/usuarios/${_id}`,
    failOnStatusCode: false,
  });
});

// English aliases used in tests
Cypress.Commands.add("createUser", (usuario) => cy.cadastrarUsuario(usuario));
Cypress.Commands.add("getUsers", (params = {}) => cy.buscarUsuarios(params));
Cypress.Commands.add("getUserById", (_id) => cy.buscarUsuarioPorId(_id));
Cypress.Commands.add("updateUser", (_id, dados) =>
  cy.atualizarUsuario(_id, dados)
);
Cypress.Commands.add("deleteUser", (_id) => cy.deletarUsuario(_id));

// Create a valid product for test purposes
Cypress.Commands.add("criarProdutoValido", () => {
  const produto = {
    nome: `Produto ${Date.now()}`,
    preco: 150,
    descricao: "Produto criado automaticamente",
    quantidade: 10,
  };

  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/produtos`,
    failOnStatusCode: false,
    body: produto,
  });
});
