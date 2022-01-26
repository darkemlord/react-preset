const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcrypt')

const userRoutes = express.Router();

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
    res.json({ message: error, details:  `user already in use`})
  }
})

//login route

userRoutes.post('/login', async (req, res) => {
  // the values to get
  const { userName, email, password } = req.body;
  // finding in the database
  const logUser =  await User.findOne( { userName } ).lean();

  if (!logUser){
    return res.json({ status: 'error', error: 'Invalid username or password'})
  }

  if (await bcrypt.compare(password, logUser.password)) {

    return res.json( {status: 'ok', data: 'login succesfully'})
  }
  res.json({ status: 'error', error: 'invalid user or password' })
})

module.exports = userRoutes;
