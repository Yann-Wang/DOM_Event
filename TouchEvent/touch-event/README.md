
#### scroll text
- 重写滚动条

#### swipe button
- 手势：为了能跨浏览器支持手势，需要自行实现手势。
- 循序渐进增强：建立一套无需手势的界面，然后再将手势作为基本交互的增强。

#### swipe slides
- 综合使用touch事件和transitionend事件实现滚动效果

#### tap button
- 触摸界面的轻触与桌面上的鼠标单击不同。
- 在触摸界面上，没有移动光标，没有悬停事件。
- 在触摸设备中，浏览器仍然会触发鼠标事件。用户轻触300ms之后将触发click事件，mousedown,mouseup事件也同时被出发。
- 为了创建体验良好的触摸界面，不要使用合成事件（比如click事件）

