/**
 * Created by a_wav on 2016/11/15.
 */
var express = require('express');
var path    = require('path');
var router = express.Router();

router.get('/basic_implementation', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/basic_implementation.html"));
});

router.get('/pan_vertical', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/Basic_with_vertical_Pan_recognizer.html"));
});

router.get('/pinch_rotate', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/pinch_rotate.html"));
});

router.get('/quadrupletap', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/quadrupletap.html"));
});

router.get('/singletap_doubletap', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/singletap_doubletap.html"));
});

router.get('/nested', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/nested.html"));
});

router.get('/requireFailure', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/html/gesture_lib/hammer/requireFailure.html"));
});

module.exports = router;