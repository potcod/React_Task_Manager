# React_Task_Manager
A simple Task Manager app utilizing 
- React (Frontend)
- Spring Boot (Backend)
- PostgreSQL (Database)
## Prerequisites
- Java 17+
- Node.js and npm
- PostgreSQL
- Maven
- Git

- **Setup PostGreSQL by**:
- Open up PSQL terminal
  Windows: open up "SQL Shell(psql)"
  Mac: run "brew services start postgresql" if installed via Homebrew
- then run following commands
  CREATE DATABASE task
  CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
  GRANT ALL PRIVILEGES ON DATABASE task TO your_username;

  Update your application.properties "spring.datasource.username" and "spring.datasource.password" reflect your user and password.

  **Start Application**
  From root:
  - Start react app by install npm in frontend "cd frontend; npm install", then start by "npm start"
  - Start PostgreSQL Spring Boot by "cd backend; mvnw spring-boot:run"
    
  
