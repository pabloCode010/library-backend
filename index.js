const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const morgan = require('morgan');
const enroute = require('./src/routes/enroute');
const passport = require('passport');
const session = require('express-session');
const connect = require('./src/db/connect');
const handler = require('./src/err/handler');

//.env file
require("dotenv").config();

//auth strategy
require("./src/auth/local");

//middleares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middlewares authentication
app.use(session({
    secret: 'c60a916aaedc6df3b19d6e46742ba48907e95e7c6e6e86edc4972e51b2a66e28',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("authenticate:", req.user);
    next();
});

//routes
app.get("/hello", (req, res) => res.send("hello"));

enroute(app);

//errors
app.use(handler);
start();

async function start(){
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, console.log("server run"));
    } catch (error) {
        console.log(error);
    }
}