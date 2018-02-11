const express = require('express');
const app = express();
const io = require('socket.io')();

var rooms = 'roomOne';

app.use(express.static('public'));


//this aroute and points to the home page
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));


const server = app.listen(3000, () => {
  console.log ('app running on port 3000!');
});

io.attach(server);

/*socket.in(rooms);
//Trying to create rooms for the chat. Commented out since is not working entirely
socket.on('changeRooms', msg => {
io.socket.join(rooms);
});*/

io.on('connection',(socket)=> {
  console.log('a user has connected!');
  socket.broadcast.emit('chat message', { for: 'everyone', message : `${socket.id} is here!`}); // I tried here to clean the connect message on the user screen


  socket.on('chat message', msg => {
  socket.broadcast.emit('chat message', { for:'everyone', message : msg}); //using socket.broadcast to clean connection message on user screen  but not for others
});


  socket.on('disconnect', ()=> {
    console.log('a user has disconnected!');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });

  socket.on('changeRooms', function(newRoom){
  socket.leave(rooms);
  socket.join(newRoom);
  socket.emit('changeRooms', newRoom);
});

});
