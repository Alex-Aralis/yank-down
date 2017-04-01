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

export const yankDown =
  func => argNum => (...first) =>
    collect(argNum, acc => apply(func)([...acc, first]));
