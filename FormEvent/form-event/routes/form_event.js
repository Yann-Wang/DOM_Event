var express = require('express');
var path    = require('path');
var fs      = require('fs');
var formidable = require('formidable');
var router  = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/reset_submit_event.html"));
});

router.get('/element', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/form_element.html"));
});

router.get('/popup', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/popup_window.html"));
});

router.get('/change_event', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/change_event.html"));
});

router.get('/preventRepeatSubmit', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/preventRepeatSubmit.html"));
});

router.get('/preventRepeatSubmit2', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/preventRepeatSubmit2.html"));
});

router.post('/reset', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/submit', function(req, res, next) {
  console.log(req.body);
  res.send('respond with a resource');
});

router.post('/preventRepeatSubmit', function(req, res, next) {
    //console.log(req.body);
    postFormData(req,res);
});

function postFormData(req, res, isPost4) {
    if (!isFormData(req)) {
        //res.statusCode = 400;
        res.sendStatus(400); //Bad Request!
        res.send('Bad Request');
        return;
    }

    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/images/');

    form.on('field', function(field,value) {
        console.log(field);
        console.log(value);
    });

    form.on('file', function(name, file) {
        console.log(name);
        //console.log(file);
        //fs.rename(oldPath, newPath, callback)
        var oldPath = file.path;
        var newPath = form.uploadDir + file.name;
        fs.rename(oldPath,newPath,function(err){
            console.log("rename succ");
        });
    });

    form.on('end', function() {
        if(isPost4){
            res.sendFile(path.join(__dirname, '../public/upload_succ.html'));
            return;
        }
        res.set("Content-Type","text/plain");
        res.send("got it!");
    });

    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

module.exports = router;
