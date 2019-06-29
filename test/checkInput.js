import { expect } from 'chai'
import { checkInput } from '../src/checkInput'
import {
  inputWithDuplicateIdInEvents,
  inputWithNoMaxInEvents,
  inputWithOnlyL,
  correctInput,
  inputWithNoMinInEvents,
  inputWithoutGroups,
  inputWithWrongPref,
  inputWithWrongPrefId,
} from './inputExamples'

describe('#checkInput', () => {
  describe('with correct input', () => {
    it('should return 1', () => {
      expect(checkInput(correctInput)).to.equal(1)
    })
  })
  describe('without events', () => {
    it('should return 0', () => {
      expect(checkInput(inputWithOnlyL)).to.equal(0)
    })
  })
  describe('with events', () => {
    it('should return 0 when an event does not have min', () => {
      expect(checkInput(inputWithNoMinInEvents)).to.equal(0)
    })
    it('should return 0 when an event does not have max', () => {
      expect(checkInput(inputWithNoMaxInEvents)).to.equal(0)
    })
    it('should return 0 when an event does have duplicate ID', () => {
      expect(checkInput(inputWithDuplicateIdInEvents)).to.equal(0)
    })
  })
  describe('without groups', () => {
    it('should return 0', () => {
      expect(checkInput(inputWithoutGroups)).to.equal(0)
    })
  })
  describe('with groups', () => {
    it('should return 0 when preference is a number', () => {
      expect(checkInput(inputWithWrongPref)).to.equal(0)
    })
    it('should return 0 when pref id does not map to event id', () => {
      expect(checkInput(inputWithWrongPrefId)).to.equal(0)
    })
  })
})
