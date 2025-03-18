---
title: 'How the Call Stack, Heap, and Closures Work in JavaScript'
tags: ['JavaScript', 'Closure', 'Stack', 'Heap']
published: false
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [The Call Stack and Execution Contexts](#the-call-stack-and-execution-contexts)
3. [The Stack and the Heap](#the-stack-and-the-heap)
4. [Closure vs No Closure](#closure-vs-no-closure)
5. [Understanding Closures and Garbage Collection](#understanding-closures-and-garbage-collection)

## Introduction

In JavaScript, the **call stack** is a critical concept in how functions are executed. It stores the execution contexts of functions as they are called, and the way JavaScript manages memory through the **stack** and **heap** directly influences the behavior of variables and closures. Let’s break down the core concepts step by step.

## The Call Stack and Execution Contexts

The **call stack** is a data structure that stores execution contexts in a last-in, first-out (LIFO) manner. The **call stack** is where the JavaScript engine keeps track of function calls. When one function calls another, the **execution context** of the calling function is pushed onto the call stack. A function's execution context stays on the call stack until the function finishes executing and returns, at which point its context is popped off the stack.

For example:

```javascript
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

## The Stack and the Heap

JavaScript uses two types of memory for storing values: the **stack** and the **heap**.

The **stack** is a small, fast memory area where **primitive data types** (such as numbers, strings, and booleans) are stored. Variables containing primitive values are pushed and popped from the stack quickly.

The **heap** is a much larger memory area used for storing **reference types** (such as objects, arrays, and functions). When a reference type is created, a pointer to its memory location is stored on the stack, while the actual data resides in the heap. If an object is nested within another object, the reference to the nested object points to another location in the heap.

### Primitive vs Reference Types

**Primitive data types** (e.g., numbers, strings, booleans) have their values stored directly in the stack.

Example:

```javascript
let age = 30; // Stored in the Stack
let name = 'Alice'; // Stored in the Stack
```

**Reference data types** (e.g., objects, arrays, and functions) have their **memory locations** (pointers) stored in the stack, while the actual data is stored in the heap. If an object is nested within another object, the reference to the nested object points to another location in the heap.

Example:

```javascript
const person = {
    name: 'John',
    age: 25
};
// The object itself is stored in the Heap
// The variable 'person' in the Stack holds a reference to it
```

**Closures** also reside in the Heap because they retain access to outer scope variables even after their execution context has been removed.

## Closure vs No Closure

Now, let's compare two similar functions to see the difference between closures and functions that don't form closures.

**Example 1:**

```javascript
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

```javascript
function outer() {
    let number = 1;

    function inner() {
        console.log(number++);
    }

    inner();
}

outer(); // 1
outer(); // 1
outer(); // 1
```

### Explanation of Differences:

**In Example 1**, the `inner` function is returned by the `outer` function, and **keeps a reference to `number` even after `outer` has finished executing**. This forms a **closure**. As a result, each call to `innerFunction()` increments the value of `number` from where it left off.

**In Example 2**, the `inner` function is called **immediately** within the `outer2` function. Once `inner` is called, the value of `number` is logged and `inner` finishes execution. Since no closure is formed, each time `outer2` is called, the value of `number` starts at 1 again.

### Why This Happens:

**Closures (Example 1)** allow a function to retain access to variables in its outer scope, even after the outer function has finished execution. The variable `number` is part of the closure, and its value persists across calls to `innerFunction`.

**Non-closures (Example 2)** do not retain the state of variables between function calls. The `number` variable is created and used within the scope of `outer2`, and since the function is called anew each time, the `number` variable is reset to 1.

## Understanding Closures and Garbage Collection

In the previous examples, we saw that the closure holds onto the variables of the outer function, even after the outer function’s execution context has been removed from the stack. This happens because the closure keeps a **reference** to the variable, preventing it from being garbage collected. The garbage collector will only remove variables that are no longer reachable, and in the case of closures, the variable remains accessible.

For example, in the following case:

```javascript
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

1. The `outer` function creates a local variable `number` and returns the `inner` function.
2. The `inner` function forms a **closure** over `number`—it retains access to the `number` variable even after `outer` has returned.
3. The execution context of `outer` is removed from the call stack, but the variable `number` stays in the heap as part of the closure.
4. Every time `innerFunction()` is called, it accesses the `number` variable from the closure, incrementing its value.

Although the execution context of `outer` is removed from the call stack after the `inner` function is returned, the variable `number` remains in memory due to the closure created by `inner`.

## Summary

1. The **call stack** manages function execution contexts.
2. The **Stack Memory** stores primitive values and references to objects.
3. The **Heap Memory** stores actual objects, arrays, functions, and closures.
4. **Closures** retain variables from their outer function in the Heap to ensure accessibility.
