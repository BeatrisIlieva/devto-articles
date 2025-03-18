---
title: 'Execution Context and Function Context in JavaScript'
tags: ['JavaScript', 'Functions', 'Context']
published: false
---

## Execution context

Each function is executed in its on environment -> execution context.

What is inside the execution context:

1. The variables. The variables live stops when a function returns namely because they were alive in the execution context of that function. When a function returns it's execution context is removed from the callstack. Then, those variables top existing because they were related namely to that execution context.

2. This binding. In the execution context is set to what 'this' to refer to. And this refers to the Function Context.

3. Scope chaining. We know that in JS an inner scope can access variables from the outer scopes. So the scope is set by the execution context as well.

## Function context

When we talk about Function Context we refer to the object that we access with the 'this' keyword. 'This' refers to the Function Context. 'This' refers to an object that is the current function context.

Key points:

Technically in JS we have an object that represents the Function Context that the 'this' keyword is bind to. The Execution Context is the environment in which the code is executed. In the Execution Context the variables live, the scope is tracked and this binding is set.

## `This` keyword

'This' always refers to an object. That object is the context of a function. We access the object through 'this'. Function context depends on HOW a function is invoked, not by where it is declared.

### What are the ways to invoke a function:

1. As global function
2. As object method
3. As callback passed to an event listener
4. Using call(), apply() and bind()

In all four ways the context is different.

#### Invoke as global function:

In the following example `this.name` returns undefined because `this` refers to the global context and the global context (is we are in Node.js we would refer to the module) does not have a property `name`:

```javascript
function sayHi() {
    console.log(`Hi, my names is ${this.name}!`);
}

// Invoke as global function
sayHi(); // Hi, my names is undefined!
```

#### Invokes as a method:

In this example we copy the function `sayHi` by reference. The Function Context becomes `person`.

```javascript
function sayHi() {
    console.log(`Hi, my names is ${this.name}!`);
}

const person = {
    name: 'John',
    sayHi
};

person.sayHi(); // Hi, my names is John!
```

Let's observe what would happen if we invoke the function as an inner function of a method:

```javascript
function sayHi() {
    console.log(`Hi, my names is ${this.name}!`);
}

const person = {
    name: 'John',
    greet() {
        sayHi();
    }
};

person.greet(); // Hi, my names is undefined!
```

Let's remember that for the context is important how th function is invoked. `this.name` returns undefined because `sayHi` is invoked as global function and respectively the context is the global one.

#### Invoked as a callback passed to an event listener

The context becomes the DOM element that the event is attached to. This happens because we delegate to the Browser to execute the function when exactly that element is clicked. The Browser attaches to the function callback the element as a context so as to be known from where the event is triggered.

```javascript
<input type="button" value="Click" name="Button">

<script>
    const inputElement = document.querySelector('input');

    inputElement.addEventListener('click', sayHi);

    function sayHi() {
        console.log(`Hi, my names is ${this.name}!`); // Hi, my names is Button!
        console.log(this);
    }
</script>
```

#### Arrow function context

Everything said so far was valid for function declarations and function expression. For arrow function is important where it is declared. It inherits the context of it's parent function. Upon creation it refers to the `this` of it parent function. Upon creation of an arrow function the context is passed from top to bottom.

```javascript
// here the context of the arrow function is the global because it is created in the global context
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

        sayHi(); // Hi, my names is undefined!

        sayHiArrow(); // 'Hi, my name is John!'

        sayHiOuterArrow(); // 'Hi, my name is undefined!'
    }
};

person.greet();
```

#### Explicit Binding

Using call(), apply() and bind() we can explicitly define what the context of a function to be. They force a function to use a particular context when it is invoked.

Both call() and apply() change the context ans execute the function. Bind only changes the context without invoking the function.

Since everything in JS is an object, a function is also an object. As an object a function has its own properties. Some of them are namely call(), apply() and bind().

##### Call

`call()` require as a first argument the new context.

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

sayHi.call(newContext); // Hi, my name is John!
```

Optionally can can pass as many additional arguments as we need.

```javascript
function sayHi(salutation, name) {
    console.log(`Hi ${salutation} ${name}, my name is ${this.name}!`);
}

const newContext = {
    name: 'John'
};

sayHi.call(newContext, 'dear', 'Michel'); // Hi dear Michel, my name is John!
```

##### Apply

`apply()` require as a first argument the new context. As a second one we can pass an array for arguments. To remember the difference in the second parameter between call and apply, we can make an association using the first letter -> both apply and array starts with 'a'.

##### Bind

Bind returns us a modified function (with a context being set) that can be invoked later on. Using it we do not change the context of the existing function but create  a new one and postpone it execution for later on.
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

The benefit of `bind()` is that we can pass it as a callback function.

```javascript
<input type="button" value="Click" name="Button">

<script>
    const inputElement = document.querySelector('input');

    inputElement.addEventListener('click', sayHi.bind({name: 'John'}));

    function sayHi() {
        console.log(`Hi, my names is ${this.name}!`); // Hi, my names is John!
    }
</script>
```
