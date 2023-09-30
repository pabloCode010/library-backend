const boom = require("@hapi/boom");

function routeNotFound(req, res, next){
    next(boom.notFound("This route does not exist"));
}

module.exports = routeNotFound;