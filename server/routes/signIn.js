const express = require('express');
const User = require('../models/Users')

const signInRoutes = express.Router();

signInRoutes.post('/', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
  try{
    const saveUser = await user.save();
    res.json(saveUser)
  } catch(error) {
    res.json({ message: error })
  }
})

module.exports = signInRoutes;
