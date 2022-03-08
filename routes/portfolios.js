const express = require('express');
const {
  getPortfolio,
  getPortfolios,
  createPortfolio,
} = require('../controllers/portfolios');
const { checkJwt } = require('../middlewares/auth');

const router = express.Router();

router.get('/portfolios', getPortfolios);

router.get('/portfolios/:id', getPortfolio);
router.post('/portfolios', checkJwt, createPortfolio);

module.exports = router;
