const boom = require("@hapi/boom");

//captura una funcion asincrona y maneja los errores que generen
//retorna una nueva función

function wrapper(func){
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(boom.internal(error.message));
        }
    }
}

module.exports = wrapper;