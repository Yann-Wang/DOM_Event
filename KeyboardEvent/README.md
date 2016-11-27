## keyboard event

### keyboard event
- keydown, keyup, keypress
- 为document.body注册键盘事件，设置指定按键的事件回调函数

### clipboard event
- 6个剪贴板事件：beforecopy,beforecut,beforepast,copy,cut,paste
- 兼容性：IE,Safari 2,Chrome,Firefox 3   (Opera不支持通过JavaScript访问剪贴板)
- HTML5将剪贴板事件纳入了规范。
- 对于copy,cut,paste事件，只要是在上下文菜单中选择了相应选项，或者使用了相应的键盘组合键，所有浏览器都会出发它们。
- 要访问剪贴板中的数据，可以使用clipboardData对象：在IE中，这个对象是window对象的属性；在Firefox4+,Safari,Chrome中，这个对象是相应event对象的属性。
- clipboardData对象有三个方法：getData(),setData(),clearData()
- copy,cut,paste事件的默认操作（数据复制到剪贴板，数据剪切到剪贴板，数据粘贴到剪贴板） 会在执行事件回调函数之后才去执行。
- demo1: 过滤掉不是数字的粘贴数据
- demo2: 实现在复制的内容后面追加版权信息的功能。

### text event
- input 事件：在文本插入到元素后才触发，这些事件不能取消，不能指定其事件对象中的最新文本，但它们能发出元素文本内容发生改变的通知。
- demo: input filter


### simulate keyboard event
- demo1: simulate trigger "a"
- demo2: simulate trigger "ctrl+b"
- 模拟按键触发不会去执行浏览器本身支持的快捷键指令！！！（比如ctrl+h,F11等），但是会触发“自定义的按键组合事件回调函数”。