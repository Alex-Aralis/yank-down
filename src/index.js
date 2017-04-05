const _this = this;

export const apply =
  thunk => argsList => {
    for (const args of argsList) thunk = thunk(...args);
    return thunk;
  };

export const collect = (distance, cb = false, acc = []) => {
  if (distance > 0)
    return (...args) =>
      collect(distance - 1, cb, [...acc, args]);

  return cb ? cb(acc) : acc;
};

const _yank =
  func => argNum => (...first) =>
    collect(argNum, acc => apply(func)([...acc, first]));

// wrapper that detects binding
function yank(arg) {
  return this !== _this
    ? _yank(this)(arg)  // yank is bound -> arg === argNum, this == func
    : _yank(arg)        // yank is unbound -> arg == func
  ;
}


export { yank, yank as yankDown };
