const Joi = require("joi");

const username = Joi.string().min(5).max(100).required();
const password = Joi.string().min(8).max(100).required();

const userBody = Joi.object({
  username,
  password,
});

module.exports = {
    userBody
};