const express = require('express');

const loginRoutes = express.Router();

loginRoutes.get('/', (req, res) => {
  res.send('Hola mis nenes desde login')
})

module.exports = loginRoutes;
