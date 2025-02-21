
#   Apartment Management Platform
This project is designed to manage an apartment rental platform. It allows adding, editing, deleting, and viewing apartments, as well as filtering them by price and number of rooms. The stack includes **Node.js**, **Express**, **MongoDB** for the backend, and **React** with **Redux Toolkit** for the frontend.

<p>
<hr/>
<img width="1500" src="./frontend/src/images/PNG/apartment_background.jpeg" alt="apartment_logo"> 

<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/v/express.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/l/express.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/dm/express.svg" alt="NPM Downloads" /></a>

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

### 2. Build and Run with Docker
   Using Docker Compose:

   From the root directory (nitrix_platform), run:

```markdown
docker-compose up --build -d
```

- **What happens**:
  - Builds and starts the backend (nitrix_plarform-backend-1) on port 5000,
    accessible via Nginx.
  - Starts MongoDB (nitrix_plarform-mongo-1) with the configured database.
  - Builds the frontend and serves it via Nginx (nitrix_plarform-web-1) on port 80.
- **Verify:**
  - Open http://localhost in your browser to access the frontend.
  - Test the API at http://localhost/api/apartments (e.g., using curl http://localhost/api/apartments).


Stop the application:

```markdown
docker-compose down
```

### 3. Key Configuration Files
 -  **docker-compose.yml:**
 -  Defines services: backend, mongo, and web (Nginx).
 -  Maps ports: Backend (5000:5000), Nginx (80:80).
 -  Mounts uploads for persistent photo storage and dist for the frontend.
 -  **backend/package.json:**
 -  Scripts: build compiles TypeScript, start:prod runs the compiled app.
   **frontend/package.json:**
 -  Scripts: build compiles the frontend with Vite.
   **nginx.conf:**
 -  Configures Nginx to serve the frontend (/) and proxy API requests (/api/) to the backend.


### 4. Using Swagger for API Testing

The backend includes Swagger UI for interactive API documentation and testing.

#### Access Swagger:
- After starting the application with Docker, open your browser and navigate to:
  http://localhost/api/docs/


### 5. Local Development (Optional)
If you prefer to run without Docker:

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


- **Note: npm run dev starts the Vite development server (default port: 5173).**
 - Adjust baseURL in frontend/src/services/api.ts to http://localhost:5000/ for local development.

## Testing

 - **Docker: Use the browser to interact with the app at http://localhost. Check API endpoints with tools like Postman or curl.**     
 - **Local: Test API endpoints (e.g., http://localhost:5000/apartments) and frontend separately.**
 - docker-compose down
 - docker-compose up --build

## Notes

Ensure the uploads directory exists in ./backend/uploads for photo storage.
Photos are served through the backend at /api/uploads/....
Adjust .env variables as needed for your environment (e.g., MongoDB connection string).