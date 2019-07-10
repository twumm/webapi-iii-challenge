const express = require('express');

const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

router.post('/', validateUser, async (req, res, next) => {
  const user = { name }  = req.body;
  try {
    const newUserId = await userDb.insert(user);
    const newUser = await userDb.getById(newUserId.id);
    res.status(200).json(newUser);
  }
  catch (error) {
    next(error);
  }
});

router.post('/:id/posts', [validateUserId, validatePost], async (req, res, next) => {
  const blogPost = { user_id: req.params.id, text: req.body.text }
  try {
    const post = await postDb.insert(blogPost);
    res.status(201).json(post);
  }
  catch(error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  try {
    res.status(200).json(req.user)
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await postDb.getById(req.user.id);
    res.status(200).json(posts);
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    const deleted = await userDb.remove(req.user.id);
    res.status(200).json({ count: deleted, userDeleted: req.user });
  }
  catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await userDb.getById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "Invalid user id" });
  }
};

function validateUser(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required *name* field" });
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required *text* field" });
  } else {
    next();
  }
};

module.exports = router;
