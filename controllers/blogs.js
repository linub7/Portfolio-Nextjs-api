const slugify = require('slugify');
const Blog = require('../models/blog');
const uniqueSlug = require('unique-slug');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort('-createdAt');
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.getBlogsByUser = async (req, res) => {
  const userId = req.user.sub;
  try {
    const blogs = await Blog.find({ userId }).sort('-createdAt');
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.getBlog = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog was not found' });
    }
    res.json({ blog });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.getBlogBySlug = async (req, res) => {
  const {
    params: { slug },
  } = req;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog was not found' });
    }
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
exports.createBlog = async (req, res) => {
  const {
    body: { title, subTitle, content },
  } = req;
  try {
    const blog = new Blog({ title, subTitle, content });
    blog.userId = req.user.sub;
    const newBlog = await blog.save();
    res.json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

const _saveBlog = async (blog) => {
  try {
    const createdBlog = await blog.save();
    return createdBlog;
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.slug) {
      // 'title' + '-uniqueSlug' => 'title-unique-slug'
      blog.slug += uniqueSlug();
      return _saveBlog(blog);
    }
    throw err;
  }
};

exports.updateBlog = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(422).json({ error: 'Blog was not Found' });
    }

    if (body.status && body.status === 'published' && !body.slug) {
      blog.slug = slugify(blog.title, {
        replacement: '-',
        lower: true,
      });
    }

    blog.set(body);
    blog.updatedAt = new Date();

    const updatedBlog = await _saveBlog(blog);
    res.json(updatedBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
exports.deleteBlog = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog was not Found' });
    const removedBlog = await blog.remove();
    res.json(removedBlog);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.status(422).json({ error: err });
  }
};
