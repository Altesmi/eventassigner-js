function checkAssignment(assignment, events, groups) {
  /* checks if the assignment is a valid one
  (ie. no event has less than minimum and no more than maximum number of attendees)
   OUTPUT { result: 1/0, events: [id1,id2...]}
   1 = arr is valid
   0 = arr is not valid
   events array shows which events do not pass the check */
  let valid = 1
  const wrongEventsArray = []

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
      }
      if (numPlayers > e.max) {
        valid = 0
        if (!wrongEventsArray.includes(e)) {
          wrongEventsArray.push(e.id)
        }
      }
    }
  })

  return { result: valid, events: wrongEventsArray }
}

module.exports = { checkAssignment }
