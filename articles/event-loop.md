---
title: 'Understanding the Event Loop: The Heart of Asynchronous JavaScript'
tags: ['JavaScript', 'Event-Loop']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Step-by-Step Explanation of the JavaScript Event Loop Execution](#step-by-step-explanation-of-the-javascript-event-loop-execution)
3. [Data Structures: Call Stack and Event Queue](#data-structures-call-stack-and-event-queue)
4. [Key Takeaways](#key-takeaways)

🔗 **Live Demo**: [Click Here](https://beatrisilieva.github.io/event-loop)

🎥 **Demo Video**:
[![Watch the video](https://img.youtube.com/vi/LX0Mky7DvFc/maxresdefault.jpg)](https://www.youtube.com/watch?v=LX0Mky7DvFc)

## Introduction

JavaScript is a **single-threaded** language, meaning it can only execute one task at a time on the main thread. However, this doesn't mean JavaScript can't handle multiple tasks simultaneously. The key to understanding this behavior lies in the **Event Loop**.

The Event Loop allows JavaScript to perform asynchronous operations, such as waiting for a network request or timer, without blocking the main thread. By offloading tasks to be executed later, JavaScript creates the illusion of parallel execution while still maintaining its single-threaded nature.

In this article, we’ll take a closer look at how the Event Loop manages both **synchronous** and **asynchronous** tasks. We’ll walk through how JavaScript handles operations, manages callbacks, and uses the Event Loop to ensure that asynchronous tasks don't block the execution of synchronous code.

To help visualize this process, we provide a **series of visualizations** that illustrate each step of how JavaScript handles tasks. These visualizations are based on a specific code example, which is shown throughout the images to simplify the explanation. Each visualization is accompanied by a **description** to clarify what's happening at each step. This approach helps us see how tasks move through the **Call Stack**, the **Event Queue**, and how the **Event Loop** orchestrates everything.

## Data Structures: Call Stack and Event Queue

In this article, we’ll also briefly touch on the two main data structures that help JavaScript manage synchronous and asynchronous tasks:

🍽️🍽️🍽️ **Call Stack**: The _Call Stack_ is where JavaScript keeps track of **synchronous** functions that are executing. It works like a stack of plates in the kitchen sink — as each plate gets added, it’s placed on top of the stack. When the sink gets full, the plate that is **added last is the first to be removed**. Similarly, when a function is called, it’s added on top of the stack, and once it finishes executing, it’s removed from the top.

☕🚶‍♂️🚶‍♀️ **Event Queue**: The _Event Queue_ holds **asynchronous** tasks waiting to be processed. It works like a line at a coffee shop. The first person in line is the first to get coffee, meaning the **first task added in the queue will be the first one to be processed** once the _Call Stack_ is clear.

## Step-by-Step Explanation of the JavaScript Event Loop Execution

For better visualization, all synchronous execution contexts are pushed onto the call stack, ready to be executed.

![Alt text](event-loop-images/1.png)

🚀 `console.log('Start');` is executed immediately, producing `"Start"` as output.

⏸️ The _Event Loop_ is **paused** while synchronous code runs in the main thread.

![Alt text](event-loop-images/2.png)

⏳ The `setTimeout(() => { zeroSecondsLater(); }, 0);` function is **asynchronous**.

🔄 The JavaScript engine **delegates** it to the _Browser API_.

![Alt text](event-loop-images/3.png)

📩 Since the delay is 0ms, the _Browser API_ processes the request immediately and moves the `zeroSecondsLater callback` to the _Event Queue_

![Alt text](event-loop-images/4.png)

🔄 `setTimeout(() => { console.log('3 seconds later'); }, 3000);` is **delegated** to the _Browser API_, which starts a 3-second timer.

![Alt text](event-loop-images/6.png)

⏳ Similarly, `setTimeout(() => { console.log('4 seconds later'); }, 4000);` is **delegated** to the _Browser API_, which starts a 4-second timer.

⏩ Meanwhile, **synchronous code continues executing in the main thread without waiting for these timers**.

🛑 Important: The **Call Stack executes only synchronous functions** and must complete all synchronous tasks before handling anything else. The _Event Loop_ does not move callbacks from the _Event Queue_ to the _Call Stack_ until all synchronous code has finished executing.

![Alt text](event-loop-images/7.png)

🚀 `console.log('End');` is executed immediately, producing `"End"` as output.

👀 At this point, the _Call Stack_ is empty, **signaling** the _Event Loop_ to check the event queue.

![Alt text](event-loop-images/8.png)

🎧 The _Event Loop_ waits for the _Call Stack_ to become empty and then moves the **first** callback from the _Event Queue_ to the _Call Stack_ for execution.

🔁 The `zeroSecondsLater();` callback is moved from the event queue to the call stack.

![Alt text](event-loop-images/9.png)

📩 The _Browser API_ completes the 3-second timer and moves `console.log('3 seconds later');` to the _Event Queue_.

![Alt text](event-loop-images/10.png)

📩 One more second has passed so the _Browser API_ moves `console.log('4 seconds later');` to the _Event Queue_, placing it after the `console.log('3 seconds later');` callback.

![Alt text](event-loop-images/11.png)

🔄 The `zeroSecondsLater();` callback invokes `oneSecondLater();`.

![Alt text](event-loop-images/12.png)

🔄 `oneSecondLater();` invokes `console.log`.

![Alt text](event-loop-images/13.png)

💬 `"1 second later"` is printed in the console.

![Alt text](event-loop-images/14.png)

🔄 Then, `zeroSecondsLater();` invokes `twoSecondsLater();`.

![Alt text](event-loop-images/15.png)

🔄 `twoSecondsLater();` invokes `console.log`.

![Alt text](event-loop-images/16.png)

💬 `"2 seconds later"` is printed in the console. All the synchronous code has been executed and the callback function `zeroSecondsLater()` completes its execution. At this point, the _Call Stack_ becomes empty, signaling the _Event Loop_ to begin processing callbacks from the _Event Queue_.

![Alt text](event-loop-images/17.png)

👀 The _Event Loop_ moves `console.log('3 seconds later');` from the _Event Queue_ to the _Call Stack_.

![Alt text](event-loop-images/18.png)

🚀 The function executes, producing `"3 seconds later"` in the console.

![Alt text](event-loop-images/19.png)

👀 Again, the _Call Stack_ is empty, allowing the _Event Loop_ to move `console.log('4 seconds later');` from the _Event Queue_ to the _Call Stack_.

![Alt text](event-loop-images/20.png)

🚀 The function executes, producing `"4 seconds later"` in the console.

![Alt text](event-loop-images/21.png)

## Key Takeaways

✅ **Only synchronous code is executed in the Call Stack** (Execution Stack) on the **main thread**. The _Event Loop_ does not move callbacks from the _Event Queue_ to the _Call Stack_ until all synchronous code has finished executing.

✅ Asynchronous functions (e.g., setTimeout) are **delegated** to the _Browser API_, which processes them in **parallel** while synchronous code continues.

✅ Callbacks enter the _Event Queue_ based on when they were **processed** by the _Browser API_, not necessarily in the order they were requested.

✅ The _Event Loop_ waits for the _Call Stack_ to be **empty** before moving a callback from the _Event Queue_ to the _Call Stack_.
