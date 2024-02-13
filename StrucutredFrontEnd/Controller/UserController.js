// controllers/UserController.js
const express = require('express');
const UserService = require('../Service/UserService');

const router = express.Router();
const userService = new UserService();

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    await userService.registerUser(firstname, lastname, email, password);
    res.status(201).json({message:'User registered successfully'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
