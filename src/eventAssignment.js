import { checkInput } from './checkInput'
import { checkAssignment } from './checkAssignment'
import { padgOpt } from './padg'
function eventAssignment(input) {
  // check input

  const inputCheck = checkInput(input)

  if (inputCheck === 0) {
    return 0
  }

  const assignment = padgOpt(input)

  const assignmentCheck = checkAssignment(assignment, input.events, input.groups)

  if (assignmentCheck.result === 1) {
    return assignment
  } else {
    return assignmentCheck
  }
}

module.exports = { eventAssignment }
