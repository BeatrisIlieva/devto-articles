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

An HTTP request consists of two main parts:

1. Headers – Contain metadata about the request, ensuring that it reaches the server with the necessary information.

    1. [Mandatory] Request Line – The first line of the request, which includes the HTTP method, the path (URL), and the HTTP version being used:

    ```
     GET /Username/RepoName/issues/new HTTP/1.1
    ```

    2. [Mandatory] Host Header – Specifies the domain name of the server. The client first checks with a Name Server (DNS), which resolves the domain into an IP address before making the request:

    ```
     Host: github.com
    ```

    3. Other Headers (Optional only if there is no body) – Additional headers provide extra information about the request. In this example, we specify that the request body is formatted as JSON, allowing the server to correctly parse the received text:

    ```
    Content-Type: application/json
    ```

2. Body (Optional) – The actual content of the request, typically included in methods like POST and PUT, but not in GET requests. In the example below, the body contains the title and description of an issue, formatted as a JSON string:

```json
<CRLF> (indicates a new line)
{
    "title": "Found a bug",
    "description" "Working on it"
}
<CRLF>
```

## Response

An HTTP response has a structure similar to a request.

1. Headers

    1. [Mandatory] Status Line – The status code indicates whether the request was successful or not. It consists of a numeric status code and a corresponding status message, informing the client about the outcome of the request.

    ```
     HTTP/1.1 200 OK
    ```

    2. Other Headers –  In this example, the server specifies that the returned content is in HTML format so that the browser knows how to parse and render it correctly:

    ```
    Content-Type: text/html
    ```

2. Body

The response body contains the actual content sent by the server. 

```html
<CRLF>
<html>
    <head>
        <title>Some Title</title>
    </head>
    <body>
        <h1>Test HTML page</h1>
    </body>
</html>
<CRLF>
```

## Status code

HTTP status codes indicate the outcome of a request. They are grouped into different ranges based on their meaning:

1. 200 (and similar) – The request was successfully received, processed, and responded to by the server.
2. 301/302 - The requested resource has been moved to a different location 
3. 400 (and similar) – The request was received and understood, but there was an issue on the client's side (e.g., missing resource, bad request format). These are not server errors but rather issues caused by the request itself.
4. 500 (and similar) – The request was sent correctly, but an internal server error occurred while processing it. This indicates a problem on the server's side.

For a full list of HTTP status codes, check out 👉 https://http.cat/ 🐱
