require('dotenv').config();
const express = require('express');
const { readdirSync } = require('fs');
const db = require('./db');
const cors = require('cors');
const morgan = require('morgan');

const server = express();
db();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// routes middleware
readdirSync('./routes').map((r) =>
  server.use('/api/v1', require('./routes/' + r))
);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVER ready on port ${PORT}`);
});
