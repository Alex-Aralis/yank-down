export const curryCollector = (distance, acc = [], thunk = false) => {
  if (distance > 0)
    return curryCollector(distance - 1, acc,
      arg => {
        acc.push(arg);
        return thunk || acc;
      }
    );

  return thunk;
};
