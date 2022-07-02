describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login').click()
    })

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
    
    //     it('fails with wrong credentials', function() {
    //       // ...
    //     })
    //   })


  })
})