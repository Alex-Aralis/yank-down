const collect = (distance, cb = false, acc = []) => {
  if (distance > 0)
    return (...args) =>
      collect(distance - 1, cb, [...acc, args]);

  return cb ? cb(acc) : acc;
};

export default collect;
