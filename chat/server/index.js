const express = require('express');
const app = express();
const http = require('http');
const {Server}=require('socket.io')
const cors = require('cors');

app.use(cors)

const server = http.createServer(app);
 
const io=new Server(server,{
        cors: {
        origin: 'http://localhost:3000',
        transport: ['websocket'],
    }
});

io.on('connection',(socket)=>{
    console.log(`new user connected:${socket.id}`);

    socket.on('chat_message',(msg)=>{
        socket.broadcast.emit('receive_message',msg);
    });
    
   
});


io.listen(3002,()=>{
    console.log('server is running on port 3002');
});