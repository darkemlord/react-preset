const express = require('express');
const userRoutes = require('./routes/userRoute');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: ".env" })
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, _) => {
  if(err) {
    console.log('connection error');
    console.log(err)
  } else {
    app.listen(4000, () => {
      console.log(`server running at http://localhost:4000`)
    })
  }
});
