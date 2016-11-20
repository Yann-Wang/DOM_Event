/**
 * Created by a_wav on 2016/11/19.
 */
function getText(url,cb){
    var r = new XMLHttpRequest();
    r.open("GET",url);
    r.onreadystatechange = function(){
        if(r.readyState === 4 && r.status === 200){
            var type = r.getResponseHeader("Content-Type");
            if(type.match(/^text/)){
                cb(r.responseText);
            }
        }
    };

    r.send(null);
}

/*
* getText("/xhr/getdata",fn);
 function fn(data){
 console.log("return: " + data);
 }
* */
