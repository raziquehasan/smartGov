# SmartGov
Citizens and Municipal Service Portal 

## Project Overview
SmartGov is a web-based digital governance management system designed to simplify government operations and citizen services.
It enables citizens to submit service requests, view government schemes, and track complaints in real time.
Government departments can manage tasks, approve applications, and monitor performance efficiently through an integrated dashboard.

It is a secure, scalable, and user-friendly digital governance platform built using Angular, Spring Boot, and Java.
It enables seamless interaction between citizens, officers, and administrators, ensuring transparent and efficient management of government services.

The backend leverages Spring Boot for modular REST API development, integrated with PostgreSQL for data persistence.
Authentication and authorization are powered by JWT (JSON Web Tokens), providing robust security and controlled access across user roles.

## 🤝 Project Contributors

[Ashish Verma](https://github.com/ASHISHVERMASH)

[Kajal Singh](https://github.com/Kajalsingh68)

[Jamiya Begam k](https://github.com/jamiya-begam-k-17)

[Sadiya Shaikh](https://github.com/Sadiyashaikh15)

[Arif Shamim](https://github.com/ARIFSHAMIM)

## Technologies Used

### Frontend
React.js – Frontend library for building fast, interactive, and component-based user interfaces

JavaScript – Core language for adding dynamic behavior and logic to the application

HTML5 – Markup language for structuring the web pages

CSS3 – For layout, animations, and styling of the components

Tailwind CSS – Utility-first CSS framework for modern, responsive, and clean design

### Backend
Spring Boot 3.3.5 – Java-based framework for building RESTful, scalable, and production-ready applications

Java 21 – Core programming language used for backend development

Spring Web – For developing RESTful APIs and handling HTTP requests

Spring Security with JWT – Implements secure authentication and authorization using JSON Web Tokens

Spring Data JPA / Hibernate – For ORM (Object Relational Mapping) and database operations

Postgresql – Relational database used for structured and persistent data storage

Maven – Build automation and dependency management tool

Lombok – Reduces boilerplate code with annotations like @Getter, @Setter, and @Builder

### Command Line Interface (CLI)
- **Java-based CLI**: For system administration and management

 ## System Architecture
Presentation Layer:
Angular-based frontend for citizens, officers, and administrators.

**Application Layer (Backend – Spring Boot):**
Structured into the following packages:

Controller Layer: Handles incoming HTTP requests and maps them to service methods.

Service Layer: Contains core business logic and application workflows.

Repository Layer: Interfaces with the database using Spring Data JPA.

Entity Layer: Defines JPA entities representing database tables.

DTO (Data Transfer Object) Layer: Facilitates data exchange between layers without exposing entities directly.

Mapper Layer: Converts between Entity and DTO objects for clean data handling.

Security Layer: Manages authentication and authorization using Spring Security with JWT.

Exception Layer: Centralized exception handling for consistent error responses.

Enums Layer: Defines fixed sets of constants for roles, states, districts, etc.

Payload Layer: Contains request and response objects for API communication.

Data Layer:
Postgresql database used for structured data storage and persistence.
## 🗂️ Project Structure

```markdown
SmartGov/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, Button, etc.)
│   │   ├── pages/               # Pages (Dashboard, Login, Reports, etc.)
│   │   ├── services/            # API service calls (Axios, fetch)
│   │   ├── context/             # React Context for global state/auth
│   │   ├── hooks/               # Custom React hooks (useAuth, useFetch, etc.)
│   │   ├── utils/               # Helper functions (formatDate, validation)
│   │   ├── assets/              # Images, icons, static files
│   │   ├── App.js               # Root component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # React dependencies
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # Tailwind/PostCSS setup
│   ├── .env                     # Environment variables (e.g. API URL)
│   └── public/
│       ├── index.html           # Main HTML file
│       └── favicon.ico

├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/SmartGov/
│   │       │       ├── controller/          # REST controllers (API endpoints)
│   │       │       ├── service/             # Business logic layer
│   │       │       ├── repository/          # Database access layer (JPA Repositories)
│   │       │       ├── entity/              # JPA entities (database models)
│   │       │       ├── dto/                 # Data Transfer Objects
│   │       │       ├── mapper/              # Entity-DTO converters
│   │       │       ├── security/            # Spring Security + JWT configuration
│   │       │       ├── exception/           # Global exception handlers and custom exceptions
│   │       │       ├── enums/               # Enum definitions (Roles, States, Districts, etc.)
│   │       │       ├── payload/             # Request/Response objects
│   │       │       └── SmartGovApplication.java  # Main Spring Boot application class
│   │       └── resources/
│   │           ├── application.properties    # Spring Boot configuration
│   │           └── static/                   # Static resources (if any)
│   ├── pom.xml                               # Maven build configuration
│   └── target/                               # Compiled output files

├── README.md                                 # Project documentation
└── .gitignore                                # Git ignore file
```
## Features
Citizen registration and login

Service request and complaint submission

Real-time complaint tracking and status updates

Department task and workflow management

Admin dashboard with analytics and reports

Role-based authentication (Citizen, Officer, Admin)

Real-time notifications and alerts

Configurable modules for various departments

Command-line interface for backend management

