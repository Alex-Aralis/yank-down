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

  it('should collect all args each thunk is called with',
    function () {
      const acc = [['fsd', {}], [1, 4, false]];
      let thunk = curryCollector(acc.length);

      for (const args of acc) thunk = thunk(...args);

      expect(thunk).to.deep.equal(acc);
    }
  );

  it('should not fail when called with 1', function () {
    const thunk = curryCollector(1);

    expect(thunk('arg')).to.deep.equal([['arg']]);
  });

  it('should return an empty array when called with 0', function () {
    expect(curryCollector(0)).to.deep.equal([]);
  });
});
