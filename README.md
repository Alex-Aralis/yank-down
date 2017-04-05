# Yank Down

Have you ever been unsure what value to pass first?

```javascript
const divide = numerator => denominator => numerator/denominator;
```

but later found to your horror that it would have been better the other way around?

```javascript
const needToBeDividedBy3 = [1,3,4,5,2];

const wrongAnswer = needToBeDivided.map(divide(3));
                                     // ^^^^^^^^^
                                     // not this would 3/number :/
```

Well then, say hello to yankDown.

```javascript
import { yankDown } from 'yank-down'; // import yankDown

const flippedDivide = yankDown(divide)(1); // yank arg 1 to be first arg

const correctAnswer = needToBeDivided.map(flippedDivide(3));
                                       // ^^^^^^^^^^^^^^^^
                                       // arg 1 yanked down to arg 0 pos
```

_AMAZING!!!_

### Multi-Parameter Functions
Yank Down will even work with multi-parameter functions.

```javascript

const factoryFactory =
  (factoryName, factoryConfig = {}) =>
    (objProps = {}) =>
      { ...objProps, factoryConfig, type: factoryName }

const flippedFF = yankDown(factoryFactory)(1); // yankDown properly flips calls
```

_SO CONVENIENT~~~~_

### Arbitrary Curry Depth

As you would expect, yankDown can work with curried functions of arbitrary depth

```javascript
const makeArray = one => two => three => [one, two, three];

console.log(makeArray(1)(2)(3)); // [1, 2, 3];

const yankedMakeArray = yankDown(makeArray)(1);

console.log(yankedMakeArray(1)(2)(3)); // [2, 1, 3]
```

*JUST WOW.*

### Yank can be called using a binding.  

also, yankDown is exported as yank

```javascript
import { yank } from 'yankDown';

// this is equivalent to
yank(makeArray)(1);

// this
yank.bind(makeArray)(1);

// and this (using new :: function binding)
makeArray::yank(1);

```
