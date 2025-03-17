---
title: 'Understanding the Event Loop: The Heart of Asynchronous JavaScript'
tags: ['JavaScript', 'Event-Loop']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Step-by-Step Explanation of the JavaScript Event Loop Execution](#step-by-step-explanation-of-the-javascript-event-loop-execution)
3. [Key Takeaways](#key-takeaways)

## Introduction

JavaScript is a single-threaded language, meaning it can only execute one task at a time on the main thread. However, this doesn't mean JavaScript can't handle multiple tasks simultaneously. The key to understanding this behavior lies in the Event Loop.

The Event Loop allows JavaScript to perform asynchronous operations, such as waiting for a network request or timer, without blocking the main thread. By offloading tasks to be executed later, JavaScript creates the illusion of parallel execution while still maintaining its single-threaded nature.

In this article, we’ll take a closer look at how the Event Loop manages both synchronous and asynchronous tasks. We’ll walk through how JavaScript handles operations, manages callbacks, and uses the Event Loop to ensure that asynchronous tasks don't block the execution of synchronous code.

To help visualize this process, we provide a series of visualizations that illustrate each step of how JavaScript handles tasks. These visualizations are based on a specific code example, which is shown throughout the images to simplify the explanation. Each visualization is accompanied by a description to clarify what's happening at each step. This approach helps us see how tasks move through the Call Stack, the Event Queue, and how the Event Loop orchestrates everything.

## Step-by-Step Explanation of the JavaScript Event Loop Execution

For better visualization, all synchronous execution contexts are pushed onto the call stack, ready to be executed. The Execution Stack (Call Stack) is where synchronous code runs on the main thread.

![Alt text](/event-loop-images/1.png)

🚀 console.log('Start'); is executed immediately, producing "Start" as output.

⏸️ The Event Loop is paused while synchronous code runs in the main thread.

![Alt text](/event-loop-images/2.png)

⏳ The setTimeout(() => { zeroSecondsLater(); }, 0); function is asynchronous.

🔄 The JavaScript engine delegates it to the Browser API.

![Alt text](/event-loop-images/3.png)

📩 Since the delay is 0ms, the Browser API processes the request immediately and moves the zeroSecondsLater callback to the event queue.

![Alt text](/event-loop-images/4.png)

🔄 setTimeout(() => { console.log('3 seconds later'); }, 3000); is delegated to the Browser API, which starts a 3-second timer.

![Alt text](/event-loop-images/6.png)

⏳ Similarly, setTimeout(() => { console.log('4 seconds later'); }, 4000); is delegated to the Browser API, which starts a 4-second timer.

⏩ Meanwhile, synchronous code continues executing in the main thread without waiting for these timers.

![Alt text](/event-loop-images/7.png)

🚀 console.log('End'); is executed immediately, producing "End" as output.

⏩ The call stack executes only synchronous functions and must complete all synchronous tasks before handling anything else.

👀 At this point, the call stack is empty, signaling the event loop to check the event queue.

![Alt text](/event-loop-images/8.png)

🎧 The event loop listens for an empty call stack and then moves the first processed callback from the event queue to the call stack for execution.

🔁 The zeroSecondsLater(); callback is moved from the event queue to the call stack.

![Alt text](/event-loop-images/9.png)

📩 The Browser API completes the 3-second timer and moves console.log('3 seconds later'); to the event queue.

![Alt text](/event-loop-images/10.png)

📩 Similarly, after 4 seconds, the Browser API moves console.log('4 seconds later'); to the event queue, placing it after the "3 seconds later" callback.

🛑 Important: The event loop does not move callbacks to the call stack until all synchronous code has finished executing.

![Alt text](/event-loop-images/11.png)

🔄 The zeroSecondsLater(); callback invokes oneSecondLater();

![Alt text](/event-loop-images/12.png)

🔄 oneSecondLater(); invokes console.log.

![Alt text](/event-loop-images/13.png)

💬 "1 second later" is printed in the console.

![Alt text](/event-loop-images/14.png)

🔄 Then, zeroSecondsLater(); invokes twoSecondsLater();.

![Alt text](/event-loop-images/15.png)

🔄 twoSecondsLater(); invokes console.log.

![Alt text](/event-loop-images/16.png)

💬 "2 seconds later" is printed in the console.

![Alt text](/event-loop-images/17.png)

👀 The call stack is now empty, so the event loop moves console.log('3 seconds later'); from the event queue to the call stack.

![Alt text](/event-loop-images/18.png)

🚀 The function executes, producing "3 seconds later" in the console.

![Alt text](/event-loop-images/19.png)

👀 Again, the call stack is empty, allowing the event loop to move console.log('4 seconds later'); from the event queue to the call stack.

![Alt text](/event-loop-images/20.png)

🚀 The function executes, producing "4 seconds later" in the console.

![Alt text](/event-loop-images/21.png)

## Key Takeaways

✅ Only synchronous code is executed in the call stack (Execution Stack) on the main thread. The event loop does not move callbacks from the event queue to the call stack until all synchronous code has finished executing.

✅ Asynchronous functions (e.g., setTimeout) are delegated to the Browser API, which processes them in parallel while synchronous code continues.

✅ Callbacks enter the event queue based on when they were processed by the browser, not necessarily in the order they were requested.

✅ The event loop waits for the call stack to be empty before moving a callback from the event queue to the call stack.
