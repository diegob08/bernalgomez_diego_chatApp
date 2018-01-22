const express = require('express');
const app = express();


//this aroute and points to the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//this goes to another path
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

//this goes to another path
app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname + '/portfolio.html');
});

app.listen(3000, () => {
  console.log ('app running on port 3000!');
});
