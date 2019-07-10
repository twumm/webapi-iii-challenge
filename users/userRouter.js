const express = require('express');

const router = express.Router();
const userDb = require('./userDb');

router.post('/', async (req, res, next) => {
  const user = { name }  = req.body;
  try {
    if (!user.name) {
      res.status(400).json({ message: "Please provide a name for the user" })
    } else {
      const newUserId = await userDb.insert(user);
      const newUser = await userDb.getById(newUserId.id);
      res.status(200).json(newUser);
    }
  }
  catch (error) {
    next(error);
  }
});

router.post('/:id/posts', (req, res) => {
});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

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

};

function validatePost(req, res, next) {

};

module.exports = router;
