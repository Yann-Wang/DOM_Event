## event handling

### 布置事件回调的三种方法
- HTML内联属性事件处理程序
- 属性事件处理程序
- addEventListener()方法


### test addEventListener
- 注册的是同一个函数， 所以只调用一次
- 注册的是相同的匿名函数， 所以调用两次次

### 为同一个Element.onclick赋值两次
- 后者覆盖前者

### 事件委托
- e.target.tagName