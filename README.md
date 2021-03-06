
# Yank Down

[![npm version](https://badge.fury.io/js/yank-down.svg)](https://badge.fury.io/js/yank-down) [![devpendencies](https://david-dm.org/Alex-Aralis/yank-down.svg)](https://david-dm.org/Alex-Aralis/yank-down) [![Build Status](https://travis-ci.org/Alex-Aralis/yank-down.svg?branch=master)](https://travis-ci.org/Alex-Aralis/yank-down) [![codecov](https://codecov.io/gh/Alex-Aralis/yank-down/branch/master/graph/badge.svg)](https://codecov.io/gh/Alex-Aralis/yank-down)



Have you ever been unsure what value to pass first in a curried function?

```javascript
const divide = numerator => denominator => numerator/denominator;
```

and ended up getting it wrong?

```javascript
const needToBeDividedBy3 = [1,3,4,5,2];

const wrongAnswer = needToBeDivided.map(divide(3));
                                     // ^^^^^^^^^
                                     // would return 3/number :/
```

Enter yankDown, the titular function of this module.

```javascript
import { yankDown } from 'yank-down'; // import yankDown

const flippedDivide = yankDown(divide)(1); // yank arg 1 to be arg 0

const correctAnswer = needToBeDivided.map(flippedDivide(3));
                                       // ^^^^^^^^^^^^^^^^
                                       // arg 1 yanked down to arg 0
```

_AMAZING!!!_

### Multi-Parameter Functions
Yank Down will even work with multi-parameter functions.

```javascript

const factoryFactory =
  (factoryName, factoryConfig = {}) =>
    (objProps = {}) =>
      { ...objProps, factoryConfig, type: factoryName }
;

const flippedFF = yankDown(factoryFactory)(1); // yankDown properly flips calls
```

_SO CONVENIENT_

### Arbitrary Curry Depth

As you would expect, yankDown can work with curried functions of arbitrary depth

```javascript
const makeArray = one => two => three => [one, two, three];

console.log(makeArray(1)(2)(3)); // [1, 2, 3];

const yankedMakeArray = yankDown(makeArray)(1);

console.log(yankedMakeArray(1)(2)(3)); // [2, 1, 3]
```

*JUST WOW.*

### Yank supports binding syntax.

also, yankDown is exported as yank

```javascript
import { yank } from 'yank-down';

// this is equivalent to
yank(makeArray)(1);

// this
yank.bind(makeArray)(1);

// and this (using new :: function binding)
makeArray::yank(1);

```

## yank-down also has 2 other utility functions

### collect

`collect` is a function that creates a `depth` deep curried thunk that collects arguments and then either returns them or passes them to a passed callback `cb`.

```javascript
collect(depth, cb = false, preexistingArgsList = [])
```

It's really no so bad.  Here's an example

```javascript
import { collect } from 'yank-down';

cosnt thunk = collect(3) // produces a depth 3 thunk.

expect(thunk(1)(2)(3)).to.deep.equal([[1], [2], [3]]);

const cbThunk = collect(4, console.log);

cbThunk('a', 'e')('b')('c')('d'); // prints [['a', 'e'], ['b'], ['c'], ['d']]
```

### apply

`apply` takes a list of lists of arguments like what is produced by `collect` and _applies_ it to a curried thunk, then returns the result.

```javascript
apply(curriedFunc)(argsListList)
```

Check it out.
```javascript
import { apply } from 'yank-down';

apply(makeArray)([[1], [2]]); // returns c => [1, 2, c]

apply(makeArray)([['one'], ['two'], ['three']]); // returns ['one', 'two', 'three']

// apply can also use bind syntax to get its functions
makeArray::apply([['such'], ['cool']])('amaze'); // returns ['such', 'cool', 'amaze']
```
