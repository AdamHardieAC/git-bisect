const multiplication = require('../modules/multiplication');

test('multiplies 7 & 2 to equal 14', () => {
  expect(multiplication(7, 2)).toBe(14);
});