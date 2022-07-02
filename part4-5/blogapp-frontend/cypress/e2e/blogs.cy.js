describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  //describe 1
  describe('Login',function() {
    beforeEach(function() {

      const user = {
        name: 'Matti Luukkainen',
        username: 'root',
        password: 'salainen'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'wrong credentials')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  //describe 2

  describe('When logged in', function() {
    beforeEach(function() {
        const user = {
            name: 'Matti Luukkainen',
            username: 'root',
            password: 'salainen'
          }
    
          cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')

      cy.get('#create-button').click()

      cy.contains('Delete entry')

      cy.get('.success').should('contain', 'Added a new blog.')
    })

    it('A blog can be liked', function() {
        //Create a new blog
        cy.contains('new blog').click()
      cy.get('#title').type('a blog title cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')

      cy.get('#create-button').click()

      cy.contains('Delete entry')

      cy.get('.success').should('contain', 'Added a new blog.')

        //Like the blog
        cy.contains('new blog').parent()
        .contains('Like blog')
        .click()

        cy.contains('new blog').parent()
        .contains('1')
      })

      //Test: a blog can be deleted
      //Test: check the sort by likes function


  })

})