describe('babel', function () {
  it('should not crash', function () {
    const { a } = { a: 1 };

    return a;
  });
});
