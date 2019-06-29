const checkInput = (input) => {
  if ((typeof (input.events)) === 'undefined') {
    return 0
  }
  // Check that events have min, max
  for (let eventId = 0; eventId < input.events.length; eventId += 1) {
    if ((typeof (input.events[eventId].min)) === 'undefined' || (typeof (input.events[eventId].max)) === 'undefined'
    || (typeof (input.events[eventId].id)) === 'undefined') {
      return 0
    }
  }

  // Check that events have unique ids
  const eventIds = []
  for (let eventId = 0; eventId < input.events.length; eventId += 1) {
    if (eventIds.includes(input.events[eventId].id)) {
      return 0
    }
    eventIds.push(input.events[eventId].id)
  }

  if ((typeof (input.groups) === 'undefined')) {
    return 0
  }

  // Check that groups have unique ids
  const groupIds = []
  for (let groupId = 0; groupId < input.groups.length; groupId += 1) {
    if (groupIds.includes(input.events[groupId].id)) {
      return 0
    }
    groupIds.push(input.events[groupId].id)
  }

  // Check that every group has a preferences and size

  for (let groupId = 0; groupId < input.groups.length; groupId += 1) {
    if ((typeof (input.groups[groupId]).size) !== 'number' || (typeof (input.groups[groupId].pref)) === 'undefined') {
      return 0
    }
    if (input.groups[groupId].pref.constructor !== Array) {
      return 0
    }
    // Check that every preference maps to event id
    for (let prefId = 0; prefId < input.groups[groupId].pref.length; prefId += 1) {
      if (!eventIds.includes(input.groups[groupId].pref[prefId])) {
        return 0
      }
    }
  }

  // Check that  updateL exists

  if ((typeof (input.updateL)) !== 'function') {
    return 0
  }
  return 1
}


module.exports = { checkInput }
