/**
 * Created by a_wav on 2016/11/8.
 */

function enclose(cnt,framewidth,frameheight,cntX,cntY){
    framewidth = Math.max(framewidth,50);
    frameheight = Math.max(frameheight,50);
    cntX = Math.min(cntX,0) || 0;
    cntY = Math.min(cntY,0) || 0;

    var frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.MozBoxSizing = "border-box";

    cnt.parentNode.insertBefore(frame,cnt);
    frame.appendChild(cnt);

    cnt.style.position = "relative";
    cnt.style.left = cntX + "px";
    cnt.style.top = cntY + "px";

    addWheelListener( cnt, wheelHandler,false );

    function wheelHandler(event){
        var e = event;

        var deltaX = e.deltaX;
        var deltaY = e.deltaY;
        // console.log("deltaY: " + deltaY);
        // console.log("screenY: " + window.screenY);

        // 获取内容元素当前尺寸
        var cntbox = cnt.getBoundingClientRect();
        var cntwidth = cntbox.right - cntbox.left;
        var cntheight = cntbox.bottom - cntbox.top;

        if(e.altKey){ // 如果按下Alt键，就可以调整frame大小
            if(deltaX){
                framewidth -= deltaX; // 新宽度， 但不能比内容大
                framewidth = Math.min(framewidth,cntwidth);
                framewidth = Math.max(framewidth,50); // 且也不能比50小
                frame.style.width = framewidth + "px";

            }
            if(deltaY){
                frameheight -= deltaY;
                frameheight = Math.min(frameheight,cntheight);
                frameheight = Math.max(frameheight-deltaY,50);
                frame.style.height = frameheight + "px";
            }
        }
        else{
            // 没有按下Alt辅助键，就可以平移frame中的内容
            if(deltaX){
                // 不能再滚动了
                var minoffset = Math.min(framewidth-cntwidth,0);
                // 把deltaX添加到cntX中，但不能小于minoffset
                cntX = Math.max(cntX+deltaX,minoffset);
                cntX = Math.min(cntX,0); // 或比0大
                cnt.style.left = cntX + "px"; // 设置新的偏移量
            }
            if(deltaY){
                var minoffset = Math.min(frameheight-cntheight,0);
                // 把deltaY添加到cntY,但不能小于minoffset
                cntY = Math.max(cntY+deltaY,minoffset);
                cntY = Math.min(cntY,0);
                cnt.style.top = cntY + "px";
            }
        }

        // 不让这个事件冒泡，阻止任何默认操作
        // 这会阻止浏览器使用mousewheel事件滚动文档
        // 希望对于相同的鼠标滚动
        // 调用wheel事件上的preventDefault()也能阻止mousewheel事件的产生
        e.preventDefault();

        if(e.stopPropagation)
            e.stopPropagation();
        e.cancelBubble = true;

        return false;


    }
}