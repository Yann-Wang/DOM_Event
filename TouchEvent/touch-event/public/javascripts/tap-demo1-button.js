/**
 * Created by a_wav on 2016/11/12.
 */
(function () {
    var TOUCHSTART, TOUCHEND;

    if(typeof (window.ontouchstart) != 'undefined'){
        TOUCHSTART = 'touchstart';
        TOUCHEND   ='touchend';
    }else if(typeof (window.onmspointerdown) != 'undefined'){
        TOUCHSTART = 'MSPointerDown';
        TOUCHEND   = 'MSPointerUp';
    }else{
        TOUCHSTART = 'mousedown';
        TOUCHEND   ='mouseup';
    }

    function NodeFacade(node) {
        this._node = node;
    }

    NodeFacade.prototype.getDomNode = function(){
        return this._node;
    };

    NodeFacade.prototype.on = function (evt,cb) {
        if(evt === 'tap'){
            this._node.addEventListener(TOUCHSTART,cb);
        }else if(evt === 'tapend'){
            this._node.addEventListener(TOUCHEND,cb);
        }else{
            this._node.addEventListener(evt,cb);
        }

        return this;
    };

    NodeFacade.prototype.off = function (evt,cb) {
        if(evt === 'tap'){
            this._node.removeEventListener(TOUCHSTART,cb);
        }else if(evt === 'tapend'){
            this._node.removeEventListener(TOUCHEND,cb);
        }else{
            this._node.removeEventListener(evt,cb);
        }

        return this;
    };

    window.$ = function (selector) {
        var node = document.querySelector(selector);
        if(node){
            return new NodeFacade(node);
        }else{
            return null;
        }
    };

})();


$('.button').on('tap',function (e) {
    e.preventDefault();
    togglePicture();
}).on('tapend',function (e) {
    e.preventDefault();
});

function togglePicture() {
    var h = document.querySelector(".picture");
    if(h.style.display == "none"){
        h.style.display = "block";
    }else{
        h.style.display = "none";
    }
}
