const routes = require('express').Router();

const User = require('../models/users');

routes.post("/signup", async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user != null) {
            let error = new Error("user already exists");
            error.status = 403;
            next(error);
        } else {
            user = await User.create({
                username: req.body.username,
                password: req.body.password
            }).then((user) => {
                res.status = 200;
                res.setHeader('Content-Type', "application/json");
                res.json({ status: "registration successful", user: user })
            }, (error) => next(error)
            )
        };
    } catch (error) {
        next(error)
    }

})

routes.post('/login', (req, res, next) => {
    if(!req.session.user) {
      var authHeader = req.headers.authorization;
      
      if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
    
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var username = auth[0];
      var password = auth[1];
    
      User.findOne({username: username})
      .then((user) => {
        if (user === null) {
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          return next(err);
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err);
        }
        else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      })
      .catch((err) => next(err));
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('You are already authenticated!');
    }
  })
  
routes.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = routes;


