/**
 * Created by a_wav on 2016/11/19.
 */
var express = require('express');
var path    = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    //res.sendFile(path.join(__dirname , "../public/html/hashchange_event.html"));
    res.render('fe_router');
});

router.get('/blue', function(req, res, next) {
    //res.send('respond with a resource');
    //res.sendFile(path.join(__dirname , "../public/html/fragment1.html"));
    res.render('fragment1');
});

module.exports = router;
