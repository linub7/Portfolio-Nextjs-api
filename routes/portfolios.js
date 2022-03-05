const express = require('express');
const { getPortfolio, getPortfolios } = require('../controllers/portfolios');

const router = express.Router();

router.get('/portfolios', getPortfolios);

router.get('/portfolio', getPortfolio);

module.exports = router;
