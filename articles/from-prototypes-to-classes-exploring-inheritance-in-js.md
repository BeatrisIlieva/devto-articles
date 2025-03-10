---
title: 'From Prototypes to Classes: Exploring Inheritance in JavaScript'
tags:
    [
        'JavaScript',
        'Prototypes',
        'Inheritance',
        'Classes',
        'Beginners'
    ]
published: true
---

## 📋 Table of Contents

-   [Introduction](#introduction)
-   [Prototype](#prototype)

## Introduction

Inheritance allows us to pass properties and methods from one object to another. Let's get as an example the objects _person_ and _employee_. Each person have properties like _age_ and _heigh_ and methods like _breathing_ and _eating_. Does the _employee_ have them? Sure, an employee IS a person. Thus, instead of duplicating the person's characteristics and behaviors into the employee object, we can follow the DRY (Don't Repeat Yourself) principle. By doing that, we decrease the quantity of the code and respectively the amount of potentials bugs while keeping it easy to extend, read and understand.

Inheritance is key feature of OOP (Object-oriented programming). OOP is at the heart of languages such as Java, C# and Python. Everything revolves around classes and objects, and we must use OOP principles to write most applications. In contrast, JavaScript (JS) is a prototype-based language. A prototype inheritance is way to link objects in a _prototype chain_ so they can use each other's _members_ (properties and methods) **as if their own**. Every object is JS has its prototype.

Imagine you are at work and you have forgotten your charger. You ask a colleague to borrow theirs. In this case, you do not have your own charger, but you use one as if it was your own. Does that mean that the charger get's copied? No, there is only one charger - the one of your colleague (your prototype). After your device is charged, you return the charger.

From this, we can confidently embrace the nearly philosophical notion that, in OOP inheritance, the relationship is defined by what an object **IS**, whereas in prototypal inheritance, the relationship is defined by what an object **HAS**.

> **Note:** The prototype chain is a one-way direction -> prototypes do not have access to the members of their descendants.

## Prototype

Let's build a prototype chain using the devices _scanner_, _printer_, _copier_, and _fax machine_.
