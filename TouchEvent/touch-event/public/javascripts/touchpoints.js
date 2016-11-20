/*
* 计时器的delay参数，在调优的过程中做过改变
*
* */
"use strict";
(function() {


    var touches = {};
    var killers = {};


    var TRANSITION = 'transition',
        TRANSFORM = 'transform',
        TRANSITION_END = 'transitionend',
        TRANSFORM_CSS = 'transform',
        TRANSITION_CSS = 'transition';

    if (typeof document.body.style.webkitTransform !== "undefined") {
        TRANSITION = 'webkitTransition';
        TRANSFORM = 'webkitTransform';
        TRANSITION_END = 'webkitTransitionEnd';
        TRANSFORM_CSS = '-webkit-transform';
        TRANSITION_CSS = '-webkit-transition';
    }


    function MyTouch(id) {
        this.id = id;
        var touchee = document.createElement('div');
        touchee.className = 'touched'; //添加样式
        touchee.style.opacity = 0;
        touchee.id = id;
        touchee.addEventListener(TRANSITION_END, function() {
            touchee.style[TRANSFORM] = '';
        });

        document.body.appendChild(touchee);
        this.node = touchee; // 加入圆圈对象
    }

    MyTouch.prototype.setPos = function(posX, posY) {

        this.node.style.opacity = 1;
        var x = Math.round(posX - 50) + 'px';
        var y = Math.round(posY - 50) + 'px';
        this.node.style[TRANSFORM] = "translate3d(" + x + "," + y + ",0)";

    };

    MyTouch.prototype.destroy = function(cb) {
        this.fade();
        var node = this.node, id = this.id;
        window.setTimeout(function() {
            node.parentNode && node.parentNode.removeChild(node);
            delete(touches[id]); // 清理内存
        }, 100);
        // 由1000改为100

    };

    MyTouch.prototype.fade = function() {
        this.node.style[TRANSITION] = 'opacity .1s ease-in-out';
        this.node.style.opacity = 0;

    };

    //创建生命周期
    function kill(id) {
        touches[id] && touches[id].destroy();
    }


    function reaper() {
        var id;
        for (id in touches) {
            kill(id);
        }
    }

    function mover(e) {
        e.preventDefault();
        var len = e.touches.length,
            thistouch;
        for (var i = 0; i < len; i++) {
            //touches：表示当前跟踪的触摸操作的Touch对象的数组。
            thistouch = e.touches[i];
            if (!touches[thistouch.identifier]) {
                touches[thistouch.identifier] = new MyTouch(thistouch.identifier);
            }
            // pageX,pageY使用文档坐标
            touches[thistouch.identifier].setPos(thistouch.pageX, thistouch.pageY);
        }
    }

    function moverMS(e) {
        if (!touches[e.pointerId]) {
            touches[e.pointerId] = new MyTouch(e.pointerId);
        }
        // clientX,clientY相对于客户端或浏览器窗口的坐标
        touches[e.pointerId].setPos(e.clientX, e.clientY);
    }

    function touchend(e) {
        window.clearTimeout(reap);
        //changeTouches：对于 touchend ，
        // 列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）。
        for (var i=0; i < e.changedTouches.length; i++) {
            kill(e.changedTouches[i].identifier);
        }

        //kill any stray touches that don't get cleaned
        //只支持双指，实现一指脱离，两个圆圈都消失（自动退出调试状态）。
        reap = window.setTimeout(reaper, 50);
    }

    function touchendMS(e) {
        window.clearTimeout(reap);
        kill(e.pointerId);

        //kill any stray touches that don't get cleaned
        reap = window.setTimeout(reaper, 50);
    }



    document.addEventListener('touchstart', mover);
    document.addEventListener('touchmove', mover);

    document.addEventListener('MSPointerDown', moverMS);
    document.addEventListener('MSPointerMove', moverMS);

    document.addEventListener('MSPointerUp', touchendMS);

    var reap;
    document.addEventListener('touchend', touchend);
    document.addEventListener('touchcancel', touchend);
}());