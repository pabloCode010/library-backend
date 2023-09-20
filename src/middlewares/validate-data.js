const boom = require("@hapi/boom");

function validateData(property, schema) {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property], {
        abortEarly: false,
      });
      if (error) {
        const details = error.details.map(detail => detail.message);
        return next(boom.badRequest(String(details)));
      }
      next();
    } catch (error) {
      next(boom.internal(error.message));
    }
  };
}

module.exports = validateData;
