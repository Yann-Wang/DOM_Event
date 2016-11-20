var express = require('express');
var path    = require('path');
var router = express.Router();
var hammer_event = require('./hammer_event');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/html/touch_event.html"));
});

router.get('/tap-demo1-button', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture/tap-demo1-button.html"));
});

router.get('/swipe-demo1-button', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture/swipe-demo1-button.html"));
});

router.get('/swipe-demo2-slides', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture/swipe-demo2-slides.html"));
});

router.get('/scroll-demo1-text', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture/scroll-demo1-text.html"));
});

router.get('/orientation', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/orientation_event.html"));
});

router.get('/gesture_event', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_event.html"));
});

router.get('/multi_touch_event', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/multi_touch_event.html"));
});

//gesture_lib --> hammer
router.use('/hammer', hammer_event);

//zepto
router.get('/zepto', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/zepto/zepto_event.html"));
});


module.exports = router;
