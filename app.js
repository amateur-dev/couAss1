const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var authenticate = require('./authenticate');


const userRouter = require('./routes/userRouter');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');

const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

const app = express();
app.use(bodyParser.json());


app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200, { "Content-Type": "text/html" });
  res.end("<html>Thank you for visting the landing page.  Please visit the following links for individual pages:" + "<br>"
    + "<a href=/dishes>dishes</a> <br>"
    + "<a href=/leader>leader</a> <br>"
    + "<a href=/promotion>promotion</a> <br>");

});

app.use('/users', userRouter);


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



