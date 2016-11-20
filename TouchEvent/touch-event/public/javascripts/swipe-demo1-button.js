/**
 * Created by a_wav on 2016/11/12.
 */
var TRANSITION_END = 'webkitTransitionEnd',
    TRANSITION_CSS = '-webkit-transition',
    TRANSITION     = 'webkitTransition',

    TRANSFORM_CSS  = '-webkit-transform',
    TRANSFORM      = 'webkitTransform';

//unprefixed
if(document.body.style.transform){
    TRANSITION_END = 'transitionend';
    TRANSITION_CSS = 'transition';
    TRANSITION     = 'transition';
    TRANSFORM_CSS  = 'transform';
    TRANSFORM      = 'transform';
}

var l = $("form").offsetLeft;

var startLeft,lastX,goTo,endPoint;

function handleTouch(e) {
    switch(e.type){
        case 'touchstart':
            break;
        case 'touchmove':
            //readonly long offsetLeft,offsetTop   当前元素的css边框的左上角
            // 相对于它的offsetParent容器元素的X及Y坐标。

            //readonly Element offsetParent     指定容器元素，
            // offsetLeft和offsetTop将基于这个容器元素定义的坐标系统度量。
            // 对大多数元素来说，offsetParent是包含它们的<body>元素。
            // 不过，如果一个元素在一个动态定位的元素中，那个定位的元素将是offsetParent，
            // 如果元素在表格中，<td>,<th>,<table>元素可能会是offsetParent。


            //Event对象属性：readonly integer pageX, pageY  这两个属性不是标准属性，但广泛支持，
            // 类似clientX和clientY，然而它们使用文档坐标而不是窗口坐标。
            // IE事件没有定义这两个属性，不过jQuery为所有浏览器模拟了它们。
            goTo = (e.touches[0].pageX - l);
            if(goTo < 119 && goTo>0){
                //lastX = e.touches[0].pageX -l;
                theSwitch.style[TRANSFORM] = 'translate3d(' +
                    goTo + 'px' + ',0,0)';
            }
            if(goTo>60 && !isOn){
                console.log('turn on');
                turnOn();
            } else if(goTo<60 && isOn){
                console.log('turn off');
                turnOff();
            }

            break;
        case 'touchcancel':
            //break;
        case 'touchend':
            if(goTo>60){
                endPoint = 119;
            } else{
                endPoint = 0;
            }

            theSwitch.style[TRANSITION] = TRANSFORM_CSS + ' .1s ease-out;';
            theSwitch.style[TRANSFORM]  = 'translate3d(' + endPoint + 'px,0,0)'

            break;
    }
}

theSwitch.addEventListener('touchstart',handleTouch);
theSwitch.addEventListener('touchend',handleTouch);
theSwitch.addEventListener('touchmove',handleTouch);