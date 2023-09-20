const passport = require("passport");
const boom = require("@hapi/boom");

function signInPost(req, res, next) {
  passport.authenticate("sign-in", (error, user) => {
    if (error) {
      return next(error);
    }
    // Authentication succeeded, send a success response
    req.logIn(user, (error) => {
      if (error) {
        return next(boom.internal(error.message));
      }
      res.status(200).json({ message: "Authentication succeeded", user: user });
    });
  })(req, res, next);
}

function signUpPost(req, res, next) {
  passport.authenticate("sign-up", (error, user) => {
    if (error) {
      return next(error);
    }
    // Authentication succeeded, send a success response
    req.logIn(user, (error) => {
      if (error) {
        return next(boom.internal(error.message));
      }
      res.status(200).json({ message: "Authentication succeeded", user: user });
    });
  })(req, res, next);
}

module.exports = {
  signInPost,
  signUpPost,
};
