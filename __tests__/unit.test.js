// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// TODO - Part 2

// -- is phone number --

// true
test('123-456-7890 is a valid phone number', () => {
  expect(isPhoneNumber('123-456-7890')).toBe(true);
});

test('12-345-6789 is not a valid phone number', () => {
  expect(isPhoneNumber('12-345-6789')).toBe(true);
});

// false
test('123-45-7890 is not a valid phone number', () => {
  expect(isPhoneNumber('123-45-7890')).toBe(false);
});

test('12-45-7890 is a valid phone number', () => {
  expect(isPhoneNumber('12-45-7890')).toBe(false);
});

// -- is email --

// true
test('user@example.com is a valid email', () => {
  expect(isEmail('user@example.com')).toBe(true);
});

test('name@abc.co is a valid email', () => {
  expect(isEmail('name@abc.co')).toBe(true);
});

// false
test('user@example is not a valid email', () => {
  expect(isEmail('user@example')).toBe(false);
});

test('nameabc.co is not a valid email', () => {
  expect(isEmail('nameabc.co')).toBe(false);
});

// -- is strong password --

// true
test('Password123 is a strong password', () => {
  expect(isStrongPassword('Password123')).toBe(true);
});

test('Password1234 is a strong password', () => {
  expect(isStrongPassword('Password1234')).toBe(true);
});

// false
test('password% is not a strong password', () => {
  expect(isStrongPassword('password%')).toBe(false);
});

test('P is not a strong password', () => {
  expect(isStrongPassword('P')).toBe(false);
});

// -- is date --

// true
test('01/01/2021 is a valid date', () => {
  expect(isDate('01/01/2021')).toBe(true);
}); 

test('05/06/2025 is a valid date', () => {
  expect(isDate('05/06/2025')).toBe(true);
}); 

// false
test('2021 is not a valid date', () => {
  expect(isDate('2021')).toBe(false);
}); 

test('2025/05/06 is not a valid date', () => {
  expect(isDate('2025/05/06')).toBe(false);
});  

// -- is hex color --

// true
test('#a1b2c3 is a valid hex color', () => {
  expect(isHexColor('#a1b2c3')).toBe(true);
});  

test('#123456 is a valid hex color', () => {
  expect(isHexColor('#123456')).toBe(true);
});   

// false
test('#000a is not a valid hex color', () => {
  expect(isHexColor('#000a')).toBe(false);
}); 

test('#aAbB is not a valid hex color', () => {
  expect(isHexColor('#aAbB')).toBe(false);
});