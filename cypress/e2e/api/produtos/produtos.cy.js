describe("Products API", () => {
  let createdProductId = "";
  const product = {
    nome: `Product ${Date.now()}`,
    preco: 99,
    descricao: "Automated product test",
    quantidade: 10,
  };

  beforeEach(() => {
    cy.loginAdmin().then((res) => {
      cy.wrap(res.body.authorization).as("adminToken");
    });
  });

  // GET /produtos → should return 200 and list all products
  it("should return 200 and list products @api", () => {
    cy.getProducts().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.quantidade).to.be.greaterThan(0);
      expect(res.body.produtos[0]).to.have.all.keys(
        "nome",
        "preco",
        "descricao",
        "quantidade",
        "_id"
      );
    });
  });

  // POST /produtos → should return 201 when creating a new product
  it("should return 201 and create a new product @api", function () {
    cy.get("@adminToken").then((token) => {
      cy.createProduct(product, token).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.include("Cadastro realizado com sucesso");
        expect(res.body._id).to.be.a("string");
        createdProductId = res.body._id;
      });
    });
  });

  // POST /produtos → should return 400 for duplicated product name
  it("should return 400 when creating product with duplicate name @api", function () {
    cy.get("@adminToken").then((token) => {
      cy.createProduct(product, token).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.include("Já existe produto com esse nome");
      });
    });
  });

  // POST /produtos → should return 401 when token is missing
  it("should return 401 when creating product without token @api", () => {
    cy.cadastrarProduto(product, "").then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.include("Token de acesso ausente");
    });
  });

  // POST /produtos → should return 403 when user is not admin
  it("should return 403 when non-admin tries to create a product @api", () => {
    const normalUser = {
      nome: "User Test",
      email: `user.${Date.now()}@qa.com.br`,
      password: "123456",
      administrador: "false",
    };
    cy.createUser(normalUser).then(() => {
      cy.loginUser(normalUser.email, normalUser.password).then((resLogin) => {
        const userToken = resLogin.body.authorization;
        cy.createProduct(product, userToken).then((res) => {
          expect(res.status).to.eq(403);
          expect(res.body.message).to.include(
            "Rota exclusiva para administradores"
          );
        });
      });
    });
  });

  // GET /produtos/:id → should return 200 and retrieve product by ID
  it("should return 200 and retrieve product by ID @api", () => {
    cy.getProductById(createdProductId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("_id", createdProductId);
      expect(res.body).to.have.property("nome");
    });
  });

  // PUT /produtos/:id → should return 200 when updating product
  it("should return 200 when updating a product @api", function () {
    const updated = {
      nome: `Updated ${product.nome}`,
      preco: 110,
      descricao: "Updated via API",
      quantidade: 5,
    };
    cy.get("@adminToken").then((token) => {
      cy.updateProduct(createdProductId, updated, token).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.include("Registro alterado com sucesso");
      });
    });
  });

  // DELETE /produtos/:id → should return 200 when deleting existing product
  it("should return 200 and delete an existing product @api", function () {
    cy.get("@adminToken").then((token) => {
      cy.deleteProduct(createdProductId, token).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.be.oneOf([
          "Registro excluído com sucesso",
          "Registro excluído com sucesso | Nenhum registro excluído",
        ]);
      });
    });
  });

  // DELETE /produtos/:id → should return 401 when token is missing
  it("should return 401 when trying to delete product without token @api", () => {
    cy.deletarProduto("000000000000000000000000", "").then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.include("Token de acesso ausente");
    });
  });

  // DELETE /produtos/:id → should return 403 when user is not admin
  it("should return 403 when a non-admin user tries to delete a product @api", () => {
    const newUser = {
      nome: "Common User",
      email: `nonadmin.${Date.now()}@qa.com.br`,
      password: "senha",
      administrador: "false",
    };
    cy.createUser(newUser).then(() => {
      cy.loginUser(newUser.email, newUser.password).then((resLogin) => {
        const nonAdminToken = resLogin.body.authorization;
        cy.deletarProduto(createdProductId, nonAdminToken).then((res) => {
          expect(res.status).to.eq(403);
          expect(res.body.message).to.include(
            "Rota exclusiva para administradores"
          );
        });
      });
    });
  });
});
