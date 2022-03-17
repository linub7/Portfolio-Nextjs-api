const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, sparse: true },
    title: {
      type: String,
      required: true,
      maxlength: 96,
    },
    subTitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
