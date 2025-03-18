---
title: 'Closure in JavaScript'
tags: ['JavaScript', 'Closure']
published: false
---

**Understanding Execution Context, Call Stack, and Memory in JavaScript**

## Introduction

In JavaScript, the **call stack** is a critical concept in how functions are executed. It stores the execution contexts of functions as they are called, and the way JavaScript manages memory—through the **stack** and **heap** directly influences the behavior of variables and closures. Let’s break down the core concepts step by step.

## The Call Stack and Execution Contexts

The **call stack** is a data structure that stores execution contexts in a last-in, first-out (LIFO) manner. The **call stack** is where the JavaScript engine keeps track of function calls. When one function calls another, the **execution context** of the calling function is pushed onto the call stack. Each execution context contains information about the function currently being executed, such as:

-   The function's parameters
-   The function's local variables
-   The value of `this`

A function's execution context stays on the call stack until the function finishes executing and returns, at which point its context is popped off the stack.

For example:

```js
function first() {
    second();
}

function second() {
    console.log('Hello from second!');
}

first();
```

Here’s how the call stack would look:

1. **`first()`** is called, so its execution context is pushed onto the stack.
2. **`second()`** is called inside `first()`, so the execution context of `second()` is pushed onto the stack.
3. After `second()` finishes executing, its context is popped off the stack, and the flow returns to `first()`.

At the **bottom of the call stack** is the **global execution context**, which represents the base environment of the JavaScript runtime.

## The Stack and the Heap

JavaScript uses two types of memory for storing values: the **stack** and the **heap**.

The **stack** is a small, fast memory area where **primitive data types** (such as numbers, strings, and booleans) are stored. Variables containing primitive values are pushed and popped from the stack quickly.

The **heap** is a much larger memory area used for storing **reference types** (such as objects, arrays, and functions). When a reference type is created, a pointer to its memory location is stored on the stack, while the actual data resides in the heap.

### Primitive vs Reference Types

**Primitive data types** (e.g., numbers, strings, booleans) have their values stored directly in the stack. These values are immutable and their memory is reclaimed when the variable goes out of scope.

**Reference data types** (e.g., objects, arrays, and functions) have their **memory locations** (pointers) stored in the stack, while the actual data is stored in the heap. If an object is nested within another object, the reference to the nested object points to another location in the heap.

### **Stack (for Execution Contexts & Primitive Data Types)**

-   The **call stack** resides in the Stack.
-   Primitive values (such as numbers, strings, and booleans) are stored directly in the Stack.

Example:

```js
let age = 30; // Stored in the Stack
let name = 'Alice'; // Stored in the Stack
```

### **Heap (for Reference Data Types & Closures)**

-   Objects, arrays, and functions are stored in the Heap.
-   Variables in the Stack hold **references (pointers)** to the memory location in the Heap.
-   **Closures** also reside in the Heap because they retain access to outer scope variables even after their execution context has been removed.

Example:

```js
const person = {
    name: 'John',
    age: 25
};
// The object itself is stored in the Heap
// The variable 'person' in the Stack holds a reference to it
```

#### The Call Stack and Execution Contexts in Detail

The **execution context** is created whenever a function is invoked. Each execution context contains the following:

1. The **function arguments**.
2. The **variable environment**, which includes all the variables that belong to the current scope.
3. The **`this` value**, which refers to the context in which the function was called.

Each function's execution context is stored in the **call stack**. When a function is called, it’s pushed onto the stack. If the function calls another function, a new execution context is created and added to the stack.

Let’s consider the following example:

```js
function outer() {
    let number = 1;

    return function inner() {
        console.log(number++);
    };
}

const innerFunction = outer();
innerFunction(); // 1
innerFunction(); // 2
innerFunction(); // 3
```

In this example:

1. The `outer` function creates a local variable `number` and returns the `inner` function.
2. The `inner` function forms a **closure** over `number`—it retains access to the `number` variable even after `outer` has returned.
3. The execution context of `outer` is removed from the call stack, but the variable `number` stays in the heap as part of the closure.
4. Every time `innerFunction()` is called, it accesses the `number` variable from the closure, incrementing its value.

The output will be:

```
1
2
3
```

---

#### Comparing Two Function Examples: Closure vs No Closure

Now, let's compare two similar functions to see the difference between closures and functions that don't form closures.

**Example 1:**

```js
function outer() {
    let number = 1;

    return function inner() {
        console.log(number++);
    };
}

const innerFunction = outer();
innerFunction(); // 1
innerFunction(); // 2
innerFunction(); // 3
```

**Example 2:**

```js
function outer2() {
    let number = 1;

    function inner() {
        console.log(number++);
    }

    inner();
}

outer2(); // 1
outer2(); // 1
outer2(); // 1
```

### Explanation of Differences:

-   **In Example 1**, the `inner` function is returned by the `outer` function, and **keeps a reference to `number` even after `outer` has finished executing**. This forms a **closure**. As a result, each call to `innerFunction()` increments the value of `number` from where it left off.

    -   **Output:**
        ```
        1
        2
        3
        ```

-   **In Example 2**, the `inner` function is called **immediately** within the `outer2` function. Once `inner` is called, the value of `number` is logged and `inner` finishes execution. Since no closure is formed, each time `outer2` is called, the value of `number` starts at 1 again.

    -   **Output:**
        ```
        1
        1
        1
        ```

### Why This Happens:

-   **Closures (Example 1)** allow a function to retain access to variables in its outer scope, even after the outer function has finished execution. The variable `number` is part of the closure, and its value persists across calls to `innerFunction`.
-   **Non-closures (Example 2)** do not retain the state of variables between function calls. The `number` variable is created and used within the scope of `outer2`, and since the function is called anew each time, the `number` variable is reset to 1.

---

#### Understanding Closures and Garbage Collection

In the previous examples, we saw that the closure holds onto the variables of the outer function, even after the outer function’s execution context has been removed from the stack. This happens because the closure keeps a **reference** to the variable, preventing it from being garbage collected. The garbage collector will only remove variables that are no longer reachable, and in the case of closures, the variable remains accessible.

For example, in the following case:

```js
function outer() {
    let number = 1;

    return function inner() {
        console.log(number++);
    };
}

const innerFunction = outer();
innerFunction(); // 1
```

Although the execution context of `outer` is removed from the call stack after the `inner` function is returned, the variable `number` remains in memory due to the closure created by `inner`.

### Summary

-   The **call stack** manages function execution contexts.
-   The **Stack Memory** stores primitive values and references to objects.
-   The **Heap Memory** stores actual objects, arrays, functions, and closures.
-   **Closures** retain variables from their outer function in the Heap to ensure accessibility.
