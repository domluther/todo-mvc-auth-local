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
5. Removed dotenv from package.json and server.js
6. Changed the script to start as "start": "node --watch --env-file=./config/.env server.js",
