## from event

### HTML FORM Element
- Input, Button, Select, Option, TextArea


### change event
- demo: 级联菜单


### reset event  & submit event
- onreset     在表单元素重置之前调用。可通过返回false或取消这个事件来阻止重置。
- onsubmit    在表单提交之前调用。可通过返回false或取消这个事件来阻止提交。
- 阻止reset的两种方法
    - 在onreset事件处理程序属性中返回false
    - 通过preventDefault()来取消这个事件
- 直接调用reset()方法会像单击重置按钮一样触发reset事件处理程序,跟设置事件处理程序的方法没关系
- 直接调用submit()方法不会触发submit事件处理程序，跟设置事件处理程序的方法没关系


### demo: prevent repeated submit
- use variable
- use the disabled property of input.


### select event 选择文本有三种办法
- 用鼠标或键盘手动选择
- select()方法   (会触发两次select事件)
- setSelectionRange()方法
- //后两种方法也都会触发select事件