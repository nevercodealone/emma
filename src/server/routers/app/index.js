const express = require('express');
const jwt = require('jsonwebtoken');

const appRouter = express.Router();

const User = require('../../database/models/User');

// -> /app routes

appRouter.get('/', (req, res) => {
    res.render('home');
})

appRouter.get('/login', (req, res) => {
  console.log(req.decodedToken);
  /*
  if (req.decodedToken) {
    return res.redirect('/translator');
  }
  */
  res.render('login');
})

appRouter.post('/login', (req, res) => {

  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'validation failed'
    })
  }

  User
    .forge({ email })
    .fetch()
    .then(user => {
      if (user.get('password') === password) {
        console.log('loggin in user...')
        let token = jwt.sign(user.toTokenFormat(), process.env.secret, { expiresIn: '1d' });
        res.json({
          success: true,
          token: token
        })
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      console.log(error);
      return res.json({
        success: false,
        message: 'something went wrong'
      })
    })
})

appRouter.get('/translator', (req, res) => {
  console.log(req.decodedToken);
  res.render('translator');
})

appRouter.get('/translator/editor', (req, res) => {
  console.log(req.decodedToken);
  if (!req.decodedToken) {
    return res.redirect('/login');
  }
  res.render('editor');
})


module.exports = appRouter;
