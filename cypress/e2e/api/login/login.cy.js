describe("Login API", () => {
  const testUser = {
    nome: "Login Test User",
    email: `login.${Date.now()}@qa.com.br`,
    password: "teste123",
    administrador: "true",
  };

  before(() => {
    cy.createUser(testUser);
  });

  it("should authenticate successfully with valid credentials @api", () => {
    cy.loginAPI(testUser.email, testUser.password).then((token) => {
      expect(token).to.be.a("string").and.not.be.empty;
    });
  });
});
