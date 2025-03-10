---
title: 'Understanding JavaScript Objects and Internal Properties'
tags: ['JavaScript', 'Objects', 'Beginners']
published: true
---

## 📋 Table of Contents

- [Introduction](#introduction)
- [What is a Property](#what-is-a-property)
- [Properties of Properties](#properties-of-properties)
- [How to Create a Fully Configured Object](#how-to-create-a-fully-configured-object)
- [How to Define Getters and Setters for Object Properties](#how-to-define-getters-and-setters-for-object-properties)
- [Object Freeze Method](#object-freeze-method)
- [Object Seal Method](#object-seal-method)
- [Summary](#summary)

## Introduction

_In this article, we’ll explore how to configure objects in JavaScript (JS), giving us control over how properties behave, ensuring data integrity, and allowing us to customize the interaction with object values._

## What is a Property

```javascript
const person = {
    firstName: 'John' // the entire row represent a property
    // firstName -> property name (key)
    // 'John' -> property value (value)
};
```

## Properties of Properties

Every property has its own properties. We should not imagine them as a nested object but as a configuration.
They are divided into four types:

1. Value
2. Enumerable
3. Writable
4. Configurable

### Value

We can set a property name and a **property value** using `Object.defineProperty()`

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'profession', {
    value: 'Lecturer'
});

console.log(person); // {firstName: 'John', profession: 'Lecturer'}
```

The above equals to:

```javascript
person.profession = 'Lecturer';
```

However, there is a key difference between these two approaches. When a property is created using dot notation, all its internal attributes (writable, enumerable, and configurable) are set to true by default. When using Object.defineProperty(), these attributes are set to false unless explicitly specified (we can verify this by using the Object.getOwnPropertyDescriptor() method).

```javascript
const person = {
    firstName: 'John'
};

const explicitlyDefinedProperty = Object.getOwnPropertyDescriptor(
    person,
    'profession'
);

console.log(explicitlyDefinedProperty);
// {value: 'Lecturer', writable: false, enumerable: false, configurable: false}

const dotNotationProperty = Object.getOwnPropertyDescriptor(
    person,
    'firstName'
);

console.log(dotNotationProperty);
// {value: 'John', writable: true, enumerable: true, configurable: true}
```

It also affects whether properties appear in enumeration methods like Object.keys() and in JSON strings.

```javascript
console.log(Object.keys(person)); // ['firstName']

console.log(JSON.stringify(Object.keys(person))); // ["firstName"]
```

### Enumerable

In JS we use the `for...in` loop to enumerate properties. Enumerable allows us to enable or disable whether a property is included in the enumeration. After using `Object.keys()`, only enumerable properties will appear in the resulting array.

#### Check if a property is enumerable

```javascript
for (const propName in person) {
    console.log(propName); // firstName
}
```

As we can see, only the `firstName` gets printed -> by default enumerable is set to false. However, we have control over that.

```javascript
Object.defineProperty(person, 'profession', {
    value: 'Lecturer',
    enumerable: true
});

for (const propName in person) {
    console.log(propName);
    // firstName
    // profession
}
```

### Writable

The writable property allows us to define if a property can be assigned a new value. Thus, we can create a read-only property.

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    writable: false,
    enumerable: true
});

console.log(person); // {firstName: 'John', dateOfBirth: 1990}

person.dateOfBirth = 2000;

// As we can see the person's date of birth has NOT been changed
console.log(person); // {firstName: 'John', dateOfBirth: 1990}
```

If a non-writable property contains an object, then the reference to the object is not writable but the object itself can be modified.

```javascript
const person = {
    firstName: 'John'
};

const hobbies = ['playing the guitar', 'swimming'];

Object.defineProperty(person, 'hobbies', {
    value: hobbies, // the property value here is a reference to the array hobbies
    writable: false
});

console.log(person.hobbies); // ['playing the guitar', 'swimming'] -> the property can be accessed

// we cannot overwrite non-writable reference
person.hobbies = [];
console.log(person.hobbies); // ['playing the guitar', 'swimming']

// we can modify value by reference
person.hobbies.push('cycling');
console.log(person.hobbies); // ['playing the guitar', 'swimming', 'cycling']
```

### Configurable

By modifying the default attributes of a property, we are effectively configuring it. In practice, we can make a property non-configurable or revert it to configurable. Let’s examine the following example, where we have control over changing this setting later on.

```javascript
const person = {
    firstName: 'John'
};

// define property with configurable true and writable false
Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: true,
    writable: false
});

// even though we defined the property as configurable,
// we cannot assign a new value because we set writable to false
person.dateOfBirth = 2000;
console.log(person); // {firstName: 'John', dateOfBirth: 1990}

Object.defineProperty(person, 'dateOfBirth', {
    writable: true
});

// after setting the property as writable, we can now assign a new value;
// that is possible because we initially set the configurable property to true
person.dateOfBirth = 2000;
console.log(person); // {firstName: 'John', dateOfBirth: 2000}
```

We need to keep in mind that once a property is set as non-configurable, it cannot be reverted.

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: false
});

try {
    Object.defineProperty(person, 'dateOfBirth', {
        configurable: true
    });
} catch (err) {
    console.log(err.message); // Cannot redefine property: dateOfBirth
}
```

Once we define a property as non-configurable, there is only one behavior we can change -> if a property is writable, we can convert it to non-writable.

**We CANNOT convert it from non-writable to writable**

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: false,
    writable: false
});

try {
    Object.defineProperty(person, 'dateOfBirth', {
        writable: true
    });
} catch (err) {
    console.log(err.message); // Cannot redefine property: dateOfBirth
}
```

**We CAN covert it from writable to non-writable**

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: false,
    writable: true
});

Object.defineProperty(person, 'dateOfBirth', {
    writable: false
});

console.log(Object.getOwnPropertyDescriptor(person, 'dateOfBirth'));
// {
//     value: 1990,
//     writable: false,
//     enumerable: false,
//     configurable: false
// }
```

**We CANNOT delete property if it is set to non-configurable**

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: false
});

console.log(person); // {firstName: 'John', dateOfBirth: 1990}

delete person.dateOfBirth;

console.log(person); // {firstName: 'John', dateOfBirth: 1990}
```

**We CAN delete property if it is set to configurable**

```javascript
const person = {
    firstName: 'John'
};

Object.defineProperty(person, 'dateOfBirth', {
    value: 1990,
    configurable: true
});

console.log(person); // {firstName: 'John', dateOfBirth: 1990}

delete person.dateOfBirth;

console.log(person); // {firstName: 'John'};
```

## How to Create a Fully Configured Object

```javascript
const person = {};

Object.defineProperties(person, {
    firstName: {
        value: 'John',
        enumerable: true,
        writable: true,
        configurable: true
    },
    dateOfBirth: {
        value: 1990,
        enumerable: true,
        writable: true,
        configurable: true
    }
});

console.log(person);
// {
//     firstName: 'John',
//     dateOfBirth: 1990
// }

const propertyDescriptors = Object.getOwnPropertyDescriptors(person);
console.log(propertyDescriptors);
// {
//   firstName: {
//     value: 'John',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   dateOfBirth: {
//     value: 1990,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
// }
```

## How to Define Getters and Setters for Object Properties

```javascript
const person = {
    firstName: 'John',
    _balance: 1000
};

Object.defineProperty(person, 'balance', {
    get() {
        return this._balance;
    },
    set(amount) {
        if (amount < 0) {
            console.log('Balance cannot be negative.');
        } else {
            this._balance = amount;
        }
    }
});

console.log(person.balance); // 1000
person.balance = 2000;
console.log(person.balance); // 2000
```

## Object Freeze Method

Once an object is frozen, we can neither add new properties nor modify or delete existing ones. This is because both the `writable` and `configurable` attributes are automatically set to `false`.

```javascript
const person = {
    firstName: 'John',
    dateOfBirth: 1900
};

Object.freeze(person);

person.hobbies = ['playing the guitar', 'cycling'];
person.dateOfBirth = 2000;
delete person.firstName;

console.log(person); // {firstName: 'John', dateOfBirth: 1900}

console.log(Object.getOwnPropertyDescriptors(person));
// {
//     firstName: {
//       value: 'John',
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//     dateOfBirth: {
//       value: 1900,
//       writable: false,
//       enumerable: true,
//       configurable: false
//     }
// }
```

## Object Seal Method

```javascript
const person = {
    firstName: 'John',
    dateOfBirth: 1900
};

Object.seal(person);

person.hobbies = ['playing the guitar', 'cycling'];
person.dateOfBirth = 2000;
delete person.firstName;

console.log(person); // {firstName: 'John', dateOfBirth: 2000}

console.log(Object.getOwnPropertyDescriptors(person));
// {
//     firstName: {
//       value: 'John',
//       writable: true,
//       enumerable: true,
//       configurable: false
//     },
//     dateOfBirth: {
//       value: 2000,
//       writable: true,
//       enumerable: true,
//       configurable: false
//     }
// }
```

The difference between `Object.freeze()` and `Object.seal()` methods is that `Object.seal()` allows assigning new values to properties.

## Summary

### Properties of Properties

These are the internal properties that define the characteristics of an object property:

1. **Value**: The actual value assigned to the property.
2. **Enumerable**: Determines if the property will show up in `for...in` loops and methods like `Object.keys()`.
3. **Writable**: Indicates whether the value of the property can be modified.
4. **Configurable**: Specifies whether the property can be deleted or its attributes can be modified.

### Property Configuration Methods

These methods allow us to define and manipulate properties on objects:

1. **`Object.defineProperty()`**: Used to define a new property or modify an existing property with custom descriptors.
2. **`Object.defineProperties()`**: Allows you to define multiple properties on an object at once with custom descriptors.
3. **`Object.getOwnPropertyDescriptor()`**: Retrieves the descriptor for a specific property of an object.
4. **`Object.getOwnPropertyDescriptors()`**: Returns all property descriptors of an object.

### Object.freeze() vs Object.seal(): Key Differences

Object.freeze() makes an object immutable by preventing any changes to its properties, including adding, modifying, or deleting them. In contrast, Object.seal() prevents new properties from being added and existing ones from being deleted, but allows modification of property values if they are writable (by default they are).

<hr>

#### Thank you for reading!

##### I would be grateful to understand your opinion.
