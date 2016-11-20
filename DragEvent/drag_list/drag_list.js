/**
 * Created by a_wav on 2016/11/19.
 */
whenReady(function () {
    var lists = document.getElementsByTagName("ul");
    var regexp = /\bdnd\b/;

    for(var i=0; i< lists.length;++i)
        if(regexp.test(lists[i].className))
            dnd(lists[i]);

    function dnd(list) {
        var original_class = list.className;
        var entered = 0;

        var icon = new Image();
        icon.src = "document.png";

        // dragenter dragover dragleave 事件处理函数必须return false，来取消事件
        // 以此表明它对放置感兴趣
        list.ondragenter = function (e) {
            e = e || window.event;
            // 离开的那个元素
            var from = e.relatedTarget;
            var dt = e.dataTransfer;

            ++entered;
            if((from && !ischild(from,list)) || entered == 1){

                var types = dt.types;

                if(!types || // IE
                    (types.contains && types.contains("text/plain")) || //HTML5
                    (types.indexOf && types.indexOf("text/plain")!==-1 ) //Webkit
                ){
                    list.className = original_class + " droppable";
                    //取消事件的浏览器默认操作，用于处理使用对象属性注册的处理程序
                    return false;
                }

                return;
            }

            dt.dropEffect = "move";
            //取消事件的浏览器默认操作，用于处理使用对象属性注册的处理程序
            return false;
        };

        // 必须定义这个处理程序并返回false，否则这个拖放操作将取消
        list.ondragover = function (e) {
            //取消事件的浏览器默认操作，用于处理使用对象属性注册的处理程序
            return false;
        };

        list.ondragleave = function (e) {
            e = e || window.event;
            var to = e.relatedTarget;

            // 如果我们要到列表以外的元素或打破离开和进入次数的平衡
            // 那么取消高亮显示列表
            --entered;
            if((to && !ischild(to,list)) || entered <= 0){
                list.className = original_class;
                entered = 0;
            }
            return false;
        };

        list.ondrop = function (e) {
            e = e || window.event;

            /*
            * 获得放置的纯文本数据
            * "Text"是"text/plain"的昵称
            * IE不支持"text/plain"，所以在这里使用"Text"
            * */
            var dt = e.dataTransfer;
            var text = dt.getData("Text");

            //如果得到一些文本，把它放入列表尾部的新项中
            if(text){
                var item = document.createElement("li");
                item.draggable = true;
                item.appendChild(document.createTextNode(text));
                list.appendChild(item);

                // 恢复列表的原始样式且重置进入次数
                list.className = original_class;
                entered = 0;

                return false;
            }
        };

        //使原始所有列表项都可拖动
        var items = list.getElementsByTagName("li");
        for(var i=0;i<items.length;++i)
            items[i].draggable = true;

        list.ondragstart = function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;

            if(target.tagName !== "LI")
                return false;
            var dt = e.dataTransfer;
            dt.setData("Text",target.innerText || target.textContent);

            dt.effectAllowed = "copyMove";

            if(dt.setDragImage)
                dt.setDragImage(icon,16,16);
        };

        list.ondragend = function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;

            //如果这个拖放操作是move，那么要删除列表项
            if(e.dataTransfer.dropEffect === "move")
                target.parentNode.removeChild(target);
        };

        /*
        * 这是在ondragenter和ondragleave使用的工具函数
        * 如果a是b的子元素则返回true
        * */
        function ischild(a,b) {
            for(;a;a=a.parentNode)
                if(a === b)
                    return true;

            return false;
        }

    }
});