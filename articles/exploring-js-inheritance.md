---
title: 'Exploring JavaScript Inheritance: Understanding Prototypes and Classes'
tags: ['JavaScript', 'Prototypes', 'Inheritance', 'Classes']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Object Prototypes](#object-prototypes)
3. [Function Prototype Property](#function-prototype-property)
4. [New Keyword](#new-keyword)
5. [Prototype Inheritance](#prototype-inheritence)

## Introduction

Inheritance allows us to pass properties and methods from one object to another. Let's get as an example the objects _person_ and _employee_. Each person have properties like _age_ and _heigh_ and methods like _breathing_ and _eating_. Does the _employee_ have them? Sure, an employee IS a person. Thus, instead of duplicating the person's characteristics and behaviors into the employee object, we can follow the DRY (Don't Repeat Yourself) principle. By doing that, we decrease the quantity of the code and respectively the amount of potentials bugs while keeping it easy to extend, read and understand.

Inheritance is key feature of OOP (Object-oriented programming). OOP is at the heart of languages such as Java, C# and Python. Everything revolves around classes and objects, and we must use OOP principles to write most applications. In contrast, JavaScript (JS) is a prototype-based language. A prototype inheritance is way to link objects in a _prototype chain_ so they can use each other's _members_ (properties and methods) **as if their own**. Every object is JS has its prototype.

Imagine you are at work and you have forgotten your charger. You ask a colleague to borrow theirs. In this case, you do not have your own charger, but you use one as if it was your own. Does that mean that the charger get's copied? No, there is only one charger - the one of your colleague (your prototype). After your device is charged, you return the charger.

From this, we can confidently embrace the nearly philosophical notion that, in OOP inheritance, the relationship is defined by what an object **IS**, whereas in prototypal inheritance, the relationship is defined by what an object **HAS**.

> **Note:** The prototype chain and OOP inheritance are one-way relationships -> prototypes and parent classes do not have access to the members of their descendants.

## Object Prototypes

_Key terms:_

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

### Accessing object members

#### `for...in` loop

Using the `for...in` loop we can get all object's properties and methods including the inherited ones.

```javascript
for (const key in grandDaughter) {
    console.log(key);
}
// pencil
// notebook
// solveAlgebraProblems
// writeGeometryProof
```

#### `JSON.stringify()`

Only the own members are included in the JSON string

```javascript
console.log(JSON.stringify(grandDaughter)); // {"pencil":true,"notebook":true}
```

#### 'Object.keys()`

Only the own members are included in the array

```javascript
console.log(Object.keys(grandDaughter)); // ['pencil', 'notebook']
```

### What Benefits Do Prototypes Bring Us

```javascript
const firstCat = {
    name: 'Daisy',
    meow() {
        console.log(`${this.name} says meow`);
    }
};

const secondCat = {
    name: 'Tom',
    meow() {
        console.log(`${this.name} says meow`);
    }
};
```

We have just violated the DRY principle. Additionally, we have created two identical methods in memory, which is counterproductive.

The solution is to create a base cat object to be inherited by the other cats through the prototype object. This way, we can eliminate the repetition.

```javascript
const firstCat = {
    name: 'Daisy'
};

const secondCat = {
    name: 'Tom'
};

const cat = {
    meow() {
        console.log(`${this.name} says meow`);
    }
};

Object.setPrototypeOf(firstCat, cat);
Object.setPrototypeOf(secondCat, cat);

firstCat.meow(); // Daisy says meow
secondCat.meow(); // Tom says meow
```

#### What's improved

Both cats will use the same `meow` method -> only one reference is created in memory. There is no difference in execution because the context of the `this` keyword will always be correct — whether we invoke the method through the `firstCat` object or the `secondCat` object.

### `Object.assign()`

The `Object.assign()` method creates a shallow copy of an object's **own** properties (excluding inherited properties from the prototype chain) and assigns them to a target object.

```javascript
const daisyCat = {
    name: 'Daisy'
};

const cat = {
    meow() {
        console.log(`${this.name} says meow`);
    }
};

Object.setPrototypeOf(daisyCat, cat);

const copyCat = Object.assign({}, daisyCat);
console.log(copyCat); // {name: 'Daisy'}
console.log(copyCat.meow); // undefined
```

Since `Object.assign()` only copies **own** properties, the `meow` method (which exists in the prototype) is not included in `copyCat`. This means `copyCat` does **not** inherit from `cat`.

### `Object.create()`

The `Object.create() `method creates a new object with the specified object as its **prototype**. This means the new object does not get copies of the properties but instead **inherits** them.

```javascript
const daisyCat = {
    name: 'Daisy'
};

const cat = {
    meow() {
        console.log(`${this.name} says meow`);
    }
};

Object.setPrototypeOf(daisyCat, cat);

const copyCat = Object.create(daisyCat);
console.log(copyCat); // {}
copyCat.meow(); // Daisy says meow
```

At first glance, `copyCat` appears empty. However, it **inherits** from daisyCat, which means it can still access the properties through the prototype chain.

```javascript
console.log(copyCat.__proto__); // {name: 'Daisy'}
console.log(copyCat.__proto__.__proto__); // {meow: ƒ}
```

This approach is more memory-efficient because instead of duplicating properties, `copyCat` references them through prototypes.

## Function Prototype Property

_Key terms:_

## **`.prototype`**: function prototype property

> **Note:** Functions do NOT have prototypes. Functions have prototype property. Objects have prototypes.

Each function has a `prototype property`, which refers to an object, just like an object's prototype refers to another object.

### Function constructor

In JS `function constructor` is a special type function that allows us to create objects. However, it neither a factory function nor a class.

> **Note:** A function constructor's name is written in `PascalCase`. When we see a name written in PascalCase, we know that it should be invoked using the `new` keyword.

Let's examine what happens in memory when we create two object instances using a `function constructor`.

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.study = function () {
        console.log(
            `${this.firstName} ${this.lastName} is studying.`
        );
    };
}

const firstPerson = new Person('John', 'Doe');
const secondPerson = new Person('Brian', 'Smith');
```

In this case, we have created two separate `study` functions in memory.

```javascript
console.log(firstPerson.study === secondPerson.study); // false
```

As we already know a function has a prototype property.

```javascript
console.log(Person.prototype); // {constructor: ƒ}
```

Now let's refactor the code to improve memory efficiency:

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.efficientStudy = function () {
    console.log(
        `${this.firstName} ${this.lastName} is efficiently studying.`
    );
};

const firstPerson = new Person('John', 'Doe');
const secondPerson = new Person('Brian', 'Smith');

firstPerson.efficientStudy(); // John Doe is efficiently studying.
secondPerson.efficientStudy(); // Brian Smith is efficiently studying.

console.log(
    firstPerson.efficientStudy === secondPerson.efficientStudy
); // true
```

#### What's improved

The `prototype property of a function` holds an object, and this object is assigned as the prototype to all objects created using that function as a constructor.

Now, instead of each object instance having its own efficientStudy method, we have a single method created on the prototype. This allows all instances of Person to inherit the method, saving memory.

By setting the method on Person.prototype, every object created from the Person constructor automatically inherits the method, so there’s only one copy of it in memory.

## The New Keyword

Does the `function constructor` remind you of a `class`? It’s no coincidence. In JavaScript, behind the scenes, classes are essentially syntactic sugar for function constructors — functions that create objects and assign prototypes to them.

But how is the context of the `this` keyword set correctly? Let’s analyze it again:

```javascript
const firstPerson = new Person('John', 'Doe');
```

Didn’t we say that the context of `this` depends on how a function is invoked? In this case, we are calling it using the `new` keyword.

Let's break down what the `new` keyword actually does by mimicking its behavior with a custom function, `newOperator`.

```javascript
// Define a function constructor
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Set a prototype to the constructor
Person.prototype.efficientStudy = function () {
    console.log(
        `${this.firstName} ${this.lastName} is efficiently studying.`
    );
};

// Define the newOperator function
function newOperator(constructor, ...args) {
    // Create new object
    const newObj = {};

    // Set the prototype of newObj to match the constructor’s prototype
    Object.setPrototypeOf(newObj, constructor.prototype);

    // Call the constructor function with newObj as its context
    constructor.apply(newObj, args);

    // Return the new object
    return newObj;
}
// Use newOperator to create an instance of Person
const person = newOperator(Person, 'Michel', 'Smit');
console.log(person); // Person {firstName: 'Michel', lastName: 'Smit'}
person.efficientStudy(); // Michel Smit is efficiently studying.
```

#### What Does the new Keyword Do

The `newOperator` function replicates the behavior of the `new` keyword. Here’s what it does step by step:

1. **Creates a new object** that will be the instance.
2. **Sets its prototype** by linking it to the constructor function’s `prototype` property.
3. **Calls the constructor function** with the newly created object as its `this` context.
4. **Returns the new object**, effectively creating an instance.

By using the new keyword, JavaScript automates this process, making object creation with constructors easier and more intuitive. In fact, this entire process mirrors how classes work behind the scenes.

## Prototype Inheritance

```javascript
// Base function constructor of the Cat
function Animal(species, speciesDiet) {
    // this here is the this that is passed by the method call() from the Cat constructor
    this.species = species;
    this.speciesDiet = speciesDiet;
}

Animal.prototype.eat = function () {
    console.log(`${this.species} is a ${this.speciesDiet}.`);
};

function Cat(name, breed) {
    this.name = name;
    this.breed = breed;

    // we pass as a context to the Animal function constructor as context the current this
    Animal.call(this, 'Cat', 'Carnivore');
}

// we create a new object and assign it as a prototype the prototype of the Animal constructor
const catPrototype = {};
Object.setPrototypeOf(catPrototype, Animal.prototype);
Cat.prototype = catPrototype;
// Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.meow = function () {
    console.log(`${this.name} says meow.`);
};

const daisyCat = new Cat('Daisy', 'Angora');
// own properties
console.log(daisyCat); // Cat {name: 'Daisy', breed: 'Angora', species: 'cat', speciesDiet: 'carnivore'}
// coming from Cat prototype
daisyCat.meow(); // Daisy says meow.
// coming from Animal prototype
daisyCat.eat(); // Cat is a Carnivore.
```

As we can see first can has it's own properties not only name and breed but also species and speciesDiet. How is this possible? When we invoke the the Animal constructor in the Cat constructor se bind the this keyword to the cat object. So in both constructors this refers to the newly created cat object. Thus, both constructors decorated the newly created object. The prototype of the cat is the object we create and set. And the prototype of the prototype is the Animal prototype. The method meow comes from the cat prototype and the method eat comes from the animal prototype

## Summary

### In JS we have fours ways to create a new instance of an object:

1. By using an object literal
2. By using a factory function
3. By using the class syntax
4. By using a function constructor

### What is an own member

### Difference between object create and object assign

Object.assign() copies an object's own properties into a new object but does not retain prototype chain inheritance.
Object.create() creates a new object with an existing object as its prototype, preserving inheritance without copying properties.

### Difference between `prototype property` and `proto`

1. `proto` is a property of objects and refers to their prototypes.
2. `prototype` is a property of functions that will be set as a prototype to the objects created by a given function constructor

### `prototype` is an object
