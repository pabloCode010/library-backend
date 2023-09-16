const passport = require("passport");
const User = require("../db/User");
const LocalStrategy = require("passport-local").Strategy;

const singInUser = async (req, username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) {
    return done(
      null,
      false,
      req.flash("messageError", "Usuario No Encontrado")
    );
  } else if (user.password != password) {
    return done(
      null,
      false,
      req.flash("messageError", "Contraseña Incorrecta")
    );
  }
  done(null, user);
};

const signUpUser = async (req, username, password, done) => {
  const findUser = await User.findOne({ username });

  if (findUser) {
    return done(
      null,
      false,
      req.flash("messageError", "Usuario No Disponible")
    );
  }
  const user = new User({ username, password });
  await user.save();
  done(null, user);
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
