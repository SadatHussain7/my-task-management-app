# Task Manager Application

## Description

A simple task management application built with Node.js, TypeScript, Express, MongoDB, React, TypeScript, and Tailwind CSS. It allows users to create, update, delete, and retrieve tasks. Tasks have a title, description, and status.

## Prerequisites

- Node.js and npm installed
- MongoDB instance running (you can use a local MongoDB instance or MongoDB Atlas)

## Backend Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
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
│   │   ├── models/
│   │   │   └── task.ts
│   │   ├── routes/
│   │   │   └── taskRoutes.ts
│   │   ├── tests/
│   │   │   ├── setup.ts
│   │   │   └── task.test.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── ... (other files)
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
│   │   │   └── TaskItem.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── pages/
│   │   │   └── TaskManager.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── ... (other files)
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
├── README.md
└── ... (other files)
```

## Additional Notes
* Make sure MongoDB is running and accessible through the URI provided in the .env file.
* Ensure that the JWT secret in the .env file is a strong secret string for production environments.
* For production use, consider configuring proper error handling and logging.
