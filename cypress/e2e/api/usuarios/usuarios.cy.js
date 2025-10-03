describe("Users API", () => {
  const user = {
    nome: "Fulano da Silva",
    email: `fulano.${Date.now()}@qa.com.br`,
    password: "teste",
    administrador: "true",
  };

  let createdId = "";

  // GET /usuarios → should return all users with status 200
  it("should return 200 and retrieve a list of users @api", () => {
    cy.getUsers().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.quantidade).to.be.greaterThan(0);
      expect(res.body.usuarios[0]).to.have.all.keys(
        "nome",
        "email",
        "password",
        "administrador",
        "_id"
      );
    });
  });

  // POST /usuarios → should create a new user and return status 201
  it("should return 201 and create a new user successfully @api", () => {
    cy.createUser(user).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.include("Cadastro realizado com sucesso");
      expect(res.body._id).to.be.a("string");
      createdId = res.body._id;
    });
  });

  // POST /usuarios → should reject duplicate email with status 400
  it("should return 400 when creating a user with a duplicate email @api", () => {
    cy.createUser(user).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Este email já está sendo usado");
    });
  });

  // GET /usuarios/{_id} → should retrieve the created user with status 200
  it("should return 200 and retrieve a user by ID @api", () => {
    cy.getUserById(createdId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body._id).to.eq(createdId);
    });
  });

  // PUT /usuarios/{_id} → should update the user and return status 200
  it("should return 200 when updating an existing user @api", () => {
    const updated = {
      ...user,
      nome: "Fulano Atualizado",
      email: `updated.${Date.now()}@qa.com.br`,
    };

    cy.updateUser(createdId, updated).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.include("Registro alterado com sucesso");
    });
  });

  // PUT /usuarios/{_id} → should reject update with duplicate email
  it("should return 400 when updating a user with an email that already exists @api", () => {
    const userA = {
      nome: "User A",
      email: `userA.${Date.now()}@qa.com.br`,
      password: "abc",
      administrador: "true",
    };

    const userB = {
      nome: "User B",
      email: `userB.${Date.now()}@qa.com.br`,
      password: "def",
      administrador: "true",
    };

    let userBId = "";

    cy.createUser(userA).then(() => {
      cy.createUser(userB).then((resB) => {
        userBId = resB.body._id;

        cy.updateUser(userBId, { ...userB, email: userA.email }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.include("Este email já está sendo usado");
        });
      });
    });
  });

  // PUT /usuarios/{_id} → should return 201 when updating a non-existing ID
  it("should return 201 and create a user when updating a nonexistent ID @api", () => {
    const ghostUser = {
      nome: "Ghost User",
      email: `ghost.${Date.now()}@qa.com.br`,
      password: "invisivel",
      administrador: "false",
    };

    cy.updateUser("ffffffffffffffffffffffff", ghostUser).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.include("Cadastro realizado com sucesso");
      expect(res.body._id).to.be.a("string");
    });
  });

  // DELETE /usuarios/{_id} → should return 200 after successful deletion
  it("should return 200 and delete an existing user @api", () => {
    cy.deleteUser(createdId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.match(/sucesso|Nenhum registro/);
    });
  });

  // DELETE /usuarios/{_id} → should return 200 when deleting nonexistent user
  it("should return 200 and message when deleting a nonexistent user @api", () => {
    cy.deleteUser("999999999999999999999999999999").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.match(/Registro inexistente|Nenhum registro/);
    });
  });
});
