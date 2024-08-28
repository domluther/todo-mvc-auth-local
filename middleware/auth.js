// TODO Add ensureGuest?

module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },

  ensureGuest: function (req, res, next) {
    // Authenticated? Move to todos page
    if (req.isAuthenticated()) {
      res.redirect('/todos');
    } else {
      return next();
    }
  },
};
