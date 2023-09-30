const Joi = require("joi");

const username = Joi.string().min(5).max(100).required();
const password = Joi.string().min(8).max(100).required();
const { isValidObjectId } = require('mongoose');

const id = Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.message('Invalid Id');
    }
    return value;
}).required();

const userBody = Joi.object({
  username,
  password,
});

const searchById = Joi.object({ id })

module.exports = {
    userBody,
    searchById
};