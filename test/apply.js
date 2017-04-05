import { expect } from 'chai';
import { apply, collect } from '../src';

describe('apply', function () {
  it('should apply collected calls', function () {
    const argsList = [[1], [2, 3], [4]];
    const thunk = collect(argsList.length);
    const result = apply(thunk)(argsList);

    expect(result).to.deep.equal(argsList);
  });

  it('should work after being bound', function () {
    const argsList = [[1], [2, 3], [4]];
    const thunk = collect(argsList.length);
    const result = thunk::apply(argsList);

    expect(result).to.deep.equal(argsList);
  });
});
