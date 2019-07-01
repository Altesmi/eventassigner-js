import { expect } from 'chai'
import { countPlayersInEvent } from '../src/countPlayersInEvent'
import { groups, eventWithGroups } from './groupAndEventInputs'

describe('With groups and events with assigned groups', () => {
  it('should return 5', () => {
    expect(countPlayersInEvent(groups, eventWithGroups, 12)).to.equal(5)
  })
  it('should return 0 with empty groups array', () => {
    expect(countPlayersInEvent(groups, eventWithGroups, 1)).to.equal(0)
  })
  it('should return sum of group sizes when assignedgroups has more than one group', () => {
    expect(countPlayersInEvent(groups, eventWithGroups, 3)).to.equal(3)
  })
})
