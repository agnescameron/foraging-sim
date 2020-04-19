const express = require('express');
var router = express.Router();

var app = express()

app.use(express.static(__dirname + "/public"));

// define the home page route
router.get('/', function (req, res) {
  res.redirect('index.html')
})

app.listen(3000, () => console.log('simulating a park on port 3000 🌱'));