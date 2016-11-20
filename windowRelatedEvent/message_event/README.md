## message event
- window.postMessage(string message, string targetOrigin)
- message event handling function: event object（string data,WindowObject source, string sourceOrigin）
  
### start server
```shell
npm install static-server -g
cd server1
node static-server1.js

// new tab
node static-server2.js

```

### access pages
- access http://localhost:3000/postMessage.html
- input the content of "cnt", click "postMessage"
- get the feedback