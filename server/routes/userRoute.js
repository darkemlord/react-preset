const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcrypt')

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('hello papis')
})
//signIn route
userRoutes.post('/signin', async (req, res) => {
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hash
  });
  try{
    const saveUser = await user.save();
    res.json(saveUser)
  } catch(error) {
    res.json({ message: error })
  }
})

//login route

userRoutes.post('/login', (req, res) => {
  console.log('intentando acceder')
})

module.exports = userRoutes;
