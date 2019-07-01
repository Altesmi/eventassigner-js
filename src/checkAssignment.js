import { countPlayersInEvent } from './countPlayersInEvent'

function checkAssignment(assignment, events, groups) {
  /* checks if the assignment is a valid one
  (ie. no event has less than minimum and no more than maximum number of attendees)
   OUTPUT { result: 1/0, events: [id1,id2...], flag}
   1 = arr is valid
   0 = arr is not valid
   events array shows which events do not pass the check
   flag is a string explaining what went wrong */
  let valid = 1
  const wrongEventsArray = []
  let flag = ''

  events.forEach((e) => {
    let numPlayers = 0
    let groupsAttending = assignment.filter(a => a.assignment === e.id)
    if (groupsAttending.length > 0) {
      groupsAttending = groupsAttending.map((gr) => {
        const groupdata = groups.find(g => g.id === gr.id)
        return { id: gr.id, assignemnt: gr.assignment, size: groupdata.size }
      })

      numPlayers = groupsAttending.reduce((total, gr) => total + gr.size, 0)

      if (numPlayers < e.min) {
        valid = 0
        wrongEventsArray.push(e.id)
        flag = flag.concat(' Lower than minimum number of players')
      }
      if (numPlayers > e.max) {
        valid = 0
        if (!wrongEventsArray.includes(e)) {
          wrongEventsArray.push(e.id)
          flag = flag.concat(' More than maximum number of players')
        }
      }
    }
  })

  // Check that groups that are not assigned to any event do not fit to any of their preferences

  groups.forEach((g) => {
    g.pref.forEach((gPref) => {
      const eInd = events.findIndex(e => e.id === gPref)
      const numPlayers = countPlayersInEvent(groups, events, gPref)
      if (numPlayers + g.size < events[eInd].max && g.size >= events[eInd].min) {
        valid = 0
        flag = flag.concat(`Group ${g.id} could fit to pref ${gPref}`)
      }
    })
  })

  return { result: valid, events: wrongEventsArray, flag }
}

module.exports = { checkAssignment }
