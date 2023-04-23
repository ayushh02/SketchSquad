let express = require('express');
let app = express();
let http = require('http').createServer(app);



app.use(express.static("public"));

let PORT = process.env.YOUR_PORT || process.env.PORT || 8090;
http.listen(PORT, () => {
    console.log('server started on port'+ PORT);
});


const io = require('socket.io')(http);
io.on('connection', (socket) => {
  console.log('Connected...')
  socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg)
  })

})