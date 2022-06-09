const express = require('express');
const boom = require('@hapi/boom');
const UsersService = require('../services/users.services');
const validatorHandler = require('../midlewares/validator.handler');
const { getUserSchema, updateUserSchema, createUserSchema, loginUserSchema } = require('../schema/users.schema')
const service = new UsersService();
const router = express.Router();

router.get('/',
  async (req, res) => {
    const users = await service.findAll();
    return res.json(users);
  });

router.post('/register', validatorHandler(createUserSchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newUser = service.register(body);
    return res.status(201).json(newUser);
  }
);

router.post('/login', validatorHandler(loginUserSchema, 'body'),  (req, res) => {
  const {password,  name} = req.body;
  const login = service.login(email, password)
  if(login !== undefined){
    res.send('Welcome to MangoChango Academy')
    return res.status(201).json(login)
  } else {
    return res.json({
      message: 'Email or Password incorrect'
    });
  }
});

router.get('/:id', validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(parseInt(id));
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }
);

router.patch('/:id', validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const body = req.body;
      const user = await service.update(parseInt(id), body);
      res.json(user);
    } catch (error) {
      next(error)
    }
  });
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.delete(parseInt(id));
  res.json(user)
  return id;
});

module.exports = router;
