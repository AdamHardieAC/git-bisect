const division = require('../modules/division');

test('divides 7 / 2 to equal 3.5', () => {
  expect(division(7, 2)).toBe(3.5);
});