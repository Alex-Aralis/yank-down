import { expect } from 'chai';

describe('babel', function() {
  it('should not crash', function() {
    () => {};
  });

  it('should import properly', function() {
    let ret = require('../src/index.js');

    expect(ret.default).to.equal('dog');
  });
});
