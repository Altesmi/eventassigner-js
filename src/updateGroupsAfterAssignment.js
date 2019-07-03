import { countPlayersInEvent } from './countPlayersInEvent'

function updateGroupsAfterAssignment(
  events,
  phantomEvents,
  groups,
  unassignedGroups,
  deficit,
  assignment,
  assignedGroup,
  assignedEventId,
  runmode,
) {
  /* if there is a phantom event need to handle every group in the event
     otherwise it is enough to handle just the assigned group.
     Therefore check first is the event a phantom event */

  // Define variables that are returned

  const returnEvents = events
  const returnPhantomEvents = phantomEvents
  const returnGroups = groups
  /* const returnUnassignedGroups = unassignedGroups */
  let returnDeficit = 0
  const returnAssignment = assignment

  if (runmode === 'phantomToReal') {
    /* This group was a phantom event but now has enough groups to be a real event
     Remove all the groups in the event from all other events they are set */
    returnPhantomEvents.removeEntry(assignedEventId)
    const assignedEventInd = returnEvents.findIndex(event => event.id === assignedEventId)

    // set every group's assignment
    returnEvents[assignedEventInd].groups.forEach((group) => {
      const assignmentIndTemp = returnAssignment.findIndex(a => a.id === group)
      returnAssignment[assignmentIndTemp].assignment = assignedEventId
    })

    // remove every assigned group from other events they are set to
    for (let groupInd = 0;
      groupInd < returnEvents[assignedEventInd].groups.length;
      groupInd += 1) {
      for (let eventInd = 0; eventInd < returnEvents.length; eventInd += 1) {
        if (returnEvents[eventInd].id !== assignedEventId) {
          const numPlayersBefore = countPlayersInEvent(
            returnGroups,
            returnEvents,
            returnEvents[eventInd].id,
          )
          returnEvents[eventInd].groups = returnEvents[eventInd].groups
            .filter(g => g !== returnEvents[assignedEventInd].groups[groupInd])

          const numPlayersAfter = countPlayersInEvent(
            returnGroups,
            returnEvents,
            returnEvents[eventInd].id,
          )
          // set event to phantom event if there is not enough players anymore
          if (numPlayersAfter < numPlayersBefore
            && numPlayersAfter < returnEvents[eventInd].min
            && numPlayersAfter > 0) {
            if (!returnPhantomEvents.includesEvent(returnEvents[eventInd])) {
              phantomEvents.createEntry({
                id: returnEvents[eventInd].id,
                min: returnEvents[eventInd].min,
                max: returnEvents[eventInd].max,
              })
            }

            // remove assigments

            for (let assignmentInd = 0;
              assignmentInd < returnAssignment.length;
              assignmentInd += 1) {
              if (returnAssignment[assignmentInd].assignment === returnEvents[eventInd].id) {
                returnAssignment[assignmentInd] = -1
              }
            }
          }
        }
      }
    }
  } else {
    // Remove the assigned group from every other event they are set
    for (let eventInd = 0; eventInd < events.length; eventInd += 1) {
      if (returnEvents[eventInd].id !== assignedEventId) {
        const numPlayersBefore = countPlayersInEvent(
          returnGroups,
          returnEvents,
          returnEvents[eventInd].id,
        )
        // console.log(assignedGroup.id)
        returnEvents[eventInd].groups = returnEvents[eventInd].groups
          .filter(group => group !== assignedGroup.id)
        const numPlayersAfter = countPlayersInEvent(
          returnGroups,
          returnEvents,
          returnEvents[eventInd].id,
        )

        // Check did the event fall into a phantom event due to the group being removed
        if (numPlayersAfter < numPlayersBefore
          && numPlayersAfter < returnEvents[eventInd].min
          && numPlayersAfter > 0) {
          if (!returnPhantomEvents.includesEvent(returnEvents[eventInd].id)) {
            returnPhantomEvents.createEntry({
              id: returnEvents[eventInd].id,
              min: returnEvents[eventInd].min,
              max: returnEvents[eventInd].max,
            })
          }
          // if any group had this event as an assignment remove it
          for (let assignmentInd = 0; assignmentInd < returnAssignment.length; assignmentInd += 1) {
            if (returnAssignment[assignmentInd].assignment === returnEvents[eventInd].id) {
              returnAssignment[assignmentInd] = -1
            }
          }
        }
      }
    }
  }

  /* Check that every group not in any event is in unassigned groups */

  /* Check that deficit equals sum ( event min - numPlayers in event)
  over the set of phantom events */

  returnPhantomEvents.forEach((pevent) => {
    // find the players attending to this event
    const numPlayers = countPlayersInEvent(returnGroups, returnEvents, pevent.id)

    returnDeficit += (pevent.min - numPlayers)
  })

  return {
    returnEvents,
    returnPhantomEvents,
    returnGroups,
    returnDeficit,
    returnAssignment,
  }
}

module.exports = { updateGroupsAfterAssignment }
