const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const morgan = require('morgan');
const enroute = require('./src/routes/enroute');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//auth strategy
require("./src/auth/local");

//middleares
app.use(morgan("dev"));
app.use(express.json());

//middlewares authentication
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash()); // Agrega el middleware de connect-flash
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("authenticate:", req.isAuthenticated());
    next();
});

//routes
app.get("/hello", (req, res) => res.send("hello"));

enroute(app);

app.listen(port, console.log("server run"));