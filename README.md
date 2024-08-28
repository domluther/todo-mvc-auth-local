# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for?

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used

bcrypt, connect-mongo, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install`

---

# Things to add

- Create a `.env` file and add the following as `key: value`
  - PORT: 2121 (can be any port example: 3000)
  - DB_STRING: `your database URI`
  ***

Have fun testing and improving it! 😎

# Changes

1. Removed the .env file from the repo and added it to gitignore because I didn't want to share mine.
2. Removed nodemon from package.json
3. Changed the repo to start with node --watch instead of nodemon.
4. Updated bcrypt, tested creating and signing in. OK.
5. Updated ejs
6. Removed dotenv from package.json and server.js
7. Changed the script to start as "start": "node --watch --env-file=./config/.env server.js",
8. Updated express
9. Updated express-session
10. Updated passport
11. Updated validator
12. Removed mongodb - not actually used
13. Updated to mongoose 6 (incremental update to make it easier to debug)
    1. Updated database.js. useFindAndModify & useCreateIndex were removed as options.
14. Updated to connect-mongo 4
    1. Don't call (session) on import
    2. Changed option from mongoConnection to mongoUrl as needed in mongo 4
    3. Fixed logout method in controllers/auth.js -
15. Updated to connect-mongo 5 - no changes needed
16. Updated to mongoose 7 - promises/async needed instead of callbacks for eg findById()
    1. Updated deserializeUser in passport.js to use async/await
    2. Updated localStrategy findOne in passport.js to use async/await
    3. Updated controllers/auth.js postSignup findOne and save to use async/await
