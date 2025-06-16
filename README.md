#  Minimal Blogging Platform RESTful API

This is a simple blogging backend built using **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. It  allows authenticated users to create, read, update, and delete blog posts.



##  Technologies Used

- Node.js and Express.js – REST API backend
- Prisma ORM to interact with the PostgreSQL database
- PostgreSQL – relational database




##  Authentication

All blog post routes are protected. You must be logged in and include your JSON Web Token in the request header:


---

##  Authentication Endpoints

### `POST /api/auth/register`

- Registers a new user.

**Request Body:**
```json
{
  "name": "Frankline",
  "email": "frank@example.com",
  "password": "12345"
}
```
### `POST /api/auth/login`
Logs in an existing user and returns a JSON Web Token.

Request Body:

```json
{
  "email": "frank@example.com",
  "password": "12345"
}
```
Response:

```json

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

  ## Blog Post Endpoints 

- GET /api/posts
  
Returns a list of all blog posts.

- GET /api/posts/:id
  
Returns a single blog post by ID.

- POST /api/posts
  
Creates a new blog post.

- PUT /api/posts/:id
  
Updates a blog post only if the authenticated user is the owner.

- DELETE /api/posts/:id
  
Deletes a blog post by ID .



