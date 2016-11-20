/**
 * Created by a_wav on 2016/11/12.
 */
var $ = function (id) {
    return document.getElementById(id);
};

// 操作剪贴板的函数
var getClipboardText = function (event) {
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
};
var setClipboardText = function (e) {
    return function (value) {
        if(e.clipboardData)
            return e.clipboardData.setData("text/plain",value);
        else if(window.clipboardData)
            return window.clipboardData.setData("text",value);
    };
};

//获取选中内容
function getSelectedContent(){
    if(window.getSelection)
        return window.getSelection().toString();
    else if(document.selection)
        return document.selection.createRange().text;
}


//获取文本
/*function getSelectedText(textbox){
 if(typeof textbox.selectionStart == "number"){
 return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
 } else if(document.selection){
 return document.selection.createRange().text;
 }
 }*/