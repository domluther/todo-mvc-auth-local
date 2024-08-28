const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
// middleware to create sessions for authentication
const session = require('express-session');
//storage session is in DB that is used for  passport
const MongoStore = require('connect-mongo');
// Used to display messages on screen during render
const flash = require('express-flash');
// Used for logging
const logger = require('morgan');

// Our files
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const todoRoutes = require('./routes/todos');

// Passport config
require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', mainRoutes);
app.use('/todos', todoRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!');
});
