const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');


const app = express();
app.use(bodyParser.json());
// app.use('/', (req, res) => {
//   res.status(200).json({ message: 'Connected to the root!' });
// });;
app.use('/', routes);

app.listen(3000, () => {
  console.log(`Server is working on localhost:3000`);
});



