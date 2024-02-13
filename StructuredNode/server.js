// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./Controller/UserController');
const companyController = require('./Controller/CompanyController');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_auth', { useNewUrlParser: true, useUnifiedTopology: true });

// Use user controller routes
app.use('/user', userController);
app.use('/company', companyController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
