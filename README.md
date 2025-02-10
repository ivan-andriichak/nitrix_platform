```markdown
# Apartment Management Platform

This project is designed to manage an apartment rental platform. It allows adding, editing, deleting, and viewing apartments, as well as filtering them by price and number of rooms. The stack includes **Node.js**, **Express**, **MongoDB** for the backend, and **React** with **Redux Toolkit** for the frontend.

## Features

- **Add Apartment**: A form to submit apartment details (title, description, price, number of rooms, photos).
- **Edit Apartment**: Ability to modify apartment details.
- **Delete Apartment**: Ability to remove an apartment from the system.
- **View Apartment List**: View all apartments added to the database.
- **Filters**: Filter apartments by price and number of rooms.

## Technologies

- **Frontend**:
  - React (with TypeScript)
  - Redux Toolkit
  - Axios for API calls
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for data storage

## Setup Instructions

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/ivan-andriichak/Nitrix-rental-platform.git
cd Nitrix-rental-platform
```

### 2. Set up the Environment

Make sure to set up your environment variables for MongoDB and any other necessary configurations. You can create a .env file in the backend directory with your MongoDB connection details, for example:

```env
MONGO_URI="mongodb+srv://Nitrix:nitrix1q@cluster0.zvelh.mongodb.net/"
```

### 3. Run the Application with Docker

Build and start the Docker containers:

```bash
docker-compose up --build
```

### 4. Accessing the Application

After running the Docker containers, the backend API should be available on http://localhost:5000 and the frontend React application should be accessible at http://localhost:3000.

## Scripts

Here are some of the available scripts for development:

### Backend:

```bash
cd backend
npm install
npm run dev
```

- \[`npm run dev`\]: Starts the backend server in development mode (with nodemon and TypeScript).
- \[`npm run lint`\]: Runs ESLint for code linting.
### Frontend:
```bash
cd frontend
npm install
npm start
```

- \[`npm start`\]: Starts the React development server.
- \[`npm run build`\]: Builds the production version of the frontend.

## Testing

Make sure to test your application locally after setting up both the frontend and backend. Use Postman or any API client to test the API endpoints.
