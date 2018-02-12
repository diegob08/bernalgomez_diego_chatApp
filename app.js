const express = require('express');
const app = express();
const io = require('socket.io')();

var rooms = ['room1', 'room2', 'room3'];

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
  //using socket.broadcast to clean connection message on user screen  but not for others

  socket.on('chat message', msg => {
  io.emit('chat message', { for:'everyone', message : msg});
});


  socket.on('disconnect', ()=> {
    console.log('a user has disconnected!');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });

  //Trying to add rooms for different chats below here, but is broken :(
  /*io.sockets.on('connection', function (socket) {

  	socket.on('adduser', function(username){
  		socket.username = this.value;
  		socket.room = 'room1';
  		usernames[username] = `${socket.id}`;
  		socket.join('room1');
  		socket.emit('rooms message', 'SERVER', 'you have connected to room1');
  		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
  		socket.emit('updaterooms', rooms, 'room1');
  	});


  	socket.on('sendchat', function (data) {
  		io.sockets.in(socket.room).emit('rooms message', socket.username, data);
  	});

  	socket.on('changeRoom', function(newroom){
  		socket.leave(socket.room);
  		socket.join(newroom);
  		socket.emit('rooms message', 'SERVER', 'you have connected to '+ newroom);
  		socket.broadcast.to(socket.room).emit('rooms message', 'SERVER', socket.username+' has left the room');
  		socket.room = newroom;
  		socket.broadcast.to(newroom).emit('rooms message', 'SERVER', socket.username+' has joined this room');
  		socket.emit('updaterooms', rooms, newroom);
  	});

  	socket.on('disconnect', function(){
  		delete usernames[socket.username];
  		io.sockets.emit('updateusers', usernames);
  		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  		socket.leave(socket.room);
  	});
  });*/
  /*socket.on('changeRooms', function(newRoom){
  socket.leave(rooms);
  socket.join(newRoom);
  socket.emit('changeRooms', newRoom);
});
*/
});
