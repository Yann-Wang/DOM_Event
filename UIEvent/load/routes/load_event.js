var express = require('express');
var path  = require("path");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,"../public/load.html"));
});

router.get('/get', function(req, res, next) {
  res.send("got it");
});


router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
