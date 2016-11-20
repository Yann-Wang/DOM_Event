var express = require('express');
var data_page1 = require('../models/page1');

var router = express.Router();

/* GET users listing. */
router.get('/rest', function(req, res, next) {
    /*
    * api_key: "api-key"
     extras: "url_n,owner_name,height_n,width_n"
     format: "json"
     jsoncallback: "flcb0"
     method: "flickr.photos.search"
     page: "1"
     per_page: "20"
     text: "seagull"
    * */
    /*
    * callback data : data.photos.photo
    * data[i] : (ownername, owner, id, url_n)
    * */



    if(req.query.page == "1"){
        res.send(req.query.jsoncallback + "(" + JSON.stringify(data_page1) + ");");
    }else{
        //res.send('respond with a resource');
        res.send(req.query.jsoncallback + "(" + JSON.stringify(data_page1) + ");");
    }


});

module.exports = router;
