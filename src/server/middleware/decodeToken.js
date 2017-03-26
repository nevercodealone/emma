const jwt = require('jsonwebtoken');

const decodeToken = function(req, res, next) {

  const token = req.body.token || req.cookies.token || req.query.token || req.headers['x-access-token'];

  if (!token) return next();

    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return next();
      } else {
        req.decodedToken = decoded;
        return next();
      }
    })

}

module.exports = decodeToken;
