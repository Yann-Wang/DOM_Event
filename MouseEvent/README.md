## mouse event

### click, dblclick

### contextmenu

### mousedown, mouseup, mousemove

### mouseenter, mouseleave
- mouseenter: 类似mouseover ,IE将其引入，HTML5将其标准化，尚未广泛实现
- mouseleave: 类似mouseout , IE将其引入，HTML5将其标准化，尚未广泛实现
- mouseenter: 在鼠标从元素外部移动到元素范围之内时触发。该事件不冒泡。在鼠标移动到后代元素上不会触发。移出元素范围也不会触发。
- mouseleave: 在鼠标从元素内部移动到元素范围之外时触发。该事件不冒泡。在鼠标从后代元素移动到该元素时不会触发。移入元素范围也不会触发。


### mouseover, mouseout
- mouseover: 鼠标进入元素时触发。relatedTarget（IE中是fromElement）指的是鼠标来自的元素
- mouseout: 鼠标离开元素时触发。relatedTarget（IE中是toElement）指的是鼠标去往的元素


### simulate mouse event
```javascript

var options = {
			bubbles: true,
			cancelable: true,
			view: window
		};
var simulateDivClick = new MouseEvent('click', options);
ele.dispatchEvent(simulateDivClick);
		
```