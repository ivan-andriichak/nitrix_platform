
# Apartment Management Platform
<p>
<hr/>
<img width="1500" src="./frontend/src/images/PNG/apartment_background.jpeg" alt="apartment_logo"> 
Project is designed to manage an apartment rental platform. It allows adding, editing, deleting, and viewing apartments, as well as filtering them by price and number of rooms. The stack includes **Node.js**, **Express**, **MongoDB** for the backend, and **React** with **Redux Toolkit** for the frontend.

<a href="https://www.npmjs.com/~nestjs" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjs" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjs" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

<p>Description</p>
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
$ git clone https://github.com/ivan-andriichak/nitrix_platform.git
cd nitrix_platform
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

# Apartment Management Platform

This project is designed to manage an apartment rental platform. It allows adding, editing, deleting, and viewing apartments, as well as filtering them by price and number of rooms. The stack includes **Node.js**, **Express**, **MongoDB** for the backend, and **React** with **Redux Toolkit** for the frontend.


### 4. Accessing the Application

After running the Docker containers, the backend API should be available on http://localhost:5000 and the frontend React application should be accessible at http://localhost:3000.

## Scripts

Here are some of the available scripts for development:

### Installation:

### Backend:

```markdown
 cd backend
 npm install
 npm run start:dev
```

### Frontend:

```markdown
cd frontend
npm install
npm run build 
npm run dev-react 
```

## Testing

Make sure to test your application locally after setting up both the frontend and backend. Use Postman or any API client to test the API endpoints.

