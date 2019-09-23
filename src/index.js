module.exports = function zeros(expression) {

  // Init array with numbers which we must multiply, and 2 arrays which sort depending on the n! or n!! 

  let arrayWithFactorials = expression.split('*');
  let arrayWithF1 = [];
  let arrayWithF2 = [];

  // Split up into two arrays with BigInts which must n! and  n!!

  for (let i = 0; i < arrayWithFactorials.length; i++) {
    if (arrayWithFactorials[i].slice(-2) === '!!') {
      arrayWithF2.push(BigInt(arrayWithFactorials[i].slice(0, (arrayWithFactorials[i].length - 2))));
    } else if (arrayWithFactorials[i].slice(-1) === '!') {
      arrayWithF1.push(BigInt(arrayWithFactorials[i].slice(0, (arrayWithFactorials[i].length - 1))));
    } else {
      return console.log('ERROR In arrayWithFactorials not a factorial');
    }
  }

  // Init two recursion factorial functions for BigInts n! and n!!

  function f1(num) {
    return num ? num * f1(num - BigInt(1)) : BigInt(1);
  }

  function f2(num) {
    return num > 0 ? num * f2(num - BigInt(2)) : BigInt(1);
  }

  // Init values for multiply in arrays with n! and n!! 

  let initValue = BigInt(1);
  let resultF1 = BigInt(1);
  let resultF2 = BigInt(1);

  // Check empty or not arrays with n! and n!! --> if != 0 --> multiply values in array

  if (arrayWithF1.length != 0) {
    resultF1 = arrayWithF1.reduce(
      (accumulator, currentValue) => {
        return accumulator * f1(currentValue);
      }, initValue
    );
  }

  if (arrayWithF2.length != 0) {
    resultF2 = arrayWithF2.reduce(
      (accumulator, currentValue) => {
        return accumulator * f2(currentValue);
      }, initValue
    );
  }

  // Multiply f1 array and f2 array

  let resultNumber = resultF1 * resultF2;

  // Take number of zeros in resultNumber

  let regExpForZeros = /0+$/
  let result = regExpForZeros.exec(resultNumber + '');

  // check did .exec find zeros in the end

  if (result === null) {
    result = 0;
  } else {
    result = regExpForZeros.exec(resultNumber + '')[0].length;
  }

  return result;
}