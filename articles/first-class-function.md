---
title: 'Understanding First-Class Functions and Higher-Order Functions in JavaScript'
tags: ['JavaScript', 'functionalprogramming', 'beginners']
published: true
---

## 📋 Table of Contents

1. [What is a First-Class Function in JavaScript](#what-is-a-first-class-function-in-javascript)
2. [What is a Higher-Order Function in JavaScript](#what-is-a-higher-order-function-in-javascript)
3. [Built-in Higher-Order Functions in JavaScript](#built-in-higher-order-functions-in-javascript)
4. [What is a Pure Function?](#what-is-a-pure-function)
5. [Key Takeaways](#key-takeaways)

## What is a First-Class Function in JavaScript

JavaScript treats functions as **first-class citizens**, meaning functions can be used just like any other value. This characteristic allows functions to:

1. Be assigned to variables.
2. Be passed as arguments to other functions.
3. Be returned as results from other functions.

### Passing a Function as an Argument

One of the most common applications of first-class functions is passing them as arguments to other functions:

```javascript
const sum = (a, b) => a + b;

function execute(operation, operandA, operandB) {
    return operation(operandA, operandB);
}

const result = execute(sum, 1, 2);
console.log(result); // 3
```

Here, `sum` is a function that gets passed into `execute` as an argument, demonstrating the first-class function concept.

## What is a Higher-Order Function in JavaScript

A **higher-order function** is a function that either:

1. Accepts another function as an argument, **or**
2. Returns a function as a result, **or**
3. Does both.

The `execute` function in the previous example is a higher-order function because it takes another function (`operation`) as an argument.

Let's now create an example where a function returns another function:

```javascript
function greetingBuilder(salutation, title) {
    return function (name) {
        return `${salutation}, ${title} ${name}!`;
    };
}

const greetAWoman = greetingBuilder('Hello', 'Mrs.');
const greetAMan = greetingBuilder('Hello', 'Mr.');

console.log(greetAWoman('Sarah')); // Hello, Mrs. Sarah!
console.log(greetAMan('John')); // Hello, Mr. John!
```

### Why Use Higher-Order Functions

Higher-order functions allow code reuse and abstraction. In the example above, `greetingBuilder` is a reusable function that generates different greeting functions based on the given parameters.

## Built-in Higher-Order Functions in JavaScript

JavaScript provides built-in higher-order functions such as `map()` and `reduce()`. These methods require a function as an argument to determine their behavior:

```javascript
const arr = [1, 2, 3, 4, 5];

const mappedResult = arr.map(element => element * 2);
console.log(mappedResult); // [2, 4, 6, 8, 10]

const reducedResult = arr.reduce((acc, curr) => acc + curr);
console.log(reducedResult); // 15
```

Here, `map()` and `reduce()` accept functions to perform operations on array elements, making them excellent examples of built-in higher-order functions.

## What is a Pure Function

A **pure function** is a function that always returns the same output for the same input and has no side effects.

### Example of an Impure Function

The function below is **impure** because its result depends on an external factor (`Math.random()`), making it unpredictable:

```javascript
const arr = [1, 2, 3, 4, 5];

function notPure(input) {
    let sum = 0;

    input.forEach(number => {
        const randomNum = Math.random();

        if (randomNum > 0.5) {
            sum += number;
        }
    });

    return sum;
}
```

### Example of a Pure Function

In contrast, this function is **pure** because it always returns the same output for the same input:

```javascript
const arr = [1, 2, 3, 4, 5];

function pure(input) {
    let sum = 0;

    input.forEach(number => {
        sum += number;
    });

    return sum;
}

console.log(pure(arr)); // 15
```

## Key Takeaways

1. **First-Class Functions**: Functions in JavaScript can be assigned to variables, passed as arguments, and returned from other functions.
2. **Higher-Order Functions**: Functions that either accept other functions as arguments or return functions.
3. **Built-in Higher-Order Functions**: Methods like `map()` and `reduce()` allow efficient data manipulation.
4. **Pure Functions**: Functions that always return the same result for the same input and do not produce side effects.

---

Thank you for reading!

I would be grateful to understand your opinion.
