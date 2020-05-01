// initializing dotenv dependency
require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/trending';
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(connectionString, configOptions)
  .then(() => {console.log('MongoDB connected successfully...')})
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
  Product: require('./Product'),
  User: require('./User'),
};