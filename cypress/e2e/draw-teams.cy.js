describe('sort teams test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/players-add')
  })

  it('sort teams with exact amount of players', () => {
    const playersToAdd = [
      'Gabriel', 'Marcos', 'Felipe', 'Matheus', 'Natan', 'Roberto', 'Luis', 'Sergio'
    ]

    cy.sort(playersToAdd)

    cy.checkPlayersQuantity(playersToAdd.length)
  })

  it('sort teams with number of players left', () => {
    const playersToAdd = [
      'Gabriel', 'Marcos', 'Felipe', 'Matheus', 'Natan', 'Roberto'
    ]

    cy.sort(playersToAdd)
    cy.checkPlayersQuantity(playersToAdd.length)
  })

  it('sort teams without locking players', () => {
    const playersToAdd = [
      'Gabriel', 'Marcos', 'Felipe', 'Matheus', 'Natan', 'Roberto', 'Luis', 'Sergio'
    ]
  
    const lockedPlayers = []
  
    // Função para clicar no botão de lock e validar o texto
    const clickLockButtonAndValidateText = (index, expectedText) => {
      cy.get('[data-cy="handle-lock-button"]').eq(index).click()
      cy.get('[data-cy="handle-lock-button"]').eq(index).should('have.text', expectedText)
    }
  
    // Função para armazenar o nome do jogador
    const storePlayerName = (index) => {
      cy.get('[data-cy="player-name"]').eq(index).invoke('text').then((player) => {
        lockedPlayers[index] = player
      })
    }
  
    // Função para verificar se o jogador está bloqueado
    const assertPlayerIsLocked = (index) => {
      cy.get('[data-cy="player-name"]').eq(index).invoke('text').then((value) => {
        expect(lockedPlayers.includes(value)).to.be.true
      })
    }
  
    // Função para verificar se o jogador não está bloqueado
    const assertPlayerIsNotLocked = (index) => {
      cy.get('[data-cy="player-name"]').eq(index).invoke('text').then((value) => {
        expect(lockedPlayers.includes(value)).to.be.false
      })
    }
  
    cy.sort(playersToAdd)
    cy.checkPlayersQuantity(playersToAdd.length)
  
    clickLockButtonAndValidateText(0, 'lock')
    clickLockButtonAndValidateText(1, 'lock')
    clickLockButtonAndValidateText(2, 'lock')
  
    storePlayerName(0)
    storePlayerName(1)
    storePlayerName(2)
  
    cy.get('[data-cy="redraw-button"]').click()
  
    assertPlayerIsLocked(0)
    assertPlayerIsLocked(1)
    assertPlayerIsNotLocked(3)
  })
})