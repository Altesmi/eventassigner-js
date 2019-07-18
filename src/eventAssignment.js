import { checkInput } from './checkInput'
// eslint-disable-next-line import/named
import { checkAssignment } from './checkAssignment'
// eslint-disable-next-line import/named
import { padgOpt } from './padg'

function eventAssignment(input) {
  // check input

  const inputCheck = checkInput(input)

  if (inputCheck === 0) {
    return 0
  }

  const assignment = padgOpt(input)
  // console.log(assignment)
  const assignmentCheck = checkAssignment(assignment, input.events, input.groups)

  if (assignmentCheck.result === 1) {
    return assignment
  } else {
    return assignmentCheck
  }
}

module.exports = { eventAssignment }
