# Task Manager Application

## Description

A simple task management application built with Node.js, TypeScript, Express, MongoDB, React, TypeScript, and Tailwind CSS. It allows users to create, update, delete, and retrieve tasks. Tasks have a title, description, status, and due date. The application includes user authentication and authorization, task sorting, searching capabilities, and user profiles. Every user can have their own list of tasks.

## Prerequisites

- Node.js and npm installed
- MongoDB instance running (you can use a local MongoDB instance or MongoDB Atlas)

## Backend Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SadatHussain7/my-task-management-app
cd my-task-management-app
cd backend
```

### 2. Install Backend Dependencies

```cd backend
npm install
```

### 3. Create Environment Configuration

Create a .env file in the backend directory and add the following environment variables:

```PORT=4004
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

### 4. Build the Backend

```
npm run build
```

### 5. Start the Backend Server

```
npm start
```

The backend server should be running on http://localhost:4004.

### Running the Backend in Development Mode

To run the backend in development mode with hot-reloading, use:

```
npm run dev
```

### Running Backend Tests

To run the backend tests, use:

```
npm test
```

### Frontend Setup Instructions

### 1. Navigate to the Frontend Directory

```
cd ../frontend
```

### 2. Install Frontend Dependencies

```
npm install
```

### 3. Create Environment Configuration

Create a .env file in the frontend directory and add the following environment variables:

```
REACT_APP_API_URL=http://localhost:3000/api
```

### 4. Start the Frontend Development Server

```
npm start
```

The frontend application should be running on http://localhost:3000.

### Building the Frontend for Production

To build the frontend for production, use:

```
npm run build
```

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.ts
│   │   │   └── userController.ts
│   │   ├── models/
│   │   │   └── task.ts
│   │   │   └── user.ts
│   │   ├── routes/
│   │   │   └── taskRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── tests/
│   │   │   ├── setup.ts
│   │   │   └── task.test.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── ...
│   ├── jest.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── NavBar.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── pages/
│   │   │   └── TaskManager.tsx
│   │   │   └── Login.tsx
│   │   │   └── Register.tsx
│   │   │   └── Profile.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── authApi.ts
│   │   ├── utils/
│   │   │   └── PrivateRoute.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── ...
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
├── README.md
└── ...
```

### User Authentication and Authorization

- Users can register and log in.
- JWT tokens are used for authentication.
- Protected routes are implemented for task management and user profile.

### Task Due Dates and Reminders

- Users can set due dates for tasks.

### Task Sorting and Searching Capabilities

- Tasks can be sorted by title, due date, etc.
- Tasks can be searched by title.

### User Profiles

- User profiles display username and email.

## Additional Notes

- Make sure MongoDB is running and accessible through the URI provided in the .env file.
- Ensure that the JWT secret in the .env file is a strong secret string for production environments.
- For production use, consider configuring proper error handling and logging.
