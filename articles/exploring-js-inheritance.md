---
title: 'Exploring JavaScript Inheritance: Understanding Prototypes and Classes'
tags: ['JavaScript', 'Prototypes', 'Inheritance', 'Classes']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Object Prototypes](#object-prototypes)
3. [Function Prototype Property](#function-prototype-property)
4. [The New Keyword](#the-new-keyword)
5. [Prototype Inheritance](#prototype-inheritance)
6. [Class Inheritance vs Prototypes](#class-inheritance-vs-prototypes)
7. [Summary](#summary)

## Introduction

Inheritance allows objects to share properties and methods, reducing code duplication. Consider the objects `Person` and `Employee`. A person has properties like `age` and `height` and methods like `breathing` and `eating`. Does an employee have them? Absolutely—because an employee **is** a person. Instead of duplicating these characteristics, we follow the **DRY (Don't Repeat Yourself) principle**, which minimizes code repetition, reduces potential bugs, and improves readability.

Inheritance is a **key feature of Object-Oriented Programming (OOP)** — the foundation of languages like Java, C#, and Python. In these languages, everything revolves around **classes and objects**. JavaScript (JS), however, is **prototype-based**. Instead of class-based inheritance, it uses **prototype chains** to allow objects to access the properties and methods of their prototypes **as if they were their own**. Every object in JavaScript has a prototype.

To understand this, imagine you're at work and forgot your charger. You borrow a colleague’s charger and use it **as if it were yours**. But does that mean you made a copy of it? No, there’s only **one charger** — your colleague’s (your prototype). After charging your device, you return it.

Similarly, in JavaScript, objects don’t copy members from their prototypes. They simply **borrow** them when needed.

Thus, we can make a philosophical distinction:

1. **OOP inheritance** defines relationships based on what an object **is**.
2. **Prototype inheritance** defines relationships based on what an object **has**.

> **Note:** In both OOP and prototype inheritance, the relationship is one-way—parent objects (prototypes or classes) do not inherit from their children.

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

> **Note:** The methods `setPrototypeOf()` and `writeGeometryProof()` are not present in the `grandDaughter` object. The `grandDaughter` object contains only its own members.

```javascript
console.log(grandDaughter); // {pencil: true, notebook: true}
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

---

What's improved

---

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

The `Object.create()` method creates a new object with the specified object as its **prototype**. This means the new object does not get copies of the properties but instead **inherits** them.

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

1. **`.prototype`**: function prototype property

> **Note:** Functions do NOT have prototypes. Functions have prototype property. Objects have prototypes.

Each function has a `prototype property`, which refers to an object, just like an object's prototype refers to another object.

### Function constructor

In JS `function constructor` is a special type function that allows us to create objects. However, it is neither a factory function nor a class.

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

---

What's improved

---

The `prototype property of a function` holds an object, and this object is assigned as the prototype to all objects created using that function as a constructor.

Now, instead of each object instance having its own efficientStudy method, we have a single method created on the prototype. This allows all instances of Person to inherit the method, saving memory.

By setting the method on Person.prototype, every object created from the Person constructor automatically inherits the method, so there’s only one copy of it in memory.

## The New Keyword

Does the `function constructor` remind you of a `class`? It’s no coincidence. In JavaScript, behind the scenes, classes are essentially syntactic sugar for function constructors — functions that create objects and assign prototypes to them.

But how is the context of the `this` keyword set correctly? Let’s analyze it again:

```javascript
const firstPerson = new Person('John', 'Doe');
```

We know that the context of `this` depends on how a function is invoked. In this case, we are calling it using the `new` keyword.

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

### What Does the `new` Keyword Do

The `newOperator` function replicates the behavior of the `new` keyword. Here’s what it does step by step:

1. **Creates a new object** that will be the instance.
2. **Sets its prototype** by linking it to the constructor function’s `prototype` property.
3. **Calls the constructor function** with the newly created object as its `this` context.
4. **Returns the new object**, effectively creating an instance.

By using the new keyword, JavaScript automates this process, making object creation with constructors easier and more intuitive. In fact, this entire process mirrors how classes work behind the scenes.

## Prototype Inheritance

In JavaScript, we can establish prototype-based inheritance by setting up a chain of prototypes between constructor functions. Let's explore how inheritance works by creating an Animal constructor and then inheriting from it in a Cat constructor.

```javascript
// Base function constructor for Animal
function Animal(species, speciesDiet) {
    // `this` refers to the object that will be created
    this.species = species;
    this.speciesDiet = speciesDiet;
}

// Add a method to Animal's prototype
Animal.prototype.eat = function () {
    console.log(`${this.species} is a ${this.speciesDiet}.`);
};

// Constructor function for Cat
function Cat(name, breed) {
    this.name = name;
    this.breed = breed;

    // Call the Animal constructor, binding `this` to the new Cat instance
    Animal.call(this, 'Cat', 'Carnivore');
}

// Create an empty object and set its prototype to Animal's prototype
const catPrototype = {};
Object.setPrototypeOf(catPrototype, Animal.prototype);

// Assign the new prototype to Cat
Cat.prototype = catPrototype;

// Alternatively, we could use:
// Cat.prototype = Object.create(Animal.prototype);

// Add a method specific to Cat
Cat.prototype.meow = function () {
    console.log(`${this.name} says meow.`);
};

// Create an instance of Cat
const daisyCat = new Cat('Daisy', 'Angora');

// Daisy has its own properties
console.log(daisyCat); // Cat {name: 'Daisy', breed: 'Angora', species: 'cat', speciesDiet: 'carnivore'}

// Method from Cat's prototype
daisyCat.meow(); // Daisy says meow.

// Method from Animal's prototype
daisyCat.eat(); // Cat is a Carnivore.
```

### How It Works

1. The `Cat` constructor defines its own properties (`name` and `breed`).
2. It then calls `Animal.call(this, 'Cat', 'Carnivore')`, which executes the `Animal` constructor, assigning the properties `species` and `speciesDiet` to `this` (the new `Cat` instance).
3. We manually set up the prototype chain:
    1. `Cat.prototype` is assigned a new object that inherits from `Animal.prototype`.
    2. This ensures that instances of `Cat` can access methods from `Animal.prototype`.
4. The `meow` method is added to `Cat.prototype`, making it specific to `Cat` instances.
5. Now, `daisyCat` has access to both `meow()` (from `Cat.prototype`) and `eat()` (from `Animal.prototype`), demonstrating prototype-based inheritance.

This approach follows the principles of prototype inheritance in JavaScript, allowing us to reuse functionality while keeping memory usage efficient.

## Class Inheritance vs Prototypes

While both methods result in prototype-based inheritance, class inheritance is more structured and easier to use. In contrast, traditional prototype inheritance requires manually linking prototypes and can feel more complex.

```javascript
// Define a base class called Animal
class Animal {
    constructor(species, speciesDiet) {
        this.species = species;
        this.speciesDiet = speciesDiet;
    }
    // Method that all animals will have
    eat() {
        console.log(`${this.species} is a ${this.speciesDiet}.`);
    }
}

// Define a subclass called Cat that extends Animal
class Cat extends Animal {
    constructor(name, breed) {
        // Call the parent class constructor with super()
        super('Cat', 'Carnivore');

        this.name = name;
        this.breed = breed;
    }

    // Method specific to the Cat class
    meow() {
        console.log(`${this.name} says meow.`);
    }
}

// Create a new instance of the Cat class
const daisyCat = new Cat('Daisy', 'Angora');

// Logging the properties of daisyCat
console.log(daisyCat); // Cat {species: 'Cat', speciesDiet: 'Carnivore', name: 'Daisy', breed: 'Angora'}

// Calling the meow method from the Cat class
daisyCat.meow(); // Daisy says meow.

// Calling the eat method from the Animal class (inherited)
daisyCat.eat(); // Cat is a Carnivore.

const tomCat = new Cat('Tom', 'Persian');

console.log(tomCat.meow === daisyCat.meow); // true
```

Using classes makes object-oriented principles easier to implement and understand in JavaScript. It improves readability, and maintainability, and allows for clear inheritance structures. Although class inheritance in JavaScript is built on prototypes under the hood, it provides a much more familiar syntax for developers coming from other OOP languages.

## Summary

### In JS we have fours ways to create a new instance of an object

1. By using an object literal
2. By using a factory function
3. By using the class syntax
4. By using a function constructor

### Prototypes

1. Every JS object has a prototype, a reference to another object, allowing memory-efficient property and method sharing.
2. A prototype is a reference to an object.

### Function Constructor & Prototype Property

1. Function Constructors create objects, but without optimization, each instance has separate methods.
2. Adding methods to prototype improves memory efficiency by sharing a single method across instances.

### Difference between object create and object assign

1. `Object.assign()` copies an object's own properties into a new object but does not retain prototype chain inheritance.
2. `Object.create()`creates a new object with an existing object as its prototype, preserving inheritance without copying properties.

### Difference between `prototype property` and `proto`

1. `proto` is a property of objects and refers to their prototypes.
2. `prototype` is a property of functions that will be set as a prototype to the objects created by a given function constructor.

#### Conclusion

Prototypes form the foundation of JavaScript’s inheritance model, enabling efficient memory usage and code reuse. While prototype-based inheritance is powerful, class syntax provides a cleaner and more intuitive approach while achieving the same functionality.

---

Thank you for reading!

I would be grateful to understand your opinion.
