import { expect } from 'chai';
import { yankDown, collect, apply } from '../src';

describe('yankDown', function () {
  it('should yank down arg 1', function () {
    const args = [1, 2, 3].map(entry => [entry]);
    let thunk = collect(3);

    thunk = yankDown(thunk)(1);

    const result = apply(thunk)(args);

    expect(result).to.deep.equal([[2], [1], [3]]);
  });
});
