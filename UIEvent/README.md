## UI event


### load event
- 当某一资源（HTML页面、图片、css、&lt;frameset&gt;、&lt;object&gt;、JavaScript文件）加载完成时触发
- event target: Element, window, XMLHttpRequest, XMLHttpRequestUpload


### scroll event
- scroll 被所有浏览器支持
- scroll 比 wheel触发的频率更高
- scroll 在文档滚动时都会触发，不管通过什么方式实现滚动（触摸板/滚动条/鼠标滚轮），wheel智能通过鼠标滚轮来触发


### infinite scroll demo
```shell

cd infinite-scrill
npm install
node ./bin/www

//new tab
cd com.flickr.api
npm install
node ./bin/www

```
- access http://localhost:3000/infinite_scroll/infinite_scroll