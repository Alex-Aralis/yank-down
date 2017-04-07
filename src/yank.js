import collect from './collect';
import { _apply } from './apply';
import { ifBound } from './util';

export const _yank =
  func => argNum => (...first) =>
    collect(argNum, acc => _apply(func)([...acc, first]));

export default ifBound(_yank);
