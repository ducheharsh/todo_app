
![PROFSQUOTA (1)](https://github.com/ducheharsh/todo_app/assets/79721045/b25a20e4-feab-436f-a600-26fe1678f512)

# 📋 Todo Application 

Welcome to the Todo Application documentation. This is a full-stack todo application with authentication, designed to help you manage your tasks effectively.

## 💫 Features 

- **Authentication**: Secure authentication system allowing users to sign up and log in securely.
- **Todo Management**: Ability to add, retrieve, and mark todos as done.
  
## ☄️ Backend 

The backend of this application is built with modern technologies to ensure security, efficiency, and scalability.

- **Prisma ORM**: Utilizes Prisma with Postgres as the database, ensuring reliable data storage and retrieval.
- **Express Server (TypeScript)**: Utilizes Express.js for HTTP server implementation, enhancing performance and enabling seamless communication between the frontend and backend.
- **Argon2**: Implements Argon2 for password hashing and verification, ensuring robust security measures.
- **JWT Authentication**: Utilizes JSON Web Tokens (JWTs) for authentication, providing a secure and efficient method for user authentication and authorization.

## 🖼️ Frontend 

The frontend of the application is designed for a smooth user experience and efficient task management.

- **React Framework**: Utilizes React as the frontend framework, offering a dynamic and responsive user interface.
- **React Recoil**: Employs React Recoil for state management, enhancing performance and simplifying state handling within the application.
- **Axios**: Utilizes Axios as the HTTP client for data fetching and posting, ensuring seamless communication with the backend API.

## 🔧 Usage 

### Requirements

Before setting up the application, ensure you have the following dependencies installed:

- **tsc (TypeScript Compiler)**
- **Prisma (ORM)**

### Setting Up the Backend

Follow these steps to set up the backend of the application:

1. **Clone Repository**: Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/ducheharsh/todo_app
   ```

2. **Navigate to Backend Directory**: Change your directory to the backend folder:

   ```bash
   cd todo_app/backend
   ```

3. **Install Dependencies**: Install the required Node.js modules by running:

   ```bash
   npm install
   ```

4. **Configure Database Connection**: Edit the `schema.prisma` file to enter your PostgreSQL connection string.

5. **Run Migrations**: Execute the following commands in your terminal to run migrations and generate Prisma client:

   ```bash
   npx prisma migrate dev --name anyname
   npx prisma generate
   ```

6. **Build and Start Server**: Build the TypeScript files and start the server by running:

   ```bash
   tsc -b
   node ./dist/index.js
   ```

Congratulations! Your server is now running on port 3000. You're all set to start using the Todo application 🎉🥳.


