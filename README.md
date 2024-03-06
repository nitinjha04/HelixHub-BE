# Production-Level Backend Template

This project is a production-level backend template built with Node.js. It follows the MVC (Model-View-Controller) pattern and includes features such as authentication with bcrypt, error handling for APIs, async functions, sync functions, OAuth 2.0 with Passport, and file uploading using Multer and Cloudinary.



## Features

- **MVC Pattern**: Organizes the codebase into models, views, and controllers for better maintainability and scalability.
- **Authentication with Bcrypt**: Securely hashes passwords for user authentication, enhancing security.
- **Error Handling for APIs**: Provides consistent error handling for API endpoints, improving user experience and debugging.
- **Async Functions**: Utilizes async functions for handling asynchronous operations, making the codebase more readable and maintainable.
- **Sync Functions**: Includes synchronous functions where applicable for efficiency and simplicity.
- **OAuth 2.0 with Passport**: Implements OAuth 2.0 authentication using Passport.js, allowing users to authenticate via various OAuth providers.
- **File Uploading with Multer and Cloudinary**: Handles both single and multiple file uploads seamlessly using Multer for file handling and Cloudinary for cloud storage.
- **Dockerfile**: Includes a Dockerfile for containerization, enabling easy deployment and scalability.
## Installation

1. Clone the repository:

```bash
git clone https://github.com/nitinjha04/Backend-Template.git

cd Backend-Template
```

2. Set the Env files 

```bash
## mongoDB Url
 DB_URI=

 PORT=

#jwt Secret
 JWT_SECRET=
 JWT_EXPIRY=


#jwt Refesh secret
 JWT_REFRESH_SECRET=
 JWT_REFRESH_EXPIRY=


#jwt Email Verification secret
 JWT_EMAIL_VERIFY_SECRET=
 JWT_EMAIL_VERIFY_EXPIRY=

# Google OAuth 2.0

 GOOGLE_CLIENT_ID=
 GOOGLE_CLIENT_SECRET=

# Cloudinary

CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_CLOUD_NAME=

```

3. Start the server

```bash 
npm install 

npm run dev
```
## Usage

- Replace placeholders in the code (e.g., database connection URI, Cloudinary credentials) with your actual values.
- Customize routes, controllers, models, and middleware as per your application requirements.
- Add additional features, middleware, or libraries as needed.
