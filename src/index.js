import { ifBound } from './util';

const _apply =
  thunk => argsList => {
    for (const args of argsList) thunk = thunk(...args);
    return thunk;
  };

const collect = (distance, cb = false, acc = []) => {
  if (distance > 0)
    return (...args) =>
      collect(distance - 1, cb, [...acc, args]);

  return cb ? cb(acc) : acc;
};

const _yank =
  func => argNum => (...first) =>
    collect(argNum, acc => _apply(func)([...acc, first]));

// wrapper that detects binding
// function yank(arg) {
//   return this !== _this
//     ? _yank(this)(arg)  // yank is bound -> arg === argNum, this == func
//     : _yank(arg)        // yank is unbound -> arg == func
//   ;
// }

const yank = ifBound(_yank);
const apply = ifBound(_apply);

export {
  yank,
  yank as yankDown,
  apply,
  collect,
};
