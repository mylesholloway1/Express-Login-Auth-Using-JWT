const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodb');

const ConnectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = ConnectDB;
