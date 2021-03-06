const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 128,
    },
    company: {
      type: String,
      required: true,
      maxlength: 64,
    },
    companyWebsite: {
      type: String,
      required: true,
      maxlength: 128,
    },
    location: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('portfolio', portfolioSchema);
