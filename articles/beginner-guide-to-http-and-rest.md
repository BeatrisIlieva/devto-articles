---
title: 'A Beginner’s Guide to HTTP and REST Services'
tags: ['HTTP', 'REST']
published: true
---

## 📋 Table of Contents

-   [Introduction](#introduction)
-   [HTTP](#http)

## Introduction

_When we talk about the web, we often use the terms ‘Internet’ and ‘World Wide Web’ interchangeably, but they refer to different things. The Internet is the vast global network that connects computers and devices, while the World Wide Web (WWW) is a service that runs on top of this network, allowing us to access websites and exchange information through HTTP._

## HTTP (Hypertext Transfer Protocol)

The World Wide Web (WWW) is a service on the Internet that enables communication between a Client (such as a web browser) and a Server. This interaction happens through HTTP, a text-based protocol that defines the rules for transferring web resources like HTML, CSS, JavaScript, JSON, images, and fonts—powering the web as we know it. Without following these rules, communication between the client and server would fail.

Regardless of the backend or frontend technology we use, we must always follow HTTP rules to make requests from the client and send responses from the server.

To put it simply, HTTP is a text-based protocol that defines how communication between a client and a server occurs through the WWW service. The goal is to transfer web resources—such as JSON, HTML, JavaScript, CSS, images, fonts, and more—between the client and the server.

HTTP operates on a request-response model. The client initiates the communication by making a request, and the server responds. Each request has only one corresponding response.

## Web Client and Web Server

A Web Client is software that interacts with a web server. The most common web client is a web browser (e.g., Chrome, Firefox, Safari).

A Web Server is software that listens for incoming requests on a specific port. It processes these requests and returns an appropriate response to the client. The server runs continuously awaiting requests.

Together, the web client and web server communicate to deliver content and functionality on the web.

## HTTP Request Methods

With HTTP methods, we specify the action that should be performed on the server. A method is a property of the request that tells the server the client's intention, such as creating, retrieving, updating, or deleting data.
🔍 GET: By sending a GET request, we ask the server to retrieve a resource. An example of a GET request is opening a website’s home page. The server responds by sending all the necessary resources (HTML, CSS, JavaScript, fonts, etc.) so we can see the page content.

1. ✉️ POST: By making a POST request, we tell the server that we intend to create new data. For example, when a user registers on a website, a POST request is sent with their username, email, and password. The server processes this data and creates the account.

2. 🔄 PUT: By making a PUT request, we indicate that we want to modify existing data. For example, if a user submits an incorrect first name during registration and needs to correct it, they can send a PUT request with the updated information.

3. 🗑️ DELETE: By sending a DELETE request, we instruct the server to remove a resource. For example, if a user decides to close their account, a DELETE request can be sent to remove their data.

4. 🛠️ PATCH: A PATCH request is used for making partial updates to a resource. The key difference between PATCH and PUT is that PUT requires sending the entire updated resource, whereas PATCH allows updating only specific fields. For example, if a blog post has a title, author, and description, and we want to update only the title:

    1. **PUT**: We must send the entire updated resource, including the title, author, and description.
    2. **PATCH**: We can send only the new title, leaving the other fields unchanged.

5. 🔎 HEAD: A HEAD request is used to retrieve only the headers of a response, without the response body. This is useful for checking metadata (such as content length or last modified date) before making a full request.

6. ⚙️ OPTIONS: The OPTIONS request is used to check which HTTP methods are supported by the server for a specific URL. This is often used in preflight requests in CORS (Cross-Origin Resource Sharing) scenarios.

## Request

A request contains of:

1. Headers: contain the so called meta data about the request - all the information needed to the request can reach to the server.

    1. [OBLIGATORY] The first header (request line) contains the request method, the pathname and the HTTP protocol version that we follow -> **GET /SomeUsername?tab=repositories HTTP/1.1**

    2. [OBLIGATORY] The second header contains the domain name (the client checks in NAME SERVER that resolves a url and returns an IP Address that corresponds to the given domain name) -> **Host: github.com**

### [Optionally] Body: the content of the request. We send the user email and password so they can be saved so the user can login each time from now on.
