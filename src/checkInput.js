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

  // Check that evens have unique ids
  const ids = []
  for (let eventId = 0; eventId < input.events.length; eventId += 1) {
    if (ids.includes(input.events[eventId].id)) {
      return 0
    }
    ids.push(input.events[eventId].id)
  }
  return 1
}

module.exports = { checkInput }
