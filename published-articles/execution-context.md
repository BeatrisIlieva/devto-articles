---
title: 'Understanding Execution Context and the `This` Keyword in JavaScript'
tags: ['JavaScript', 'This', 'ExecutionContext', 'ContextBinding']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Execution Context](#execution-context)
3. [Function Context](#function-context)
4. [`This` Keyword](#this-keyword)
5. [Key Takeaways](#key-takeaways)

---

## Introduction

Two important concepts in JavaScript that often confuse developers, especially those new to the language, are **Execution Context** and the **`this` keyword**. In this article, we will break these concepts down, explain how the function context is set, and explore how `this` behaves in different situations.

---

## Execution Context

Every function in JavaScript is executed in its own **execution context**. The **execution context** is essentially the environment in which the function is executed. It holds the scope of variables, the `this` binding, and the chain of scopes for a function.

### What is inside the Execution Context?

1. **The Variables**:  
   The execution context contains all the variables declared within the function. These variables are created when the function is called and cease to exist once the function finishes executing. This is because they are tied to the execution context, and when the function returns, the execution context is removed from the call stack, taking its variables with it.

2. **`This` Binding**:  
   The execution context also defines what `this` refers to. The value of `this` is determined based on how a function is invoked. It refers to the **Function Context**.

3. **Scope Chaining**:  
   In JavaScript, inner functions can access variables from their outer scopes. The execution context helps set up the scope chain, ensuring that when a variable is accessed in an inner function, the JavaScript engine knows where to look for it.

---

## Function Context

The **function context** refers to the object that is being referenced by the `this` keyword. In other words, `this` refers to the **Function Context**, which is the object that the function is currently operating within.

### Key Points

1. The **execution context** is where the function’s variables, scope, and `this` binding are defined.

2. The **function context** is where the `this` keyword refers to an object, and it is set depending on how the function is invoked.

---

## `This` Keyword

The **`this` keyword** refers to the object that is executing the current function. The context of `this` depends on **how** the function is called, not **where** it is defined. Let's take a closer look at different ways in which a function can be invoked and how the `this` context changes in each case.

### Ways to Invoke a Function

1. As a **global function**
2. As an **object method**
3. As a **callback function** passed to an event listener
4. Using **call()**, **apply()**, and **bind()** methods

Let's examine each case in detail.

---

### Invoke as Global Function

When a function is invoked in the global scope, the `this` keyword refers to the **global object** (in Node.js, it refers to the `module`).

Example:

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.name}!`);
}

// Invoke as global function
sayHi(); // Hi, my name is undefined!
```

In this example, `this.name` returns `undefined` because the global context does not have a `name` property.

---

### Invoke as a Method

When a function is invoked as a method of an object, the `this` keyword refers to that **object**.

Example:

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.name}!`);
}

const person = {
    name: 'John',
    sayHi
};

person.sayHi(); // Hi, my name is John!
```

Here, `this` refers to the `person` object, so `this.name` is `John`.

However, if the function is invoked as an inner function of a method, the context may change.

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.name}!`);
}

const person = {
    name: 'John',
    greet() {
        sayHi();
    }
};

person.greet(); // Hi, my name is undefined!
```

In this case, `this.name` returns `undefined` because `sayHi` is invoked in the global context, not as part of the `person` object.

---

### Invoke as a Callback

When a function is passed as a callback to an event listener, the `this` context refers to the **DOM element** that the event is attached to.

Example:

```html
<input type="button" value="Click" name="Button" />

<script>
    const inputElement = document.querySelector('input');

    inputElement.addEventListener('click', sayHi);

    function sayHi() {
        console.log(`Hi, my name is ${this.name}!`); // Hi, my name is Button!
        console.log(this);
    }
</script>
```

Here, `this` refers to the input element, and `this.name` is `Button`.

---

### Arrow Function Context

Arrow functions behave differently than regular functions. They do not have their own `this` context. Instead, they inherit the `this` context from their **parent function**.

Example:

```javascript
const sayHiOuterArrow = () => {
    console.log(`Hi, my name is ${this.name}!`);
};

const person = {
    name: 'John',
    greet() {
        function sayHi() {
            console.log(`Hi, my name is ${this.name}!`);
        }

        const sayHiArrow = () => {
            console.log(`Hi, my name is ${this.name}!`);
        };

        console.log(this.name); // John

        sayHi(); // Hi, my name is undefined!
        sayHiArrow(); // Hi, my name is John!
    }
};

person.greet();
```

In this case, `sayHiArrow()` correctly logs `John` because it inherits `this` from the `greet` method, while `sayHi()` does not.

---

### Explicit Binding

JavaScript provides three methods for explicitly binding the `this` context: **`call()`**, **`apply()`**, and **`bind()`**.

#### Call

The **`call()`** method invokes a function with a specified `this` context.

Example:

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

sayHi.call(newContext); // Hi, my name is John!
```

#### Apply

The **`apply()`** method is similar to `call()`, but instead of passing arguments individually, we pass them as an array.

Example:

```javascript
function sayHi(salutation, name) {
    console.log(`Hi ${salutation} ${name}, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

sayHi.apply(newContext, ['dear', 'Michel']); // Hi dear Michel, my name is John!
```

#### Bind

The **`bind()`** method returns a new function with the `this` context set, which can be invoked later.

Example:

```javascript
function sayHi(salutation, name) {
    console.log(`Hi ${salutation} ${name}, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

const modifiedSayHi = sayHi.bind(newContext);
modifiedSayHi('dear', 'Michel'); // Hi dear Michel, my name is John!
```

---

## Key Takeaways

1. **Execution Context**: Each function runs in its own execution context, which includes variables, `this` binding, and scope chaining.
2. **Function Context**: The object that `this` refers to depends on how the function is invoked.
   **`this` Keyword**: 1. Always refers to an object. 2. Its value is determined at the time of function invocation.
3. **Ways to Invoke a Function**:

    1. **Global Function**: `this` refers to the global object (`window` in browsers, `global` in Node.js).
    2. **Method Call**: `this` refers to the object the method belongs to.
    3. **Callback Function (Event Listener)**: `this` refers to the element that triggered the event.
    4. **Arrow Function**: Inherits `this` from its enclosing scope.
    5. **Explicit Binding**:
       `call()`: Calls a function with a specified `this` value.
       `apply()`: Works like `call()`, but accepts an array of arguments.
       `bind()`: Returns a new function with `this` bound, which can be called later.

---

Thank you for reading!

I would be grateful to understand your opinion.
