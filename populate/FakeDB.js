const {
  data: { portfolios },
} = require('./data');
const Portfolio = require('../models/portfolio');

class FakeDB {
  async clean() {
    await Portfolio.deleteMany({});
  }
  async addData() {
    await Portfolio.create(portfolios);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();
