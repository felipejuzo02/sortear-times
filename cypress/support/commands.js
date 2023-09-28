// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('sort', (players) => {
  players.forEach(player => {
    cy.get('[data-cy="add-player-input"]')
      .should('be.visible')
      .type(player)

    cy.get('[data-cy="add-player-btn"]').click()
  })

  cy.get('[data-cy="quantity-players-input"]')
    .should('be.visible')
    .type(4)

  cy.get('[data-cy="draw-teams-btn"]').click()
})

Cypress.Commands.add('checkPlayersQuantity', (quantity) => {
  cy.get('.app-team-card__item')
    .should(($item) => {
      expect($item).to.have.length(quantity)
    })
})