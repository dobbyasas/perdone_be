describe('Auth Tests', () => {
  const user = {
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
  };

  it('should sign up a new user', () => {
    cy.request('POST', '/api/auth/signup', {
      email: user.email,
      password: user.password,
      name: user.name
    }).then((response) => {
      expect(response.status).to.eq(201);
      console.log(response.requestBody);
      //expect(response.body).to.have.property('id');
      //expect(response.body).to.have.property('email', user.email);
    });
  });
});
