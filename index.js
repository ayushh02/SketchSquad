let express = require('express');
let app = express();
let http = require('http').createServer(app);
const io = require('socket.io')(http);

let connections = [];

io.on("connect", (socket) => {
  
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  socket.on("draw", (data) =>{
    connections.forEach((con) => {
      if(con.id !== socket.id){
        con.emit('ondraw',{x : data.x , y : data.y})
      }
    })
  })

  socket.on("down" , (data) => {
    connections.forEach((con) => {
      if(con.id !== socket.id){
        con.emit('ondown',{x : data.x , y : data.y})
      }
    })
  })

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
})

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

// io.on('connection', (socket) => {
//   console.log('Connected...')
    
// })
app.use(express.static("public"));

let PORT = process.env.YOUR_PORT || process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log('server started on port'+ PORT);
});





