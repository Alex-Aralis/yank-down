export const curryCollector = (distance, acc = [], thunk = false) => {
  if (distance > 0)
    return curryCollector(distance - 1, acc,
      (...args) => {
        acc.push(args);
        return thunk || acc;
      }
    );

  return thunk || [];
};
