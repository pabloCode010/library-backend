const passport = require("passport");
const boom = require("@hapi/boom");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/User");

const singInUser = async (req, username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(boom.unauthorized("user not exists"));
    } else if (user.password != password) {
      return done(boom.unauthorized("password error"));
    }

    done(null, user);
  } catch (error) {
    done(boom.internal(error.message));
  }
};

const signUpUser = async (req, username, password, done) => {
  try {
    const findUser = await User.findOne({ username });

    if (findUser) {
      return done(boom.unauthorized("user not free"));
    }

    const user = new User({ username, password });
    await user.save();
    done(null, user);
  } catch (error) {
    done(boom.internal(error.message));
  }
};

const signInStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  singInUser
);

const singUpStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  signUpUser
);

passport.use("sign-in", signInStrategy);
passport.use("sign-up", singUpStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await User.findOne({ _id });
  done(null, user);
});
