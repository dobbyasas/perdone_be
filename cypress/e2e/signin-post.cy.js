describe('Sign In API', () => {
    const baseUrl = 'http://localhost:3000'; // Replace with your server URL
    const provider = 'credentials'; // Example provider
    let validCredentials = null;
    let invalidCredentials = null;

    // Fetch CSRF token and prepare credentials
    before(() => {
        cy.request('/api/auth/csrf').then((csrfResponse) => {
            const csrfToken = csrfResponse.body.csrfToken;

            validCredentials = {
                email: 'testuser@example.com',
                password: 'password123',
                csrfToken,
                json: "true"
            };

            invalidCredentials = {
                email: 'wronguser@wrong.com',
                password: 'wrongpasswordss',
                csrfToken,
                json: "true"
            };
        });
    });

    it('should sign in user with valid credentials', () => {
        cy.getCookie('next-auth.session-token').should('not.exist');
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/auth/callback/${provider}`,
            headers: { 
                "Content-Type": "application/json" 
            },
            body: validCredentials,
            
        }).then((response) => {
            expect(response.status).to.eq(200); // Adjust based on your expected status code
            //console.log(response);
            /*expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.include({
                username: validCredentials.username
            });*/
        });
        cy.getCookie('next-auth.session-token').should('exist');
    });
    it('should sign out user', () => {
        cy.request({
          method: 'POST',
          body: {
            json:"true",
            csrfToken: validCredentials.csrfToken
          },
          url: `${baseUrl}/api/auth/signout`, // Replace with your actual sign-out endpoint
          headers: {
            'Content-Type': 'application/json'
          },
          // Include the session token or any required cookies if needed
          // For example:
          // cookies: { 'sessionToken': 'value' }
        }).then((response) => {
          //expect(response.status).to.eq(200); // Adjust based on your expected status code
          //expect(response.body).to.have.property('message').and.to.equal('Signed out'); // Adjust based on your response message
    
          // Verify that the session has been terminated
          cy.getCookie('sessionToken').should('not.exist'); // Check that the session cookie no longer exists
    
          // Optionally, check if the user is redirected to a specific page after sign-out
          //cy.url().should('include', '/login'); // Adjust the URL based on your application's post-signout behavior
        });
      });

    it('should not sign in user with valid credentials', () => {
        cy.getCookie('next-auth.session-token').should('not.exist');
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/auth/callback/${provider}`,
            headers: { 
                "Content-Type": "application/json" 
            },
            body: invalidCredentials,
            
        }).then((response) => {
            expect(response.status).to.eq(200); // Adjust based on your expected status code
            //console.log(response);
            /*expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.include({
                username: validCredentials.username
            });*/
        });
        cy.getCookie('next-auth.session-token').should('not.exist');
    });});