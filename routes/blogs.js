const express = require('express');
const {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
} = require('../controllers/blogs');
const { checkJwt, checkRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/blogs', getBlogs);
router.get('/blogs/me', checkJwt, checkRole('admin'), getBlogsByUser);

router.get('/blogs/s/:slug', getBlogBySlug);
router.get('/blogs/:id', getBlog);

router.post('/blogs', checkJwt, checkRole('admin'), createBlog);

// create middleware to check for admin rights!!!
router.patch('/blogs/:id', checkJwt, checkRole('admin'), updateBlog);
router.delete('/blogs/:id', checkJwt, checkRole('admin'), deleteBlog);

module.exports = router;
