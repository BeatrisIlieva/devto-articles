---
title: 'Understanding the Event Loop: The Heart of Asynchronous JavaScript'
tags: ['JavaScript', 'Event-Loop']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)

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

⏳  Similarly, setTimeout(() => { console.log('4 seconds later'); }, 4000); is delegated to the Browser API, which starts a 4-second timer.

⏩ Meanwhile, synchronous code continues executing in the main thread without waiting for these timers.

![Alt text](/event-loop-images/7.png)
