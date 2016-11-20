/**
 * Created by a_wav on 2016/11/18.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/infinite_scroll', function(req, res, next) {
    res.render('infinite_scroll');
});

router.get('/infinite_scroll_o', function(req, res, next) {
    res.render('infinite_scroll_o');
});

module.exports = router;
