function countPlayersInEvent(groups, events, eventId) {
  const eInd = events.findIndex(e => e.id === eventId)
  // return 0 if there are no groups in the event
  if (events[eInd].groups.length === 0) {
    return 0
  }

  // sum up the individual group sizes
  const playerCount = events[eInd].groups
    .reduce((total, id) => total + groups.filter(g => g.id === id)[0].size, 0)

  return playerCount
}

module.exports = { countPlayersInEvent }
