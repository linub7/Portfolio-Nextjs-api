require('dotenv').config();
const mongoose = require('mongoose');
const FakeDB = require('./FakeDB');

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('> Starting Populate DB...');
    await FakeDB.populate();
    await mongoose.connection.close();
    console.log('> DB has been populated');
  })
  .catch((err) => {
    console.log(err);
  });
