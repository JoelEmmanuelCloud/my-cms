# Content Management System (CMS)

Welcome to the Content Management System! This system is designed to manage user authentication, content creation, retrieval, updates, and password reset functionalities.

## Overview

This CMS project offers a robust system for managing various types of content, including articles, blogs, or other multimedia content. Users can create, edit, delete, and retrieve their content, managing it through an intuitive interface.

## Project Structure

The project consists of various controllers handling specific functionalities:

-   **Auth Controller**: Manages user authentication, including sign up, sign in, and sign out functionalities.
-   **Content Controller**: Handles CRUD operations for content creation, retrieval, update, and deletion.
-   **User Controller**: Manages user details and profile updates.
-   **Password Reset Controller**: Facilitates password reset functionality through email communication.

## Technologies Used

The CMS is built using the following technologies:

-   Node.js
-   Express.js
    -TypeScript
-   Joi (Input validation)
-   Prettier/ESLint (Code formatting and linting)
-   MongoDB (assumed based on the use of Mongoose models)
-   Nodemailer (for email communication)
-   Multer (for handling file uploads)
-   JWT (for token-based authentication)

## Setup and Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/JoelEmmanuelCloud/my-cms.git
    ```

## Install dependencies

All dependencies are pre-installed in the package.json file.

Install the required dependencies using npm:

    ```bash
        npm install
    ```

## Set up the environment variables

Create a `.env` file in the root directory of the project. Define the following environment variables in the `.env file`:

```bash
    PORT=3000
    JWT_SECRET=jwtSecret
    JWT_LIFETIME=1d
    EMAIL_USER and EMAIL_PASS for nodemailer
    MONGO_URL = MongoDB connection string
    JWT_SECRET is the Secret key for JWT token generation.
```

If you don't already have a MongoDB account, you must create one to obtain your `MongoDB connection string` and establish a connection. Visit the [MongoDB](https://www.mongodb.com) website to create your account and replace the `MongoDB connection string` with your actual connection string.

## Run the Application

```bash
    npm start
```

## How to Use

The CMS offers various endpoints and functionalities through the controllers:

## Auth Controller

-   **POST /sign-up** - Register a new user.
-   **POST /sign-in** - Authenticate and sign in a user.
-   **POST /sign-out** - Log out a user.

## Content Controller

-   **GET /content** - Retrieve all content for a user.
-   **POST /content** - Create new content.
-   **GET /content/:id** - Get a specific content by ID.
-   **PUT /content/:id** - Update content by ID.
-   **DELETE /content/:id** - Delete content by ID.

## User Controller

-   **PUT /user/:id** - Update user details.

## Password Reset Controller

-   **POST /password-reset** - Request a password reset via email.

## Author

Joel Emmanuel

## License

This project is licensed under the MIT License.

Please note Future Improvements can be made of this project
