# Test-Assessment
Grazac Test Assessment

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

  ## Introduction
This is a Backend Server code for ABC Company, Inc. A blog software company where users can post blogs.

## Features
- All communication with the backend should be via REST API endpoints with JSON payloads in the response
- User/blog data will need to be persisted to fulfil the requirement (Up to the developer to decide: in-memory or RDBMS)
- Code should be appropriately documented
- At least a basic set of tests for the happy path scenarios
- If using RDBMS, it would be nice to have a script to generate additional test data
- All communication with the backend should be via REST API endpoints with JSON payloads in the response
- Read endpoint should be open to all (No Auth required)
- Code should be appropriately documented
- At least a basic set of tests for the happy path scenarios
-If using RDBMS, it would be nice to have a script to generate additional test data

## Getting Started
Clone the repository:

   ```
   git clone https://github.com/olukinni-029/Test-Assessment
   
   ```
   # Install the dependencies:
   ``` 
   cd Blog Assessment
   yarn install
   ```
   # Start the application:
   ```
   yarn run dev
   ```
## API Endpoints
- Create Blog Post
- Edit Blog Post
- Delete Blog Post
- Read Blog Post
- Create Blog Post Author
- Edit Blog Post Author
- Delete Blog Post Author
- Login
  
  ## Technologies Used
  - bcrypt
  - body-parser
  - express
  - jsonwebtoken
  - pg
  - pg-hstore
  - sequelize
  - sequelize-cli
 
  ## License
MIT License
Copyright (c)
