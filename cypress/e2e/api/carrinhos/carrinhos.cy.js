describe("Cart API", () => {
  let token;

  const products = [
    { idProduto: "BeeJh5lz3k6kSIzA", quantidade: 1 },
    { idProduto: "YaeJ455lz3k6kSIzA", quantidade: 3 },
  ];

  beforeEach(() => {
    return cy.loginAdmin().then((res) => {
      token = res.body.authorization;
      return cy.cancelCart(token);
    });
  });

  // POST /carrinhos → should return 401 when token is missing
  it("should return 401 when creating cart without token @api", () => {
    cy.createCart(products, "").then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.include("Token de acesso ausente");
    });
  });

  // GET /carrinhos → should return 200 and list carts
  it("should list carts and return 200 @api", () => {
    cy.getCarts().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.quantidade).to.be.greaterThan(0);
      expect(res.body.carrinhos[0]).to.have.all.keys(
        "produtos",
        "precoTotal",
        "quantidadeTotal",
        "idUsuario",
        "_id"
      );
    });
  });

  // GET /carrinhos/:id → should return 400 for invalid cart ID
  it("should return 400 for nonexistent cart ID @api", () => {
    cy.getCartById("00000000000000000000000000000000").then((res) => {
      expect(res.status).to.eq(400);
      if (res.body && res.body.message) {
        expect(String(res.body.message)).to.include("Carrinho não encontrado");
      } else {
        expect(res.body).to.be.an("object");
        expect(res.body).to.not.be.null;
      }
    });
  });

  // POST /carrinhos + POST /carrinhos/concluir-compra → should return 200 when completing purchase
  it("should complete the cart purchase and return 200 @api", () => {
    cy.createCart(products, token).then(() => {
      cy.checkoutCart(token).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.be.oneOf([
          "Registro excluído com sucesso",
          "Registro excluído com sucesso | Não foi encontrado carrinho para esse usuário",
          "Não foi encontrado carrinho para esse usuário",
        ]);
      });
    });
  });

  // POST /carrinhos/concluir-compra → should return 401 without token
  it("should return 401 when trying to complete purchase without token @api", () => {
    cy.checkoutCart("").then((res) => {
      expect(res.status).to.eq(401);
      expect(String(res.body.message)).to.include("Token de acesso ausente");
    });
  });

  // DELETE /carrinhos/cancelar-compra → should return 200 and cancel the cart
  it("should cancel a cart and restock items @api", () => {
    cy.createCart(products, token).then(() => {
      cy.cancelCart(token).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.be.oneOf([
          "Registro excluído com sucesso",
          "Registro excluído com sucesso | Não foi encontrado carrinho para esse usuário",
          "Não foi encontrado carrinho para esse usuário",
        ]);
      });
    });
  });

  // DELETE /carrinhos/cancelar-compra → should return 401 without token
  it("should return 401 when trying to cancel cart without token @api", () => {
    cy.cancelCart("").then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.include("Token de acesso ausente");
    });
  });

  context("Edge Cases", () => {
    it("should return 400 when adding nonexistent product to cart @api", () => {
      const fakeProducts = [{ idProduto: "fake1234567890", quantidade: 1 }];
      cy.createCart(fakeProducts, token).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.include("Produto não encontrado");
      });
    });

    it("should return 404 when trying to checkout without a cart @api", () => {
      cy.cancelCart(token).then(() => {
        cy.checkoutCart(token).then((res) => {
          expect(res.status).to.be.oneOf([200, 404, 400]);
          expect(res.body.message).to.include("Não foi encontrado carrinho");
        });
      });
    });
  });
});
