import { expect } from 'chai'
// eslint-disable-next-line import/named
import { padgOpt } from '../src/padg'
import { input } from './padgInput'

describe('#padg', () => {
  describe('With simple input', () => {
    it('should assign every group to their first preference', () => {
      const res = padgOpt(input)
      expect(res[0].assignment).to.equal(input.groups[0].pref[0])
      expect(res[1].assignment).to.equal(input.groups[1].pref[0])
      expect(res[2].assignment).to.equal(input.groups[2].pref[0])
    })
  })
})
