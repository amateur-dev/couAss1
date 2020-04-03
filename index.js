const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

const app = express();
app.use(bodyParser.json());

app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next) {

  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        res.cookie('user','admin',{signed: true});
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }
  else {
      if (req.signedCookies.user === 'admin') {
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}


app.use(auth);

app.use('/', routes);

connect.then((db) =>{
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
})

app.listen(3000, () => {
  console.log(`Server is working on localhost:3000`);
});



