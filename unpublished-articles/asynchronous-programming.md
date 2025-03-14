---
title: 'Asynchronous Programming in JavaScript: A Beginner’s Guide'
tags: ['Asynchronous Programming', 'AJAX', 'Promises', ' Async/Await']
published: true
---

**Before you continue, you might want to read [A Beginner’s Guide to HTTP and REST Services](https://dev.to/beatrisilieva/a-beginners-guide-to-http-and-rest-services-3j92).**

## Abbreviations

1. JS: JavaScript
2. AJAX: Asynchronous JavaScript and XML

## Introduction

A request to the backend is an asynchronous operation. When we send a request to the backend to fetch content from a database, we have no control over how long it will take to process. The backend first receives the request, processes it, queries the database, processes the retrieved data, and only then returns a response. The total time required depends on various factors, such as server load, network congestion, and internet speed.

In some cases, the process may take a few seconds, which is a long time in the context of software applications. If users are forced to wait without being able to interact with the application, it results in a poor user experience—such as a frozen screen until the response arrives.

This is where asynchronous programming comes into play. It allows the code to continue executing normally while the request is processed in the background. Once the request is complete, the result is displayed without interrupting the user experience.

## AJAX

AJAX (Asynchronous JavaScript and XML) is a technique for fetching data from a remote server in the background without disrupting the user experience. It allows web applications to send and receive data asynchronously, meaning the page doesn’t need to reload to update its content.

With AJAX, JavaScript makes requests to the server, retrieves data, and dynamically updates the webpage without requiring a full refresh. This approach enhances user experience by ensuring smooth interactions, such as loading new content, submitting forms, or fetching search results without interruptions.

### AJAX Workflow

#### Initial Page Load

When a user visits a webpage, the client (browser) makes an HTTP request to the server. This initial request is known as the initial page load. However, it’s not just a single request—multiple requests are sent to fetch essential static files, such as HTML, CSS, JavaScript, fonts, images, and other resources. Once these files are loaded, the web application becomes interactive and starts running on the client side (in the browser).

#### User Interaction

Among the loaded files are JavaScript scripts that make the application dynamic and interactive. When a user interacts with the page—such as clicking a button with an event listener attached via the DOM API—an AJAX request is triggered.

This request is sent to a RESTful server in the background, without requiring a full page reload. The server processes the request and responds with data, typically in JSON format. The client then processes this data and updates the page accordingly.

##### Steps in the AJAX Workflow

1. Initial page load – The client fetches the necessary resources from the server.
2. User interaction – A user triggers an event, such as clicking a button.
3. Request to the RESTful server – The client sends an AJAX request in the background.
4. Processing and rendering – The client processes the response data and updates the page dynamically.
5. Updated content appears – The user sees the changes instantly, without any page reload or interruption.
6. This approach ensures a smooth and responsive user experience by updating only the necessary parts of the webpage instead of reloading the entire page.

## Synchronous vs Asynchronous Programming

### Synchronous

Synchronous code is code that executes sequentially. Each row/command executes one by one (exceptions we have when cycles and conditions). Each command await for the next one to finish before it starts:

```javascript
console.log(1);
console.log(2);
console.log(3);
```

### Asynchronous

Means that some of the commands might take more time to be executed so mesanwhile the rest are executed. The result from execution of asynchronous code might appear in the future because they take time to be completed. The commands can execute in parallel and the total time of execution will depend on how much time the loger task took.
JS is asynchronous but not multi-threaded.

#### Approaches to asynchronous programming

##### Callbacks

In the following example we get a button from the DOM tree and attach an event listener on it. Which means that when the click event occurs the function `clickHandler` will be executed. This means that we register an asynchronous opereation. The `clickHandler` function is code that will be executed at a furute point in time in an unkown moment. It is called a callback approach because the function that we pass to the event listener as an argument in order it to be executed in the furure. Each function that we pass to another function as a parametr to be executed in the future is called a calback function.

```javascript
const button = document.querySelector('button');
button.addEventListener('click', clickHandler);

function clickHandler(e) {
    console.log('The button has been clicked');
}
```

Let'sa have a look at another example by using the built in function `setTimeout()`. We pass to it as a first parameter a handler -> a callback and as a second the time after which the callback to be executed. `setTimeout()` is a function that allows us to pass to it as an argument a callback function to be executed after certain amount of time. So the callback will be executed asynchronously after a certain amount of time.

```javascript
console.log('Before');
setTimeout(function () {
    console.log('Meanwhile');
}, 2000);
console.log('After');
```

If the above was a synchronous code we would expect to see first Before, then to wait to seconds to see Meanwhile and lastly After.

However the result is that Before and After appear immediatelly and after two seconds appear Meanwhile.

```javascript
Before;
After;
Meanwhile;
```

The execution happens in the following order:

1. console.log('Before');
2. the function setTimeout delegates the callback to somebody else to execute it after 2 seconds
3. console.log('After');

But what would happen if we set the callback to be executed after 0 seconds?

```javascript
console.log('Before');
setTimeout(function () {
    console.log('Meanwhile');
}, 0);
console.log('After');
```

The result is still the same:

```javascript
Before;
After;
Meanwhile;
```

The result is still the same namely because synchronous actions ALWAYS execute before asynchronous ones. 

##### Promises

##### Async/Await

In this article, we will focus on Promises and Async/Await, as they are the standard approaches in modern JavaScript development.

#### Multi-Threaded vs Single-Threaded programming

Multi-Threaded means that multiple processes happen at one and the same time. Two programs execute in parallel independantly from each other. Synchronous code happens into one process. JS is a Single-Threaded language but it allows asynchronous operations. In JS the code executes in only one process. How is it possible that Js is not Multi-Threaded but it is asynchronous language?

## Event Loop 

### Execution stack

A stack is a data structure in which the last entered item would be the first to go out.
Dedicated memory for the runtime execution of our program.
In the callstack are the execution contexts of our functions. 


