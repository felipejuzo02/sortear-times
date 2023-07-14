import { randomNumber } from "../index.js"

export default function (players = [], playersQuantity) {
  const teamsQuantity = players.length / Number(playersQuantity)

  const teams = {}

  let allPlayersCopy = [ ...players ]

  for (let i = 0; i < teamsQuantity; i++) {
    teams[`team${i}`] = []

    for (let y = 0; y < Number(playersQuantity); y++) {
      const sortPlayer = randomNumber(allPlayersCopy.length)

      teams[`team${i}`].push(allPlayersCopy[sortPlayer])

      allPlayersCopy.splice(sortPlayer, 1)
    }
  }

  return teams
}