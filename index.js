require('dotenv').config();
const express = require('express');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');

const server = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MONGO DB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

// routes middleware
readdirSync('./routes').map((r) =>
  server.use('/api/v1', require('./routes/' + r))
);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVER ready on port ${PORT}`);
});
