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

    it('should not sign in user with invalid credentials', () => {
        cy.getCookie('next-auth.session-token').should('not.exist');
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/auth/callback/${provider}`,
            headers: { 
                "Content-Type": "application/json" 
            },
            body: invalidCredentials,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401); // Adjust based on your expected status code
            console.log(response);
            /*expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.include({
                username: validCredentials.username
            });*/
        });
        cy.getCookie('next-auth.session-token').should('not.exist');
    });
});