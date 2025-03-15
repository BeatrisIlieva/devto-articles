---
title: 'Asynchronous Programming in JavaScript: A Beginner’s Guide'
tags: ['Asynchronous Programming', 'AJAX', 'Promises', ' Async/Await']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Multi-Threaded vs Single-Threaded in JavaScript](#multi-threaded-vs-single-threaded-in-javascript)
3. [AJAX](#ajax)
4. [Synchronous vs Asynchronous Programming](#synchronous-vs-asynchronous-programming)

## Abbreviations

1. JS: JavaScript
2. AJAX: Asynchronous JavaScript and XML

## Introduction

**Before you continue, you might want to read [A Beginner’s Guide to HTTP and REST Services](https://dev.to/beatrisilieva/a-beginners-guide-to-http-and-rest-services-3j92).**

A request to the backend is an asynchronous operation. When we send a request to the backend to fetch content from a database, we have no control over how long it will take to process. The backend first receives the request, processes it, queries the database, processes the retrieved data, and only then returns a response. The total time required depends on various factors, such as server load, network congestion, and internet speed.

In some cases, the process may take a few seconds, which is a long time in the context of software applications. If users are forced to wait without being able to interact with the application, it results in a poor user experience—such as a frozen screen until the response arrives.

This is where asynchronous programming comes into play. It allows the code to continue executing normally while the request is processed in the background. Once the request is complete, the result is displayed without interrupting the user experience.

## Multi-Threaded vs Single-Threaded in JavaScript

**Before you continue, you might want to read [Understanding the Event Loop: The Heart of Asynchronous JavaScript](https://dev.to/beatrisilieva/a-beginners-guide-to-http-and-rest-services-3j92).**

In general, multi-threaded means that multiple processes can run simultaneously, with two programs executing in parallel, independently of each other. On the other hand, synchronous code runs sequentially, within a single process.

JS, however, is a single-threaded language, meaning it executes code in one process at a time. But here’s the interesting part: despite being single-threaded, JS allows asynchronous operations. This means that even though JS processes tasks one at a time, it can still handle tasks like network requests, allowing other code to run in the meantime.

So, how can JS be asynchronous if it’s not multi-threaded? The key lies in the event loop mechanism, which lets JS offload tasks to be executed later, without blocking the main thread. This gives the illusion of parallel execution while maintaining a single thread of execution.

## AJAX

AJAX is a technique for fetching data from a remote server in the background without disrupting the user experience. It allows web applications to send and receive data asynchronously, meaning the page doesn’t need to reload to update its content.

With AJAX, JS makes requests to the server, retrieves data, and dynamically updates the webpage without requiring a full refresh. This approach enhances user experience by ensuring smooth interactions, such as loading new content, submitting forms, or fetching search results without interruptions.

### AJAX Workflow

#### Initial Page Load

When a user visits a webpage, the browser makes an HTTP request to the server to fetch the necessary resources, such as HTML, CSS, JavaScript, images, and fonts. This initial page load involves multiple requests, not just one, as each resource must be fetched separately. Once all these resources are loaded, the web application becomes interactive and starts running in the browser. At this point, the client-side JS is ready to handle dynamic content and further user interactions.

#### User Interaction

Once the page is loaded, JS is responsible for making the application interactive. When a user triggers an event—such as clicking a button or submitting a form—the application does not reload the entire page. Instead, an AJAX request is initiated to communicate with the server in the background.

#### Request to the RESTful Server

The AJAX request is sent to the server, which processes the request and sends back a response. Most of the time, the server responds with data in a lightweight format like JSON.

#### Processing and Rendering

After the data is received, the client processes the response and dynamically updates the page as needed. This could involve rendering new content, updating UI elements, or displaying messages to the user. The processing of data happens asynchronously, ensuring the application remains responsive while handling the background request.

## Synchronous vs Asynchronous Programming

### Synchronous Programming

Synchronous programming means that the code is executed line by line, one command after the other. Each operation must complete before the next one can begin. This results in a predictable flow of execution, but it can be inefficient if some operations take a long time to complete (e.g., network requests). Here’s an example of synchronous code:

```javascript
console.log(1);
console.log(2);
console.log(3);
```

In this case, the numbers will be printed one after another in the exact order.

### Asynchronous Programming

Asynchronous programming allows certain tasks, like fetching data from a server, to run in the background while other code continues to execute. This prevents blocking the entire program, keeping the application responsive. In JavaScript, asynchronous code can execute concurrently, meaning the total execution time depends on the longest task, and the program remains functional while waiting for the result.