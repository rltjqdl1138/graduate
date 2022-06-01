const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1138877',
  database: 'graduate',
});


con.connect((e) => {
  if (!e) {
    console.log('connected')
  }
});

let seq = 1
let x = 126.97841;
let y = 37.56667;
io.on('connection', (socket) => {
  //const {token} = socket.handshake.auth;
  console.log(socket)
  const user = {seq: seq++}

//  socket.join(`user_${user.seq}`);
  
  socket.on('move', (msg)=>{
    console.log(msg)
    const {lng, lat} = msg
    sendPing(`user_${user.seq}`,{x:lng,y:lat})
  })
  io.emit('broadcast', 'hello');
});

function sendPing(topic, location){
  io.to(topic).emit("move", location)
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});

app.get('/v1/area', async (req, res)=>{
  const data = await Query(`SELECT * FROM route`)
  res.write(JSON.stringify(data))
  res.end()
})

function Query(query, params) {
  return new Promise((resolve, reject) => {
    if (!params || !params.length) {
      con.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else {
      con.query(query, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    }
  });
}


app.get('')