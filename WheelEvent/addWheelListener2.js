/**
 * Created by a_wav on 2016/11/9.
 */
// from https://developer.mozilla.org/en-US/docs/Web/Events/wheel

/*
*  fix:
*  1.  for "mousewheel"  from /40 to /4   加速滑动
*  2. 改变鼠标滑动方向与内容滑动方向的对应关系
*
* */

// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
/*
*
 Feature	  Chrome	Edge	Firefox (Gecko)	Internet Explorer	Opera	Safari
 Basic support	31	   (Yes)	17.0 (17.0)	    9.0[1]	              18	7.0
*
* */

/*
* ！！！该方式符合传统手感
* 鼠标向下滑（接近用户方向）: 内容向下翻
* 鼠标向上滑（接近用户方向）: 内容向上翻
*
* */

(function(window,document) {

    var prefix = "", _addEventListener, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? function(originalEvent){
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target,
                type: originalEvent.type,
                deltaMode: originalEvent.deltaMode,
                deltaX: originalEvent.deltaX,
                deltaY: -originalEvent.deltaY,
                deltaZ: originalEvent.deltaZ,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // it's time to fire the callback
            return callback( event );

        } : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaY: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY =  1/4 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX =  1/4 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = -originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);