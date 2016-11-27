## window related event


### hashchange event
- when the hash of url changed, the hashchange event will be triggered.

### message event
- message事件处理程序 event对象有三个属性（string data,WindowObject source, string sourceOrigin）
- 第一个参数：传递过来的消息；第二个参数：消息源自的window对象；第三个参数：指定消息来源；
- //postMessage()方法
- window.postMessage(string message, string targetOrigin)
- 第一个参数：要传递的消息；第二个参数：指定目标窗口的源


### popstate event
- 在用户使用“后退”或“前进”按钮时触发

### storage event
- 当同源窗口设置、删除localStorage, sessionStorage中的键值对时触发storage事件

