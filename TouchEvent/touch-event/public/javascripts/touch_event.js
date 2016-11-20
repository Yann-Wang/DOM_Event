/**
 * Created by a_wav on 2016/11/14.
 */
function handleTouchEvent(e){
    var output = document.getElementById("output");
    //只跟踪一次触摸
    if(e.touches.length == 1){

        switch(e.type){
            case "touchstart":
                output.innerHTML = "Touch started (" + e.touches[0].clientX +
                    "," + e.touches[0].clientY + ")";
                break;
            case "touchmove":
                e.preventDefault();
                output.innerHTML = "Touch moved (" +
                    e.changedTouches[0].clientX +
                    "," + e.changedTouches[0].clientY + ")";
                break;
        }

    }
    if(e.touches.length == 0 && e.type == "touchend"){
        output.innerHTML = "Touch ended (" +
            e.changedTouches[0].clientX +
            "," + e.changedTouches[0].clientY + ")";
    }
}

document.addEventListener('touchstart',handleTouchEvent);
document.addEventListener('touchmove',handleTouchEvent);
document.addEventListener('touchend',handleTouchEvent);