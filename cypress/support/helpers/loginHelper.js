Cypress.Commands.add("loginAPI", (email, password) => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: { email, password },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("authorization");
      return res.body.authorization;
    });
});
