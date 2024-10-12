## ERD: Developer-news

This document explores the design of developer-news, a social experience for sharing useful programming resources.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a non-relational database, and serving HTTP traffic from a public endpoint.

## Storage

We'll use a non-relational database (schema follows) like Mongodb.

## Schema:

We'll need at least the following entities to implement the service:

Users:
{
ID: STRING,
Username: STRING,
Email: STRING,
Password: STRING,
CreateAt: Timestamp,
UpdateAt: Timestamp
}

Posts:
{
ID: STRING,
Title: STRING,
URL: STRING,
UserId: STRING,
CreateAt: Timestamp,
UpdateAt: Timestamp
}

Likes:
{
UserId: STRING,
PostId: STRING
}

Comments:
{
ID: STRING
UserID: STRING,
PostID: STRING,
Comment: STRING,
CreateAt: Timestamp,
UpdateAt: Timestamp
}

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

Node.js is selected for implementing the server for speed of development.
Express.js is the web server framework.
Mongoose to be used as an ODM.

## Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords encrypted and stored in the database. OAuth is to be added initially or later for Google + Facebook and maybe others (Github?).

## API

Users:

1. [POST] /signUp -> Create a new user.
2. [POST] /signIn -> Log in the user.
3. [POST] /signOut -> Log out the user (protected by isAuth).
4. [GET] /:userID -> Retrieve a specific user.

Posts:

1. [POST] /new -> Create a new post (protected by isAuth).
2. [GET] /list/:userID -> Retrieves all posts for a specific user.
3. [GET] /:id -> Retrieve a specific post.
4. [PUT] /:id -> Updates a specific post (protected by isAuth).
5. [DELETE] /:id -> Deletes a specific post (protected by isAuth).

Likes:

1. [POST] /:id -> Create a new like for a specific post (protected by isAuth).

Comments:

1. [POST] /new/:postID -> Creates a new comment for a specific post (protected by isAuth).
2. [GET] /list/:postID -> Retrieves all comments for a specific post.
3. [PUT] /:id -> Updates a specific comment (protected by isAuth).
4. [DELETE] /:id -> Deletes a specific comment (protected by isAuth).

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js. See Figma/screenshots for details. API server will serve a static bundle of the React app. Uses ReactQuery to talk to the backend. Uses Chakra UI for building the CSS components.

## Hosting

The code will be hosted on Github.
