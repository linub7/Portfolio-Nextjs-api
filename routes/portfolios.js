const express = require('express');
const {
  getPortfolio,
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolios');
const { checkJwt, checkRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/portfolios', getPortfolios);

router.post('/portfolios', checkJwt, createPortfolio);

router.get('/portfolios/:id', getPortfolio);
// create middleware to check for admin rights!!!
router.patch('/portfolios/:id', checkJwt, updatePortfolio);
router.delete('/portfolios/:id', checkJwt, checkRole('admin'), deletePortfolio);

module.exports = router;
