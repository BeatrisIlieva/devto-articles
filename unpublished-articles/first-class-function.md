---
title: 'First Class Function in JavaScript'
tags: ['JavaScript', 'Functions']
published: false
---

## What is First Class Function in JavaScript

`First Class Function` is a characteristic that the functions is JavaScript have. This characteristic says 'Functions are treated as any other value'. This means that:

1. A function can be assigned as a value to a variable.
2. A function can be passed as an argument to another function.
3. A function can be returned as a result from another function.

### Passing a function as an argument to another function

```javascript
const sum = (a, b) => a + b;

function execute(operation, operantA, operandB) {
    return operation(operantA, operandB);
}

const result = execute(sum, 1, 2);
console.log(result); // 3
```

## What is a Higher Order Function is JavaScript

A higher order function either accepts another function as a parameter, or return another function as a result or both. The function in the example above is a higher order function. However, let's build an example in which the function also returns another function as a result.

```javascript
function greetingBuilder(salutation, title) {
    return function (name) {
        return `${salutation}, ${title} ${name}!`;
    };
}

const greetAWoman = greetingBuilder('Hello', 'Mrs.');
const greetAMan = greetingBuilder('Hello', 'Mr.');

console.log(greetAWoman('Sarah'));
console.log(greetAMan('John'));
```

What is the benefit? The benefit is that we can reuse the function `greetingBuilder` and only change the `name` parameter as we need.

## Built-in Higher Order Functions in JavaScript

Examples for build-in Built-in Higher Order Functions in JavaScript are `map()` and `reduce()`. They are methods that we need to pass to them a function so they know what to do with the structure.

```javascript
const arr = [1, 2, 3, 4, 5];

const mappedResult = arr.map(element => element * 2);
console.log(mappedResult); // [2, 4, 6, 8, 10]

const reducedResult = arr.reduce((acc, curr) => acc + curr);
console.log(reducedResult); // 15
```

## Pure Function

A pure function in JavaScript is a function that when receiving one and the same input it always returns the same output. Pure functions do not have 'side effects' -> their result do not depend on conditions that would change the result.

An example for not a pure function:

```javascript
const arr = [1, 2, 3, 4, 5];

function notPure(input) {
    let sum = 0;

    input.forEach(element => {
        if (element % 2 != 0) {
            sum += element;
        }
    });

    return sum;
}

console.log(notPure(arr)); // 9
```

An example for a pure function:

```javascript
const arr = [1, 2, 3, 4, 5];

function pure(input) {
    return input.reduce((acc, curr) => acc + curr);
}

console.log(pure(arr)); // 15
```
