const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: ".env" })
const userRoutes = express.Router();
const JWT_SECRET = process.env.JWT_SEC;
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
  const { userName, password } = req.body;
  // finding in the database
  const logUser =  await User.findOne( { userName } ).lean();

  if (!logUser){
    return res.json({ status: 'error', error: 'Invalid username or password'})
  }

  if (await bcrypt.compare(password, logUser.password)) {
    //creating token
    const token = jwt.sign({
      id: logUser._id,
      username: logUser.userName,
      email: logUser.email
    }, JWT_SECRET)

    return res.json( {status: 'ok', data: token})
  }
  res.json({ status: 'error', error: 'invalid user or password' })
})

module.exports = userRoutes;
