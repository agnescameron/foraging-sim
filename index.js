const express = require('express');
var router = express.Router();

var app = express()

app.use(express.static(__dirname + "/docs"));

// define the home page route
router.get('/', function (req, res) {
  res.redirect('index.html')
})

app.listen(3000, () => console.log('to visit the park, go to localhost:3000 between the hours of 8am and 10pm 🌱'));