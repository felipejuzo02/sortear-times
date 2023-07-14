import { randomNumber, normalizeTeams } from '../index.js'

function getTeamsWithLockedPlayers (teams) {
  const teamsWithLockedPlayers = {}

  for (const key in teams) {
    teamsWithLockedPlayers[key] = teams[key].filter((element) => element.locked)
  }

  return teamsWithLockedPlayers
}

function getOthersPlayers (teams) {
  const othersPlayersTeams = {}
  const players = []

  for (const key in teams) {
    othersPlayersTeams[key] = teams[key].filter((element) => !element.locked)
  }

  for (const key in othersPlayersTeams) {
    players.push(...othersPlayersTeams[key])
  }

  return players
}

export default function (teams) {
  const quantityPlayersByTeam = teams.team0.length

  const teamsWithLockedPlayers = getTeamsWithLockedPlayers(teams)

  let othersPlayers = getOthersPlayers(teams)

  for (const key in teamsWithLockedPlayers) {
    for (let i = teamsWithLockedPlayers[key].length; i < quantityPlayersByTeam; i++) {
      const sortPlayer = randomNumber(othersPlayers.length)

      teamsWithLockedPlayers[key].push(othersPlayers[sortPlayer])

      othersPlayers.splice(sortPlayer, 1)
    }
  }

  const normalizedTeams = normalizeTeams(teamsWithLockedPlayers)

  return normalizedTeams
}