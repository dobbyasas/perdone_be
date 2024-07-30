describe('NextAuth API Endpoints', () => {
  it('should return a valid access token', () => {
    cy.request('POST', '/api/auth/callback/credentials', {
      username: 'testuser',
      password: 'testpassword',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('accessToken');
    });
  });

  it('should return a valid user profile', () => {
    cy.request('GET', '/api/auth/user').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('role');
    });
  });

  // Add more tests for other NextAuth API endpoints here
});