
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
-  **Infrastructure**:
    - Docker & Docker Compose
    - Nginx as a reverse proxy and static file server

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine:

```bash
$ git clone https://github.com/ivan-andriichak/nitrix_platform.git
cd nitrix_platform
```

### 2. Build and Run with Docker
Using Docker Compose, you can run the entire application with live code reloading:

- **Prerequisites**:
  - Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
  - Ensure Docker Desktop is running.

From the root directory (nitrix_platform), run:

```markdown
docker-compose up --build 
```

```markdown
 cd backend
 npm install
```
```markdown
 cd frontend
 npm install
```

- **What happens**:

   - Backend: Builds and runs on port 5000 with nodemon for live reloading. Accessible at http://localhost:5000.
   - Frontend: Builds and runs a Vite development server on port 3000 with Hot Module Replacement (HMR). Accessible at http://localhost:3000.
   - MongoDB: Runs as a database service (internal port 27017), connected to the backend.
   - Nginx: Serves static files from frontend/dist and proxies API requests to the backend. Accessible at http://localhost (port 80).

- **Live Reloading**:
  - Changes in backend/src/ automatically restart the server.
  - Changes in frontend/src/ instantly update the app at http://localhost:3000.

Stop the application:

```markdown
docker-compose down
```

To stop and remove volumes (e.g., MongoDB data):

```markdown
docker-compose down -v
```

### 3. Accessing the Application

| Service   | URL                         | Description                                    |
|-----------|-----------------------------|------------------------------------------------|
| Frontend  | http://localhost:3000       | React app with live updates (Vite dev server)  |
| Backend   | http://localhost:5000       | Direct access to API (e.g., Swagger UI)        |
| Nginx     | http://localhost            | Static files + API proxy                       |

  - Note: In development, use http://localhost:3000 for the full experience with HMR. 
    Nginx (http://localhost) is more suited for production or testing static builds.

### 4. Key Configuration Files
**docker-compose.yml:**

 -  Defines services: backend, mongo, and web (Nginx).
 -  Maps ports: 5000:5000 (backend), 3000:3000 (frontend), 80:80 (Nginx).
 -  Mounts volumes for live code syncing and persistent storage (uploads, MongoDB data).

**backend/package.json:**
 -  "start:dev": "nodemon --exec ts-node src/main.ts --watch src --legacy-watch" enables live reloading.
 
**frontend/package.json:**
 - "watch": "vite --mode development" runs the Vite dev server with HMR.

**vite.config.js:**
 -  Configures Vite to proxy /api requests to http://backend:5000 and use polling for file watching.

**nginx.conf:**
 - Serves static files from /usr/share/nginx/html (mapped to frontend/dist) 
 - and proxies /api/ to the backend.

### 5. Using Swagger for API Testing

The backend includes Swagger UI for interactive API documentation and testing.

#### Access Swagger:
 - Start the application with docker-compose up --build.
 - Open your browser and navigate to:
  http://localhost:5000/api/docs/

 - Test endpoints like GET /api/apartments directly in Swagger.

### Via Nginx:
 - Alternative, use:

http://localhost/api/docs/

### 6. Testing the Application

### Frontend:

- Open http://localhost:3000.
- Edit a file in frontend/src/ (e.g., App.tsx) and verify the page updates instantly.
- Make an API call (e.g., fetch apartments) and check the browser console (F12 → Network).

### Backend:

Open http://localhost:5000/api/docs/.
Edit backend/src/main.ts (e.g., add a console.log), then check logs:

```markdown
docker-compose logs backend
```
- Use curl or Postman

```markdown
curl http://localhost:5000/api/apartments
```
### Nginx:
  - Open http://localhost to test static files (requires a built dist folder).
  - Test API proxy:
```markdown
curl http://localhost/api/apartments
```

### 7. Local Development (Optional)
If you prefer to run without Docker:

### Backend:

```markdown
 cd backend
 npm install
 npm run start:dev
```
 - Runs on http://localhost:5000 with live reloading.

### Frontend:

```markdown
cd frontend
npm install
npm run build 
npm run dev-react 
```
  - Runs on http://localhost:3000 with HMR.
  - Ensure baseURL in frontend/src/services/api.ts is set to http://localhost:5000/.

- **Note: npm run dev starts the Vite development server (default port: 5173).**
 - Adjust baseURL in frontend/src/services/api.ts to http://localhost:5000/ for local development.

## Notes

- Ensure the uploads directory exists in ./backend/uploads for photo storage (create it if missing).
- Photos are served via the backend at /api/uploads/....
- Adjust .env variables in backend/.env (e.g., MongoDB URI) if needed.
- On Windows/macOS, ensure Docker Desktop has file-sharing permissions for the project directories.