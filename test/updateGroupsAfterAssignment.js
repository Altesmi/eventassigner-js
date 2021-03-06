import { expect } from 'chai'
// eslint-disable-next-line import/named
import { updateGroupsAfterAssignment } from '../src/updateGroupsAfterAssignment'
import { eventWithGroups, groups, assignment } from './groupAndEventInputs'

const phantomEvents = [
  {
    id: 22,
    min: 4,
    max: 5,
  },
  {
    id: 551,
    min: 3,
    max: 5,
  },
]
phantomEvents.createEntry = (newEntry) => {
  phantomEvents.push({
    id: newEntry.id,
    min: newEntry.min,
    max: newEntry.max,
  })
}

phantomEvents.removeEntry = (event) => {
  const ind = phantomEvents.findIndex(e => e.id === event.id)
  phantomEvents.splice(ind, 1)
}

phantomEvents.includesEvent = (event) => {
  if (phantomEvents.filter(e => e.id === event.id).length === 1) {
    return 1
  } else {
    return 0
  }
}
const unassignedGroups = groups.slice()

unassignedGroups.countPlayers = () => unassignedGroups
  .reduce((total, group) => total + group.size, 0)
describe('#updateGroupsAfterAssignemnt', () => {
  describe('With assignment to already happening event', () => {
    const runMode = 'real'
    const res = updateGroupsAfterAssignment(
      eventWithGroups, phantomEvents, groups, unassignedGroups, assignment, groups[0], 12, runMode,
    )

    it('should remove group from all other events', () => {
      const eventWhereGroupsShouldBeEmpty = res.returnEvents.filter(e => e.id === 4)[0]
      expect(eventWhereGroupsShouldBeEmpty.groups).to.have.length(0)
    })

    it('should not add event 4 as a phantom event', () => {
      expect(res.returnPhantomEvents
        .filter(e => e.id === 4)).to.have.length(0)
    })

    it('should set deficit to 2', () => {
      expect(res.returnDeficit).to.equal(2)
    })
  })

  describe('With assignment to phantom event that turns to real event', () => {
    const runMode = 'phantomToReal'
    const res = updateGroupsAfterAssignment(
      eventWithGroups, phantomEvents, groups, unassignedGroups, assignment, groups[4], 551, runMode,
    )

    it('should remove assigned groups from all other evets', () => {
      const eventWhereShouldNotBe13InGroups = res.returnEvents.filter(e => e.id === 53)
      expect(eventWhereShouldNotBe13InGroups).not.to.include(13)
      const anotherEvenetWhereShouldNotBe13InGroups = res.returnEvents.filter(e => e.id === 1)
      expect(anotherEvenetWhereShouldNotBe13InGroups).not.to.include(13)
      expect(anotherEvenetWhereShouldNotBe13InGroups).not.to.include(14)
    })
    it('should set id 100 to be an unassigned group', () => {
      const unAssignedGroup = res.returnUnassignedGroups.filter(g => g.id === 100)[0]
      expect(unAssignedGroup.id).to.equal(100)
    })
  })
})
