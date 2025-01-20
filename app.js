const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const app = express();

const server = http.createServer(app);

const io = socketio(server);

//EJS SETUP
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id: socket.id, ...data})
    })
    console.log("Connected");
    
})

app.get('/',(req,res,next)=>{
    res.render("index")
})

const host = 3000;

server.listen(host);