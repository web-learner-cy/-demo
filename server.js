// 文件处理部分
const app = require('express')();
const http = require('http');
var WebSocketServer = require('ws').Server;
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})
const server = http.createServer(app);
var wss = new WebSocketServer({ server });

var userList = []

wss.on('connection', function (ws, req) {
  console.log('connect')
  // console.log('clinets', wss.clients)
  // console.log('ws', ws)
  // broadcast(JSON.stringify({ type: 'userlist', data: userList }))
  ws.on('message', function (message) {
    var msg = JSON.parse(message)
    if (msg.type === 'userInfo') {
      // 处理user
      ws._username = msg.name
      broadcast(JSON.stringify({ type: 'connect', data: ws._username + '进来了' }))
      userList.push({ username: msg.name, date: new Date() })
      broadcast(JSON.stringify({ type: 'userlist', data: userList }))
    } else if (msg.type === 'message') {
      broadcast(JSON.stringify({
        type: msg.type,
        data: msg.data,
        user: ws._username
      }))
    }
  });
  ws.on('close', function () {
    console.log('close')
    broadcast(JSON.stringify({ type: 'close', data: ws._username + '离开了' }))
    let index = userList.findIndex((item) => {
      return item.username === ws._username
    })
    if (index >= 0) {
      userList.splice(index, 1)
      broadcast(JSON.stringify({ type: 'userlist', data: userList }))
    }
    console.log('List', userList)
  })
});
server.listen(3000, () => {
  console.log('监听端口3000');
})
// 给全部连接用户发送消息
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  })
}
// const msghandler = {
//   setUser() {

//   },
//   handleMsg() {
//     broadcast()
//   }
// } 