import { expect } from 'chai'
import { checkAssignment } from '../src/checkAssignment'
import { correctAssignment, correctInput, wrongAssignment } from './inputExamples'

describe('With correct assignment', () => {
  it('should return 1 as result', () => {
    const assignmentCheck = checkAssignment(
      correctAssignment, correctInput.events, correctInput.groups,
    )
    expect(assignmentCheck.result).to.equal(1)
  })
})

describe('With wrong assignment', () => {
  const assignmentCheck = checkAssignment(
    wrongAssignment, correctInput.events, correctInput.groups,
  )
  it('should return 0 as a result', () => {
    expect(assignmentCheck.result).to.equal(0)
  })
  it('should have id 1 in events array', () => {
    expect(assignmentCheck.events).to.include(1)
  })
})
