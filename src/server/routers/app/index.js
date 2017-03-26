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

  User.findOne({email: email}, (err, user) => {
    if (err) {
      // user not found
      throw err;
    };

    if (!user) {
      return res.json({ success: false, message: 'User not found.'})
    }

    if (user) {
      if (user.password != password) {
        return res.json({ success: false, message: 'Wrong password.'})
      }

      if (user.password == password) {
        // success
        var userData = {
          id: user._id,
          role: user.role
        }
        var token = jwt.sign(userData, process.env.secret, {
          expiresIn: '1d'
        });

        return res.json({
          success: true,
          message: 'Enjoy the token',
          token: token
        })
      }
    }
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
