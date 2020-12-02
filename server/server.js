const osutils = require('os-utils');
const { GPU } = require('gpu.js');
const gpu = new GPU();

//const websocket = require('websocket-stream');
const WebSocket = require('ws');
// const ws = websocket('wss://ws.blockchain.info/inv');
const ws = new WebSocket('wss://ws.blockchain.info/inv', {
  perMessageDeflate: false,
});
// process.stdin.pipe(ws);

ws.on('open', () => {
  ws.send('{"op":"unconfirmed_sub"}');
});
ws.on('message', (data) => {
  const transaction = JSON.parse(data);
  // console.log(data);
  const amount = transaction.x.inputs[0].prev_out.value / 100000000;
  const dollars = amount * 19122;
  // if (amount > 1) {
  console.log(`Amount: ${amount}`);
  console.log(`Dolla dolla bill: ${dollars}`);
  console.log(`Size: ${transaction.x.size}`);
  console.log(`In Addr: ${transaction.x.inputs[0].prev_out.addr}`);
  console.log(`Out addr: ${transaction.x.out[0].addr}`);
  console.log(`relayed: ${transaction.x.relayed_by}`);
  console.log(process.memoryUsage());
  printStats();
  // }
});

function printStats() {
  osutils.cpuUsage((v) => {
    console.log(`CPU usage: ${v}`);
    console.log(`Total memory: ${osutils.totalmem()}`);
  });
}

// 126437724
// Size: 413
// Addr: bc1qwfgdjyy95aay2686fn74h6a4nu9eev6np7q4fn204dkj3274frlqrskvx0
// 244495
// Size: 193
// Addr: bc1q0xl4fykgjmjd0pxda4fn8mvgw2d8zmanx3mdkm
// 8173500
// Size: 223
// Addr: 1Gxbc8tyyxYHCcQwq6aF42V6jnmwzaek4v
// 43501637
// Size: 406
// Addr: 3FjeGkgQ7tUaboXBuZJ47jJ74BBFpMgvFF
// 499227
// Size: 189
// Addr: 15W8GPJoGAtQgu7J1uoWgH9uP89z8QhAy4

// Out addr: 3EgMgBaGBgJ5fJFzu4Fq5Tvvtm3NBakTW2
// 476057500
// Size: 189
// In Addr: 17jEiie6dtJwSrZfUU6Eg13LW1pkBoGBtX
// Out addr: 34K7NDULZqQPN8zEPwpXjiJLmMWyevfQNm
// 151352
// Size: 223
// In Addr: 1FNXiUU68iJyDXRngPMvwisUSKzxYoXGQk
// Out addr: 349sb3oBWPPfeNTepoMWTCJsyKN9rpUjpR
// 1880270
// Size: 225
// In Addr: bc1qryz67nsr9w5yy4d9sz7vhdyeeznpppk3c7dmgr
// Out addr: 1NJgQ3a6vts9Jg9LtR7v8PwmR3D2RVS3KD

// ws.ping()
// ws.send(JSON.stringify({ op: 'unconfirmed_sub' }));

// ws.pipe(process.stdout);

// // const WebSocketServer = require('websocket').server;
// // const http = require('http');

// // const server = http.createServer(function(request, response) {
// //   console.log((new Date()) + ' Received request for ' + request.url);
// //   response.writeHead(404);
// //   response.end();
// // });
// // server.listen(8080, function() {
// //   console.log((new Date()) + ' Server is listening on port 8080');
// // });

// // wsServer = new WebSocketServer({
// //   httpServer: server,
// //   // You should not use autoAcceptConnections for production
// //   // applications, as it defeats all standard cross-origin protection
// //   // facilities built into the protocol and the browser.  You should
// //   // *always* verify the connection's origin and decide whether or not
// //   // to accept it.
// //   autoAcceptConnections: false
// // });

// // function originIsAllowed(origin) {
// //   return true;
// // }

// // wsServer.on('request', (request) => {
// //   if (!originIsAllowed(request.origin)) {
// //     request.reject();
// //     return;
// //   }

// //   const connection = request.accept('echo-protocol', request.origin);
// //   console.log(new Date() + ' Connection accepted.');
// //   connection.on('message', (message) => {
// //     if (message.type === 'utf8') {
// //       console.log(`Message: ${message.utf8Data}`);
// //     }
// //   })
// // })

// var W3CWebSocket = require('websocket').w3cwebsocket;

// var client = new W3CWebSocket('wss://ws.blockchain.info/inv', 'echo-protocol');

// client.onerror = function () {
//   console.log('Connection Error');
// };

// client.onopen = function () {
//   console.log('WebSocket Client Connected');

//   function sendNumber() {
//     if (client.readyState === client.OPEN) {
//       var number = Math.round(Math.random() * 0xffffff);
//       client.send(number.toString());
//       setTimeout(sendNumber, 1000);
//     }
//   }
//   sendNumber();
// };

// client.onclose = function () {
//   console.log('echo-protocol Client Closed');
// };

// client.onmessage = function (e) {
//   if (typeof e.data === 'string') {
//     console.log("Received: '" + e.data + "'");
//   }
// };
