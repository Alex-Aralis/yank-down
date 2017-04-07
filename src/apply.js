import { ifBound } from './util';

export const _apply =
  thunk => argsList => {
    for (const args of argsList) thunk = thunk(...args);
    return thunk;
  };

export default ifBound(_apply);
