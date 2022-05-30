# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and ExpressJS, Nodejs and PostgreSQL. (PERN stack)

## Prerequisites

### PostgreSQL database 
- A database named 'nimble' 
- A superuser named 'nimble' with the password as 'admin123'

**Note: If you do not wish to create the superuser / database, you may adjust the database connection information in: `/server/.env`

### NPM packages
  - Please run the following command to install for both front and backend of the application from the root directory of the app ("/") and ("/server) respectively:

#### `yarn install`

**Note: You may use `npm` to install the NPM packages with the command:

#### `npm install`


## Getting started

### Run the migration scripts to create the required tables into the database
#### `yarn migrate-db`

### Insert users with the seeder command
#### `yarn seed-users`

- The login credentials of the seeder users are: 
    - Email: johndoe@test.com
    - Password: jdoe123

    - Email: monaann@test.com
    - Password: mann456

### To undo the migration or the seeder process, the commands are: 

#### `yarn undo-migrate-db` -> Undo migration
#### `yarn undo-seed-users` -> Undo seeder users

## Starting the app

### Start the backend app by running the command from the root directory: 
```
cd server
yarn start
```

### Open a separate console and start the frontend app from the root directory
`yarn start`

#### Runs the app in the development mode.
#### Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

