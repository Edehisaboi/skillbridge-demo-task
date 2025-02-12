# MERN Application - SkillBridge

## Overview

This is a **MERN (MongoDB, Express.js, React.js, Node.js) Stack Application** that allows users to register, log in, manage their profile, and track job applications. The application is structured into a **backend (Node.js + Express.js + MongoDB)** and a **frontend (React.js)**, ensuring a modular, scalable, and maintainable system.

---

## **Project Structure**

### **Backend Structure (Node.js + Express.js + MongoDB)**

The backend is built using **Node.js** with **Express.js** as the web framework and **MongoDB** as the database. It handles authentication, user management, and data persistence.

#### **Folder Structure:**

```
backend/
│── models/
│   └── User.js  # Defines the User schema using Mongoose
│── controllers/
│   ├── authController.js  # Handles user authentication (register/login)
│   ├── userController.js  # Handles user profile retrieval and updates
│── routes/
│   ├── authRoutes.js  # Defines authentication-related API routes
│   ├── userRoutes.js  # Defines user-related API routes
│── middleware/
│   └── authMiddleware.js  # Protects routes with JWT authentication
│── database/
│   └── connection.js  # Manages MongoDB connection
│── server.js  # Initializes Express server, connects database, and sets up routes
│── .env  # Stores environment variables (database URI, JWT secret,..)
```

#### **How It Works:**

1. **User Authentication** (Register/Login) - Handled via JWT tokens.
2. **Profile Management** - Users can update their profile, bio, skills, and job applications.
3. **Security** - Passwords are hashed using **bcrypt.js**, and JWT tokens protect routes.
4. **Database** - MongoDB stores user details.

#### **Why This Structure?**

- **Modular**: Separates concerns (controllers, models, routes, middleware) for easier maintenance.
- **Scalable**: Can be extended with more features.
- **Security**: JWT authentication and password hashing.

### **Frontend Structure (React.js)**

The frontend is built using **React.js** with **React Router** for navigation and **Fetch API** for making HTTP requests to the backend.

#### **Folder Structure:**

```
frontend/
│── src/
│   ├── pages/
│   │   ├── Signup.jsx  # User registration page
│   │   ├── Login.jsx  # User login page
│   │   ├── Dashboard.jsx  # Displays user profile and job applications
│   ├── components/
│   │   ├── Navbar.jsx  # Navigation bar with logout functionality
│   ├── api/
│   │   ├── authService.js  # Handles API calls for authentication
│   ├── styles/
│   │   ├── auth.css  # Styles for authentication pages
│   │   ├── dashboard.css  # Styles for dashboard
│   ├── App.jsx  # Defines routes and manages authentication state
│   ├── main.jsx  # Renders React app
```

#### **How It Works:**

1. **Users can register/login** - Data is sent to the backend for authentication.
2. **Authenticated users access the dashboard** - JWT tokens are stored in `localStorage`.
3. **Users can update their profile and job applications** - Data updates via API calls.
4. **Navigation Bar** is visible only when users are authenticated.

#### **Why This Structure?**

- **Separation of Concerns**: Pages, components, and API calls are well organized.
- **State Management**: Uses `useState` and `useEffect` hooks.
- **Security**: JWT tokens ensure protected routes.

---

## **Technologies Used**

### **Backend:**

- **Node.js**: JavaScript runtime for server-side applications.
- **Express.js**: Lightweight web framework for handling API requests.
- **MongoDB + Mongoose**: NoSQL database for scalable data storage.
- **JWT (jsonwebtoken)**: Token-based authentication.
- **bcrypt.js**: Secure password hashing.

### **Frontend:**

- **React.js**: Component-based frontend framework.
- **React Router**: Handles page navigation.
- **Fetch API**: Handles API requests to the backend.

---

## **How to Run the Application**

### **Prerequisites:**

Ensure you have **Node.js** and **MongoDB** installed.

### **1. Clone the Repository:**

```sh
git clone https://github.com/your-repo/skillbridge.git
cd skillbridge
```

### **2. Install Dependencies**

#### **Backend:**

```sh
cd backend
npm install
```

#### **Frontend:**

```sh
cd ../frontend
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the backend directory and add:

```env
PORT=5050
ATLAS_URI=mongodb+srv://israeledeh11:ePzziPTrKHVrwgcy@clustersb.dakmx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSB
JWT_SECRET=your_jwt_secret

Note: The database used here was designed was testing purpose!
```

### **4. Run the Application**

#### **Start Backend Server:**

```sh
cd backend
npm start
```
![image](https://github.com/user-attachments/assets/873b4c1f-03e3-4e8a-8652-eaaafc1911de)

The backend will be running at `http://localhost:5050`.

#### **Start Frontend Server:**

```sh
cd ../frontend
npm run dev
```
![image](https://github.com/user-attachments/assets/048d03a4-1f6c-404b-9082-67df34e8032d)


The frontend will be running at `http://localhost:5175`.

---

## **Conclusion**

This MERN stack application is structured to be **scalable, modular, and secure**. It follows best practices for authentication, API handling, and state management. The separation of concerns ensures easy maintainability and future enhancements.

Feel free to contribute or modify as needed!

### **Login Page**
![image](https://github.com/user-attachments/assets/739458f2-a09f-4b82-a287-8f125c1de355)
### **Signup Page**
![image](https://github.com/user-attachments/assets/3c9edf71-b95d-48a7-9062-eb3d6cda7774)
### **Dashboard**
![image](https://github.com/user-attachments/assets/2310fc7e-43b7-4313-a902-09ecf620e6aa)
### **Edit Profile**
![image](https://github.com/user-attachments/assets/a073847f-51f7-4855-8c11-23af5d15c6ad)

