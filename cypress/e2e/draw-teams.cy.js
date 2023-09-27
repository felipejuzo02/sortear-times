describe('access players add screen ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('access on the add players scren', () => {
    cy.get('[data-cy="draw-teams-btn"]').click()

    cy.location().should(location => {
      expect(location.pathname).to.eq('/players-add')
    })
  })
})

describe('draw teams testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/players-add')
  })

  it('raffle teams with exact amount of players', () => {
    const playersToAdd = [
      'Gabriel', 'Marcos', 'Felipe', 'Matheus', 'Natan', 'Roberto', 'Luis', 'Sergio'
    ]

    playersToAdd.forEach(player => {
      cy.get('[data-cy="add-player-input"]')
        .should('be.visible')
        .type(player)

      cy.get('[data-cy="add-player-btn"]').click()
    })

    cy.get('[data-cy="quantity-players-input"]')
      .should('be.visible')
      .type(4)

    cy.get('[data-cy="draw-teams-btn"]').click()

    cy.get('.app-team-card__item')
      .should(($item) => {
        expect($item).to.have.length(8)
      })
  })

  it('raffle teams with number of players left', () => {
    const playersToAdd = [
      'Gabriel', 'Marcos', 'Felipe', 'Matheus', 'Natan', 'Roberto'
    ]

    playersToAdd.forEach(player => {
      cy.get('[data-cy="add-player-input"]')
        .should('be.visible')
        .type(player)

      cy.get('[data-cy="add-player-btn"]').click()
    })

    cy.get('[data-cy="quantity-players-input"]')
      .should('be.visible')
      .type(4)

    cy.get('[data-cy="draw-teams-btn"]').click()

    cy.get('.app-team-card__item')
      .should(($item) => {
        expect($item).to.have.length(6)
      })
  })
})