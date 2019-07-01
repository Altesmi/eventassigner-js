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
) {
  /* if there is a phantom event need to handle every group in the event
     otherwise it is enough to handle just the assigned group.
     Therefore check first is the event a phantom event */

  // Define variables that are returned

  const returnEvents = events
  const returnPhantomEvents = phantomEvents
  const returnGroups = groups
  /* const returnUnassignedGroups = unassignedGroups
  const returnDeficit = deficit */
  const returnAssignment = assignment

  if (phantomEvents.includes(assignedEventId)) {
    // Remove all the groups in the event from all other events they are set

  } else {
    // Remove the assigned group from every other event they are set
    for (let eventInd = 0; eventInd < events.length; eventInd += 1) {
      if (returnEvents[eventInd].id !== assignedEventId) {
        const numPlayersBefore = countPlayersInEvent(
          returnGroups,
          returnEvents,
          returnEvents[eventInd].id,
        )

        returnEvents[eventInd].groups = returnEvents[eventInd].groups
          .filter(group => group.id !== assignedGroup.id)

        const numPlayersAfter = countPlayersInEvent(
          returnGroups,
          returnEvents,
          returnEvents[eventInd].id,
        )

        // Check did the event fall into a phantom event due to the group being removed
        if (numPlayersAfter < numPlayersBefore && numPlayersAfter < returnEvents[eventInd].min) {
          if (!returnPhantomEvents.includes(returnEvents[eventInd].id)) {
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
}

module.exports = { updateGroupsAfterAssignment }
