## ERD: Developer-news

This document explores the design of **Developer-news**, a social experience for sharing useful programming resources.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider alongside a non-relational database, serving HTTP traffic from a public endpoint.

## Storage

We'll use a non-relational database (schema follows) like MongoDB.

## Schema

We'll need at least the following entities to implement the service:

### Users

- **ID**: `STRING`
- **Username**: `STRING`
- **Email**: `STRING`
- **Password**: `STRING`
- **CreatedAt**: `TIMESTAMP`
- **UpdatedAt**: `TIMESTAMP`

### Posts

- **ID**: `STRING`
- **Title**: `STRING`
- **URL**: `STRING`
- **UserID**: `STRING`
- **CreatedAt**: `TIMESTAMP`
- **UpdatedAt**: `TIMESTAMP`

### Likes

- **UserID**: `STRING`
- **PostID**: `STRING`

### Comments

- **ID**: `STRING`
- **UserID**: `STRING`
- **PostID**: `STRING`
- **Comment**: `STRING`
- **CreatedAt**: `TIMESTAMP`
- **UpdatedAt**: `TIMESTAMP`

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

**Node.js** is selected for implementing the server for speed of development.  
**Express.js** is the web server framework.  
**Mongoose** will be used as an ODM.

## Auth

For v1, a simple JWT-based authentication mechanism will be used, with passwords encrypted and stored in the database. OAuth may be added initially or later for Google, Facebook, and possibly others (GitHub?).

## API

### Root Endpoints

1. **[GET]** `/`  
   – Retrieves the root API information.

2. **[GET]** `/me`  
   – Fetches details of the signed-in user.

### Users

1. **[POST]** `/signUp`  
   – Creates a new user.

2. **[POST]** `/signIn`  
   – Logs in the user.

3. **[POST]** `/signOut`  
   – Logs out the user (protected by `isAuth`).

4. **[GET]** `/:userID`  
   – Retrieves a specific user.

### Posts

1. **[POST]** `/new`  
   – Creates a new post (protected by `isAuth`).

2. **[GET]** `/list/:userID`  
   – Retrieves all posts for a specific user.

3. **[GET]** `/:id`  
   – Retrieves a specific post.

4. **[PUT]** `/:id`  
   – Updates a specific post (protected by `isAuth`).

5. **[DELETE]** `/:id`  
   – Deletes a specific post (protected by `isAuth`).

### Likes

1. **[POST]** `/:id`  
   – Creates a new like for a specific post (protected by `isAuth`).

### Comments

1. **[POST]** `/new/:postID`  
   – Creates a new comment for a specific post (protected by `isAuth`).

2. **[GET]** `/list/:postID`  
   – Retrieves all comments for a specific post.

3. **[PUT]** `/:id`  
   – Updates a specific comment (protected by `isAuth`).

4. **[DELETE]** `/:id`  
   – Deletes a specific comment (protected by `isAuth`).

## Clients

For now, we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in **React.js**. See Figma/screenshots for details. The API server will serve a static bundle of the React app. **ReactQuery** will be used to communicate with the backend, and **Tailwind UI** will be used for the CSS.

## Hosting

The code will be hosted on **GitHub**.
