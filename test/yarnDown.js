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


  it('should yank down last arg', function () {
    const args = [1, 2, 3].map(entry => [entry]);
    let thunk = collect(3);

    thunk = yankDown(thunk)(2);

    const result = apply(thunk)(args);

    expect(result).to.deep.equal([[2], [3], [1]]);
  });

  it('should return the same function when yanking 0', function () {
    const args = [1, 2, 3].map(entry => [entry]);
    let thunk = collect(3);

    thunk = yankDown(thunk)(0);

    const result = apply(thunk)(args);

    expect(result).to.deep.equal([[1], [2], [3]]);
  });

  it('should work with multiple args', function () {
    const args = [[1], [2, 3], [4, 5]];
    let thunk = collect(3);

    thunk = yankDown(thunk)(1);

    const result = apply(thunk)(args);

    expect(result).to.deep.equal([[2, 3], [1], [4, 5]]);
  });

  it('should work with depth 1 thunks', function () {
    const thunk = arg => arg;

    yankDown(thunk)(0);

    expect(thunk('foo')).to.equal('foo');
  });
});