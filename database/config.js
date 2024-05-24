const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('DB Online');
  } catch (error) {
    console.error(`Error initializing DB: ${error}`);
  }
};

module.exports = { dbConnection };