### websoket搭建的简单多人聊天demo
>>> 目的是学习websocket

### demo 介绍
* 前端页面 就是index.html文件，使用了websocket,及原生js api
* 后端文件 server.js，使用express及ws插件搭建的node服务器，进行消息转发功能

### demo 启动
1. 下载插件 `npm i express ws`
2. 运行指令 `npm start`,后台监听3000端口
3. 浏览器输入`localhost:3000`,访问页面
4. 输入框输入用户名，随便输入，仅仅作一个用户标识作用，
5. 进入聊天界面，就可以发送消息
6. 可打开多个窗口，进行验证，消息推送
