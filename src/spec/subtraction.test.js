const subtraction = require('../modules/subtraction');

test('subtracts 7 - 2 to equal 5', () => {
  expect(subtraction(7, 2)).toBe(5);
});