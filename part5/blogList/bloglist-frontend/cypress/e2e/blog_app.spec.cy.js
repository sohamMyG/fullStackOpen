import { func } from "prop-types"

describe('blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
			username: "rambo",
            name: "Rambostini Eli",
            password:"wasta"
        }
        cy.request('POST','http://localhost:3003/api/users',user)
        cy.visit('http://localhost:3000')
    })
    
    it('login form is shown', function() {
        cy.contains('Log in to App')
        cy.contains('Username:')
    })

    describe('Login',function(){
        it('succeeds with correct credentials',function(){
            cy.get('#username').type('rambo')
            cy.get('#password').type('wasta')
            cy.get('#loginButton').click()
            cy.contains('Rambostini Eli logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('bomar')
            cy.get('#password').type('tawas')
            cy.get('#loginButton').click()
            
            cy.get('.error')
                .should('contain','Invalid credentials')
                .and('have.css','color','rgb(255, 0, 0)')
                .and('have.css','border-style','solid')
            
            cy.get('html').should('not.contain','Rambostini Eli logged in')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
          cy.login({ username:'rambo', password:'wasta' })
        })
      
        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('blog title')
          cy.get('#author').type('blog author')
          cy.get('#url').type('blog url')
          cy.get('#createButton').click()
          cy.contains('blog title blog author')
        })

        describe('a blog exists', function() {
            beforeEach(function(){
                cy.createBlog({
                    title:'title 1',
                    author:'author 1',
                    url:'url.com'
                })
            })

            it('user can like blog', function() {
                cy.contains('title 1 author 1')
                    .contains('view').click()
                cy.contains('like').parent().contains('0')
                cy.contains('like').click().click()
                cy.contains('like').parent().contains('2')
            })

            it('user can delete blog', function() {
                cy.contains('title 1 author 1')
                    .contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain','title 1 author 1')
            })

            it('other user cant delete the blog', function(){
                const user = {
                    username: "kempo",
                    name: "Kempostini Eli",
                    password:"pokem"
                }
                cy.request('POST','http://localhost:3003/api/users',user)
                cy.contains('log out').click()
                cy.login({username: 'kempo', password:'pokem'})

                cy.contains('title 1 author 1')
                .contains('view').click()

                cy.contains('title 1 author 1').parent().should('not.contain','remove')
            })


        })

        describe('several blogs exist',function(){
            beforeEach(function(){
                cy.createBlog({title:'title with the second most likes',author:'author 1',url:'url.com',likes:8})
                cy.createBlog({title:'title with the most likes',author:'author 1',url:'url.com'})
                cy.createBlog({title:'title with the least likes',author:'author 1',url:'url.com'})
            })

            it('blogs are ordered according to likes',function(){
                cy.get('.blog').eq(0).contains('view').click()
                cy.get('.blog').eq(0).contains(/^like$/).click().click()   

                cy.get('.blog').eq(1).contains('view').click()
                cy.get('.blog').eq(1).contains(/^like$/).click().click().click()

                cy.get('.blog').eq(2).contains('view').click()
                cy.get('.blog').eq(2).contains(/^like$/).click()
                
                cy.get('.blog').eq(0).contains('title with the most likes')
                cy.get('.blog').eq(2).contains('title with the least likes')
                
                
            })
        })
    })
})