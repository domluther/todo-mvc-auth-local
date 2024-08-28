const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
// Middleware to show ensureAuth if you may not be logged in and ensureGuest if they are logged in
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureGuest, homeController.getIndex);
// If you are not a guest, don't show the login page
router.get('/login', ensureGuest, authController.getLogin);
router.post('/login', ensureGuest, authController.postLogin);
router.get('/logout', ensureAuth, authController.logout);
router.get('/signup', ensureGuest, authController.getSignup);
router.post('/signup', ensureGuest, authController.postSignup);

module.exports = router;
