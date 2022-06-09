const Joi = require('joi')

const id = Joi.string();
const name = Joi.string();
const email = Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com', 'net'] } });
const password = Joi.string();
const age = Joi.number().integer();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  age: age.required()
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  age: age
});

const getUserSchema = Joi.object({
  id: id.required()
});

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});
module.exports = {getUserSchema, updateUserSchema, createUserSchema, loginUserSchema};
