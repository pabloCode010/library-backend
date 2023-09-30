const boom = require("@hapi/boom");

function isAdmin(req, res, next){
    if (req.user.role == "admin"){
        return next();
    }
    next(boom.unauthorized("Admin users only"));
}

module.exports = isAdmin;