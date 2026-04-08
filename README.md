# 🏫 School Management API

A professional, high-performance RESTful API built with **Node.js**, **Express**, and **MySQL**. This application allows users to register schools and retrieve a list of schools sorted by their proximity to a specific geographic location using the **Haversine formula**.

---

## 🚀 Features

- **School Registration**: Securely add new schools with name, address, and geographic coordinates.
- **Proximity Search**: Fetch schools sorted by distance from a user-provided latitude and longitude.
- **Robust Validation**: Comprehensive input validation using `express-validator`.
- **Error Handling**: Graceful error handling and semantic HTTP status codes.
- **CORS Enabled**: Ready for integration with cross-origin frontend applications.
- **Environment Driven**: Fully configurable via environment variables.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Libraries**:
  - `mysql2`: Promise-based MySQL client.
  - `express-validator`: Data validation and sanitization.
  - `dotenv`: Configuration management.
  - `cors`: Cross-Origin Resource Sharing.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd school-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (using `.env.example` as a template):
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_management
   ```

4. **Initialize the Database**:
   Create the database and the required table in your MySQL instance:
   ```sql
   CREATE DATABASE school_management;

   USE school_management;

   CREATE TABLE schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(500) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the server**:
   - For development (with `nodemon`):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

---

## 📡 API Documentation

### 1. Add School
Add a new school to the database.

- **Endpoint**: `POST /api/addSchool`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "name": "Oakridge International",
    "address": "123 Education Lane, Springfield",
    "latitude": 34.052235,
    "longitude": -118.243683
  }
  ```
- **Validation Rules**:
  - `name`: Required, 2-255 characters.
  - `address`: Required, 5-500 characters.
  - `latitude`: Required, float (-90 to 90).
  - `longitude`: Required, float (-180 to 180).

### 2. List Schools
Get all schools sorted by proximity to the specified coordinates.

- **Endpoint**: `GET /api/listSchools`
- **Query Parameters**:
  - `latitude` (Required): User's current latitude.
  - `longitude` (Required): User's current longitude.
- **Example**: `GET /api/listSchools?latitude=34.0522&longitude=-118.2437`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Found 5 school(s)",
    "user_location": { "latitude": 34.0522, "longitude": -118.2437 },
    "data": [
      {
        "id": 1,
        "name": "Oakridge International",
        "address": "123 Education Lane",
        "latitude": 34.052235,
        "longitude": -118.243683,
        "distance_km": 0.01
      },
      ...
    ]
  }
  ```

---

## 📂 Project Structure

```text
school-management-api/
├── src/
│   ├── config/       # Database configuration
│   ├── controllers/  # Business logic
│   ├── middleware/   # Validation & error handlers
│   ├── routes/       # API route definitions
│   └── utils/        # Distance calculations (Haversine)
├── app.js            # Express app initialization
├── server.js         # Entry point (Server startup)
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

---

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

---

Made with ❤️ for modern school management.
