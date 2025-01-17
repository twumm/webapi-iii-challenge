const express = require('express');

const router = express.Router();
const postDb = require('./postDb');
const validatePost = require('../users/userRouter').validatePost;

router.get('/', async (req, res, next) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id', validatePostId, (req, res, next) => {
  try {
    res.status(200).json(req.post);
  }
  catch (error) {
    next(error)
  }
});

router.delete('/:id', validatePostId, async (req, res, next) => {
  try {
    const deleteCount = await postDb.remove(req.post.id);
    res.status(200).json({ count: deleteCount, deletedPost: req.post });
  }
  catch (error) {
    next(error);
  }
});

router.put('/:id', [validatePostId, validatePost], async (req, res, next) => {
  const blogPost = { text: req.body.text };
  try {
    const updatedCount = await postDb.update(req.post.id, blogPost);
    const updatedPost = await postDb.getById(req.post.id);
    res.status(200).json({ count: updatedCount, updatedPost });
  }
  catch (error) {
    next(error);
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const post = await postDb.getById(id);
  if (post) {
    req.post = post;
    next();
  } else {
    res.status(400).json({ message: "Invalid post id" });
  }
};

module.exports = router;