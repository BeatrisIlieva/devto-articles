---
title: 'Exploring JavaScript Inheritance: Understanding Prototypes and Classes'
tags: ['JavaScript', 'Prototypes', 'Inheritance', 'Classes']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Object Prototypes](#object-prototypes)
3. [Function Prototype Property](#function-prototype-property)

## Introduction

Inheritance allows us to pass properties and methods from one object to another. Let's get as an example the objects _person_ and _employee_. Each person have properties like _age_ and _heigh_ and methods like _breathing_ and _eating_. Does the _employee_ have them? Sure, an employee IS a person. Thus, instead of duplicating the person's characteristics and behaviors into the employee object, we can follow the DRY (Don't Repeat Yourself) principle. By doing that, we decrease the quantity of the code and respectively the amount of potentials bugs while keeping it easy to extend, read and understand.

Inheritance is key feature of OOP (Object-oriented programming). OOP is at the heart of languages such as Java, C# and Python. Everything revolves around classes and objects, and we must use OOP principles to write most applications. In contrast, JavaScript (JS) is a prototype-based language. A prototype inheritance is way to link objects in a _prototype chain_ so they can use each other's _members_ (properties and methods) **as if their own**. Every object is JS has its prototype.

Imagine you are at work and you have forgotten your charger. You ask a colleague to borrow theirs. In this case, you do not have your own charger, but you use one as if it was your own. Does that mean that the charger get's copied? No, there is only one charger - the one of your colleague (your prototype). After your device is charged, you return the charger.

From this, we can confidently embrace the nearly philosophical notion that, in OOP inheritance, the relationship is defined by what an object **IS**, whereas in prototypal inheritance, the relationship is defined by what an object **HAS**.

> **Note:** The prototype chain and OOP inheritance are one-way relationships -> prototypes and parent classes do not have access to the members of their descendants.

## Object Prototypes

#### Key terms

1. **`__proto__`**: a property of objects that points to the prototype reference
2. **`Object.setPrototypeOf()`**: method that we use to set a prototype of an object
3. **`hasOwnProperty()`**: checks if a property exists directly on an object (not inherited)

---

> **Note:** We should use `__proto__` only for debugging.

Every object in JS has a prototype. A prototype is a reference to another object, and it doesn't consume additional memory. Objects are linked by reference, making it memory efficient.

Let's build a prototype chain using a _grandMather_, _daughter_, and _grandDaughter_ relation.

```javascript
const grandMather = {
    writeGeometryProof() {
        console.log('I can write a Geometry Proof');
    }
};

const daughter = {
    solveAlgebraProblems() {
        console.log('I can solve Algebra Problems');
    }
};

const grandDaughter = {
    pencil: true,
    notebook: true
};
```

Let's assign the `daughter` as the prototype of the `grandDaughter`.

```javascript
Object.setPrototypeOf(grandDaughter, daughter);
```

Let's check if the `grandDaughter` can solve Algebra Problems.

```javascript
grandDaughter.solveAlgebraProblems(); // I can solve Algebra Problems
```

_The grand daughter does not have the ability to solve algebra problems but uses those of the `daughter` object to get the homework done._

```javascript
console.log(grandDaughter.__proto__ === daughter); // true
```

Before we continue let's remember the difference between accessing a property name using the bracket syntax versus the method `hasOwnProperty()`:

```javascript
const obj = {
    a: undefined
};

if (obj['a']) {
    console.log(obj['a']);
} else {
    console.log('Falsy value'); // Falsy value
}

if (obj.hasOwnProperty('a')) {
    console.log(obj['a']); // undefined
}
```

The conclusion is that the method `hasOwnProperty()` checks if the property exists on the object, regardless of its value.

Now let's check if the grand daughter owns the method `solveAlgebraProblems`?

```javascript
console.log(grandDaughter.hasOwnProperty('solveAlgebraProblems')); // false
```

It belongs to the `daughter` object.

```javascript
console.log(daughter.hasOwnProperty('solveAlgebraProblems')); // true
```

If we set the `grandMother` object as the prototype of the `grandDaughter object`, we’ll notice that the chain resembles `Multilevel inheritance` in OOP.

```javascript
Object.setPrototypeOf(daughter, grandMather);
```

The `grandDaughter` can now use the methods of both its prototypes.

```javascript
grandDaughter.writeGeometryProof(); // I can write a Geometry Proof
```

Can the prototypes use the grand daughter's pencil and notebook? The answer is no. As we've already mentioned, inheritance works in a one-way direction, so the prototypes don't have access to the properties or methods defined in the descendant object.

```javascript
console.log(grandMather.hasOwnProperty('pencil')); // false
console.log(daughter.hasOwnProperty('notebook')); // false
```

## Function Prototype Property

#### Key terms

**`.prototype`**: function prototype property

---

> **Note:** Functions do NOT have prototypes. Functions have prototype property. Objects have prototypes.
