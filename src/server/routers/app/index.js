const express = require('express');

const appRouter = express.Router();

// -> /app routes

appRouter.get('/', (req, res) => {
  res.render('home');
})

appRouter.get('/login', (req, res) => {
  res.render('login');
})

appRouter.get('/translator', (req, res) => {
  res.render('translator');
})

appRouter.get('/translator/editor', (req, res) => {
  res.render('editor');
})


module.exports = appRouter;
