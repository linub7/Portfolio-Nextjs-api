const mongoose = require('mongoose');

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('MONGO DB Connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
