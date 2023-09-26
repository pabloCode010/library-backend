const boom = require("@hapi/boom");

function isAdmin(req, res, next){
    if (req.user.role == "admin"){
        return next();
    }
    next(boom.forbidden("You do not have permission to perform this action"));
}

module.exports = isAdmin;