import { expect } from 'chai';
import { curryCollector } from '../src';

describe('curryCollector', function () {
  it('should collect numbers in order called', function () {
    const args = [1, 2, 3, 4];
    const acc = args.map(num => [num]);

    let thunk = curryCollector(args.length);

    for (const num of args) thunk = thunk(num);

    expect(thunk).to.deep.equal(acc);
  });
});
