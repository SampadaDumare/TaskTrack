TaskTrack 

Role-Based Task & Project Management System (MERN Stack)

TaskTrack is a full-stack task and project management application built using the MERN stack.
It is designed to manage projects and tasks in a team environment using role-based access control.


🔍 Project Overview

    TaskTrack enables teams to create projects, assign tasks, and track progress efficiently.
    The system supports three user roles, each with defined responsibilities and permissions.

    This project demonstrates:

    Role-based authentication and authorization

    Secure backend APIs

    Real-world task lifecycle management

    Separation of frontend and backend concerns

🚀 **Live Demo**

- **Frontend (React App):** https://tasktrack-frontend-32qs.onrender.com
- **Backend API (Node.js/Express):** https://tasktrack-2.onrender.com



👥 User Roles & Access

    The application supports the following roles:

    Admin

    Manages users

    Oversees the system

    Manager

    Creates projects

    Assigns tasks to employees

    Employee

    Views assigned tasks

    Updates task status

    Access to routes and actions is restricted based on the user’s role.


✨ Core Features

    User authentication using JSON Web Tokens (JWT)

    Password encryption with bcrypt

    Role-based authorization

    Project creation and management

    Task assignment and tracking

    Task status lifecycle:

    HOLD

    IN-PROGRESS

    REVIEW

    COMPLETED

    RESTful API architecture

    Separate frontend and backend applications


🛠️ Tech Stack

Frontend

    React.js
    React Router
    Context API
    CSS

Backend

    Node.js
    Express.js
    MongoDB
    Mongoose
    JWT (Authentication)
    bcrypt (Password hashing)



🧱 Application Architecture

    Frontend handles UI, routing, and state management

    Backend exposes REST APIs for authentication, projects, tasks, and users

    MongoDB stores users, projects, and task data

    Role-based middleware controls access to protected routes



🔗 API Endpoints

Authentication

    POST /api/auth/signup

    POST /api/auth/login

User Management

    GET /api/user/getUsers

    PUT /api/user/updateStatus/:id

    Project Management

    POST /api/project/addProject

    GET /api/project/getProjects

    GET /api/project/getProject/:id

Task Management

    POST /api/user/addTask

    GET /api/user/getTasks

    PUT /api/user/updateTask/:id

    DELETE /api/user/deleteTask/:id

    All endpoints are protected and accessible based on user roles.


Future Improvements:

    Implement real-time updates using WebSockets

    Add drag-and-drop functionality for tasks

    Integrate email notifications for task assignments


Screenshots:

Home - Landing Page
![Home](Screenshots/Home.png)

Login page
![Login](Screenshots/Login.png)

Signup page
![Signup](Screenshots/Signup.png)

Admin - Home page
![Admin-Home](Screenshots/Admin-home.png)

Admin - FetchAllTasks page
![Admin-fetchAllTasks](Screenshots/Admin-seeAllTasks.png)

Manager - Home page
![Manager-Home](Screenshots/Manager-home.png)

Manager - AddTask page
![Manager-AddTask](Screenshots/Manager-addtask.png)

Employee - Home page
![Employee-Home](Screenshots/Employee-home.png)

⚙️ Installation & Setup
        Prerequisites
        Node.js
        MongoDB


Backend Setup
    cd Backend
    npm install
    npm run dev

Frontend Setup
    cd Frontend
    npm install
    npm start