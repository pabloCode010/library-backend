const boom = require("@hapi/boom");

function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    next(boom.unauthorized("unauthenticated user"));
}

module.exports = isAuthenticated;