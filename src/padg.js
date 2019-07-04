/* eslint-disable import/named */
import { countPlayersInEvent } from './countPlayersInEvent'
import { updateGroupsAfterAssignment } from './updateGroupsAfterAssignment'

function padgOpt(input) {
  /* let LL = JSON.parse(JSON.stringify(input.L))
  let evn = JSON.parse(JSON.stringify(evnt))
  let M = grp.map(e => {
    return {name: e.name,assignment: -1}
  }) */

  let {
    groups,
    events,
    list,
    // eslint-disable-next-line prefer-const
    updateL,
  } = input

  let assignment = groups.map((group) => {
    const returnObject = {}
    returnObject.id = group.id
    returnObject.assignment = -1
    return returnObject
  })

  let phantomEvents = [] // Phantom events

  // function definitions for PhantomEvents
  phantomEvents.createEntry = (newEntry) => {
    //  function to create a new entry to S
    phantomEvents.push(
      {
        id: newEntry.id,
        min: newEntry.min,
        max: newEntry.max,
      },
    )
  }

  phantomEvents.removeEntry = (eventid) => {
    const ind = phantomEvents.findIndex(ele => ele.name === eventid)
    phantomEvents.splice(ind, 1)
  }

  phantomEvents.includesEvent = (event) => {
    // check if event named eventName is in P
    if (phantomEvents.filter(e => e.id === event.id).length === 1) {
      return 1
    } else {
      return 0
    }
  }

  // define deficit

  let deficit = 0

  // initialize V to be the same as groups
  let unassignedGroups = groups.slice()
  unassignedGroups.countPlayers = () => unassignedGroups
    .reduce((total, group) => total + group.size, 0)
  unassignedGroups.removeGroup = (groupId) => {
    const returnArray = unassignedGroups.filter(group => group.id !== groupId)
    returnArray.countPlayers = () => returnArray
      .reduce((total, group) => total + group.size, 0)
    return returnArray
  }
  // MAIN LOOP STARTS HERE

  list = list.filter(ele => ele.gain > 0)

  while (list.length > 0) {
    const listElement = list.pop()
    const eventInd = events.findIndex(e => e.id === listElement.event)
    const groupInd = groups.findIndex(g => g.id === listElement.id)
    const assignmentInd = assignment.findIndex(a => a.id === listElement.id)
    /* listElement is the last index of LL

     check if there are enough people signed up for this game
     in order to avoid matching some group with this event
     without hope of this event ever happening */

    const numPlayersToThisEvent = groups.reduce((total, group) => {
      if (typeof (group.pref.find(p => p === listElement.event)) !== 'undefined') {
        return total + group.size
      } else {
        return total
      }
    }, 0)

    if (listElement.gain === 0 || numPlayersToThisEvent < events[eventInd].min) {
      // consider only cases where adding u to event increases happiness
      // and those where there is even theoretically possible to have
      // minimum number of players
      // eslint-disable-next-line no-continue
      continue
    }

    if (assignment[assignmentInd].assignment === -1
      && countPlayersInEvent(groups, events, listElement.event) + listElement.size
        <= events[eventInd].max) {
      // group in listElement is not assigned and there is space in the event where we try to place

      // const playersBefore =
      if (countPlayersInEvent(groups, events, listElement.event) === 0) {
        // no players in this event

        if (deficit + (events[eventInd].min - listElement.size) < unassignedGroups.countPlayers()) {
          // adding listElement to this event does not decrease deficit over critical size
          // since event is not yet real event add it to P
          // add to deficit how much space was left over in this event and update deficit
          deficit += (events[eventInd].min - listElement.size)
          if (phantomEvents.includesEvent(events[eventInd]) === 0) {
            const newPEntry = {
              id: events[eventInd].id,
              min: events[eventInd].min,
              max: events[eventInd].max,
            }
            phantomEvents.createEntry(newPEntry)
          }
        } else {
          // eslint-disable-next-line no-continue
          continue
        }
      } else if (phantomEvents.includesEvent(events[eventInd]) === 1) {
        // S has players and is happening anyway
        deficit -= listElement.size
      }
      events[eventInd].groups.push(listElement.id)


      unassignedGroups.removeGroup(listElement.id)
      if (countPlayersInEvent(groups, events, listElement.id) >= events[eventInd].min
      && phantomEvents.includesEvent(events[eventInd]) === 0) {
        // this event is not a phantom event, set M(u) to a
        assignment[assignmentInd].assignment = listElement.event
        const updatedObjects = updateGroupsAfterAssignment(events, phantomEvents, groups, unassignedGroups, assignment, groups[groupInd], listElement.event, 'real')
        groups = updatedObjects.returnGroups
        events = updatedObjects.returnEvents
        deficit = updatedObjects.returnDeficit
        unassignedGroups = updatedObjects.returnUnassignedGroups
        phantomEvents = updatedObjects.returnPhantomEvents
        assignment = updatedObjects.returnAssignment
      }

      if (countPlayersInEvent(groups, events, listElement.event) >= events[eventInd].min
      && phantomEvents.includesEvent(events[eventInd]) === 1) {
        // this event is a phantom event but has now enough players to be a real event
        assignment[assignmentInd].assignment = listElement.event
        const updatedObjects = updateGroupsAfterAssignment(events, phantomEvents, groups, unassignedGroups, assignment, groups[groupInd], listElement.event, 'phantomToReal')
        groups = updatedObjects.returnGroups
        events = updatedObjects.returnEvents
        deficit = updatedObjects.returnDeficit
        unassignedGroups = updatedObjects.returnUnassignedGroups
        phantomEvents = updatedObjects.returnPhantomEvents
        assignment = updatedObjects.returnAssignment
      }
      // Update list LL if there was no assignment
      if (assignment[assignmentInd].assignment === -1) {
        list = updateL(
          {
            groups, events, assignment, unassignedGroups, deficit, list,
          },
        )
      }
    }
  }

  return assignment
}

module.exports = { padgOpt }
