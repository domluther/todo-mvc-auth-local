const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  // Just render the login page
  res.render('login', {
    title: 'Login',
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    //if the email is not a valid email then send msg below
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' }); //also check if the password is invalid -if invalid send message below

  if (validationErrors.length) {
    // If there were errors - then go to the login page and send the error via flash
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    //method to standardize email format
    // leave yas.sah@gmail.com alone - otherwise make it yassah@gmail.com
    gmail_remove_dots: false,
  });

  // local is the strategy name?
  // If there is no user, info would hold the reason
  passport.authenticate('local', (authError, user, info) => {
    //if authError exists then
    if (authError) {
      return next(authError);
    }
    //User does not exist then use flash to redirect to tell user to log back in with error msg
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/todos');
    });
  })(req, res, next);
};
// IIFE - Immediately invoked function expression

exports.logout = (req, res) => {
  console.log('Session before logout:', req.session);
  req.logout(() => {
    console.log('User has logged out.');
    req.session.destroy((err) => {
      if (err)
        console.log(
          'Error : Failed to destroy the session during logout.',
          err
        );
      req.user = null;
      res.redirect('/');
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/todos');
  }
  res.render('signup', {
    title: 'Create Account',
  });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long',
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Passwords do not match' });
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    console.log(req.flash);
    return res.redirect('../signup');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash('errors', {
        msg: 'Account with that email address or username already exists.',
      });
      return res.redirect('../signup');
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/todos');
    });
  } catch (error) {
    return next(error);
  }
};
