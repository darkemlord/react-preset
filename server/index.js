const express = require('express');
const loginRoutes = require('./routes/login')

const app = express();

app.use('/login', loginRoutes)

app.listen(4000, () => {
  console.log(`server running at http://localhost:4000`)
})
