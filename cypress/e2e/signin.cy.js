// cypress/integration/auth_spec.js
describe('NextAuth Sign-In Page', () => {
    before(() => {
      // Visit the sign-in page
      cy.getCookie('next-auth.session-token').should('not.exist');
      cy.visit('/api/auth/signin');
    });
    it('should submit the form', () => {
      // Fill in the form and submit
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      // Verify the response after submission
      // Adjust the assertions based on your application's behavior post-sign-in
      cy.url().should('not.include', '/api/auth/signin'); // Assuming successful sign-in redirects away
      cy.get('body').should('not.contain', 'Sign in'); // Check if sign-in page content is no longer visible
      cy.getCookie('next-auth.session-token').should('exist');
    });
  });
  