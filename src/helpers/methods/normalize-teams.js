export default function (teams) {
  let teamsCopy = Object.assign({}, teams)
      
  for (const key in teamsCopy) {
    if (Array.isArray(teamsCopy[key])) {
      teamsCopy[key] = teamsCopy[key].filter((element) => element !== undefined);
    }
  }

  return teamsCopy
}