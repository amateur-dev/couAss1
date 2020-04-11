const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
var passport = require('passport');
var authenticate = require('./authenticate');

const userRouter = require('./routes/userRouter');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

const app = express();
app.use(bodyParser.json());


// the following code was creating the session for the users
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200, { "Content-Type": "text/html" });
  res.end("<html>Thank you for visting the landing page.  Please visit the following links for individual pages:" + "<br>"
    + "<a href=/dishes>dishes</a> <br>"
    + "<a href=/leader>leader</a> <br>"
    + "<a href=/promotion>promotion</a> <br>");

});

app.use('/users', userRouter);

function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}

app.use(auth);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promotionRouter);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is working on localhost:${PORT}`);
});



