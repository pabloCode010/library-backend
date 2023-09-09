const passport = require("passport");

function signInGet(req, res, next){
    const errorMessage = req.flash("messageError")[0];
    console.log(errorMessage);
    res.send("sign in");
}

function signInPost(req, res, next) {
    passport.authenticate("sign-in", (err, user, info) => {
        if (err) {
            // Handle any errors
            return next(err);
        }
        if (!user) {
            // Authentication failed, send an error response
            return res.status(401).json({ error: "Authentication failed" });
        }
        // Authentication succeeded, send a success response
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Authentication succeeded", user: user });
        });
    })(req, res, next);
}

function signUpPost(req, res, next){
    passport.authenticate("sign-up", (err, user, info) => {
        if (err) {
            // Handle any errors
            return next(err);
        }
        if (!user) {
            // Authentication failed, send an error response
            return res.status(401).json({ error: "Authentication failed" });
        }
        // Authentication succeeded, send a success response
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Authentication succeeded", user: user });
        });
    })(req, res, next);
}

module.exports ={
    signInPost,
    signInGet,
    signUpPost
};