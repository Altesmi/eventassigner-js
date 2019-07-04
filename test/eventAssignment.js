import { expect } from 'chai'
// eslint-disable-next-line import/named
import { eventAssignment } from '../src/eventAssignment'
import { input } from './padgInput'

describe.only('#eventAssignment', () => {
  describe('With simple input', () => {
    it('should assign every group to their first preference and return arrangement', () => {
      const res = eventAssignment(input)
      expect(res[0].assignment).to.equal(input.groups[0].pref[0])
      expect(res[1].assignment).to.equal(input.groups[1].pref[0])
      expect(res[2].assignment).to.equal(input.groups[2].pref[0])
    })
  })
})
