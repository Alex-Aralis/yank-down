import { expect } from 'chai';
import { collect, apply } from '../src';

describe('collect', function () {
  it('should collect numbers in order called', function () {
    const args = [1, 2, 3, 4];
    const acc = args.map(num => [num]);

    let thunk = collect(args.length);

    for (const num of args) thunk = thunk(num);

    expect(thunk).to.deep.equal(acc);
  });

  it('should collect all args each thunk is called with',
    function () {
      const acc = [['fsd', {}], [1, 4, false]];
      let thunk = collect(acc.length);

      for (const args of acc) thunk = thunk(...args);

      expect(thunk).to.deep.equal(acc);
    }
  );

  it('should not fail when called with 1', function () {
    const thunk = collect(1);

    expect(thunk('arg')).to.deep.equal([['arg']]);
  });

  it('should return an empty array when called with 0', function () {
    expect(collect(0)).to.deep.equal([]);
  });

  it('should call to callback after last thunk with acc', function () {
    const thunk = collect(2,
      acc => apply(collect(5))([...acc, ['injected']])
    );

    const result = apply(thunk)([1, 2, 3, 4].map(v => [v]));

    expect(result).to.deep.equal(
      [1, 2, 'injected', 3, 4].map(v => [v])
    );
  });
});
