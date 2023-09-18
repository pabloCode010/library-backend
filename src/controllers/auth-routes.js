const passport = require("passport");
const boom = require("@hapi/boom");

function signInGet(req, res, next) {
  const errorMessage = req.flash("messageError")[0];
  console.log(errorMessage);
  res.send("sign in");
}

function signInPost(req, res, next) {
  passport.authenticate("sign-in", (err, user, info) => {
    if (err) {
      return next(boom.internal(err.message));
    }
    if (!user) {
      // Authentication failed, send an error response
      const messageError = req.flash("messageError")[0];
      const error = boom.unauthorized(messageError);
      return next(error);
    }
    // Authentication succeeded, send a success response
    req.logIn(user, (err) => {
      if (err) {
        return next(boom.internal(err.message));
      }
      res.status(200).json({ message: "Authentication succeeded", user: user });
    });
  })(req, res, next);
}

function signUpPost(req, res, next) {
  passport.authenticate("sign-up", (err, user, info) => {
    if (err) {
      // Handle any errors
      return next(err);
    }
    if (!user) {
      // Authentication failed, send an error response
      const messageError = req.flash("messageError")[0];
      const error = boom.unauthorized(messageError);
      return next(error);
    }
    // Authentication succeeded, send a success response
    req.logIn(user, (err) => {
      if (err) {
        return next(boom.internal(err.message));
      }
      return res.status(200).json({ message: "Authentication succeeded", user: user });
    });
  })(req, res, next);
}

module.exports = {
  signInPost,
  signInGet,
  signUpPost,
};
