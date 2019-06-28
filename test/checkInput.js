import { expect } from 'chai';
import { checkInput } from '../src/checkInput';

const input = { L: 0 };

describe('#checkInput', () => {
  context('without events', () => {
    it('should return 0', () => {
      expect(checkInput(input)).to.equal(0);
    });
  });
});
