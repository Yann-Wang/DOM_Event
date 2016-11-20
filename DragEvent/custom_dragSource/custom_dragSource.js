/**
 * Created by a_wav on 2016/11/19.
 */
whenReady(function () {
    var clock = document.getElementById("clock");
    // Image参数无效果
    var icon  = new Image([100,100]);
    //var icon    = document.createElement("img");

    icon.src = "clock_32.png";

    function displayTime() {
        var now = new Date();
        var hrs = now.getHours(),
            mins = now.getMinutes();
        if(mins < 10)
            mins = "0" + mins;
        clock.innerHTML = hrs + ":" + mins;
        setTimeout(displayTime, 60000);
    }
    displayTime();
    // 也可以通过HTML属性 draggable实现这个目的： <span draggable="true">...
    clock.draggable = true;

    clock.ondragstart = function(e){
        var e = e || window.event;

        var dt = e.dataTransfer;
        dt.setData("Text", Date()+"\n");

        if(dt.setDragImage)
            dt.setDragImage(icon,16,16);
    };
});