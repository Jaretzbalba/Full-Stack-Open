describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Jaret Balba',
      username: 'Jaret',
      password: 'password',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Jaret')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.sucess').should(
        'contain',
        'Jaret Balba was successfully logged in'
      )
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Jaret')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  //exercise 5.19
  describe.only('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Jaret', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('A new blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.com')
      cy.get('.createButton').click()
      cy.get('.alert-success').contains('added')
      cy.contains('A new blog created by cypress')
    })
  })
})
