const _this = this;

export const ifBound = func =>
  function (arg) {
    return this !== _this && typeof this === 'function'
      ? func(this)(arg) // if bound
      : func(arg)      // if unbound
    ;
  }
;
