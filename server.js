const express = require('express');

const server = express();
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}}`
  );
  next();
};

function errorHandler(error, req, res, next) {
  res.status(500).json({ message: "There was an error" })
}

module.exports = server;
