/**
 * Created by a_wav on 2016/11/13.
 */
var previousOrientation = 0;

function checkOrientation() {
    //alert(window.orientation);
    //经测试window.orientation这个属性在Android浏览器中是存在的。

    //don't bother changing this if the orientation is the same
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if(orientation.angle !== previousOrientation){
        previousOrientation = orientation.angle;
        //如果设备是纵向的，window.orientation值为0;
        //如果设备是横向的，window.orientation值为90或-90;
        if(orientation.angle !== 0){
            document.getElementById("status").innerHTML = "horizontal";
        }else{
            document.getElementById("status").innerHTML = "vertical";
        }
    }
}

window.addEventListener("resize",checkOrientation);
window.addEventListener("orientationchange",checkOrientation);