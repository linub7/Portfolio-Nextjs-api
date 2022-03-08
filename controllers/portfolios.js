const Portfolio = require('../models/portfolio');

exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    res.json(portfolios);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(400).json({ error: 'portfolio not found' });
    }
    res.json({ portfolio });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const {
      body: {
        title,
        company,
        companyWebsite,
        location,
        jobTitle,
        description,
        startDate,
        endDate,
      },
    } = req;

    const newPortfolio = new Portfolio({
      title,
      company,
      companyWebsite,
      location,
      jobTitle,
      description,
      startDate,
      endDate,
    });
    await newPortfolio.save();
    res.json({ portfolio: newPortfolio });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
