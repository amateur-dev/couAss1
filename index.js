const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

connect.then((db) =>{
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
})

app.listen(3000, () => {
  console.log(`Server is working on localhost:3000`);
});



