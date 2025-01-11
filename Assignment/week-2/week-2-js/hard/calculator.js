/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Invalid expression: Division by zero");
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(inputExpression) {
    // Remove all spaces from the input expression
    const cleanedExpression = inputExpression.replace(/\s+/g, '');
    // Validate the cleaned expression
    const isValidExpression = /^[0-9+\-*/().]+$/.test(cleanedExpression);

    if (!isValidExpression) {
      throw new Error("Invalid expression.");
    }

    try {
      this.result = eval(cleanedExpression);
    } catch (error) {
      throw new Error("Invalid expression.");
    }

    if (this.result === Infinity) {
      throw new Error("Cannot divide a number by 0.");
    }

    return this.result;
  }
}

// Example usage
const calculator = new Calculator();

// Test add method
calculator.add(10);
console.log(calculator.getResult()); // Output: 10

// Test subtract method
calculator.subtract(5);
console.log(calculator.getResult()); // Output: 5

// Test multiply method
calculator.multiply(2);
console.log(calculator.getResult()); // Output: 10

// Test divide method
calculator.divide(2);
console.log(calculator.getResult()); // Output: 5

// Test clear method
calculator.clear();
console.log(calculator.getResult()); // Output: 0

// Test calculate method with a valid expression
console.log(calculator.calculate('10 + 2 * (6 - (4 + 1) / 2) + 7')); // Output: 18

// Test calculate method with an invalid expression
try {
  console.log(calculator.calculate('10 + abc'));
} catch (error) {
  console.error(error.message); // Output: Invalid expression.
}

// Test calculate method with division by zero
try {
  console.log(calculator.calculate('10 / 0'));
} catch (error) {
  console.error(error.message); // Output: Cannot divide a number by 0.
}

module.exports = Calculator;