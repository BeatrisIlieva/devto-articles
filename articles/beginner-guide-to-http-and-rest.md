---
title: 'A Beginner’s Guide to HTTP and REST Services'
tags: ['HTTP', 'REST']
published: true
---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Abbreviations](#abbreviations)
3. [HTTP](#http)
4. [Web Client and Web Server](#web-client-and-web-server)
5. [HTTP Request Methods](#http-request-methods)
6. [HTTP Request](#http-request)
7. [HTTP Response](#http-response)
8. [Status Codes](#status-code)
9. [REST Services](#rest-services)
10. [Summary](#summary)

## Abbreviations

1. **WWW (World Wide Web)** – A system of interlinked web pages and resources accessible via the internet.
2. **HTTP (Hypertext Transfer Protocol)** – The foundation of web communication, enabling clients (browsers) and servers to exchange data.
3. **CRUD (Create, Read, Update, Delete)** – The four basic operations performed on data in an application.
4. **REST (Representational State Transfer)** – An architectural style for designing web services based on standard HTTP methods.
5. **URI (Uniform Resource Identifier)** – A string used to uniquely identify a resource on the web.

## Introduction

_When we talk about the web, we often use the terms `Internet` and `WWW` interchangeably, but they refer to different things. The Internet is the vast global **network** that connects computers and devices, while the `WWW` is a **service** that runs on top of this network, allowing us to access websites and exchange information through `HTTP`._

## HTTP

`WWW` is a **service** on the Internet that enables communication between a `Client` (such as a web browser) and a `Server`. This interaction happens **through HTTP**, a **text-based protocol** that defines the _rules for transferring web resources_ like HTML, CSS, JavaScript, JSON, images, and fonts—powering the web as we know it. Without following these rules, communication between the client and server would fail.

Regardless of the backend or frontend technology we use, we must always follow `HTTP` rules to **make requests from the client** and **send responses from the server**.

_To put it simply, `HTTP` is a text-based protocol that defines how communication between a `Client` and a `Server` occurs through the `WWW` service. The **goal is to transfer web resources** such as JSON, HTML, JavaScript, CSS, images, fonts, and more—between the client and the server._

HTTP operates on a **request-response model**. The client initiates the communication by making a request, and the server responds. Each request has only one corresponding response.

## Web Client and Web Server

A `Web Client` is **software** that interacts with a `Web Server`. The most common web client is a Web Browser (e.g., Chrome, Firefox, Safari).

A `Web Server` is **software** that listens for incoming requests on a specific port. It processes these requests and returns an appropriate response to the client. The server runs continuously awaiting requests.

Together, the `Web Client` and `Web Server` communicate to deliver content and functionality on the web.

## HTTP Request Methods

With `HTTP methods`, we specify the **action** that should be performed on the server. _A method is a property of the request that tells the server the client's intention_, such as creating, retrieving, updating, or deleting data.

1. 🔍 **GET**: By sending a GET request, we ask the server to **retrieve a resource**. An example of a GET request is opening a website’s home page. The server responds by sending all the necessary resources (HTML, CSS, JavaScript, fonts, etc.) so we can see the page content.

2. ✉️ **POST**: By making a POST request, we tell the server that we intend to **create new data**. For example, when a user registers on a website, a POST request is sent with their username, email, and password. The server processes this data and creates the account.

3. 🔄 **PUT**: By making a PUT request, we indicate that we want to **modify existing data**. For example, if a user submits an incorrect first name during registration and needs to correct it, they can send a PUT request with the updated information.

4. 🛠️ **PATCH**: A PATCH request is used for **making partial updates** to a resource. The key difference between PATCH and PUT is that PUT requires sending the entire updated resource, whereas PATCH allows updating only specific fields. For example, if a blog post has a title, author, and description, and we want to update only the title:

    1. **PUT**: We must send the entire updated resource, including the title, author, and description.
    2. **PATCH**: We can send only the new title, leaving the other fields unchanged.

5. 🗑️ **DELETE**: By sending a DELETE request, we instruct the server to **remove a resource**. For example, if a user decides to close their account, a DELETE request can be sent to remove their data.

6. 🔎 **HEAD**: A HEAD request is used to retrieve **only the headers of a response**, without the response body. This is useful for checking metadata (such as content length or last modified date) before making a full request.

7. ⚙️ **OPTIONS**: The OPTIONS request may be used to **check which HTTP methods** are supported by the server for a specific URL.

## HTTP Request

An HTTP request consists of two main parts:

1. **Headers** – Contain metadata about the request, ensuring that it reaches the server with the necessary information.

    1. [Mandatory] **Request Line** – The first line of the request, which includes the HTTP method, the path (URL), and the HTTP version being used:

    ```http
        GET /Username/RepoName/issues/new HTTP/1.1
    ```

    2. [Mandatory] **Host Header** – Specifies the domain name of the server. The client first checks with a Name Server (DNS), which resolves the domain into an IP address before making the request:

    ```http
        Host: github.com
    ```

    3. Other Headers (Optional only if there is no body) – Additional headers provide extra information about the request. In this example, we specify that the request body is formatted as JSON, allowing the server to correctly parse the received text:

    ```http
    Content-Type: application/json
    ```

2. **Body** (Optional) – The actual content of the request, typically included in methods like POST and PUT, but not in GET requests. In the example below, the body contains the title and description of an issue, formatted as a JSON string:

```json
<CRLF> (indicates a new line)
{
    "title": "Found a bug",
    "description" "Working on it"
}
<CRLF>
```

## HTTP Response

An HTTP response has a structure similar to a request.

1. **Headers**

    1. [Mandatory] **Status Line** – The status code indicates whether the request was successful or not. It consists of a numeric status code and a corresponding status message, informing the client about the outcome of the request.

    ```http
     HTTP/1.1 200 OK
    ```

    2. Other Headers – In this example, the server specifies that the returned content is in HTML format so that the browser knows how to parse and render it correctly:

    ```http
    Content-Type: text/html
    ```

2. **Body**

The response body contains the actual content sent by the server.

```http
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

HTTP status codes **indicate the outcome of a request**. They are grouped into different ranges based on their meaning:

1. **200** (and similar) – The request was successfully received, processed, and responded to by the server.
2. **301/302** - The requested resource has been moved to a different location
3. **400** (and similar) – The request was received and understood, but there was an **issue on the client's side** (e.g., missing resource, bad request format). These are not server errors but rather issues caused by the request itself.
4. **500** (and similar) – The request was sent correctly, but an internal server error occurred while processing it. This indicates a **problem on the server's side**.

## REST Services

`REST` is an **architectural** style for **client-server** communication **over HTTP**. It provides a set of best practices that, when followed, create a **consistent and predictable** structure for web applications. By adhering to REST principles, backend developers build APIs that are easy to understand and work with, while frontend developers can construct requests with a standardized approach.

### Resource

A resource is a **logically distinct** part of an application. For example, in a social media platform, resources might include users, photos, posts, and comments.

Resources are typically named as **plural nouns**, and we can perform CRUD (Create, Read, Update, Delete) operations on them using HTTP methods:

1. **Create** -> POST
2. **Read** -> GET
3. **Update** -> PUT/PATCH
4. **Delete** -> DELETE

_REST allows us by only knowing the name of the resource to be able to perform all CRUD operations._

### RESTful API / RESTful Service

A RESTful API or RESTful Service refers to a server that follows REST principles.

#### Examples

1. **Create a new article** (POST request to create a resource):

```http
POST: https://some-service.org/articles
```

2. **Get all articles** (Retrieve all resources):

```http
GET: https://some-service.org/articles
```

3. **Get a specific article** (Use a unique identifier):

```http
GET: https://some-service.org/articles/73635
```

4. **Delete an article** (Remove a resource):

```http
DELETE: https://some-service.org/articles/73635
```

5. **Replace an existing article** (Update the entire resource):

```http
PUT: https://some-service.org/articles/73635
```

6. **Modify an existing article** (Partial update):

```http
PATCH: https://some-service.org/articles/73635
```

As seen in the examples above, _REST allows us to perform all CRUD operations using a consistent URI structure_. By simply knowing the resource name and following REST principles, we can easily interact with the API.

## Summary

In this article, we explored the fundamentals of `HTTP` and `REST` services, essential concepts for web communication. We started with an overview of `HTTP`, understanding how clients and servers interact using requests and responses.

We then examined different `HTTP request` methods like `GET`, `POST`, `PUT`, `DELETE`, and `PATCH`, along with how headers and `status codes` work.

Next, we introduced `REST`, a structured approach to designing APIs that promotes scalability and consistency.

By understanding these concepts, we can confidently work with web services, interact with APIs, and build scalable applications that follow web standards. 🚀

---

Thank you for reading!

I would be grateful to understand your opinion.
