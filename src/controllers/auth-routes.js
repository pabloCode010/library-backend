const passport = require("passport");
const boom = require("@hapi/boom");
const User = require("../db/User");

const logInCallBack = (res, next, user) => {
  return (error) => {
    if (error) {
      return next(boom.internal(error.message));
    }
    const userData = {
      "ID": user._id,
      "username": user.username
    }
    res.status(200).json({ message: "Successful authentication", user: userData });
  };
};

const authenticateCallBack = (req, res, next) => {
  return (error, user) => {
    if (error) {
      return next(error);
    }
    req.logIn(user, logInCallBack(res, next, user));
  };
};

function signInPost(req, res, next) {
  passport.authenticate(
    "sign-in",
    authenticateCallBack(req, res, next)
  )(req, res, next);
}

function signUpPost(req, res, next) {
  passport.authenticate(
    "sign-up", 
    authenticateCallBack(req, res, next)
  )(req, res, next);
}

async function createAdmin(req, res, next){
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user){
    return next(boom.unauthorized("Username not available"));
  }
  const newAdmin = await new User({ username, password, role: "admin" });
  await newAdmin.save();
  const userData = {
    "ID": newAdmin._id,
    "username": newAdmin.username
  }
  res.status(200).json({ message: "Administrator created", user: userData });
}

module.exports = {
  signInPost,
  signUpPost,
  createAdmin
};